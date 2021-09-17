import Spinner from "../../../../shared/Spinner";
import Navss from '../../../../shared/Navss';
import IsSelect from '../../../../shared/IsSelect'
export default {
  name: "CreateMatricula2",
  components: {
    Spinner,Navss ,IsSelect
  },
  data() {
    return {
      tab: "init1",
      visible: 'uno',
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
      info : null,
      model: {
        _id: null,
        fecha: null,
        fkestudiante: null,
        fkperiodos: null,
        fknivel: null,
        nmatricula: null,
        folio: null,
        curso: null,
        estado: null,
        typo: null,
        academico: null,
      },
      result : {
        id: null,
        fullname: null,
        foto: null,
      }
   
    };
  },
  methods: {
    getAll() {
      this.isLoading = true;
      let modalidad = 'Extraordinaria';
      this.$proxies._matriculaProxi
        .getAllEstudiantes(modalidad) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
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

          this.listniveles = filtrosNiveles.filter((x) => x.modalidad == 'Extraordinaria');
          this.isLoading2 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading2 = false;
          this.$router.push('/Matricula-2')
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
            (x) => x.typo == "Extraordinaria" && x.estado == "1"
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
        this.ifLoad = true;
        if (this.model.estado == true) {
          this.model.estado = 1;
        } else {
          this.model.estado = 0;
        }
        this.model.fkestudiante = this.result.id;
        this.model.fecha = this.fechaActual();
        this.model.academico = this.model.academico._id;
        this.model.fknivel = this.model.fknivel._id;
        this.model.typo = "m2";
        this.model.curso = "Undefined";
        this.$proxies._matriculaProxi
          .createMatricula(this.model) //-----------GUARDAR CON AXIOS
          .then(() => {
            this.ifLoad = false;
            this.visible = 'tres';
            this. __limpiarCampos();
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
                this.visible = 'cero';
                //this.$router.push('/Error-reg')
              }
            } else if (error.request) {
              alert("duplicado 2");
            } else {
              console.log("Error", error.message);
            }
          });
      });
    },
    __cambios() {
      let v = "m2";
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
        this.__cambios();
       
      }
      
    } ,
    fechaActual(){
      var date = new Date();
       const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

      const formatDate = (date)=>{
      let formatted_date = date.getDate() + " " + months[date.getMonth()] + " DEL " + date.getFullYear()
      return formatted_date;
      }
      let fecha = formatDate(date)
      return fecha;
    },
    __limpiarCampos(){
      this.model.fknivel = null;
      this.model.academico = null;
      this.model.nmatricula = null;
      this.model.folio = null;
    },
    mostrar(){
      this.visible= "dos";
    },

    nextO(obf){
        this.result.id = obf._id;
        this.result.fullname = obf.fullname;
        this.result.foto = obf.foto;
        this.visible= "cero";
    }
  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.info.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.fullname.toLowerCase().includes(v))
      })
      }else{
        return [{_id : 10, fullname:'Puede buscar por nombre o apellido'}]
       }
    }
  },
  created() {
    this.__listPeriodo();
    this.__listNivele();
    this.getAll();
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
