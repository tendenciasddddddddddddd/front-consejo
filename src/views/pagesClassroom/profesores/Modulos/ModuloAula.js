import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../../../shared/ProgressBar";
import ListTask from "../../../../components/componentClassroom/grupDocente/ListTask";
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar,ListTask,
    RemoveCourse: () => import( /* webpackChunkName: "RemoveCourse" */ '../../../../components/componentClassroom/grupDocente/RemoveCourse'),
    ListUsers: () => import( /* webpackChunkName: "ListUsers" */ '../../../../components/componentClassroom/grupDocente/ListUsers'),
    ListQuizz: () => import( /* webpackChunkName: "ListQuizz" */ '../../../../components/componentClassroom/quizzComponent/ListQuizz'),
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
            console.log("En esta ruta no hay nada que mostrar");
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