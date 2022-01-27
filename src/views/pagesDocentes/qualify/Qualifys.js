import quialifyservice from "./QuialifyService";
const ResultServiceNota = new quialifyservice();
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
import ProgressBar from "../../../shared/ProgressBar";
export default {
  name: "Quialifys",
  components: {
    ProgressBar,
    NotesMost: () =>
    import(
      /* webpackChunkName: "NotesMost" */ "../../../components/moduleCurso/groupDocente/notas/NotesMost.vue"
    ),
    
  },
  data() {
    return {
      idParam : this.$route.params.id,
      roles: this.$store.state.user.roles,
      para: "",
      name: "",
      mate: "",
      docentes: "",
      isData: false,
      isVerific: {},
      inAlumnos: [],
      idSubColeccion: "",
      tab: "abrir",
      isVisible: "pane1",
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
      model2: {
        _id: null,
        calificaciones: {
          docente: "",
          materia: "",
        },
      },

      isAlumno: "",
      isDoble: false,
      isDuplicado: false,
      ifLoad: false,
      isError: "",
      modalidad: "",
      coleccionNotas: null,
      //Pagina
      searchQuery: null,
      page: 1,
      perPage: 7,
      pages: [],
      numPages: null,
      selected: [],
      allSelected: false,
      userIds: [],
      //CHILDREN
      ifNotasMost: false,
    };
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.docente(this.roles)){
        this.$router.push("/");
      }
    },
    readmyCourse: function() {
      const seccio = JSON.parse(localStorage.getItem("myCourse")); //quimestre
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.para = seccio.paralelo;
      this.name = seccio.nombre;
      this.mate = seccio.materia;
      this.docentes = info.nombre;
      this.getData();
    },
    getData() {
      if (this.$route.params.id) {
        this.isData = true;
        this.$Progress.start();
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            this.isVerific = x.data.filter((x) => x.curso == this.para);

            let isExiste = this.isVerific[0].calificaciones.filter(
              (x) => x.materia == this.mate
            ); //VERIFICAMOS QUE TENGA O NO LA MATERIA
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
          })
          .catch((x) => {
            console.log("Error", x);
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
    save() {
      this.$validate().then((success) => {
        if (!success) {
          this.isDoble = true;
          return;
        }
        if (this.model.calificaciones._id && this.idSubColeccion) {
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
              this.tab = "closed";
              this.getDataActualizada();
              this.userIds = [];
            })
            .catch((err) => {
              console.log("Error", err);
              this.ifLoad = false;
              this.tab = "salida";
            });
        }
      });
    },
    OptenerMatricula: function(obj) {
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
        this.notasx.ap11,
        this.notasx.ap12,
        this.notasx.ap13,
        this.notasx.ap14,
        this.notasx.ap15,
        this.notasx.ap21,
        this.notasx.ap22,
        this.notasx.ap23,
        this.notasx.ap24,
        this.notasx.ap25,
        this.notasx.ap31,
        this.notasx.ap32,
        this.notasx.ap33,
        this.notasx.ap34,
        this.notasx.ap35,
        this.model.calificaciones.notas.examen
      );
    },

    ArraysStringNotas() {
      this.model.calificaciones.notas.arraysNote =
        this.notasx.ap11 +
        "," +
        this.notasx.ap12 +
        "," +
        this.notasx.ap13 +
        "," +
        this.notasx.ap14 +
        "," +
        this.notasx.ap15 +
        "," +
        this.notasx.ap21 +
        "," +
        this.notasx.ap22 +
        "," +
        this.notasx.ap23 +
        "," +
        this.notasx.ap24 +
        "," +
        this.notasx.ap25 +
        "," +
        this.notasx.ap31 +
        "," +
        this.notasx.ap32 +
        "," +
        this.notasx.ap33 +
        "," +
        this.notasx.ap34 +
        "," +
        this.notasx.ap35;
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

    __limpiarCampos: function() {
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

 
  
    selectOne(ids) {
      if (!this.userIds.includes(ids)) {
        this.userIds.push(ids);
      } else {
        this.userIds.splice(this.userIds.indexOf(ids), 1);
      }
    },
    deletedSelected: function() {
      this.allSelected = false;
      this.userIds = [];
    },
    selectAll: function() {
      this.allSelected = true;
      this.userIds = [];
      if (this.allSelected) {
        for (let user in this.inAlumnos) {
          this.userIds.push(this.inAlumnos[user].id);
        }
      }
    },
    editar: function() {
      let longitud = this.userIds.length;
      if (longitud == 1) {
        this.__limpiarCampos();
        let oneAlumno = this.inAlumnos.filter((x) => x.id == this.userIds[0]);
        this.idSubColeccion = oneAlumno[0].id;
        this.model.calificaciones._id = oneAlumno[0].fora;
        this.coleccionNotas = oneAlumno[0];
        this.isAlumno = oneAlumno[0].name;
        this.tab = "inicios";
        this.isVisible = "pane1";
      }
    },
    //--------------------------ELIMINAR REGISTRO DE NOTAS ALL------------------
    deleteNote() {
      let message = {
        title: "¿Destruir registro?",
        body: " Esta acción no se puede deshacer",
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
          this.dialogDeleteNote();
          setTimeout(() => {
            dialog.close();
            
          }, 1600);
        })
        .catch(() => {
          //this.$router.go(-1);
        });
    },
    dialogDeleteNote() {
      let longitud = this.userIds.length;
      let metadata = [];
      if (longitud > 0) {
         for (let i = 0; i < this.userIds.length; i++) {
          let oneAlumno = this.inAlumnos.filter((x) => x.id == this.userIds[i]);
          if (oneAlumno[0].promed==0) {

            metadata.push({id: this.userIds[i], fora:oneAlumno[0].fora})
          }
         }
      }
      let meta = metadata.length;
       if (meta > 0) {
         this.$proxies._notasProxi
           .deleteAllNote(this.$route.params.id, metadata) //-----------EDITAR CON AXIOS
           .then(() => {
             this.getDataActualizada();
             this.userIds= [];
             this.toast("Refistros destruidos");
           })
           .catch(() => {
             alert("No se puede completar la operación");
           });
       }else{
        this.toast("No se puede eliminar, ya se encuantra confirmado la nota");
       }
    },
    //-----------------------------------CONFIRMAR NOTAS ------------------------
    confirmNote(){
      let message = {
        title: "¿Confirmar promedios?",
        body: "Una vez que usted confirme los promedios de sus estudiantes para la nota final ya no podra hacer mas ediciones de las mismas",
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
          this.dialogConfirmNote();
          setTimeout(() => {
            dialog.close();
           
          }, 1600);
        })
        .catch(() => {
          //this.$router.go(-1);
        });
    },
    dialogConfirmNote(){
      let longitud = this.userIds.length;
      let metadata = [];
      if (longitud > 0) {
         for (let i = 0; i < this.userIds.length; i++) {
          let oneAlumno = this.inAlumnos.filter((x) => x.id == this.userIds[i]);
           if (oneAlumno[0].promed==0) {
            if (oneAlumno[0].par1!=0 && oneAlumno[0].par2!=0) {
              let quim1 = oneAlumno[0].par1;
              let quim2 = oneAlumno[0].par2;
              let total = parseFloat(quim1) + parseFloat(quim2);
              let promedio = (total / 2).toFixed(2);
              metadata.push({id: this.userIds[i], fora:oneAlumno[0].fora, promedio : promedio})
            }
           }
         }
      }
      let meta = metadata.length;
       if (meta > 0) {//
        this.$proxies._notasProxi
        .confirmfullnote(this.$route.params.id, metadata) //-----------EDITAR CON AXIOS
        .then(() => {
          this.getDataActualizada();
          this.userIds= [];
          this.toast("Promedio final fue confirmado exitosamente");
        })
        .catch(() => {
          alert("No se puede completar la operación");
        });
       }else{
        this.toast("Fue imposible confirmar las calificaciónes");
       }
     
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 3200,
        position: "bottom-center",
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
    nextPage(quimestre) {
      localStorage.removeItem("quimestre");
      let id = this.$route.params.id;
      if (!localStorage.getItem("quimestre")) {
        localStorage.setItem("quimestre", JSON.stringify(quimestre));
        this.$router.push({ path: `/multiplenote/${id}` });
      }
    },
    openNotesMost: function(quimestre){
        this.ifNotasMost= true;
        localStorage.removeItem("quimestre");
        if (!localStorage.getItem("quimestre")) {
          localStorage.setItem("quimestre", JSON.stringify(quimestre));
        }
    },
    closedNotesMost: function(){
      this.ifNotasMost= false;
    },
    updateNotasAll(){
      this.getDataActualizada();
    },
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.numPages = Math.ceil(articles.length / 7);
      return articles.slice(from, to);
    },
  },
  computed: {
    displayedArticles: function() {
      if (this.searchQuery) {
        return this.inAlumnos.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      }
      return this.paginate(this.inAlumnos);
    },
  },
  created() {
    this.verificarUsuario();
    this.readmyCourse();
  },
  validators: {
    "model.calificaciones.notas.quimestre"(value) {
      return this.$validator.value(value).required();
    },

    "notasx.ap11": function(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap12"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap13"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap14"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap15"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap21"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap22"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap23"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap24"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap25"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap31"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap32"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap33"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap34"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "notasx.ap35"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    "model.calificaciones.notas.examen"(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1, 10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
  },
};
