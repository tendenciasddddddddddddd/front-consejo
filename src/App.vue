<template>
  <div id="app" >
    <template v-if="hasConfig">
      <div v-if="isLoggedIn">

        <Header v-if="!$store.state.isAppMobile"></Header>
         <AppMovile v-else/>
        <main
          class="main-content position-relative  h-10 border-radius-lg "
          
        >
          <!-- Navbar -->
          <Inicio />
          <!-- End Navbar -->
          <div class="container-fluid  py-2" >
           <router-view/>
            <!-- INICIO FOOTER -->
           <!-- <Help/> -->
            <!-- <Footer /> -->
           
            <!-- FIN FOOTER -->
          </div>
        </main>
        
      </div>
      <Login v-else />
      <!-- NOTIFICACIONES-->
      <notifications group="global" position="bottom center" width="40%" style="z-index: 9999;">
        >
        <template slot="body" slot-scope="props">
          <div
            :class="'alert alert-dark alert-dismissible fade show text-white'"
          >
            <span class="alert-icon"><i class="ni ni-like-2"></i></span> &nbsp;&nbsp;
            <span class="alert-text" v-html="props.item.text"></span>
            &nbsp;&nbsp;
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </template>
      </notifications>
    </template>
    <div v-else class="text-center" style="margin-top:300px; font-size:25px;">
      <p>Estamos cargando...</p>
    </div>
  </div>
</template>

<script>
import Header from "@/shared/Header.vue";
import Inicio from "@/shared/Inicio.vue";
//import Footer from "@/shared/Footer.vue";
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
    //Footer,
   // Help,
    AppMovile : () => import( /* webpackChunkName: "AppMovile" */ '../src/shared/AppMovile.vue')
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
  @import './assets/styles/mainstyles.css';
</style>
