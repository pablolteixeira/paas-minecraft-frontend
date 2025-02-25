<script>
    import { onMount } from 'svelte';
    import { Play, Pause, RefreshCw, Users, Clock, HardDrive, Cpu, MemoryStick, Server } from 'lucide-svelte';
    import isTokenExpired from './tokenValidation';
    import axios from './axios';

    // Placeholder data - replace with actual data fetching logic
    let serverInfo = null;
    let isLoading = false;
    let isPageLoading = true;

    function formatUptime(startTime) {
      const currentTime = new Date();
      const startDate = new Date(startTime);

      // @ts-ignore
      const uptimeMilliseconds = currentTime - startDate;
      console.log(currentTime, startDate)

      // Convert milliseconds to seconds
      const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
      
      // Calculate days, hours, minutes
      const days = Math.floor(uptimeSeconds / (3600 * 24)); // 3600 sec * 24 hrs = 1 day
      const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600); // Remaining hours
      const minutes = Math.floor((uptimeSeconds % 3600) / 60); // Remaining minutes
      

      // Build the formatted string
      let uptimeString = "";
      if (days > 0) {
        if (days > 0) uptimeString += `${days} dias `;
        if (hours > 0) uptimeString += `${hours} horas `;
      } else {
        if (hours > 0) uptimeString += `${hours} horas `;
        if (minutes > 0) uptimeString += `${minutes} minutos`;
      }
      
      if (uptimeString == "") {
        uptimeString += `${uptimeSeconds} segundos`;
      }

      return uptimeString.trim();
    }

    async function startNewServer() {
      isLoading = true;
      
      await axios.post("/create");

      setTimeout(async () => {
        await fetchServerData();
      }, 400);

      isLoading = false;
    }
  
    async function refreshServerInfo() {
      isLoading = true;

      await fetchServerData();

      isLoading = false;
    }
  
    async function toggleServer() {
      if (serverInfo) {
        if (serverInfo.status == "online") {
          await axios.post(`/pause/${serverInfo.containerId}`);
        } else {
          await axios.post(`/unpause/${serverInfo.containerId}`);
        }
      
        await fetchServerData();
      }
    }

    onMount(async () => {
        const token = localStorage.getItem("token");

        setTimeout(() => {
            if (!token || isTokenExpired(token)) {
                window.location.href = '/login'
            }
        }, 100);

        await fetchServerData();

        isPageLoading = false;
    });

    async function fetchServerData() {
      const response = await axios.get('/server');

        if (response.data.serverInfo) {
          const {
            containerId,
            assignedPort,
            startedAt,
            currentPlayers,
            maxPlayers,
            version,
            status,
            cpuPercentage,
            memoryUsed,
            memoryMax,
            diskUsed,
            diskMax
          } = response.data.serverInfo

          const serverStatus = status == "running" ? "online" : "offline";
          
          serverInfo = {
            containerId,
            name: "Meu Servidor",
            ip: "127.0.0.1",
            port: assignedPort,
            status: serverStatus,
            players: {
              online: currentPlayers,
              max: maxPlayers
            },
            uptime: formatUptime(startedAt),
            version,
            cpu: (cpuPercentage ? cpuPercentage : 0).toFixed(0),
            ram: {
              used: (memoryUsed / 1073741824).toFixed(1),
              total: (memoryMax / 1073741824).toFixed(1)
            },
            storage: {
              used: (diskUsed / 1073741824),
              total: (diskMax / 1073741824)
            }
          };
        }
    }
  </script>
 
  {#if !isPageLoading}
    <div class="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-green-800 mb-8 text-center">Painel de Controle do Servidor</h1>
        
        {#if !serverInfo}
            <!-- No Server Started Yet -->
            <div class="bg-white shadow rounded-lg overflow-hidden p-6 text-center">
            <Server class="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 class="text-2xl font-bold text-green-800 mb-4">Você ainda não tem um servidor ativo</h2>
            <p class="text-gray-600 mb-6">Clique no botão abaixo para iniciar seu primeiro servidor Minecraft!</p>
            <button on:click={startNewServer} class="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition duration-300" disabled={isLoading}>
                {#if isLoading}
                <RefreshCw class="inline-block mr-2 animate-spin" />Iniciando...
                {:else}
                <Play class="inline-block mr-2" />Iniciar Novo Servidor
                {/if}
            </button>
            </div>
        {:else}
            <!-- Server Info Display -->
            <div class="bg-white shadow rounded-lg overflow-hidden">
            <!-- Server Status and Controls -->
            <div class="p-6 bg-green-600 text-white flex justify-between items-center">
                <div>
                <h2 class="text-2xl font-bold">{serverInfo.name}</h2>
                <p class="text-green-100">Status: 
                    <span class={serverInfo.status === "online" ? "text-green-300" : "text-red-300"}>
                    {serverInfo.status === "online" ? "Online" : serverInfo.status === "starting" ? "Iniciando" : "Offline"}
                    </span>
                </p>
                </div>
                <div class="flex space-x-4">
                <button on:click={toggleServer} class="bg-white text-green-600 px-4 py-2 rounded-full font-bold hover:bg-green-100 transition duration-300" disabled={serverInfo.status === "starting"}>
                    {#if serverInfo.status === "online"}
                    <Pause class="inline-block mr-2" />Parar
                    {:else if serverInfo.status === "starting"}
                    <RefreshCw class="inline-block mr-2 animate-spin" />Iniciando
                    {:else}
                    <Play class="inline-block mr-2" />Iniciar
                    {/if}
                </button>
                <button on:click={refreshServerInfo} class="bg-green-500 text-white px-4 py-2 rounded-full font-bold hover:bg-green-400 transition duration-300" disabled={isLoading}>
                    <RefreshCw class={`inline-block mr-2 ${isLoading ? 'animate-spin' : ''}`} />Atualizar
                </button>
                </div>
            </div>
            
            {#if serverInfo.status == "online"}
              <!-- Server Details -->
              <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-green-100 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-green-800 mb-2">Informações de Conexão</h3>
                  <p><strong>IP:</strong> {serverInfo.ip}</p>
                  <p><strong>Porta:</strong> {serverInfo.port}</p>
                  {#if serverInfo.version}<p><strong>Versão:</strong> {serverInfo.version}</p>{/if}
                  </div>
                  
                  <div class="bg-green-100 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-green-800 mb-2">Jogadores</h3>
                  {#if serverInfo.players.online && serverInfo.players.max}
                    <p class="text-3xl font-bold text-green-600">
                        <Users class="inline-block mr-2" />
                        {serverInfo.players.online} / {serverInfo.players.max}
                    </p>
                  {:else}
                    <RefreshCw class="inline-block mr-2 animate-spin" />
                  {/if}
                  </div>
          
                  <div class="bg-green-100 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-green-800 mb-2">Desempenho</h3>
                  <p><Cpu class="inline-block mr-2" /> CPU: {serverInfo.cpu}%</p>
                  <p><MemoryStick class="inline-block mr-2" /> RAM: {serverInfo.ram.used}GB / {serverInfo.ram.total}GB</p>
                  <!-- <p><HardDrive class="inline-block mr-2" /> Armazenamento: {serverInfo.storage.used}GB / {serverInfo.storage.total}GB</p> -->
                  </div>
                  
                  <div class="bg-green-100 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-green-800 mb-2">Tempo de Atividade</h3>
                  <p class="text-3xl font-bold text-green-600">
                      <Clock class="inline-block mr-2" />
                      {serverInfo.uptime}
                  </p>
                  </div>
              </div>
              {/if}
            </div>

            <!-- Additional Server Management Options -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="bg-yellow-500 text-black font-bold py-3 px-4 rounded hover:bg-yellow-400 transition duration-300">
                Configurações do Servidor
            </button>
            <button class="bg-yellow-500 text-black font-bold py-3 px-4 rounded hover:bg-yellow-400 transition duration-300">
                Gerenciar Plugins
            </button>
            <button class="bg-yellow-500 text-black font-bold py-3 px-4 rounded hover:bg-yellow-400 transition duration-300">
                Backups e Restauração
            </button>
            </div>
        {/if}
        </div>
    </div>
    {/if}