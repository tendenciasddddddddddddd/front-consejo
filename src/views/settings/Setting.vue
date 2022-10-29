<template>
  <div>
    <section class="BJZ27Q mb-3" v-if="!$store.state.isAppMobile">
      <div class="uGmi4w" style="box-shadow: rgb(57 76 96 / 15%) 0px 2px 4px -1px !important;">
      
      <div class="zCtFuA  s-text-versel2 " :class="{ 'canvaActive': tabs == 0 }" @click="vueInit(0)">
       Reportes
        <section v-if="tabs == 0" class="FOQEMQ mt-2">
          <div class="hPlFoQ"></div>
        </section>
      </div>
      <span class="WuKWng"></span>
      <div class="zCtFuA s-text-versel2 " :class="{ 'canvaActive': tabs == 1 }" @click="vueInit(1)">
        Inicio
        <section v-if="tabs == 1" class="FOQEMQ mt-2">
          <div class="hPlFoQ"></div>
        </section>
      </div>
      <span class="WuKWng"></span>
      <div class="zCtFuA s-text-versel2 " :class="{ 'canvaActive': tabs == 2 }" @click="vueInit(2)">
        Eventos
        <section v-if="tabs == 2" class="FOQEMQ mt-2">
          <div class="hPlFoQ"></div>
        </section>
      </div>
      <span class="WuKWng"></span>
      <div class="zCtFuA s-text-versel2 " :class="{ 'canvaActive': tabs == 3 }" @click="vueInit(3)">
        Galeria
        <section v-if="tabs == 3" class="FOQEMQ mt-2">
          <div class="hPlFoQ"></div>
        </section>
      </div>
      <span class="WuKWng"></span>
      <div class="zCtFuA s-text-versel2 " :class="{ 'canvaActive': tabs == 4 }" @click="vueInit(4)">
        Nosotros
        <section v-if="tabs == 4" class="FOQEMQ mt-2">
          <div class="hPlFoQ"></div>
        </section>
      </div>
      <span class="WuKWng"></span>
      <!-- <div class="zCtFuA s-text-versel2 " :class="{ 'canvaActive': tabs == 5 }" @click="vueInit(5)">
        Asistencia
        <section v-if="tabs == 5" class="FOQEMQ mt-2">
          <div class="hPlFoQ"></div>
        </section>
      </div> -->
      </div>
    </section>
    <vue-progress-bar style="margin-top:-23px"></vue-progress-bar>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row">
      <div class="col-9">
        <section v-if="tabs == 0">
         <Configure/>
        </section>
        <section v-if="tabs == 1">
          Inicio
        </section>
        <section v-if="tabs == 2">
         Eventos
        </section>

        <section v-if="tabs == 4">
          <Galeria/>
        </section>
        <section v-if="tabs == 5">
          Nosotros
        </section>
      </div>
      <div class="col-3">
            <img src="../../assets/img/clonar.webp" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../shared/ProgressBar";
import Configure from "./pages/Configure.vue"
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar,Configure,
    Galeria: () => import( /* webpackChunkName: "Galeria" */ './pages/Galeria.vue'),
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      tabs: 0,
      isData: false,
    }
  },
  methods: {
    vueInit(num) {
      this.tabs = num;
      let text_1 = 'Settings'
      let text_2 = ''
      switch (num) {
        case 0:
          text_2 = 'Plataforma';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 1:
          text_2 = 'Inicio';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 2:
          text_2 = 'Eventos';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 4:
          text_2 = 'Galeria';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 5:
          text_2 = 'Nosotros';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        default:
          break;
      }
    },
     toast(message) {
        this.$toasted.info(message, {
          duration: 2300,
          position : 'bottom-center',
          icon: "check-circle",
          theme: "toasted-primary",
          action : {
            text : 'CERRAR',
            onClick : (e, toastObject) => {
                toastObject.goAway(0);
            }
          }
        });
      },
      verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
  },
  created() {
   this.vueInit(0);
   this.verificarUsuario()
  },

}
</script>
