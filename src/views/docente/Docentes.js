import RestResource from '../../service/isAdmin'
const restResourceService = new RestResource();
import Spinner from '../../shared/Spinner';
import AlertHeader from "../../shared/AlertHeader.vue";
import Paginate2 from "../../shared/Paginate2.vue";
import ActionsRow from "../../shared/ActionsRow.vue";
export default {
  name: "Docentes",
  components: {
    Spinner,
    DocenteCreateOrUpdate: () => import( /* webpackChunkName: "CreateOrUpdate" */ './components/Add.vue'),
    AlertHeader,
    GridUser : () => import( /* webpackChunkName: "GridUser" */ '../../components/agGrid/GridUser.vue'),
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
      isSelecUsers: [],
      subtitulo: 'none',
      iseliminaddo: false,
      isSearch: false,
      rows: 8,
      selected: [],
      allSelected: false,
      userIds: [],
      //CHILD COMPONENT
      ifCreateUpdate: false,
      idUser: null,
      ifGrid : false,
    };
  },
  methods: {
    verificarUsuario() {
      let text_1 = 'Administración'
      let text_2 = 'Docentes'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    openChildDocente: function () {
      let aux = this.userIds.length;
      if (aux === 1) {
        this.idUser = this.userIds[0];
        this.ifCreateUpdate = true;
      }
    },
    openChildDocente2: function () {
      this.idUser = null;
      this.ifCreateUpdate = true;
    },
    closedChildDocente: function () {
      this.ifCreateUpdate = false;
    },
    openAgGrid: function () {
      this.ifGrid = true;
    },
    closeAgGrid: function () {
      this.ifGrid = false;
    },
    refreshData: function () {
      this.ifCreateUpdate = false;
      this.getAll(this.paginaActual, 8);
    },
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = this.rows + ' filas por página';
      this.$proxies._registroProxi
        .getAllDocentes(pag, lim) 
        .then((x) => {
          this.info = x.data.usuarios;
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
        .catch(function () {});
    },
    dialogDelete() {
      this.iseliminaddo = true;
      let isArray = this.userIds.length;
      if (isArray > 0) {
        this.$proxies._registroProxi
          .removeDocentes(this.userIds)
          .then(() => {
            this.iseliminaddo = false;
            this.userIds = [];
            this.getAll(this.paginaActual, 8);
            this.allSelected = false;
          })
          .catch(() => {
            this.iseliminaddo = false;
          });
      }
    },
    desactiveState() { //activateNivel
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
        .catch(function () {});
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
    changeSearch(textSearch) { 
      if (textSearch.length > 3) {
        this.isSearch = true;
        this.isLoading = true;
        this.$proxies._registroProxi
          .queryDocente(textSearch) 
          .then((x) => {
            this.info = x.data;
            this.isLoading = false;
          })
          .catch(() => {
            console.log("Error imposible");
            this.isLoading = false;
          });
      }
    },
    salirBusqueda: function() {
      this.getAll(1, 8);
      this.isSearch = false;
    },
    changedQuery(num) {
      this.rows = num;
      this.getAll(1, num);
    },
    onPageChange(page) {
      this.getAll(page, this.rows);
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
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
  },
  created() {
    this.verificarUsuario();
    this.getAll(1, 8);
  },
};