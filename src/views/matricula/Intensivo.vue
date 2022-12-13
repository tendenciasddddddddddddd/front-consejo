<template>
    <div >
        
         <section class="intro_cards mt-4">
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
          <Periodos @myEventClosedModalMigracion1="closedChildMigracion" :idGet="mod"/>
        </div>
          <div v-if="ifMigracion2">
          <ReporteNotas @myEventClosedModalMigracion2="closedChildMigracionList"/>
        </div>
        <div v-if="ifclon">
          <Clon @myEventClosedModalclon="closedChildclon"/>
        </div>
        <div v-if="ifyoutuve">
          <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'sFC9qGRA_KM'"/>
        </div>
        <div class="fixed-plugin">
    <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff;
    border-radius: 20px 20px 2px 20px;
    box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
      Ver video explicativo
    </a>
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
      Periodos: () =>
      import(
        /* webpackChunkName: "Periodos" */ "./pages/periodos/Periodos.vue"
      ),
      ReporteNotas: () =>
      import(
        /* webpackChunkName: "ReporteNotas" */ "./pages/notas/AllNotas.vue"
      ),
      Clon: () =>
      import(
        /* webpackChunkName: "Clon" */ "./pages/clon/Clon.vue"
      ),
      VueYoutuve: () =>import( /* webpackChunkName: "VueYoutuve" */ "../../shared/VueYoutuve.vue"),
      CardsOptions
  },
  data() {
    return {
      tab: "init",
      roles: this.$store.state.user.roles,
      //CHILD COMPONEN
      ifCreateUpdate: false,
      ifRemoveMatricula: false,
      ifParalelo1: false,
      ifMigracion: false,
      ifMigracion2: false,
      ifyoutuve : false,
      ifclon : false,
      mod : 'm1',
      arrays_of_options: [
      {
          id: "3",
          nombre: "Periodos",
          img: images[0],
          description: "Le permite generar copias de las matriculas y tambien limpiar la base de datos",
        },
        {
          id: "0",
          nombre: "Matricular",
          img: images[3],
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
          id: "5",
          nombre: "Registro notas",
          img: images[4],
          description: "Le permite mirar y editar notas de todos los cursos sin excepciones",
        },
        {
          id: "4",
          nombre: "Automatización",
          img: images[5],
          description: "Le permite automatizar las matriculas con tal solo 2 pasos",
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
          this.ifMigracion = true; // this.ifCreateUpdate = true;
          break;
        case 1:
        this.ifCreateUpdate = true;  // this.ifParalelo1 = true;
          break;
        case 2:
        this.ifParalelo1 = true; //  this.ifRemoveMatricula = true;
          break;
        case 3:
          this.ifRemoveMatricula = true;
          break;
        case 4:
          this.ifMigracion2 = true;
          break;
        case 5:
          this.ifclon = true; //this.ifclon = true;
          break;
        default:
          console.log("I don't own a pet");
          break;
      }
    },
    ClosedYoutuve: function(){
      this.ifyoutuve = false;
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
