import RestResource from '../../../service/isAdmin'
import fotos from '../../../service/UploadsServices';
const restResourceService = new RestResource();
const restFotosService = new fotos();
const images = restFotosService.arrays_of_avatar();
import CardsOptions from "../../../shared/CardsClick.vue"
export default {
  name: "Matriculas2",
  components: {
    CreateMatricula2: () =>
    import(
      /* webpackChunkName: "CreateMatricula1" */ "../../../components/componentMatricula/matricula1/CreateMatricula1.vue"
    ),
    ListRemoveMatricula2: () =>
      import(
        /* webpackChunkName: "ListRemoveMatricula2" */ "../../../components/componentMatricula/matricula1/ListRemoveMatricula1.vue"
      ),
      ParaleloMatricula2: () =>
      import(
        /* webpackChunkName: "EnlistarParalelom2" */ "../../../components/componentMatricula/paralelo/paralelov2/EnlistarParalelom2.vue"
      ),
      MigracionMatricula: () =>
      import(
        /* webpackChunkName: "MigracionMatricula" */ "../../../components/componentMatricula/migracionMatricula/MigracionMatricula.vue"
      ),
      CardsOptions
},
  data() {
    return {
      roles: this.$store.state.user.roles,
       //CHILD COMPONENT
      ifCreateUpdate: false,
      ifRemoveMatricula: false,
      ifParalelo2: false,
      ifMigracion: false,
      mod : 'm2',
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
    verificarUsuario(){
      if(!restResourceService.admin(this.roles)){
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
          this.ifParalelo2 = true;
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
    closedChildRemoveMa2: function() {
      this.ifRemoveMatricula = false;
    },
    closedChildParalelo2: function() {
      this.ifParalelo2 = false;
    },
    closedChildMigracion: function() {
      this.ifMigracion = false;
    },
  },
  created() {
    this.verificarUsuario();
  },

};
