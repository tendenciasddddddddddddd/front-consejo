import ProgressBar from "../../../../shared/ProgressBar"; //
import RestResource from "../../../../service/isAdmin";
import ActionRowHeader from "../../../../shared/ActionRowHeader"
import NoFound from "../../../../shared/NoFound"
const restResourceService = new RestResource();
const arrayColors = [
  "#0f71ae",
  "#1466c9",
  "#303d9d",
  "#53ab79",
  "#ba4d8e",
  "#1976d3",
  "#874197",
  "#00b6d3",
];
export default {
  name: "MenuCursos",
  components: {
    ProgressBar,ActionRowHeader, NoFound
  },
  data() {
    return {
      info: {},
      isData: false,
      modalidad: "",
      roles: this.$store.state.user.roles,
      searchQuery: '',
      //Pagina
      page: 1,
      perPage: 8,
      pages: [],
      numPages: 0,
      nomMateria: "None",
      keys: "",
      llave: null,
      isError: "",
      isSelect: null,
      model: {
        _id: null,
        estudiantes: {
          usuario: this.$store.state.user.id,
          name: "",
          email: "",
        },
      },
      ifLoad: false,
      colorsh: []
    };
  },
  methods: {
    verificarUsuario() {
      let text_1 = 'Aulas Virtales'
      let text_2 = 'Todos los cursos'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.estudiante(this.roles)) {
        this.$router.push("/");
      }
    },
    appInit() {
      const infos = JSON.parse(localStorage.getItem("Xf"));
      this.modalidad = infos.modalidad;
      this.model.estudiantes.name = infos.nombre;
      this.model.estudiantes.email = infos.correo;
    },
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.modalidad) {
        this.$proxies._aulaProxi
          .updateAulaEstudantes(this.modalidad)
          .then((x) => {
            this.info = x.data;
            this.$Progress.finish();
            this.isData = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
            this.$Progress.finish();
          });
      }
    },
    onPageChange: function(page) {
      this.page = page;
    },
    changeSearch : function(spech){
      this.searchQuery = spech
    },
    arrayShorthand: function() {
      this.colorsh = arrayColors.sort(function() {
        return Math.random() - 0.5;
      });
    },

    verificarCalve(obj, clave) {
      this.__limpiarCampos();
      const daas = this.info.filter((x) => x._id == obj._id );
      this.keys = daas[0].codigo;
      this.nomMateria = daas[0].materia;
      this.model._id = daas[0]._id;
      this.isSelect = daas[0];
      if (clave== this.keys) {
        return true;
      }else{
        return false;
      }
    },
    dialog(obj) {
      this.$dialog
        .prompt(
          {
            title: "¿Quiere inscribirse a este curso?",
            body: "Ingrese el código de acceso a este curso",
          },
          {
            promptHelp: 'Código',
            loader: true,
            okText: "Matricular",
            cancelText: "Cancelar",
          }
        )
        .then((dialog) => {
          let confirmations = this.verificarCalve(obj, dialog.data);
          if (confirmations ) {
            this.save();
            setTimeout(() => {
              dialog.close();
            }, 1200);
          }else{
            this.$dialog.alert('La clave que ingreso no es invalida, intenta otra vez ❌')
            dialog.close();
          }
        })
        .catch(() => {
        });
    },
    save() {
        this.ifLoad = true;
        if (this.AlgoritmoEstidanteUnico()) {
          this.toast("Ya te encuentras matrculado en este curso");
          this.ifLoad = false;
          return;
        }
        this.$proxies._aulaProxi
          .update(this.model._id, this.model) //-----------EDITAR CON AXIOS
          .then((x) => {
            this.ifLoad = false;
            this.$router.push({ path: `/module-aulas/${x.data}` });
          })
          .catch((err) => {
            console.log("Error", err);
            this.ifLoad = false;
          });
      
    },
    AlgoritmoEstidanteUnico() {
      let duplicado = this.isSelect.estudiantes.filter(
        (x) => x.usuario == this.model.estudiantes.usuario
      );
      let isExiste = duplicado.length;
      if (isExiste > 0) {
        return true;
      } else {
        return false;
      }
    },
    __limpiarCampos() {
      this.keys = "";
      this.nomMateria = "";
      this.model._id = "";
      this.llave = "";
      this.isError = "";
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 3100,
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
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.numPages = Math.ceil(articles.length / 8);
      this.isSelecUsers = [];
      this.arrayShorthand();
      return articles.slice(from, to);
    },
  },
  created() {
    this.verificarUsuario();
    this.appInit();
    this.getData();
  },


  computed: {
    displayedArticles: function() {
      if (this.searchQuery.length>1) {
        return this.info.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.materia.toLowerCase().includes(v));
        });
      } else {
        return this.paginate(this.info);
      }
    },
  },
};
