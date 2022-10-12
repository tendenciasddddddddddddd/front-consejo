<template>
  <div>
    <vue-progress-bar style="margin-top:-23px"></vue-progress-bar>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row">
      <div class="col-lg-2">
        <div class=" position-sticky top-1">
          <ul class="nav flex-column bg-white border-radius-lg p-1">
            <li class="nav-item">
              <a class="nav-link " :class="{ 's-active': tabs == 0 }" data-scroll="" href="javascript:;"
                @click="vueInit(0)">
                <span :class="{ 's-active2': tabs == 0 }" class="text-sm s-text-versel2">Plataforma</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 1 }" data-scroll="" href="javascript:;"
                @click="vueInit(1)">
                <span :class="{ 's-active2': tabs == 1 }" class="text-sm s-text-versel2">Inicio</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 2 }" data-scroll="" href="javascript:;"
                @click="vueInit(2)">
                <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2">Eventos</span>
              </a>
            </li>

            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 4 }" data-scroll="" href="javascript:;"
                @click="vueInit(4)">
                <span :class="{ 's-active2': tabs == 4 }" class="text-sm s-text-versel2">Galeria</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 5 }" data-scroll="" href="javascript:;"
                @click="vueInit(5)">
                <span :class="{ 's-active2': tabs == 5 }" class="text-sm s-text-versel2">Nosotros</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-10 ">
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
    </div>
  </div>
</template>

<script>
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
  },
  created() {
   this.vueInit(0);
  },

}
</script>
<style >
.s-active2 {
  font-weight: 700;
  color: #000 !important;
}

.s-text-versel2 {
  color: #444;
}

</style>