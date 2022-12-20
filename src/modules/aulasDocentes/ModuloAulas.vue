<template>
    <div>
      <ScrimModal @close="$router.go(-1)"> 
        <template v-slot:header>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" >
            <a class="nav-link " style="cursor:pointer" aria-current="page" @click="tabs=0"  :class="{ 'active': tabs == 0 }" >
              Tareas</a>
          </li>
          <li class="nav-item" >
            <a class="nav-link " style="cursor:pointer" :class="{ 'active': tabs == 1 }" aria-current="page" @click="tabs=1" >Evaluaciones</a>
          </li>
          <li class="nav-item" >
            <a class="nav-link " style="cursor:pointer" :class="{ 'active': tabs == 2 }" aria-current="page" @click="tabs=2" >Foros</a>
          </li>
          <li class="nav-item"  >
            <a @click="tabs=3" style="cursor:pointer" :class="{ 'active': tabs == 3 }" class="nav-link" >Estudiantes</a>
          </li>
          <li class="nav-item"  >
            <a @click="tabs=4" style="cursor:pointer" :class="{ 'active': tabs == 4 }" class="nav-link" >Configuración</a>
          </li>
          <li class="nav-item d-none d-lg-block"  >
            <span class="nav-link text-white ms-5"> <b>{{collection.materia}}</b> </span>
          </li>
         
        </ul>
        </template>
        <template v-slot:body>
        <ProgressBar v-if="isData"></ProgressBar>
      <div v-else >
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
            const est = this.collection.estudiantes;
            this.collectionUser = est.sort(function (a, b) {
              var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
              if (nameA < nameB) //sort string ascending
                return -1;
              if (nameA > nameB)
                return 1;
              return 0; //default return value (no sorting)
            });
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
  