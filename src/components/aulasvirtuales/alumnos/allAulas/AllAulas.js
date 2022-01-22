import Analitic from "../../../../shared/Analitic";
import EffectLoad from "../../../../shared/EffectLoad"; //

import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
export default {
  name: "MenuCursos",
  components: {
    Analitic,
    EffectLoad,
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
      numPages: null,
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
      
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.estudiante(this.roles)) {
        this.$router.push("/");
      }
    },
    appInit() {
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.modalidad = info.modalidad;
      this.model.estudiantes.name = info.nombre;
      this.model.estudiantes.email = info.correo;
    },
    getData() {
      this.isData = true;
      if (this.modalidad) {
        this.$proxies._aulaProxi
          .updateAulaEstudantes(this.modalidad)
          .then((x) => {
            this.info = x.data;
           
            this.isData = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
          });
      }
    },
    verificarCalve(obj, clave) {
      this.__limpiarCampos();
      this.keys = obj.codigo;
      this.nomMateria = obj.materia;
      this.model._id = obj._id;
      this.isSelect = obj;
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
            title: "Matricula",
            body: "¿Quiere inscribirse a "+obj.materia + "?",
          },
          {
            promptHelp: 'Ingrese el ping de acceso y "[+:okText]"',
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
              //this.toast("Se elimino  cursos de su cuenta");
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
            this.$router.push({ path: `/task-config2/${x.data}` });
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
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.numPages = Math.ceil(articles.length/this.perPage);
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
