import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import Spinner from "../../shared/Spinner";
import AlertHeader from "../../shared/AlertHeader.vue";
import CustomInput from "../../shared/CustomInput.vue";
import ButtonLoading from "../../shared/ButtonLoading.vue";
import Paginate2 from "../../shared/Paginate2.vue";
import ActionsRow from "../../shared/ActionsRow.vue";
export default {
  name: "Materias",
  components: {
    Spinner,
    AlertHeader,
    CustomInput,
    ButtonLoading,
    Paginate2,ActionsRow,
    Modal: () =>
      import(/* webpackChunkName: "Modal" */ "../../shared/Modal.vue"),
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      totalNotas: 0,
      paginaActual: 1,
      info: null,
      ifLoad: false,
      checked: "",
      pagg: null,
      pagina: 0,
      paginas: 0,
      isLoading: false,
      model: {
        _id: null,
        nombre: null,
      },
      isSelecUsers: [],
      subtitulo: "none",
      iseliminaddo: false,
      isCarga: false,
      visible: false,
      allSelected : false,
      MsmError : "",
    };
  },
  methods: {
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = lim + " filas por página";
      this.$proxies._matriculaProxi
        .getAll(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.info = x.data.niveles;
          this.pagg = x.data;
          this.pagina = this.pagg.pagina;
          this.paginas = this.pagg.paginas;
          this.totalNotas = this.pagg.total;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  
    save() {
      this.isSelecUsers = [];
      this.$validate().then((success) => {
        if (!success) {
          this.toast("Por favor llena correctamente los campos solicitados");
          return;
        }
        if (this.model._id) {
          this.ifLoad = true;
          this.model.nombre = this.model.nombre.trim();
          this.$proxies._matriculaProxi
            .update(this.model._id, this.model)
            .then(() => {
              this.close();
              this.ifLoad = false;
              this.getAll(this.pagina, 8);
              this.MsmError ="";
            })
            .catch((error) => {
              this.ifLoad = false;
              if(error.response){
                if(error.response.status==500){
                  this.MsmError = "Error ese registro ya existe"
                }
              }
            });
        } else {
          this.ifLoad = true;
          this.model.nombre = this.model.nombre.trim();
          this.$proxies._matriculaProxi
            .create(this.model) 
            .then(() => {
              this.ifLoad = false;
              this.close();
              this.getAll(this.pagina, 8);
            })
            .catch((error) => {
              this.ifLoad = false;
              if(error.response){
                if(error.response.status==500){
                  this.MsmError = "Error ese registro ya existe"
                }
              }
            });
        }
      });
    },
    gets() {
      let isArray = this.isSelecUsers.length;
      if (isArray === 1) {
        this.isCarga = true;
        this.openModal();
        this.$proxies._matriculaProxi
          .get(this.isSelecUsers[0])
          .then((x) => {
            this.model = x.data;
            this.isCarga = false;
          })
          .catch(() => {
            this.isCarga = false;
          });
      }
    },

    selectUser(ids) {
      if (!this.isSelecUsers.includes(ids)) {
        this.isSelecUsers.push(ids);
      } else {
        this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
      }
    },
    selectAll: function() {
      this.allSelected= true;
      this.isSelecUsers = [];
      if (this.allSelected) {
        for (let user in this.info) {
          this.isSelecUsers.push(this.info[user]._id);
        }
      } 
    },
    deletedSelected: function() {
      this.allSelected= false;
      this.isSelecUsers = [];
    },
    changedQuery(num) {
      this.getAll(1, num);
    },
    onPageChange(page) {
      this.getAll(page, 8);
    },
    remove() {
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
          this.dialogDelete();
          setTimeout(() => {
            dialog.close();
            this.toast("Se elimino registro de sistema con su cuenta");
          }, 600);
        })
        .catch(function() {});
    },
    dialogDelete() {
      this.iseliminaddo = true;
      if (this.isSelecUsers.length > 0) {
        this.$proxies._matriculaProxi
          .remove(this.isSelecUsers)
          .then(() => {
            this.iseliminaddo = false;
            this.isSelecUsers = [];
            this.getAll(this.pagina, 6);
          })
          .catch(() => {
            this.iseliminaddo = false;
          });
      }
    },
    desactiveState(){//activateNivel
      let message = {
        title: "¿Cambiar el estado?",
        body: " Esta acción cambiara el estado de los registros",
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
          this.dialogState();
          setTimeout(() => {
            dialog.close();
            this.toast("Se cambio el estado del registro");
          }, 600);
        })
        .catch(function() {});
    },
    dialogState() {
      if (this.isSelecUsers.length > 0) {
        let reg = this.info.filter((x)=> x._id == this.isSelecUsers[0]);
        let state = reg[0].estado == 1 ? 0 : 1;
        this.$proxies._matriculaProxi
         .activatePeriodo(this.isSelecUsers, state)
          .then(() => {
            this.iseliminaddo = false;
           this.isSelecUsers = [];
            this.getAll(this.pagina, 6);
          })
           .catch(() => {
            this.iseliminaddo = false;
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
    openModal() {
      this.visible = true;
      this.model._id = "";
      this.model.nombre = "";
      this.MsmError = "";
      this.checked = "";
    },
    close() {
      this.visible = false;
    },
  
    
    verificarUsuario() {
      let text_1 = 'Matricula'
      let text_2 = 'Periodos'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.verificarUsuario();
  },
  mounted() {},
  watch: {
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.getAll(pagina, 8);
        this.isSelecUsers = [];
        this.paginaActual = pagina;
      },
    },
  },
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    "model.nombre"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(3)
        .maxLength(40);
    },
  },
};
