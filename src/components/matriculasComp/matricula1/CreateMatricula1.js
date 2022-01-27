import Spinner from "../../../shared/Spinner";
import IsSelect from '../../../shared/IsSelect'
import ServiceMatricula from './ServiceMatriculas';
const ResultServiceMatricula = new  ServiceMatricula();
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
export default {
  name: "CreateMatricula",
  components: {
    Spinner,IsSelect
  },

  data() {
    return {
      tab: "init1",
      visible: 'uno',
      roles: this.$store.state.user.roles,
      searchQuery: null,
      isDuplicado : false,
      listniveles: null,
      listPeriodo: null,
      isLoading: false,
      isLoading1: false,
      isLoading2: false,
      ifLoad: false,
      ifLoad1: false,
      infoMat: null,
      info : {},
      model: {
        _id: null,
        fecha: null,
        fkestudiante: null,
        fknivel: null,
        nmatricula: null,
        folio: null,
        curso: null,
        estado: null,
        typo: null,
        academico: null,
        nombre: null
      },
      foto: null,
      isSelecUsers: [],
      fecha: '',
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    getAll() {
      this.isLoading = true;
      let modalidad = 'Intensivo';
      this.$proxies._matriculaProxi
        .getAllEstudiantes(modalidad) //LISTA DE ESTUDIANTES
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

          this.listniveles = filtrosNiveles.filter((x) => x.modalidad == 'Intensivo');
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
            (x) => x.typo == "Intensivo" && x.estado == "1"
          );
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
        });
    },
    save() {
      //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.$notify({
            group: "global",
            text: "Por favor llena correctamente los campos solicitados",
          });
          return;
        }
        //-----------DE LO CONTRARIO ENTRA A SER UN DOCUMENTO NUEVO
        this.model.estado = 1;
        this.model.fecha = this.fecha;
        this.model.academico = this.model.academico._id;
        this.model.fknivel = this.model.fknivel._id;
        this.model.typo = "m1";
        this.model.curso = "Undefined";
        this.ifLoad = true;
         this.$proxies._matriculaProxi
           .createMatricula(this.model) //-----------GUARDAR CON AXIOS
           .then(() => {
             this.ifLoad = false;
             this.regresar();
             this.$notify({
              group: "global",
              text: "Registro exitoso!!!!",
            });
           })
           .catch((error) => {
             //-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
             this.ifLoad = false;
             if (error.response) {
               if (error.response.status == 400) {
                
                 this.$notify({
                   group: "global",
                   text: error.response.data.message,
                 });
                 this. __limpiarCampos();
                 this.isDuplicado = true;
               }
             } else if (error.request) {
               alert("duplicado 2");
             } else {
               console.log("Error", error.message);
            }
           });
      });
    },

    getNumberMatricula() {
      let v = "m1";
      this.ifLoad1 = true;
      this.$proxies._matriculaProxi
        .getMatriculaFolio(v)
        .then((x) => {
          this.infoMat = x.data.infor;
          if (this.infoMat) {
            this.model.nmatricula = parseInt(this.infoMat.nmatricula) + 1;
            this.model.folio = Math.ceil(this.model.nmatricula / 2);
          } else {
            this.model.nmatricula = 1;
            this.model.folio = 1;
          }
          this.ifLoad1 = false;
        })
        .catch((err) => {
          this.ifLoad1 = false;
          console.log("Error", err);
        });
    },

    checkExist(event){
      if (event) {
        this.getNumberMatricula();
       
      }
      
    },

    fechaActual(){
      this.fecha = ResultServiceMatricula.calcular_fecha();
    },
    
    __limpiarCampos(){
      this.model.fknivel = null;
      this.model.academico = null;
      this.model.nmatricula = null;
      this.model.folio = null;
    },

    regresar(){
      this.visible= "uno";
      this.isSelecUsers = [];
    },
    
    nextO(){
      this.__limpiarCampos()
      this.model.fkestudiante = this.isSelecUsers[0].id;
      this.model.nombre = this.isSelecUsers[0].name;
      this.foto = this.isSelecUsers[0].img;
      this.visible= "dos";
      this.isDuplicado = false;
    },

    selectUser(objeto){
      let longitud = this.isSelecUsers.length;
      let isExiste = 0;
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
  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.info.filter((item, )=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.fullname.toLowerCase().includes(v))
      })
      }
      
    }
  },
  created() {
    this.verificarUsuario()
    this.__listPeriodo();
    this.__listNivele();
    this.getAll();
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
    "model.nmatricula"(value) {
      return this.$validator
        .value(value)
        .required()
        .maxLength(6);
    },
    "model.folio"(value) {
      return this.$validator
        .value(value)
        .required()
        .maxLength(6);
    },
  },
};
