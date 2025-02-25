<script>
  import { ChevronRight, Server, Zap, Shield, Clock, Users } from 'lucide-svelte'

  let features = [
    { icon: Zap, title: "Inicialização Instantânea", description: "Inicie seu servidor em segundos com apenas um clique." },
    { icon: Shield, title: "Segurança Garantida", description: "Proteção contra DDoS e backups automáticos incluídos." },
    { icon: Clock, title: "Disponibilidade 24/7", description: "Seus amigos podem jogar a qualquer hora, dia ou noite." },
    { icon: Server, title: "Hardware de Ponta", description: "Servidores potentes para uma jogabilidade suave." },
  ];

  let plans = [
    { name: "Iniciante", price: "R$29,99", ram: "2GB", players: "10" },
    { name: "Aventureiro", price: "R$59,99", ram: "4GB", players: "20" },
    { name: "Lendário", price: "R$99,99", ram: "8GB", players: "Ilimitado" },
  ];
</script>

<main class="bg-green-50">
  <!-- Header -->
  <header class="bg-green-800 text-white">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">MineCraft Fácil</h1>
      <div>
        <a href="/login" class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300 mr-2">
          Entrar
        </a>
        <a href="/register" class="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300">
          Registrar
        </a>
      </div>
    </div>
  </header>
  <section class="bg-green-600 text-white">
    <div class="container mx-auto px-6 py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">Servidor de Minecraft em Um Clique</h1>
      <p class="text-xl mb-8">Comece a jogar com seus amigos em minutos, sem complicações!</p>
      <a href={"/register"} class="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300">
        Comece Agora
      </a>
    </div>
  </section>
  
    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-8">Por que escolher nossos servidores?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each features as feature}
            <div class="bg-white p-6 rounded-lg shadow-md">
              <svelte:component this={feature.icon} class="w-12 h-12 text-green-600 mb-4" />
              <h3 class="text-xl font-semibold mb-2">{feature.title}</h3>
              <p class="text-gray-600">{feature.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- How It Works Section -->
    <section class="bg-green-100 py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-8">Como Funciona</h2>
        <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div class="flex items-center">
            <div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
            <p>Escolha seu plano</p>
          </div>
          <ChevronRight class="hidden md:block" />
          <div class="flex items-center">
            <div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
            <p>Clique em "Iniciar Servidor"</p>
          </div>
          <ChevronRight class="hidden md:block" />
          <div class="flex items-center">
            <div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
            <p>Comece a jogar!</p>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Pricing Section -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-8">Nossos Planos</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {#each plans as plan}
            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 class="text-2xl font-bold mb-4">{plan.name}</h3>
              <p class="text-4xl font-bold text-green-600 mb-4">{plan.price}<span class="text-sm text-gray-600">/mês</span></p>
              <ul class="text-gray-600 mb-6">
                <li class="mb-2">{plan.ram} RAM</li>
                <li><Users class="inline w-5 h-5 mr-2" />{plan.players} jogadores</li>
              </ul>
              <button class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300">
                Escolher Plano
              </button>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- Testimonial Section -->
    <section class="bg-green-100 py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-8">O que nossos clientes dizem</h2>
        <div class="max-w-2xl mx-auto">
          <p class="text-xl italic mb-4">"Nunca foi tão fácil configurar um servidor de Minecraft. Recomendo totalmente!"</p>
          <p class="font-bold">- João Silva, Jogador Ávido</p>
        </div>
      </div>
    </section>
  
    <!-- Footer -->
    <footer class="bg-green-800 text-white py-8">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="text-2xl font-bold">MineCraft Fácil</h3>
            <p>Servidores de Minecraft sem complicação</p>
          </div>
          <div>
            <a href="#" class="hover:underline mr-4">Sobre Nós</a>
            <a href="#" class="hover:underline mr-4">Contato</a>
            <a href="#" class="hover:underline">Termos de Serviço</a>
          </div>
        </div>
        <div class="mt-8 text-center">
          <p>&copy; 2025 MineCraft Fácil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
</main>