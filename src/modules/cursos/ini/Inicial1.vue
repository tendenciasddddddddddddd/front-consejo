<template>
    <ScrimModal @close="$router.go(-1)">
      <template v-slot:header>{{mate}} Paralelo {{para}}</template>
      <template v-slot:body>
       
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row" >
      
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
import ScrimModal from "../../shared/ScrimModal"
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar,  ScrimModal,
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
     // this.getData();
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
