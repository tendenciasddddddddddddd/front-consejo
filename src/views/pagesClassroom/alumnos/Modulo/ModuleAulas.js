import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../../../shared/ProgressBar";
import ScrimModal from "../../../../shared/ScrimModal2"
import ListComp from "../../../../components/componentClassroom/grupAlumn/ListComp.vue";
export default {
  name: 'ModuleAulas',
  components: {
    ProgressBar,ListComp,ScrimModal,
    ListUser: () => import( /* webpackChunkName: "ListUser" */ '../../../../components/componentClassroom/grupAlumn/ListUser'),
    ListExamen: () => import( /* webpackChunkName: "ListExamen" */ '../../../../components/componentClassroom/quizzComponent/ListExamen'),
  },
  data(){
    return {
      roles: this.$store.state.user.roles,
      usuario: this.$store.state.user.id,
      tabs:0,
      isData: false,
      collectionTasks: [],
      fullTask: [],
      collectionUser: [],
      collectionQuizz: [],
    }
  },
  methods: {
    getData() {
      this.$Progress.start();
        this.isData = true;
        if (this.$route.params.id) {
          this.$proxies._aulaProxi
            .get(this.$route.params.id)
            .then((x) => {
              this.info = x.data;
              this.fullTask = this.info.task.reverse();
              this.collectionUser = this.info.estudiantes;
              this.collectionQuizz = this.info.examen.reverse();
              this.isData = false;
              this.$Progress.finish();
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
              this.$Progress.fail();
            });
        }
      },
      vueInit(num){
        this.tabs = num;
        let text_1 = this.info.materia;
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
            text_2= 'Participantes';
            this.$store.commit('updateHeader',{text_1, text_2})
            break;
         
          default:
            break;
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