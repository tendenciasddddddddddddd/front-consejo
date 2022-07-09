import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../../../shared/ProgressBar";
import ListComp from "../../../../components/componentClassroom/grupAlumn/ListComp.vue";
export default {
  name: 'ModuleAulas',
  components: {
    ProgressBar,ListComp,
    ListUser: () => import( /* webpackChunkName: "ListUser" */ '../../../../components/componentClassroom/grupAlumn/ListUser'),
    ListExamen: () => import( /* webpackChunkName: "ListExamen" */ '../../../../components/componentClassroom/quizzComponent/ListExamen'),
  },
  data(){
    return {
      roles: this.$store.state.user.roles,
      usuario: this.$store.state.user.id,
      tabs:'tarea',
      isData: false,
      collectionTasks: [],
      fullTask: [],
      collectionUser: [],
      collectionQuizz: [],
    }
  },
  methods: {
    getData() {
        this.isData = true;
        if (this.$route.params.id) {
          this.$proxies._aulaProxi
            .get(this.$route.params.id)
            .then((x) => {
              this.info = x.data;
              console.log(this.info)
              this.fullTask = this.info.task.reverse();
              this.collectionUser = this.info.estudiantes;
              this.collectionQuizz = this.info.examen.reverse();
              this.isData = false;
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
            });
        }
      },

    verificarUsuario() {
      let text_1 = 'Aulas Virtales'
      let text_2 = 'Materia'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.estudiante(this.roles)) this.$router.push("/");
      this.getData();
    },
  },
  created() {
    this.verificarUsuario();

  }
}