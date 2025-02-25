<script>
  import axios from './axios';

  let email = '';
  let password = '';
  let error = '';

  async function handleSubmit() {
    if (!email || !password) {
      error = 'Por favor, preencha o e-mail e a senha.';
      return;
    }

    await postForm();
  }

  async function postForm() {
    try {
      const response = await axios.post(`/auth/login`, {
        email,
        password
      });

      if (response.status == 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        error = '';
        window.location.href = '/panel';
      } else {
        error = `Error: ${response.data.message}`;
      }
    } catch (err) {
      error = `Error: ${err.response?.data?.message || err.message}`;
    }
  }
</script>

<div class="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-green-800">
      Entre na sua conta
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Endereço de e-mail
          </label>
          <div class="mt-1">
            <input id="email" name="email" type="email" required
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                   bind:value={email}>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div class="mt-1">
            <input id="password" name="password" type="password" required
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                   bind:value={password}>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Lembrar-me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-green-600 hover:text-green-500">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        {#if error}
          <div class="text-red-500 text-sm">{error}</div>
        {/if}

        <div>
          <button type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={!email || !password}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
  <p class="text-center mt-4">
    Não tem uma conta? 
    <a href="/register" class="text-green-600 hover:text-green-500 font-medium">
      Cadastre-se aqui
    </a>
  </p>
</div>