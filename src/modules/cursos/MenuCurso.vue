<template>
  <div>
    <vue-progress-bar style="margin-top:-23px"></vue-progress-bar>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row">
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
              <a class="nav-link " :class="{ 's-active': tabs == 2 }" data-scroll="" href="javascript:;"
                @click="vueInit(2)">
                <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2">Asitencias</span>
              </a>
            </li>

            <li class="nav-item pt-1">
              <a class="nav-link  " :class="{ 's-active': tabs == 4 }" data-scroll="" href="javascript:;"
                @click="vueInit(4)">
                <span :class="{ 's-active2': tabs == 4 }" class="text-sm s-text-versel2">Configuración</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-10 ">
        <section v-if="tabs == 0">
          <Notas :object="inAlumnos"  @getDataTask="getDataActualizada" />
        </section>
        <section v-if="tabs == 1">
          suple
        </section>
        <section v-if="tabs == 2">
          3
        </section>

        <section v-if="tabs == 4">
          congif
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
import Notas from "./pages/Notas.vue";
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar, Notas,
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      tabs: 0,
      isData: false,
      para: "",
      name: "",
      mate: "",
      isVerific: {},
      inAlumnos: [],
      model2: {
        _id: null,
        calificaciones: {
          docente: "",
          materia: "",
        },
      },
      collectionTasks: [],
    }
  },
  methods: {
    LoadCourse: function () {
      const seccio = JSON.parse(localStorage.getItem("myCourse")); //quimestre
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.para = seccio.paralelo;
      this.name = seccio.nombre;
      this.mate = seccio.materia;
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
            const isExiste = this.isVerific[0].calificaciones.filter( (x) => x.materia == this.mate ); 
            if (isExiste == 0) {
              this.confirmarMateria();
            } else {
              this.inAlumnos = ResultServiceNota.llenar_tabla_notas(
                this.isVerific,
                this.mate
              );
              this.isData = false;
              this.$Progress.finish();
            }
            console.log(this.inAlumnos)
            const text_1 = this.mate + ' '+this.para 
            const text_2 = 'Tareas'
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
        this.model2.calificaciones.docente = this.docentes;
        this.model2.calificaciones.materia = this.mate;
        this.$proxies._notasProxi
          .updateReforma(arrays, this.model2) //-----------EDITAR CON AXIOS
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
            this.inAlumnos = ResultServiceNota.llenar_tabla_notas(
              this.isVerific,
              this.mate
            );
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
    vueInit(num) {
      this.tabs = num;
      let text_1 = this.mate + ' '+this.para
      let text_2 = ''
      switch (num) {
        case 0:
          text_2 = 'Notas';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 1:
          text_2 = 'Supletorios';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 2:
          text_2 = 'Asitencias';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        case 4:
          text_2 = 'Configuración';
          this.$store.commit('updateHeader', { text_1, text_2 })
          break;
        default:
          break;
      }
    },
    verificarUsuario() {
      if (!restResourceService.docente(this.roles)) this.$router.push("/");
      this.LoadCourse();
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
a[data-scroll] {
    border-radius: 0.1rem !important;
}
</style>