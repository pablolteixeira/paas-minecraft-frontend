<script>
  import "./app.css"
  import { Router, Route } from "svelte-routing";
  import Login from "./lib/Login.svelte";
  import NotFound from "./lib/NotFound.svelte";
  import Register from "./lib/Register.svelte";
  import Home from "./lib/Home.svelte";
  import Panel from "./lib/Panel.svelte";
</script>

<main>
</main>

<Router>
  <Route path='/' component={Home} />
  <Route path='/login' component={Login} />
  <Route path='/register' component={Register} />
  <Route path='/panel' component={Panel} />
  <Route path='*' component={NotFound} />
</Router>
