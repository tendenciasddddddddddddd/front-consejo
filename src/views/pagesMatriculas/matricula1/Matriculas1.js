import RestResource from "../../../service/isAdmin";
import fotos from '../../../service/UploadsServices';
const restResourceService = new RestResource();
const restFotosService = new fotos();
const images = restFotosService.arrays_of_avatar();
import CardsOptions from "../../../shared/CardsClick.vue"
export default {
  name: "Matriculas1",
  components: {
    CreateMatricula1: () =>
      import(
        /* webpackChunkName: "CreateMatricula1" */ "../../../components/componentMatricula/matricula1/CreateMatricula1.vue"
      ),
    ListRemoveMatricula1: () =>
      import(
        /* webpackChunkName: "ListRemoveMatricula1" */ "../../../components/componentMatricula/matricula1/ListRemoveMatricula1.vue"
      ),
      ParaleloMatricula1: () =>
      import(
        /* webpackChunkName: "EnlistarParalelo" */ "../../../components/componentMatricula/paralelo/paralelov1/EnlistarParalelo.vue"
      ),
      MigracionMatricula: () =>
      import(
        /* webpackChunkName: "MigracionMatricula" */ "../../../components/componentMatricula/migracionMatricula/MigracionMatricula.vue"
      ),
      CardsOptions
  },
  data() {
    return {
      tab: "init",
      roles: this.$store.state.user.roles,
      //CHILD COMPONENT
      ifCreateUpdate: false,
      ifRemoveMatricula: false,
      ifParalelo1: false,
      ifMigracion: false,
      mod : 'm1',
      arrays_of_options: [
        {
          id: "0",
          nombre: "Matricular",
          img: images[0],
          description: "Puedes crear nueva matricula cuando actives un nuevo, periodo la matricula es unica por cada estudiante",
        },
        {
          id: "1",
          nombre: "Lista Matricula",
          img: images[1],
          description: "Puede ver o eliminar la lista de los matriculados en el periodo",
        },
        {
          id: "2",
          nombre: "Paralelos",
          img: images[2],
          description: " Puede asignar, listar y remover paralelos en cada uno de los cursos",
        },
         {
          id: "3",
          nombre: "Respaldo",
          img: images[3],
          description: "Le permite generar copias de las matriculas y tambien limpiar la data",
        },
       
      ]
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    optionsView: function(num){
      switch (num) {
        case 0:
          this.ifCreateUpdate = true;
          break;
        case 1:
          this.ifRemoveMatricula = true;
          break;
        case 2:
          this.ifParalelo1 = true;
          break;
        case 3:
          this.ifMigracion = true;
          break;
        default:
          console.log("I don't own a pet");
          break;
      }
    },
    closedChildMatricula: function() {
      this.ifCreateUpdate = false;
    },
    closedChildRemoveMa1: function() {
      this.ifRemoveMatricula = false;
    },
    closedChildParalelo1: function() {
      this.ifParalelo1 = false;
    },
    closedChildMigracion: function() {
      this.ifMigracion = false;
    },
  },
  mounted() {
    this.verificarUsuario();
  },
  
};
