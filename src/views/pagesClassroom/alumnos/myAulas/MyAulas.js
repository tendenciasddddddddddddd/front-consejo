import RestResource from '../../../../service/isAdmin'
import ProgressBar from "../../../../shared/ProgressBar"; //
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
  name: "MyAulas",
  components: {
    ProgressBar,ActionRowHeader, NoFound, 
  },
  data() {
    return {
      user: this.$store.state.user,
      roles: this.$store.state.user.roles,
      info: [],
      isData: false,
      my : this.$store.state.user.id,
      isResult: [],
      searchQuery: null,
        //Pagina 
       page: 1,
       perPage: 8,
       pages: [],
       numPages:0,
        //CHILD
      ifChildAllClassmate: false,
      colorsh: [],
    };
  },
 

  computed: {

    displayedArticles: function () {
      if (this.searchQuery) {
        return this.info.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.materia.toLowerCase().includes(v));
        });
      }else{
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
    verificarUsuario(){
      let text_1 = 'Aulas Virtales'
      let text_2 = 'Mis cursos'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.estudiante(this.roles)) {
        this.$router.push("/");
      }
    },
    appInit(){
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.modalidad = info.modalidad;
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
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.modalidad) {
        this.$proxies._aulaProxi
          .updateAulaEstudantes(this.modalidad)
          .then((x) => {
            this.AlgoritmoMyAula(x.data)
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
            this.$Progress.finish();
          });
      }
    },
    AlgoritmoMyAula(objeto){
        
         for(let i = 0; i < objeto.length; i++){
             for(let j = 0; j < objeto[i].estudiantes.length; j++){
                 if(objeto[i].estudiantes[j].usuario==this.my){
                      this.info.push(objeto[i]); 
                      break; 
                 }       
             }       
         }
         this.isData = false;
         this.$Progress.finish();
         return this.info
    },

    dialog(id){
      this.$router.push(`/module-aulas/${id}`)
    },
  },
  created() {
    this.verificarUsuario();
    this.appInit();
    this.getData();
  },

};
