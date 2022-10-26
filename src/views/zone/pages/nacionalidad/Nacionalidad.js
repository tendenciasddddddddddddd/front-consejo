import Spinner from '../../../../shared/Spinner';
import CustomInput from "../../../../shared/CustomInput.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
import Paginate2 from "../../../../shared/Paginate2.vue";
import AlertHeader from "../../../../shared/AlertHeader.vue";
import ActionsRow from "../../../../shared/ActionsRow.vue";
export default {
  name: 'Nacionalidad',
  components: {
    Spinner, CustomInput,
    ButtonLoading,
    Paginate2,
    AlertHeader,
    ActionsRow,
    Modal: () => import(/* webpackChunkName: "Modal" */ "../../../../shared/Modal.vue"),
  },
  data() {
    return {
      totalNotas: 0,
      paginaActual: 1,
      info: {},
      ifLoad: false,
      pagg: null,
      MsmError: "",
      pagina: 0,
      paginas: 0,
      isLoading: false, //EL SNIPPER CARGA EN FALSO
      isModalVisible: false,
      model: {
        _id: null,
        nombre: null,
      },
      isSelecUsers: [],
      subtitulo: 'none',
      iseliminaddo: false,
      isCarga: false,
      visible: false,
      allSelected: false,
    }
  },
  methods: {
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = lim + ' filas por página';
      this.$proxies._zonasProxi
        .getAllNacionalidad(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.info = x.data.datas;
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
      this.$validate().then(success => {
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return
        }
        if (this.model._id) {
          this.ifLoad = true;
          this.model.nombre = this.model.nombre.trim();
          this.$proxies._zonasProxi.updateNacionalidad(this.model._id, this.model)
            .then(() => {
              this.close();
              this.ifLoad = false;
              this.getAll(this.pagina, 8);
            })
            .catch((error) => {
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 500) {
                  this.MsmError = "Error ese registro ya existe"
                }
              } else {
                console.log('Error', error.message);
              }
            });
        } else {
          this.ifLoad = true;
          this.model.nombre = this.model.nombre.trim();
          this.$proxies._zonasProxi.createNacionalidad(this.model) 
            .then(() => {
              this.ifLoad = false;
              this.close();
              this.getAll(this.pagina, 8);
            })
            .catch((error) => {
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 500) {
                  this.MsmError = "Error ese registro ya existe"
                }
              } else {
                console.log('Error', error.message);
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
        this.$proxies._zonasProxi.getIdNacionalidad(this.isSelecUsers[0])
          .then((x) => {
            this.model = x.data;
            this.isCarga = false;
          }).catch(() => {
            this.isCarga = false;
          });
      }
    },
    changedQuery(num) {
      this.getAll(1, num);
    },
    onPageChange(page) {
      this.getAll(page, 8);
    },
    selectUser(ids) {
      if (!this.isSelecUsers.includes(ids)) {
        this.isSelecUsers.push(ids);
      } else {
        this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
      }
    },
    selectAll: function () {
      this.allSelected = true;
      this.isSelecUsers = [];
      if (this.allSelected) {
        for (let user in this.info) {
          this.isSelecUsers.push(this.info[user]._id);
        }
      }
    },
    deletedSelected: function () {
      this.allSelected = false;
      this.isSelecUsers = [];
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
          }, 800);
        })
        .catch(function () { });
    },
    dialogDelete() {
      this.iseliminaddo = true;
      if (this.isSelecUsers.length > 0) {
        this.$proxies._zonasProxi
          .removeNacionalidad(this.isSelecUsers)
          .then(() => {
            this.iseliminaddo = false;
            this.isSelecUsers = [];
            this.getAll(this.pagina, 8);
            this.allSelected = false;
          })
          .catch(() => {
            this.iseliminaddo = false;
          });
      } else {
        this.$dialog.alert("::: Seleccione un campo para continuar :::");
      }
    },
    desactiveState() {//activateNivel
      if (this.isSelecUsers.length == 1) {
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
          .catch(function () { });
      } else {
        this.$dialog.alert("::: Seleccione un campo para continuar :::");
      }
    },
    dialogState() {
      if (this.isSelecUsers.length > 0) {
        let reg = this.info.filter((x) => x._id == this.isSelecUsers[0]);
        let state = reg[0].estado == 1 ? 0 : 1;
        this.$proxies._zonasProxi
          .activateNacionalidad(this.isSelecUsers, state)
          .then(() => {
            this.iseliminaddo = false;
            this.isSelecUsers = [];
            this.getAll(this.pagina, 8);
          })
          .catch(() => {
            this.iseliminaddo = false;
          });
      }
    },
    openModal() {
      this.visible = true;
      this.model._id = "";
      this.model.nombre = "";
      this.model.prov = "";
      this.model.fkProvincia = "";
      this.MsmError = "";
    },
    close() {
      this.visible = false;
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
        position: "top-right",
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
    verificarUsuario() {
      let text_1 = 'Zonas'
      let text_2 = 'Nacionalidad'
      this.$store.commit('updateHeader', { text_1, text_2 })
    },
  },
  created() {
    this.verificarUsuario();
    this.getAll(1, 8);
  },
  validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    'model.nombre'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(3)
        .maxLength(30);
    },
  },
}