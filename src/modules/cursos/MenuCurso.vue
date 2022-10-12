<template>
  <div>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row" >
      <div class="col-lg-2">
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
                <span :class="{ 's-active2': tabs == 0 }" class="text-sm s-text-versel2">Notas</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 1 }" data-scroll="" href="javascript:;"
                @click="vueInit(1)">
                <span :class="{ 's-active2': tabs == 1 }" class="text-sm s-text-versel2">Supletorios</span>
              </a>
            </li>
           
            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 3 }" data-scroll="" href="javascript:;"
                @click="vueInit(3)">
                <span :class="{ 's-active2': tabs == 3 }" class="text-sm s-text-versel2">Comportamiento</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 2 }" data-scroll="" href="javascript:;"
                @click="vueInit(2)">
                <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2">Asitencias</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 4 }" data-scroll="" href="javascript:;"
                @click="vueInit(4)">
                <span :class="{ 's-active2': tabs == 4 }" class="text-sm s-text-versel2">Planificaciónes</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-10 ">
        <section v-if="tabs == 0" >
          <Calificaciones :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 1">
          <Supletorios :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 2">
          asistencia
        </section>
        <section v-if="tabs == 3">
          <Comportamiento :object="inAlumnos" @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 4">
          <Planificacion :id="idDistributivo" :planificacion="planificacion" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import quialifyservice from "./pages/services";
const ResultServiceNota = new quialifyservice();
import ProgressBar from "../../shared/ProgressBar";
import Calificaciones from "./pages/Calificaciones.vue";
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar, Calificaciones,
    Planificacion: () => import( /* webpackChunkName: "Planificacion" */ './pages/Planificacion.vue'),
    Supletorios: () => import( /* webpackChunkName: "Supletorios" */ './pages/Supletorios.vue'),
    Comportamiento: () => import( /* webpackChunkName: "Comportamiento" */ './pages/Comportamiento.vue'),
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
          comportamiento : [{}]
        },
      },
      collectionTasks: [],
      idDistributivo: '',
      planificacion: '',
    }
  },
  methods: {
    close(){
      this.$router.go(-1);
    },
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
            this.isVerific = x.data.filter((x) => x.curso == this.para);
            const isExiste = this.isVerific[0].calificaciones.filter((x) => x.materia == this.mate);
            if (isExiste == 0) {
              this.confirmarMateria();
            } else {
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
            }
            const text_1 = this.mate + ' ' + this.para
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
    confirmarMateria() {
      let message = {
        title: "¿Registro de calificaciones?",
        body:
          "Para poder registrar las notas es importante saber que todos los estudiantes ya tengan una matricula y un paralelo. Si es así Clic en CONTINUAR caso contrario Cancelar.",
      };
      let options = {
        loader: true,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.configDocenteMateria();
          setTimeout(() => {
            dialog.close();
            this.toast("Configuración exitosa");
          }, 1900);
        })
        .catch(() => {
          this.$router.go(-1);
        });
    },
    configDocenteMateria() {
      let contador = this.isVerific.length;
      if (contador > 0) {
        let arrays = [];
        for (let i = 0; i < this.isVerific.length; i++) {
          arrays.push(this.isVerific[i]._id);
        }
        const notass = [
          {  quimestre: 'p1', promedio: '', examen: '1', a1: '1', a2: '', a3: '', a4: '', a5: '', b1: '1', b2: '', b3: '', b4: '', b5: '',},
          { quimestre: 'p2', promedio: '', examen: '1', a1: '1', a2: '', a3: '', a4: '', a5: '', b1: '1', b2: '', b3: '', b4: '', b5: '',}
        ]
        const comportamiento = [{p1:'1',p2:'1'}, {p1:'1',p2:'1'}]
        this.model2.calificaciones.docente = this.docentes;
        this.model2.calificaciones.materia = this.mate;
        this.model2.calificaciones.area = this.area;
        this.model2.calificaciones.notas = notass;
        this.model2.calificaciones.comportamiento = comportamiento;
        this.$proxies._notasProxi
          .updateReforma(arrays, this.model2) 
          .then(() => {
            this.getDataActualizada();
            arrays = [];
          })
          .catch(() => {
            this.$dialog.alert("No se puede completar la operación");
            arrays = [];
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
<style >
.s-active2 {
  font-weight: 700;
  color: #000 !important;
}

.s-text-versel2 {
  color: #444;
}


</style>