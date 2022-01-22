import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
import Spinner from '../../../shared/Spinner'
export default {
  name: "indexUsiario",
  components: {
    Spinner
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
      isSelecUsers: [],
      modals: 'closed',
      subtitulo: 'none',
      iseliminaddo : false,
      contador : 0,
      contador2 : 0,
      viewtable:1,
      listbuscador: {},
      searchQuery: null,
      rows: 6,
      isActive : false,
      selected: [],
      allSelected: false,
      userIds: [],
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
    verificarUsuario(){
      if(!restResourceService.admin(this.roles)){
        this.$router.push("/");
      }
    },
    getAll(pag) {
      this.isLoading = true;
      this.subtitulo = this.rows + ' filas por página';
      this.$proxies._registroProxi
        .getAll(pag, this.rows) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
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
      if(isArray>0){
        this.$proxies._registroProxi
          .remove(this.userIds)
          .then(() => {
            this.iseliminaddo = false;
            this.userIds= [];
            this.getAll(this.paginaActual,6); 
          })
          .catch(() => {
            console.log("Error imposible");
          });   
     }
    },
    editar(){
      let isArray = this.userIds.length;
        if(isArray===1){
          this.$router.push({path: `/Estudiate/${this.userIds[0]}/edit`})
        }
    },
    buscar(){//buscadorUsuario
      this.userIds = [];
      this.contador = this.contador +1;
      this.contador2 = this.contador2 +1;
      if (this.contador===1) {
         this.viewtable = 2;
         if (this.contador2===1) {
           this.isLoading = true;
           this.$proxies._registroProxi
             .buscadorAlumno() //EJECUTA LOS PROXIS QUE INYECTA AXIOS
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
     selectOne(ids) {
      
      if (!this.userIds.includes(ids)) {
        this.userIds.push(ids);
      } else {
        this.userIds.splice(this.userIds.indexOf(ids), 1);
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
     salirBusqueda: function(){
       this.viewtable = 1;
       this.contador=0;
       this.searchQuery = null;
     },
     cambiar_pagina: function(num){
      this.rows = num;
      this.getAll(1);
     }
  },
  created() {
    this.verificarUsuario();
  },
  watch: {
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.getAll(pagina);
        this.userIds = [];
        this.paginaActual = pagina;
      },
    },
    // 'isSelecUsers' : function () {
    //   if(this.isSelecUsers.length!=1){
    //     this.isActive = true;
    //     console.log(this.isActive)
    //   }else{
    //     this.isActive = false;
    //     console.log(this.isActive)
    //   }
    // }
  },
};
