
import serviceNotas from './ServiceNotas';
const ResultServiceNota = new  serviceNotas();
import Spinner from "../../../shared/Spinner";
export default {
  name: "Notas",
  components: {
    Spinner,
  },
  props: {
    paralelo: {
      type: String,
    },
    nombre: {
      type: String,
    },
    materia: {
      type: String,
    },
  },
  data() {
    return {
      tab: "abrir",
      isVisible: "pane1",
      isAlumno: "",
      isDoble: false,
      isDuplicado: false,
      isFoto: "",
      isData: false,
      info: {},
      coleccionNotas: null,
      detalleNotas: null,
      para: this.paralelo,
      name: this.nombre,
      mate: this.materia,
      docentes: '',
      isError: "",
      modalidad: "",
      ifLoad: false,
      ifLoad2: false,
      notasx: {
            ap11: "",
            ap12: "",
            ap13: "",
            ap14: "",
            ap15: "",
            ap21: "",
            ap22: "",
            ap23: "",
            ap24: "",
            ap25: "",
            ap31: "",
            ap32: "",
            ap33: "",
            ap34: "",
            ap35: "",
      },
      model: {
        _id: null,
        calificaciones: {
          _id: null,
          notas: {
            quimestre: "",
            promedio: "",
            examen: "",
            arraysNote: "",
          },
        },
      },
      //--------------------------REFORMA
      model2: {
        _id: null,
        calificaciones: {
          docente: '',
          materia: this.materia,
        },
      },
      model3: {
        _id: null,
        calificaciones: {
          promediof: '',
        },
      },
      modals1: "closedd",
      isSaveArbol: false,
      isVerific: {},
      idSubColeccion: "",
      inAlumnos: [],
      taba: "init",
      isSelecUsers : [],
       //Pagina 
       page: 1,
       perPage: 7,
       pages: [],
       numPages:null,
    };
  },
  computed: {

    displayedArticles: function () {
      return this.paginate(this.inAlumnos);
    }
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length/7);
      return articles.slice(from, to);
  },
    appInit(){
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.docentes = info.nombre;
      this.model2.calificaciones.docente = info.nombre;
    },
    getData() {
      if (this.$route.params.id) {
        this.isData = true;
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            this.isVerific = x.data.filter((x) => x.curso == this.para);
            let isExiste = this.isVerific[0].calificaciones.filter(
              (x) => x.materia == this.mate
            ); //VERIFICAMOS QUE TENGA O NO LA MATERIA
            let cont = isExiste;
            if (cont == 0) {
              this.modals1 = "opennn";
            } else {
              this.inAlumnos =  ResultServiceNota.llenar_tabla_notas(this.isVerific, this.materia);
              this.isData = false;
            }
          })
          .catch((x) => {
            console.log("Error", x);
            this.isData = false;
          });
      }
    },

    getDataActualizada() {
      this.isData = true;
      if (this.$route.params.id) {
        this.isData = true;
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            this.isVerific = x.data.filter((x) => x.curso == this.para);
            this.inAlumnos =  ResultServiceNota.llenar_tabla_notas(this.isVerific, this.materia);
            this.isData = false;
          })
          .catch((x) => {
            console.log("Error", x);
            this.isData = false;
          });
      }
    },

    __gravarArbol1() {
      this.isSaveArbol = true;
      let contador = this.isVerific.length;
      if (contador>0) {
         let arrays = []
         for (let i = 0; i < this.isVerific.length; i++) {
           arrays.push(this.isVerific[i]._id)
         }
        this.$proxies._notasProxi
        .updateReforma(arrays, this.model2) //-----------EDITAR CON AXIOS
        .then(() => {
          this.isSaveArbol = false;
          this.modals1 = "closeddd";
          this.getDataActualizada();
          arrays = []
        })
        .catch((err) => {
          alert("Error no se pude configurar la nota base, reporte este error en el chat", err);
          arrays = []
        });
      }
    },
    
    save() {
      //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.isDoble = true;
          return;
        }
        if (this.model.calificaciones._id&&this.idSubColeccion) {
          this.algoritmoNotas();
          this.ArraysStringNotas();
          if (
            this.algoritmoDuplicados(this.model.calificaciones.notas.quimestre)
          ) {
            this.isDuplicado = true;
            return;
          }
          this.ifLoad = true;
          this.$proxies._notasProxi
            .updateReforma2(this.idSubColeccion, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.isVisible = "none";
              this.tab= "closed";
              this.getDataActualizada();
              this.isSelecUsers = [];
            })
            .catch((err) => {
              console.log("Error", err);
              this.ifLoad = false;
              this.tab = "salida";
            });
        }
      });
    },


    OptenerMatricula(obj) {
      this.__limpiarCampos();
      this.idSubColeccion = obj.id;
      this.model.calificaciones._id = obj.fora;
      this.coleccionNotas = obj;
      this.isAlumno = obj.name;
      this.tab = "inicios";
      this.isVisible = "pane1";
    },
    algoritmoNotas() {
      this.model.calificaciones.notas.promedio = ResultServiceNota.calcular_promedio(
        this.notasx.ap11, this.notasx.ap12,
        this.notasx.ap13, this.notasx.ap14,
        this.notasx.ap15, this.notasx.ap21,
        this.notasx.ap22, this.notasx.ap23,
        this.notasx.ap24, this.notasx.ap25,
        this.notasx.ap31, this.notasx.ap32,
        this.notasx.ap33, this.notasx.ap34,
        this.notasx.ap35, this.model.calificaciones.notas.examen
      );
    },
    
    ArraysStringNotas(){
      this.model.calificaciones.notas.arraysNote = this.notasx.ap11 +','+ this.notasx.ap12 +','+ 
      this.notasx.ap13 +','+  this.notasx.ap14 +','+ 
      this.notasx.ap15 +','+  this.notasx.ap21 +','+ 
      this.notasx.ap22 +','+  this.notasx.ap23 +','+ 
      this.notasx.ap24 +','+  this.notasx.ap25 +','+ 
      this.notasx.ap31 +','+  this.notasx.ap32 +','+ 
      this.notasx.ap33 +','+  this.notasx.ap34 +','+  this.notasx.ap35;
    },

    algoritmoDuplicados(quim) {
      if (quim == "p1" && this.coleccionNotas.par1 != 0) {
        return true;
      } else if (quim == "p2" && this.coleccionNotas.par2 != 0) {
        return true;
      } else {
        return false;
      }
    },

    __limpiarCampos() {
      this.model._id = "";
      this.model.calificaciones.notas.quimestre = "";
      this.notasx.ap11 = "";
      this.notasx.ap12 = "";
      this.notasx.ap13 = "";
      this.notasx.ap14 = "";
      this.notasx.ap15 = "";
      this.notasx.ap21 = "";
      this.notasx.ap22 = "";
      this.notasx.ap23 = "";
      this.notasx.ap24 = "";
      this.notasx.ap25 = "";
      this.notasx.ap31 = "";
      this.notasx.ap32 = "";
      this.notasx.ap33 = "";
      this.notasx.ap34 = "";
      this.notasx.ap35 = "";
      this.model.calificaciones.notas.promedio = "";
      this.model.calificaciones.notas.examen = "";
      this.isError = "";
      this.coleccionNotas = null;
      this.isDoble = false;
      this.isDuplicado = false;
      this.isAlumno = "";
      this.idSubColeccion = "";
    },
    __limpiarCampos2() {
      this.model3.calificaciones.promediof = '';
      this.model3.calificaciones._id= '';
    },
    //-----------------------------------------------------CONFIRMAR CALIFICACIONES
    ConfirmarNota(obj){
      if (confirm('ESTA SEGURO QUE QUIERE CONFIRMAR ESTAS CALIFICACIONES?')) {
          this.ifLoad2 = true;
          let quim1 = obj.par1;
          let quim2 = obj.par2;
          let total = parseFloat(quim1) + parseFloat(quim2);
          let promedio = (total / 2).toFixed(2);
          let id = obj.id;
          if (id) {
            this.model3.calificaciones._id = obj.fora;
            this.model3.calificaciones.promediof = promedio;
            this.$proxies._notasProxi
              .updateReforma3(id, this.model3) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad2 = false;
                this.getDataActualizada();
                this.__limpiarCampos2();
              })
              .catch((err) => {
                alert("reporte el problema",err);
                this.ifLoad2 = false;
              });
          }
          
      }
       
    },
    selectUser(key){
      let longitud = this.isSelecUsers.length;
      let isExiste = 0;
      if(longitud>0){
         for (let i = 0; i < this.isSelecUsers.length; i++) {
            if(this.isSelecUsers[i].id==key.id){
             this.isSelecUsers.splice(i, 1); 
             isExiste = 1;
             break;
            }
         }
         if(isExiste===0){ 
           this.isSelecUsers.push(key);
         }
      }else{
       this.isSelecUsers.push(key);
      } 
    },
    editar(){
      let longitud = this.isSelecUsers.length;
      if (longitud==1) {
        this.__limpiarCampos();
        this.idSubColeccion = this.isSelecUsers[0].id;
        this.model.calificaciones._id = this.isSelecUsers[0].fora;
        this.coleccionNotas = this.isSelecUsers[0];
        this.isAlumno = this.isSelecUsers[0].name;
        this.tab = "inicios";
        this.isVisible = "pane1";
      }
    }
  },
  created() {
    this.appInit();
    this.getData();
  },

  validators: {
    "model.calificaciones.notas.quimestre"(value) {
      return this.$validator.value(value).required();
    },

    "notasx.ap11": function(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap12"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap13"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap14"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap15"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap21"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap22"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap23"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap24"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap25"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap31"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap32"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap33"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap34"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap35"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "model.calificaciones.notas.examen"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
  },
};
