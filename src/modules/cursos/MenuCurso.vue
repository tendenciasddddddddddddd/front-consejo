<template>
  <ScrimModal @close="salir">
    <template v-slot:header>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="ifComplementarias !='1'&&mate !='COMPORTAMIENTO'">
            <a class="nav-link " style="cursor:pointer" aria-current="page" @click="tabs=0"  :class="{ 'active': tabs == 0 }" >
              Notas</a>
          </li>
          <li class="nav-item" v-if="ifComplementarias =='1'" >
            <a class="nav-link " style="cursor:pointer" :class="{ 'active': tabs == 2 }" aria-current="page" @click="tabs=2" >Complementarias</a>
          </li>
          <li class="nav-item" v-if="mate =='COMPORTAMIENTO'" >
            <a class="nav-link " style="cursor:pointer" :class="{ 'active': tabs == 3 }" aria-current="page" @click="tabs=3" >Comportamiento</a>
          </li>
          <li class="nav-item" v-if="ifComplementarias !='1'&&mate !='COMPORTAMIENTO'" >
            <a @click="tabs=1" style="cursor:pointer" :class="{ 'active': tabs == 1 }" class="nav-link" >Supletorios</a>
          </li>
          <li class="nav-item"  >
            <a @click="tabs=4" style="cursor:pointer" :class="{ 'active': tabs == 4 }" class="nav-link" >Planificación</a>
          </li>
          <li class="nav-item"  >
            <span class="nav-link text-white ms-5"> <b>{{nivel}} [{{para}}] --{{mate}}</b> </span>
          </li>
         
        </ul>
     </template>
    <template v-slot:body>
  <ProgressBar v-if="isData"></ProgressBar>
  <div v-else  >
    <div >
      <section v-if="tabs == 0 && ifComplementarias !='1'&&ifComplementarias !='COMPORTAMIENTO'" >
        <Calificaciones :object="inAlumnos" @getDataTask="getDataActualizada" />
      </section>
      <section v-if="tabs == 1 && ifComplementarias !='1'&&ifComplementarias !='COMPORTAMIENTO'">
        <Supletorios :object="inAlumnos" @getDataTask="getDataActualizada" />
      </section>
      <section v-if="tabs == 2 && ifComplementarias == '1'" >
        <Proyectos :object="inAlumnos" @getDataTask="getDataActualizada" />
      </section>
      <section v-if="tabs == 3 &&  mate =='COMPORTAMIENTO'">
        <Comportamiento :object="inAlumnos" @getDataTask="getDataActualizada" />
      </section>
      <section v-if="tabs == 4">
        <Planificacion :id="idDistributivo" :planificacion="planificacion" />
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
        dhi: [{}]
      },
    },
    collectionTasks: [],
    idDistributivo: '',
    planificacion: '',
    ifComplementarias : '',
    nivel : '',
  }
},
methods: {
  LoadCourse: function () {
    const seccio = JSON.parse(localStorage.getItem("myCourse")); 
    if (!seccio) this.$router.push("/page-not-found")
    this.para = seccio.paralelo;
    this.name = seccio.nombre;
    this.mate = seccio.materia;
    this.area = seccio.area;
    this.idDistributivo = seccio.idDistributivo;
    this.planificacion = seccio.planificacion;
    this.docentes = seccio.nombredoc;
    this.ifComplementarias = seccio.ifComplementarias;
    this.nivel = seccio.nivel;
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
          if(this.ifComplementarias == '1')this.tabs = 2
          if(this.mate == 'COMPORTAMIENTO')this.tabs = 3
          if(this.mate == 'DESARROLLO HUMANO INTEGRAL')this.tabs = 5
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
      var notass = []
      var proyectos = [];
      var comportamiento = [];
      var dhi = [];
      if(this.ifComplementarias =='1'){
        proyectos = [{p1:'R',p2:'R'}, {p1:'R',p2:'R'}]
      } else if(this.mate =='COMPORTAMIENTO'){
        comportamiento = [{p1:'E',p2:'E'}, {p1:'E',p2:'E'}]
      } else if(this.mate =='DESARROLLO HUMANO INTEGRAL'){
        dhi = [{p1:'E',p2:'E'}, {p1:'E',p2:'E'}]
      } 
      else{
        notass = [
        {  quimestre: 'p1', promedio: '', examen: '0', a1: '0', a2: '', a3: '', a4: '', a5: '', b1: '0', b2: '', b3: '', b4: '', b5: '',},
        { quimestre: 'p2', promedio: '', examen: '0', a1: '0', a2: '', a3: '', a4: '', a5: '', b1: '0', b2: '', b3: '', b4: '', b5: '',}
      ] 
      this.model2.calificaciones.promediof = '1';
      }
      this.model2.calificaciones.docente = this.docentes;
      this.model2.calificaciones.materia = this.mate;
      this.model2.calificaciones.area = this.area;
      this.model2.calificaciones.notas = notass;
      this.model2.calificaciones.comportamiento = comportamiento;
      this.model2.calificaciones.proyectos = proyectos;
      this.model2.calificaciones.dhi = dhi
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
    if (restResourceService.docente(this.roles)||restResourceService.admin(this.roles)){
      this.LoadCourse();
    } else {
      this.$router.push("/page-not-found");
    }
   
  },
  salir(){
    localStorage.removeItem("myCourse");
    this.$router.go(-1);
    
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