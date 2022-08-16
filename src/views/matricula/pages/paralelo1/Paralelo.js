import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import Spinner from "../../../../shared/ProgressBar.vue";
import Paginate from "../../../../shared/Paginate.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import ServiceMatricula from "../../../../service/funcions";
const ResultServiceMatricula = new ServiceMatricula();

export default {
  name: "EslistarParalelo",
  components: {
    Spinner,
    Paginate,ScrimModal
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      isVisible: "panel1",
      tabla: "1",
      idds: null,
      istabs: "1",
      paralelos: [
        {
          id: "0",
          nombre: "B",
        },
        {
          id: "1",
          nombre: "G",
        },
      ],
      check: {
        id: null,
        nombre: null,
      },
      listPeriodo: null,
      isLoading1: false,
      listniveles: null,
      isTabla: null,
      isConfig: null,
      filtros: null,
      infoMat: null,
      infoMat2: null,
      model: {
        curso: null,
      },
      isSelecCurosos: {},
      isClick: false,
      isClick2: false,
      isRemoveSelecC: [],
      checked: "",
      index: "0",
      nombre_curso: "",
      isSelected: false,
      arrays: [],
      //PAGINATE
      searchQuery: "",
      //Pagina
      page: 1,
      perPage: 8,
      pages: [],
      numPages: 0,
      totalNotas: 0,
      allSelected: false,
    };
  },
  computed: {
    displayedArticles: function() {
      return this.paginate(this.infoMat);
    },
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.numPages = Math.ceil(articles.length / 8);
      return articles.slice(from, to);
    },
    onPageChange(page) {
      this.page = page;
    },
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
      this.arrays = ResultServiceMatricula.arrays_of_avatar();
    },
    __listNivele() {
      this.isLoading1 = true;
      this.$Progress.start();
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtross = x.data;
          this.listniveles = filtross.filter((x) => x.modalidad == "Intensivo");
          this.isLoading1 = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
          this.$Progress.finish();
        });
    },
    __cambios(cursos) {
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getFullMatricula(cursos)
        .then((x) => {
          this.filtros = x.data.matriculados;
          this.infoMat = this.filtros.filter((x) => x.curso == "Undefined");
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },

    selectcursos(ids) {
      if (!this.isSelecCurosos.includes(ids)) {
        this.isSelecCurosos.push(ids);
      } else {
        this.isSelecCurosos.splice(this.isSelecCurosos.indexOf(ids), 1);
      }
    },
    selectAll: function() {
      this.allSelected = true;
      this.isSelecCurosos = [];
      if (this.allSelected) {
        for (let user in this.infoMat) {
          this.isSelecCurosos.push(this.infoMat[user]._id);
        }
      }
    },
    deletedSelected: function() {
      this.allSelected = false;
      this.isSelecCurosos = [];
    },
    limpiar: function() {
      this.isClick = false;
      this.isSelecCurosos = [];
      this.model.curso = "";
      this.allSelected = false;
    },
    remove() {
      //METODO PARA ELIMINAR  ROW
      this.isClick = true;
      let isArray = this.isSelecCurosos.length;
      this.model.curso = this.check;
      if (isArray > 0 && this.isSelected) {
        this.$proxies._matriculaProxi
          .updateMatricula(this.isSelecCurosos, this.model)
          .then(() => {
            this.__cambios(this.idds);
            this.limpiar();
            this.toast(
              "Se asigno a " +
                isArray +
                " estudiantes al paralelo " +
                this.model.curso
            );
          })
          .catch(() => {
            this.$dialog.alert('Error en ng server')
            this.isClick = false;
          });
      } else {
        
        this.$dialog.alert('SELECIONE UN PARALELO PARA PODER ASIGNAR ESTA LISTA DE ESTUDIANTES')
      }
    },

    onChange(id) {
      this.check = id;
      this.isSelected = true;
    },

    verLista() {
      if (this.index != "0") {
        this.__cambios(this.index);
        this.idds = this.index;
        this.isVisible = "panel2";
        this.istabs = "1";
        this.check = "";
        this.isSelected = false;
        this.isSelecCurosos = [];
      }
    },
    clicMe(keys, nombreCurso) {
      this.index = keys;
      this.nombre_curso = nombreCurso;
    },

    __volverAsignacion: function() {
      this.istabs = "1";
      this.check = "";
      this.isSelected = false;
      this.isRemoveSelecC = [];
    },
    //------------------------------------CONFIGURAR MATRICULA---------------isConfig
    __mostrarConf(curse) {
      this.istabs = "2";
      this.infoMat2 = this.filtros.filter((x) => x.curso == curse);
      this.isRemoveSelecC = [];
    },
    __mostrarConf2(curse) {
      this.istabs = "3";
      this.infoMat2 = this.filtros.filter((x) => x.curso == curse);
      this.isRemoveSelecC = [];
    },
    removeSelectCursos(key) {
      let longitud = this.isRemoveSelecC.length;
      let isExiste = 0;
      if (longitud > 0) {
        for (let i = 0; i < this.isRemoveSelecC.length; i++) {
          if (this.isRemoveSelecC[i] == key) {
            this.isRemoveSelecC.splice(i, 1);
            isExiste = 1;
            break;
          }
        }
        if (isExiste === 0) {
          this.isRemoveSelecC.push(key);
        }
      } else {
        this.isRemoveSelecC.push(key);
      }
    },
    regresar: function() {
      this.isVisible = "panel1";
      this.index = "0";
      this.allSelected = false;
    },
    remove2() {
      //METODO PARA ELIMINAR  ROW
      this.isClick2 = true;
      let isArray = this.isRemoveSelecC.length;
      this.model.curso = "Undefined";
      if (isArray > 0) {
        this.$proxies._matriculaProxi
          .updateMatricula(this.isRemoveSelecC, this.model)
          .then(() => {
            this.isClick2 = false;
            this.isRemoveSelecC = [];
            this.__cambios(this.idds);
            this.__volverAsignacion();
            this.toast("Se removio de paralelo a  " + isArray + " estudiantes");
          })
          .catch(() => {
            alert(
              "Error algo salio mal!! envie un sms en el chat para que le den soporte"
            );
            this.isClick2 = false;
          });
      }
    },
    close(){
      this.$emit('myEventClosedModalParalelo1');
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

  created() {
    this.verificarUsuario();
    this.__listNivele();
  },
};
