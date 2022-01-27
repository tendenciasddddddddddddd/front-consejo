//import Paginacion from '../../../shared/Paginacion'
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
import Spinner from "../../../shared/Spinner";
export default {
  name: "Users",
  components: {
    Spinner,
    CreateOrUpdate : () => import( /* webpackChunkName: "CreateOrUpdate" */ '../../../components/admin/usersComponent/CreateOrUpdate.vue')
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      totalNotas: 0,
      paginaActual: 1,
      info: null,
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
        foto: null,
        status: null,
        telefono: null,
        updatedAt: null,
      },
      isSelecUsers: [],
      iseliminaddo: false,
      contador: 0,
      contador2: 0,
      viewtable: 1,
      listbuscador: {},
      searchQuery: null,
      modals: "closed",
      subtitulo: "none",
      selected: [],
      allSelected: false,
      userIds: [],
      //CHILD COMPONENT
      ifCreateUpdate: false,
      idUser: null,

    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
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
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = lim + " filas por página";
      this.$proxies._usuarioProxi
        .getAll(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.info = x.data.usuarios;
          this.pagg = x.data;
          this.pagina = this.pagg.pagina;
          this.paginas = this.pagg.paginas;
          this.totalNotas = this.pagg.total;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error imposible");
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
    selectAll: function() {
      this.allSelected= true;
      this.userIds = [];
      if (this.allSelected) {
        for (let user in this.info) {
          this.userIds.push(this.info[user]._id);
        }
      } 
    },
    deletedSelected: function() {
      this.allSelected= false;
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
        .catch(function() {});
    },
    dialogDelete() {
      this.iseliminaddo = true;
      let isArray = this.userIds.length;
      if (isArray > 0) {
        this.$proxies._usuarioProxi
          .remove(this.userIds)
          .then(() => {
            this.iseliminaddo = false;
            this.getAll(this.paginaActual, 6);
          })
          .catch(() => {
            console.log("Error imposible");
          });
      }
    },
    editar() {
      let isArray = this.userIds.length;
      if (isArray === 1) {
        this.$router.push({ path: `/usuarios/${this.userIds[0]}/edit` });
      }
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
    buscar() {
      this.contador = this.contador + 1;
      this.contador2 = this.contador2 + 1;
      if (this.contador === 1) {
        this.viewtable = 2;
        if (this.contador2 === 1) {
          this.isLoading = true;
          this.$proxies._usuarioProxi
            .buscadorUsuario() //EJECUTA LOS PROXIS QUE INYECTA AXIOS
            .then((x) => {
              this.listbuscador = x.data.usuarios;
              this.isLoading = false;
            })
            .catch(() => {
              console.log("Error imposible");
              this.isLoading = false;
            });
        }
      }
    },
    salirBusqueda: function() {
      this.viewtable = 1;
      this.contador = 0;
      this.searchQuery = null;
    },
    openChildUser: function() {
        let aux = this.userIds.length;
        if (aux===1) {
            this.idUser = this.userIds[0];
            this.ifCreateUpdate = true;
        }
    },
    openChildUser2: function() {
        this.idUser = null;
        this.ifCreateUpdate = true;
    },
    closedChildUser: function() {
        this.ifCreateUpdate = false;
    },
    refreshUser : function() {
        this.ifCreateUpdate = false;
        this.getAll(this.paginaActual, 6);
    },
  },
  created() {
    this.verificarUsuario();
  },
  watch: {
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.getAll(pagina, 6);
        this.userIds = [];
        this.paginaActual = pagina;
      },
    },
  },
};
