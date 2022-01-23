//const info = JSON.parse(localStorage.getItem("Xf"));
import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../../../shared/ProgressBar"; //
import ListAllEstudiantes from "../../../../views/moduleAulas/grupDocente/ListAllEstudiantes"
import CreateCurso from "../../../../views/moduleAulas/grupDocente/CreateCurso"

export default {
  components: {
    ProgressBar,
    ListAllEstudiantes,
    CreateCurso
  },
  data() {
    return {
      user: this.$store.state.user,
      roles: this.$store.state.user.roles,
      isRole: false,
      info: {},
      isData: false,
      curso: "",
      index: "",
      name: "MenuCursos",
      modals1: false,
      isSelecTask: [],
      modals: 'closed',
      searchQuery: '',
      key: '0',
      //Pagina
      page: 1,
      perPage: 8,
      pages: [],
      numPages: null,
      active: false,
      //CHILD
      ifChildGroup: false,
      ifChildNew: false,
    };
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
  methods: {
    mouseOver: function(){
      console.log('mouseOver')
      this.active = !this.active;   
   },
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.numPages = Math.ceil(articles.length / 8);
      this.isSelecUsers = [];
      return articles.slice(from, to);
    },
    //updateInfoDocentes(id)
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.user.id) {
        this.$proxies._aulaProxi
          .updateAulaDocentes(this.user.id)
          .then((x) => {
            this.info = x.data;
            this.isData = false;
            this.$Progress.finish();
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
            this.$Progress.fail();
          });
      }
    },
    dialogDelete() {
      this.$proxies._aulaProxi
        .remove(this.isSelecTask) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then(() => {
          this.getData();
          this.isSelecTask = [];
        })
        .catch((x) => {
          console.log("Error 401", x.response);
        });
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2300,
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
    selectOne(ids) {
      if (!this.isSelecTask.includes(ids)) {
        this.isSelecTask.push(ids);
      } else {
        this.isSelecTask.splice(this.isSelecTask.indexOf(ids), 1);
      }
    },
    __eliminar() {
      let message = {
        title: "¿Esta seguro que quiere eliminar?",
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
          this.numPages=1;
            this.page=1;
          setTimeout(() => {
            dialog.close();
            this.toast("Se elimino  cursos de su cuenta");
            
          }, 1200);
         
        })
        .catch(function() {
         
        });
    },
    openModal: function(id){
      this.key= id;
      this.modals = true;
     // document.body.classList.add("modal-open");
    },
    cerrarModal(){
      this.key = '0';
      this.modals = false;
     // document.body.classList.remove("modal-open");
    },
    //LISTA DE ESTUDIANTES
    openChildGruopen: function(){
      this.ifChildGroup= true;
    },
    closedChildGruopen: function(){
      this.ifChildGroup= false;
    },
    //MODAL DE NUEVO CURSO
    openChildNew: function(){
       this.ifChildNew = true;
    },
    closedChildNew: function(){
      this.ifChildNew = false;
    },
    refresh: function(){
      this.ifChildNew = false;
      this.getData();
    },
    verificarUsuario() {
      if (!restResourceService.docente(this.roles)) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.verificarUsuario();
    this.getData();
  },
};
