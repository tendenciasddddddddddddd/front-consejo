import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import Spinner from "../../shared/Spinner";
import Paginate2 from "../../shared/Paginate2.vue";
import ActionsRow from "../../shared/ActionsRow.vue";
export default {
  name: "Users",
  components: {
    Spinner,
    AddUser: () => import( /* webpackChunkName: "AddUser" */ './components/AddUser.vue'),
    Paginate2,
    ActionsRow
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      totalNotas: 0,
      paginaActual: 1,
      info: {},
      pagg: null,
      pagina: 0,
      paginas: 0,
      isLoading: false, //EL SNIPPER CARGA EN FALSO
      model: {
        id: "",
        username: null,
        email: null,
        password: null,
        nombres: null,
        apellidos: null,
        cedula: null,
        foto: 'https://res.cloudinary.com/dvpp08pji/image/upload/v1666453688/avatar_didazq.webp',
        status: null,
        telefono: null,
        updatedAt: null,
      },
      isSelecUsers: [],
      iseliminaddo: false,
      contador: 0,
      contador2: 0,
      viewtable: 1,
      isSearch: false,
      searchQuery: '',
      subtitulo: "none",
      selected: [],
      allSelected: false,
      userIds: [],
      //CHILD COMPONENT
      ifCreateUpdate: false,
      idUser: null,
      visible: false,
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery.length > 1) {
        return this.listbuscador.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.fullname.toLowerCase().includes(v));
        });
      }
    },
  },
  methods: {

    verificarUsuario() {
      let text_1 = 'Administración'
      let text_2 = 'Usuarios'
      this.$store.commit('updateHeader', { text_1, text_2 })
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    getAll(pag, lim) {
      this.$Progress.start();
      this.isLoading = true;
      this.subtitulo = lim + " filas por página";
      this.$proxies._usuarioProxi
        .getAll(pag, lim)
        .then((x) => {
          this.info = x.data.usuarios;
          this.pagg = x.data;
          this.pagina = this.pagg.pagina;
          this.paginas = this.pagg.paginas;
          this.totalNotas = this.pagg.total;
          this.isLoading = false;
          this.$Progress.finish();
        })
        .catch(() => {
          this.isLoading = false;
          this.$Progress.fail();
        });
    },

    selectOne(ids) {
      if (!this.userIds.includes(ids)) {
        this.userIds.push(ids);
      } else {
        this.userIds.splice(this.userIds.indexOf(ids), 1);
      }
    },
    selectAll: function () {
      this.allSelected = true;
      this.userIds = [];
      if (this.allSelected) {
        for (let user in this.info) {
          this.userIds.push(this.info[user]._id);
        }
      }
    },
    deletedSelected: function () {
      this.allSelected = false;
      this.userIds = [];
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
            this.toast("Se elimino a usuarios de sistema con su cuenta");
          }, 1000);
        })
        .catch(function () { });
    },
    dialogDelete() {
      this.iseliminaddo = true;
      let isArray = this.userIds.length;
      if (isArray > 0) {
        this.$proxies._usuarioProxi
          .remove(this.userIds)
          .then(() => {
            this.iseliminaddo = false;
            this.allSelected = false;
            this.getAll(this.paginaActual, 6);
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
    changeSearch(textSearch) {
      if (textSearch.length > 3) {
        this.isSearch = true;
        this.isLoading = true;
        this.$proxies._usuarioProxi
          .queryUsuario(textSearch)
          .then((x) => {
            this.info = x.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      }
    },

    desactiveState() {
      if (this.userIds.length == 1) {
        let message = {
          title: "¿Cambiar el estado?",
          body: " Esta acción cambiara el estado del usuario",
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
      if (this.userIds.length > 0) {
        let reg = this.info.filter((x) => x._id == this.userIds[0]);
        let state = reg[0].status == 1 ? 0 : 1;
        this.$proxies._usuarioProxi
          .activateUsers(this.userIds, state)
          .then(() => {
            this.iseliminaddo = false;
            this.userIds = [];
            this.getAll(this.paginaActual, 8);
          })
          .catch(() => {
            this.iseliminaddo = false;
          });
      }
    },
    salirBusqueda: function () {
      this.getAll(1, 8);
      this.isSearch = false;
    },
    openChildUser: function () {
      let aux = this.userIds.length;
      if (aux === 1) {
        this.idUser = this.userIds[0];
        this.ifCreateUpdate = true;
      }
    },
    openChildUser2: function () {
      this.$dialog.alert("::: No puede agregar usuarios :::");
      //this.idUser = null;
      //this.ifCreateUpdate = true;
    },
    closedChildUser: function () {
      this.ifCreateUpdate = false;
    },
    refreshUser: function () {
      this.ifCreateUpdate = false;
      this.getAll(this.paginaActual, 6);
    },
  },
  created() {
    this.verificarUsuario();
    this.getAll(1, 8);
  },
};
