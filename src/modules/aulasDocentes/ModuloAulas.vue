<template>
    <div>
      <ScrimModal @close="$router.go(-1)"> 
        <template v-slot:header>
          <div v-if="!$store.state.isAppMobile" class="fjrDCGRR_tab">
                   <div @click="tabs=0" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 0 }">
                    <span style="color:#fff">  Tareas</span>
                   </div>
                   <div @click="tabs=1" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 1 }"><span style="color:#fff">Evaluaciones</span>
                     </div>
                     <div @click="tabs=2" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 2 }"><span style="color:#fff"> Foros</span>
                     </div>
                     <div @click="tabs=3" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 3 }"><span style="color:#fff">Estudiantes</span>
                     </div>
                     <div @click="tabs=4" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 4 }"><span style="color:#fff"> Configuración</span>
                     </div>
                </div>
        </template>
        <template v-slot:body>
        <ProgressBar v-if="isData"></ProgressBar>
      <div v-else class="row ">
        <div class="col-lg-2" v-if="$store.state.isAppMobile">
          <div class=" position-sticky top-1">
            <ul class="nav flex-column bg-white border-radius-lg p-1">
              <a href="javascript:;" @click="$router.go(-1)" class="s-regresar me-2 ms-2 mb-3">
               <svg class="me-2" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000;"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
              Atrás</a>
              <li class="nav-item">
                <a class="nav-link " :class="{ 's-active': tabs == 0 }" href="javascript:;" @click="vueInit(0)">
                  <span  :class="{ 's-active2': tabs == 0 }" class="text-sm s-text-versel2">Tareas</span>
                </a>
              </li>
              <li class="nav-item pt-1">
                <a class="nav-link " :class="{ 's-active': tabs == 1 }" href="javascript:;" @click="vueInit(1)" >
                  <span :class="{ 's-active2': tabs == 1 }" class="text-sm s-text-versel2">Evaluaciones</span>
                </a>
              </li>
              <li class="nav-item pt-1">
                <a class="nav-link " :class="{ 's-active': tabs == 2 }" href="javascript:;" @click="vueInit(2)" >
                  <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2">Foros</span>
                </a>
              </li>
              <li class="nav-item pt-1">
                <a class="nav-link " :class="{ 's-active': tabs == 3 }" href="javascript:;" @click="vueInit(3)" >
                  <span :class="{ 's-active2': tabs == 3 }" class="text-sm s-text-versel2">Alumnos</span>
                </a>
              </li>
              <li class="nav-item pt-1">
                <a class="nav-link  " :class="{ 's-active': tabs == 4 }" href="javascript:;" @click="vueInit(4)">
                  <span :class="{ 's-active2': tabs == 4 }" class="text-sm s-text-versel2">Configuración</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class=" " :class="[$store.state.isAppMobile ? 'col-lg-10': 'col-lg-12']">
          <section v-if="tabs == 0">
            <ListTask :object="collectionTasks" :objectUser="collectionUser" @getDataTask="getData"/>
          </section>
          <section v-if="tabs == 1">
            <ListQuizz :object="collectionQuizz" :objectUser="collectionUser" @getDataTask="getData"/>
          </section>
          <section v-if="tabs == 2">
            <h4 class="negros">En desarrollo</h4>
          </section>
          <section v-if="tabs == 3">
            <ListaEstudiantes :objectUser="collectionUser" @getDataTask="getData"/>
          </section>
          <section v-if="tabs == 4">
            <EliminarCurso :idCourse="idCourse" :code="CourseClave"/>
          </section>
        </div>
      </div>
        </template>
       </ScrimModal>
    </div>
  </template>
  
<script >
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../shared/ProgressBar";
import ScrimModal from "../../shared/ScrimModal2"
import ListTask from "./pages/ListaTareas.vue";
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar,ListTask,ScrimModal,
    EliminarCurso: () => import( /* webpackChunkName: "EliminarCurso" */ './pages/EliminarCurso.vue'),
    ListaEstudiantes: () => import( /* webpackChunkName: "ListaEstudiantes" */ './pages/ListaEstudiantes.vue'),
    ListQuizz: () => import( /* webpackChunkName: "ListQuizz" */ '../../components/componentClassroom/quizzComponent/ListQuizz'),
  },
  data(){
    return {
      roles: this.$store.state.user.roles,
      tabs:0,
      isData: false,
      collection: {},
      idCourse: '',
      CourseClave: '',
      collectionTasks: [],
      collectionUser: [],
      collectionQuizz: [],
    }
  },
  methods: {
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.$route.params.id) {
        this.$proxies._aulaProxi
          .get(this.$route.params.id)
          .then((x) => {
            this.collection = x.data;
            this.idCourse = this.collection._id;
            this.CourseClave = this.collection.codigo;
            this.collectionTasks = this.collection.task.reverse();
            this.collectionUser = this.collection.estudiantes;
            this.collectionQuizz = this.collection.examen.reverse();
            let text_1 = this.collection.materia;
            let text_2 = 'Tareas'
            this.$store.commit('updateHeader',{text_1, text_2})
           // console.log(this.collectionTasks);
           // console.log(this.collection);
           // console.log(this.collectionUser);
           // console.log(this.collectionQuizz);
            this.isData = false;
            this.$Progress.finish();
          })
          .catch(() => {
            this.isData = false;
          });
      }
    },
    vueInit(num){
      this.tabs = num;
      let text_1 = this.collection.materia;
      let text_2 = ''
      switch (num) {
        case 0:
          text_2= 'Tareas';
          this.$store.commit('updateHeader',{text_1, text_2})
          break;
        case 1:
          text_2= 'Evaluaciones';
          this.$store.commit('updateHeader',{text_1, text_2})
          break;
        case 2:
          text_2= 'Foros';
          this.$store.commit('updateHeader',{text_1, text_2})
          break;
        case 3:
          text_2= 'Alumnos';
          this.$store.commit('updateHeader',{text_1, text_2})
          break;
        case 4:
          text_2= 'Configuración';
          this.$store.commit('updateHeader',{text_1, text_2})
          break;
        default:
          break;
      }
    },
    verificarUsuario() {
      if (!restResourceService.docente(this.roles)) this.$router.push("/");
      this.getData();
    },
  },
  created() {
    this.verificarUsuario();

  },
  
}
</script>
  