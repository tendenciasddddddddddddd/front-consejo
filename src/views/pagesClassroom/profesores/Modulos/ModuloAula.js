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
  },
  data(){
    return {
      roles: this.$store.state.user.roles,
      tabs:'tarea',
      isData: false,
      collection: {},
      idCourse: '',
      CourseClave: '',
      collectionTasks: [],
      collectionUser: [],
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
            console.log(this.collectionTasks);
            console.log(this.collection);
            console.log(this.collectionUser);
            this.isData = false;
            this.$Progress.finish();
          })
          .catch(() => {
            console.log("En esta ruta no hay nada que mostrar");
            this.isData = false;
          });
      }
    },
    verificarUsuario() {
      let text_1 = 'Aulas Virtales'
      let text_2 = 'Aulas Virtales'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.docente(this.roles)) this.$router.push("/");
      this.getData();
    },
  },
  created() {
    this.verificarUsuario();

  }
}