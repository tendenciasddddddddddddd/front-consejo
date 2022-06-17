import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../../../shared/ProgressBar"; //
import Modal from "../../../../shared/Modal";
import ActionRowHeader from "../../../../shared/ActionRowHeader"
import NoFound from "../../../../shared/NoFound"
import Cards from "../../../../shared/Cards"
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
  components: {
    ProgressBar,  Modal, ActionRowHeader, NoFound,Cards,
    CreateCurso: () => import( /* webpackChunkName: "CreateCurso" */ "../../../../components/componentClassroom/grupDocente/CreateCurso"),
  },
  data() {
    return {
      user: this.$store.state.user,
      roles: this.$store.state.user.roles,
      info: {},
      isData: false,
      isSelecTask: [],
      searchQuery: '',
      key: '0',
      //Pagina
      page: 1,
      perPage: 8,
      pages: [],
      numPages: 0,
      //CHILD
      ifChildGroup: false,
      ifChildNew: false,
      colorsh: []
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
    openModules(id) {
      this.$router.push(`/modulo-aula/${id.id}`)
    },
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


    //LISTA DE ESTUDIANTES
    openChildGruopen: function(id){
      this.key= id;
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
      let text_1 = 'Gestión'
      let text_2 = 'Aulas Virtales'
      this.$store.commit('updateHeader',{text_1, text_2})
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
