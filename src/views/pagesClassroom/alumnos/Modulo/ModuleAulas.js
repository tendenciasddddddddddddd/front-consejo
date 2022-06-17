import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../../../shared/ProgressBar";
import ListComp from "../../../../components/componentClassroom/grupAlumn/ListComp.vue";
export default {
  name: 'ModuleAulas',
  components: {
    ProgressBar,ListComp,
    ListUser: () => import( /* webpackChunkName: "ListUser" */ '../../../../components/componentClassroom/grupAlumn/ListUser'),
  },
  data(){
    return {
      roles: this.$store.state.user.roles,
      usuario: this.$store.state.user.id,
      tabs:'tarea',
      isData: false,
      collection: {},
      idCourse: '',
      CourseClave: '',
      collectionTasks: [],
      fullTask: [],
      collectionUser: [],
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
              this.runTask();
              this.collectionUser = this.info.estudiantes;
              this.isData = false;
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
            });
        }
      },
  
      runTask(){
          this.fullTask= [];
          let tareas = this.info.task
          for (let i = 0; i < tareas.length; i++){
             let  idA = tareas[i]._id;
             let nameTask = tareas[i].nombre;
             let fechalim = tareas[i].finicio;
             let descrition = tareas[i].descripcion;
             let arci = tareas[i].archivo;
             let tiempoTranscurrido = tareas[i].fechad;
             let idB = 0;
             let isSend = false;
             let nota = '';
             let link = '';
             let entregas = tareas[i].entrega;
             for (let j = 0; j < entregas.length; j++) {
                 idB = entregas[j]._id;
                 if (entregas[j].idUser == this.usuario) {
                     isSend = true;
                     nota = entregas[j].nota;
                     link = entregas[j].link;
                     break;
                 }
             }
             this.fullTask.push({_id: idA, id2: idB, nombre : nameTask,finicio: fechalim, estado : isSend, fechad: tiempoTranscurrido, descripcion : descrition, archivo: arci,nota: nota, link: link});
          }
          this.fullTask.reverse();
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