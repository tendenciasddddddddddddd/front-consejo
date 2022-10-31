<template>
    <ScrimModal @close="$router.go(-1)">
      <template v-slot:header>
    <div class="fjrDCGRR_tab">
                  <img class="mt-1" width="45" height="45" src="https://static.canva.com/web/images/a360aa861ca5d2ba3d1213b62d63cc21.png" alt="">
                 <div @click="tabs=0" class=" inn_tab s-text-versel2" :class="{ 'canvaActive': tabs == 0 }">
                  Notas
                   <span   :class="{ 'eeEHPkk': tabs == 0 }"></span>
                 </div>
                 <div @click="tabs=3" class=" inn_tab s-text-versel2" :class="{ 'canvaActive': tabs == 3 }">Conducta
                     <span   :class="{ 'eeEHPkk': tabs == 3 }"></span>
                   </div>
                   <div @click="tabs=2" class=" inn_tab s-text-versel2" :class="{ 'canvaActive': tabs == 2 }">Proyectos
                     <span   :class="{ 'eeEHPkk': tabs == 2 }"></span>
                   </div>
                   <div @click="tabs=1" class=" inn_tab s-text-versel2" :class="{ 'canvaActive': tabs == 1 }">Supletorios
                     <span   :class="{ 'eeEHPkk': tabs == 1 }"></span>
                   </div>
                   <div @click="tabs=4" class=" inn_tab s-text-versel2" :class="{ 'canvaActive': tabs == 4 }">Planificación
                     <span   :class="{ 'eeEHPkk': tabs == 4 }"></span>
                   </div>
              </div>
       </template>
      <template v-slot:body>
   
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row" >
      <div class="col-lg-2" v-if="$store.state.isAppMobile">
        <div class=" position-sticky top-1">
          <ul class="nav flex-column bg-white border-radius-lg p-1">
            <a href="javascript:;" @click="$router.go(-1)" class="s-regresar me-2 ms-2 mb-3">
              <svg class="me-2" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="22" style="color: #000;">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Atrás</a>
            <li class="nav-item">
              <a class="nav-link " :class="{ 's-active': tabs == 0 }" data-scroll="" href="javascript:;"
                @click="vueInit(0)">
                
                <span :class="{ 's-active2': tabs == 0 }" class="text-sm s-text-versel2 ms-2">Notas</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 1 }" data-scroll="" href="javascript:;"
                @click="vueInit(1)">
                
                <span :class="{ 's-active2': tabs == 1 }" class="text-sm s-text-versel2 ms-2">Supletorios</span>
              </a>
            </li>
           
            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 3 }" data-scroll="" href="javascript:;"
                @click="vueInit(3)">
                
                <span :class="{ 's-active2': tabs == 3 }" class="text-sm s-text-versel2 ms-2">Conducta</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 2 }" data-scroll="" href="javascript:;"
                @click="vueInit(2)">
                
                <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2 ms-2">Proyectos</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 4 }" data-scroll="" href="javascript:;"
                @click="vueInit(4)">
                
                <span :class="{ 's-active2': tabs == 4 }" class="text-sm s-text-versel2 ms-2">Planificación</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class=" " :class="[$store.state.isAppMobile ? 'col-lg-10': 'col-lg-12']">
        <section v-if="tabs == 0" >
          <Calificaciones :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 1">
          <Supletorios :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 2">
          <Proyectos :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 3">
          <Comportamiento :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 4">
          <Planificacion :id="idDistributivo" :planificacion="planificacion" />
        </section>
        <section v-if="tabs == 5">
          En desarrollo
        </section>
      </div>
    </div>
      </template>
      <template v-slot:footer>
        <button @click="$router.go(-1)"  class="btn btnNaranja2 me-3">
          Salir de aqui
        </button>
      </template>
    </ScrimModal>
</template>

