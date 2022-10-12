<template>
    <div >
        <div class="text-start">
         <p class="parrafo ms-3">
           (Cómo entender el servicio de matricula)
            <a
              type="button"
              class="fuente tamanio ms-2"
              v-tooltip.bottom="'Mirar la demostración de el proceso de matriculas y generar los paralelos'">
              <i class="fa fa-eye" aria-hidden="true"></i>
              <b class="links ms-1 me-2">Ver demostración</b>
            </a>
          </p>
      </div>
         <section class="intro_cards ">
          <div class="intro_cards_container">
            <div  v-for="(item, i) in arrays_of_options" :key="item.id" class="intro_card_container"  >
              <CardsOptions :index="i"  :img="item.img" :nombre="item.nombre" :description="item.description" @optionsFuntions="optionsView"></CardsOptions>
            </div>
          </div>
        </section>
         <div v-if="ifCreateUpdate">
          <CreateMatricula1 :modalidad="mod" @myEventClosedModalMatricula="closedChildMatricula"/>
        </div>
        <div v-if="ifRemoveMatricula">
          <ListRemoveMatricula1 :modalidad="mod" @myEventClosedModalRemove="closedChildRemoveMa1"/>
        </div>
        <div v-if="ifParalelo1">
          <ParaleloMatricula1 @myEventClosedModalParalelo1="closedChildParalelo1"/>
        </div>
        <div v-if="ifMigracion">
          <MigracionMatricula @myEventClosedModalMigracion1="closedChildMigracion" :idGet="mod"/>
        </div>
          <div v-if="ifMigracion2">
          <MigrationnList @myEventClosedModalMigracion2="closedChildMigracionList"/>
        </div>
        <div v-if="ifclon">
          <Clon @myEventClosedModalclon="closedChildclon"/>
        </div>
    </div>
</template>
<script>
import RestResource from "../../service/isAdmin";
import fotos from '../../service/UploadsServices';
const restResourceService = new RestResource();
const restFotosService = new fotos();
const images = restFotosService.arrays_of_avatar();
import CardsOptions from "../../shared/CardsClick.vue"
export default {
  name: "Matriculas1",
  components: {
    CreateMatricula1: () =>
      import(
        /* webpackChunkName: "CreateMatricula1" */ "./pages/add/Add.vue"
      ),
    ListRemoveMatricula1: () =>
      import(
        /* webpackChunkName: "ListRemoveMatricula1" */ "./pages/list/List.vue"
      ),
      ParaleloMatricula1: () =>
      import(
        /* webpackChunkName: "EnlistarParalelo" */ "./pages/paralelo1/Paralelo.vue"
      ),
      MigracionMatricula: () =>
      import(
        /* webpackChunkName: "MigracionMatricula" */ "./pages/migracion/Migracion.vue"
      ),
      MigrationnList: () =>
      import(
        /* webpackChunkName: "MigrationnList" */ "./pages/history/History.vue"
      ),
      Clon: () =>
      import(
        /* webpackChunkName: "Clon" */ "./pages/clon/Clon.vue"
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
      ifMigracion2: false,
      ifclon : false,
      mod : 'm1',
      arrays_of_options: [
        {
          id: "0",
          nombre: "Matricular",
          img: images[0],
          description: "Puedes crear nueva matricula, la matricula es unica por cada estudiante",
        },
        {
          id: "2",
          nombre: "Paralelos",
          img: images[2],
          description: " Puede asignar, listar y remover paralelos en cada uno de los cursos",
        },
        {
          id: "1",
          nombre: "Lista Matricula",
          img: images[1],
          description: "Puede ver o eliminar la lista de los matriculados en el periodo",
        },
        
         {
          id: "3",
          nombre: "Respaldo",
          img: images[3],
          description: "Le permite generar copias de las matriculas y tambien limpiar la data",
        },
        {
          id: "4",
          nombre: "Migraciones",
          img: images[5],
          description: "Le permite migrar las matriculas de un periodo a otro periodo",
        },
        {
          id: "5",
          nombre: "Historial Matriculas",
          img: images[4],
          description: "Le permite generar copias de las matriculas y tambien limpiar la data",
        },
      ]
    };
  },
  methods: {
    verificarUsuario() {
        let text_1 = 'Matriculas'
      let text_2 = 'Lista de opciones'
      this.$store.commit('updateHeader',{text_1, text_2})
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
        this.ifParalelo1 = true;
          break;
        case 2:
        this.ifRemoveMatricula = true;
          break;
        case 3:
          this.ifMigracion = true;
          break;
        case 4:
          this.ifclon = true;
          break;
        case 5:
          this.ifMigracion2 = true;
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
    closedChildMigracionList: function() {
      this.ifMigracion2 = false;
    },
    closedChildclon: function() {
      this.ifclon = false;
    },
  },
  mounted() {
    this.verificarUsuario();
  },
  
};

</script>
