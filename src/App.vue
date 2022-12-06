<template>
  <div id="app" >
    <template v-if="hasConfig">
      <div v-if="isLoggedIn">
       
        <Inicio />
        <vue-progress-bar ></vue-progress-bar>
        <Header ></Header>
         <!-- <AppMovile v-else/> -->
        <main id="main" class="main">
          
    <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#"><i class="bi bi-house-door"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">{{ $store.state.first_text }}</a></li>
                  <li class="breadcrumb-item active negros">{{ $store.state.last_text }}</li>
                </ol>
              </nav>
          <div class="section dashboard" >
           
           <router-view/>
            <!-- INICIO FOOTER -->
           <!-- <Help/> -->
          </div>
        </main>
        <footer id="footer" class="footer mt-3">
    <div class="copyright">
      © Copyright <strong><span>WesWeb</span></strong>. Todos los derechos reservados
    </div>
    <div class="credits">
     
      Diseñado por <a href="#">WesWeb</a>
    </div>
  </footer>
      </div>
      <Login v-else />
      
    </template>
    <div v-else class="text-center text-sm negros" style="margin-top:300px; font-size:25px;">
      <p>Cargando pagina...</p>
    </div>
  </div>
</template>

<script>
import Header from "@/shared/Header.vue";
import Inicio from "@/shared/Inicio.vue";
import Login from "./views/auth/Login.vue";
//import Help from "@/shared/Help.vue"
export default {
  name: "app",
  mounted() {
    this.initialize();
  },
  components: {
    Header,
    Login,
    Inicio,
   //Help,
   // AppMovile : () => import( /* webpackChunkName: "AppMovile" */ '../src/shared/AppMovile.vue')
  },
  data() {
    return {
      hasConfig: false,
      isLoggedIn: false,
    };
  },
  methods: {
    initialize() {//https://pcei-tulcan.com http://localhost:3000/
      let self = this;
      if (!localStorage.getItem("config")) {
        var url = "https://pcei-tulcan.com/api";
        localStorage.setItem("config", JSON.stringify(url));
        self.hasConfig = true;
       // window.location.reload(true);
      } else {
        self.hasConfig = true;
        __isLogedIn();
      }
      function __isLogedIn() {
        if (localStorage.getItem("access_token") != null) {
          self.$user.initialize();
          self.isLoggedIn = true;
        }
      }
    },
  },
};
</script>
<style>
  @import './assets/styles/style.css';
  @import './assets/styles/mainstyles.css';
</style>