<script>
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import quialifyservice from "./pages/services";
const ResultServiceNota = new quialifyservice();
import ProgressBar from "../../shared/ProgressBar";
import Calificaciones from "./pages/Calificaciones.vue";
import ScrimModal from "../../shared/ScrimModal2"
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar, Calificaciones, ScrimModal,
    Planificacion: () => import( /* webpackChunkName: "Planificacions" */ './pages/Planificacion.vue'),
    Supletorios: () => import( /* webpackChunkName: "Supletorios" */ './pages/Supletorios.vue'),
    Comportamiento: () => import( /* webpackChunkName: "Comportamiento" */ './pages/Comportamiento.vue'),
    Proyectos: () => import( /* webpackChunkName: "Proyectos" */ './pages/Proyectos.vue'),
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      tabs: 0,
      isData: false,
      para: "",
      name: "",
      mate: "",
      area : "",
      isVerific: {},
      inAlumnos: [],
      model2: {
        _id: null,
        calificaciones: {
          docente: "",
          materia: "",
          area: "",
          promediof: '0',
          suple: '0',
          reme: '0',
          gracia: '0',
          pfinal: '0',
          notas: [{ }],
          comportamiento : [{}],
          proyectos : [{}],
        },
      },
      collectionTasks: [],
      idDistributivo: '',
      planificacion: '',
      
    }
  },
  methods: {
    LoadCourse: function () {
      const seccio = JSON.parse(localStorage.getItem("myCourse")); //quimestre
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.para = seccio.paralelo;
      this.name = seccio.nombre;
      this.mate = seccio.materia;
      this.area = seccio.area;
      this.idDistributivo = seccio.idDistributivo;
      this.planificacion = seccio.planificacion;
      this.docentes = info.nombre;
      this.getData();
    },
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.$route.params.id) {
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            const isExiste = []
            this.isVerific = x.data.filter((x) => x.curso == this.para);
            for (let i = 0; i < this.isVerific.length; i++) {
              const element = this.isVerific[i];
              const aux = element.calificaciones.filter((x) => x.materia == this.mate);
              if (aux.length ==0) {
                isExiste.push(element._id)
              }
            }
            if (isExiste.length > 0) {
              this.configDocenteMateria(isExiste);
            } else {
              const arrays = ResultServiceNota.llenar_tabla_notas(
                this.isVerific,
                this.mate
              );
              this.inAlumnos = arrays.sort(function (a, b) {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) 
                  return -1;
                if (nameA > nameB)
                  return 1;
                return 0; 
              });
              this.isData = false;
              this.$Progress.finish();
            }
            const text_1 = this.mate + ' - ' + this.para
            const text_2 = 'Notas'
            this.$store.commit('updateHeader', { text_1, text_2 })
          })
          .catch((x) => {
            console.log(x);
            this.isData = false;
            this.$Progress.fail();
          });
      }
    },

    configDocenteMateria(array) {
      let contador = this.isVerific.length;
      if (contador > 0) {
        const notass = [
          {  quimestre: 'p1', promedio: '', examen: '1', a1: '1', a2: '', a3: '', a4: '', a5: '', b1: '1', b2: '', b3: '', b4: '', b5: '',},
          { quimestre: 'p2', promedio: '', examen: '1', a1: '1', a2: '', a3: '', a4: '', a5: '', b1: '1', b2: '', b3: '', b4: '', b5: '',}
        ]
        const comportamiento = [{p1:'1',p2:'1'}, {p1:'1',p2:'1'}]
        const proyectos = [{p1:'1',p2:'1'}, {p1:'1',p2:'1'}]
        this.model2.calificaciones.docente = this.docentes;
        this.model2.calificaciones.materia = this.mate;
        this.model2.calificaciones.area = this.area;
        this.model2.calificaciones.notas = notass;
        this.model2.calificaciones.comportamiento = comportamiento;
        this.model2.calificaciones.proyectos = proyectos
        this.$proxies._notasProxi
          .updateReforma(array, this.model2) 
          .then(() => {
            this.getDataActualizada();
            array = [];
          })
          .catch(() => {
            this.$dialog.alert("No se puede completar la operación");
            array = [];
          });
      }
    },
    getDataActualizada() {
      if (this.$route.params.id) {
        this.isData = true;
        this.$Progress.start();
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            this.isVerific = x.data.filter((x) => x.curso == this.para);
            const arrays = ResultServiceNota.llenar_tabla_notas(
              this.isVerific,
              this.mate
            );
            this.inAlumnos = arrays.sort(function (a, b) {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                  return -1;
                if (nameA > nameB)
                  return 1;
                return 0; //default return value (no sorting)
              });
            this.isData = false;
            this.$Progress.finish();
          })
          .catch((x) => {
            console.log("Error", x);
            this.isData = false;
            this.$Progress.finish();
          });
      }
    },
    vueInit: function(num) {
      this.tabs = num;
    },
    verificarUsuario() {
      if (!restResourceService.docente(this.roles)) this.$router.push("/");
      this.LoadCourse();
    },
    
    toast(message) {
      this.$toasted.info(message, {
        duration: 2300,
        position: 'bottom-center',
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: 'CERRAR',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    },
  },
  created() {
    this.verificarUsuario();

  },

}
</script>
