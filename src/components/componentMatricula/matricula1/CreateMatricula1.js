import Spinner from "../../../shared/Spinner";
import IsSelect from '../../../shared/IsSelect'
import ScrimModal from "../../../shared/ScrimModal"
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import Dropdown from "../../../shared/Dropdown.vue";
import ServiceMatricula from './ServiceMatriculas';
const ResultServiceMatricula = new  ServiceMatricula();
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
export default {
  name: "CreateMatricula",
  components: {
    Spinner,IsSelect, ScrimModal, ButtonLoading, Dropdown
  },
  props:{
    modalidad:{
      type: String,
    }
  },
  data() {
    return {
      isModalidad: this.modalidad,
      roles: this.$store.state.user.roles,
      searchQuery: '',
      isDuplicado : false,
      listniveles: {},
      listPeriodo: {},
      isLoading: false,
      isLoading1: false,
      isLoading2: false,
      ifLoad: false,
      ifLoad1: false,
      infoMat: null,
      info : {},
      model: {
        nmatricula: null,
        folio: null,
        fknivel: null,
        academico: null,
      },
      foto: null,
      isSelecUsers: [],
      arraysMatricula: [],
      fecha: '',
      objetosRechasados: [],
      isOptionsModalidad: ''
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      } else {
         if (this.isModalidad=='m1') {
           this.isOptionsModalidad = 'Intensivo';
         } 
         if (this.isModalidad=='m2'){
          this.isOptionsModalidad = 'Extraordinaria';
         }
         this.__listPeriodo();
         this.__listNivele();
         this.getAll();
      }
    },
    getAll() {
      this.isLoading = true;
      this.$proxies._matriculaProxi
        .getAllEstudiantes(this.isOptionsModalidad) //LISTA DE ESTUDIANTES
        .then((x) => {
          this.info = x.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error imposible");
          this.isLoading = false;
         
        });
    },

    __listNivele() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isLoading2 = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtrosNiveles = x.data;

          this.listniveles = filtrosNiveles.filter((x) => x.modalidad == this.isOptionsModalidad);
          this.isLoading2 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading2 = false;
          this.$router.push('/Matricula-1')
          this.$notify({
            group: "global",
            text: "Error del internet en el servidor",
          });
        });
    },
    __listPeriodo() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isLoading1 = true;
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          let filtro = x.data.niveles;
          this.listPeriodo = filtro.filter(
            (x) => x.typo == this.isOptionsModalidad && x.estado == "1"
          );
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
        });
    },
 
    fechaActual(){
      this.fecha = ResultServiceMatricula.calcular_fecha();
    },
    close(){
      this.$emit('myEventClosedModalMatricula');
    },
    __limpiarCampos(){
      this.model.fknivel = null;
      this.model.academico = null;
      this.model.nmatricula = null;
      this.model.folio = null;
      this.isSelecUsers = [];
    },

    quitar(){
      this.isSelecUsers = [];
      this.isDuplicado = false;
      this.objetosRechasados = [];
    },
    
    sendArraysMatricula(){
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.$notify({
            group: "global",
            text: "Por favor llena correctamente los campos solicitados",
          });
          return;
        }
        if (this.isSelecUsers.length>0) {
          this.ifLoad = true;
          this.arraysMatricula = [];
          let fkestudiante, nombre, academico,fknivel;
          for (let i = 0; i < this.isSelecUsers.length; i++) {
            fkestudiante = this.isSelecUsers[i].id;
            nombre = this.isSelecUsers[i].name;
            academico = this.model.academico._id;
            fknivel = this.model.fknivel._id;
            this.arraysMatricula.push({fkestudiante:fkestudiante, nombre: nombre, estado: 1, fecha:this.fecha,
              academico: academico, fknivel: fknivel, typo: this.isModalidad, curso: "Undefined", nmatricula:'1', folio: '1'})
         }

         
         this.$proxies._matriculaProxi
           .createMatricula(this.arraysMatricula, this.isModalidad) //-----------GUARDAR CON AXIOS
           .then((res) => {
             this.ifLoad = false;
             this.toast('Se matriculo correctamente a '+ this.arraysMatricula.length + ' estudiantes')
             this.objetosRechasados = res.data.duplicados;
             if (this.objetosRechasados.length!=0) this.isDuplicado = true;
             this. __limpiarCampos();
           
           })
           .catch((error) => {
               console.log("Error", error);
               this.ifLoad = false;
           });
        }
      })
     
    },


    selectUser(objeto){
      let longitud = this.isSelecUsers.length;
      let isExiste = 0;
      if (this.isDuplicado) {
        this.isDuplicado = false;
        this.isSelecUsers = [];
        this.objetosRechasados = []
      }
      if(longitud>0){
         for (let i = 0; i < this.isSelecUsers.length; i++) {
            if(this.isSelecUsers[i].id==objeto._id){
             this.isSelecUsers.splice(i, 1); 
             isExiste = 1;
             break;
            }
         }
         if(isExiste===0){ 
           this.isSelecUsers.push({
            id: objeto._id,
            name: objeto.fullname,
            img: objeto.foto,
           });
         }
      }else{
       this.isSelecUsers.push({
        id: objeto._id,
        name: objeto.fullname,
        img: objeto.foto,
       });
      } 
    },

    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
        position: "top-center",
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: "CERRAR",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  },
  computed: {
    resultQuery(){
      if(this.searchQuery.length>1){
      return this.info.filter((item, )=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.fullname.toLowerCase().includes(v))
      })
      }
    },
    isComplete () {
      return this.model.academico && this.model.fknivel;
    }
  },
  created() {
    this.verificarUsuario()
    this.fechaActual();
  },

  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS

    "model.academico"(value) {
      return this.$validator.value(value).required();
    },
    "model.fknivel"(value) {
      return this.$validator.value(value).required();
    },
  
  },
};
