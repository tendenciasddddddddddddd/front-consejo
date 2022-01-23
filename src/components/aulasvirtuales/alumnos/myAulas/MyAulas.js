import RestResource from '../../../../service/isAdmin'
const restResourceService = new RestResource();
import Analitic from '../../../../shared/Analitic';
import EffectLoad from '../../../../shared/EffectLoad'//
let img = require('../../../../assets/img/icons/bannerAulas.jpg');
export default {
  name: "MenuCursos",
  components: {
    Analitic, EffectLoad
  },
  data() {
    return {
      user: this.$store.state.user,
      roles: this.$store.state.user.roles,
      info: [],
      isData: false,
      my : this.$store.state.user.id,
      isResult: [],
      imagen : img,
      searchQuery: null,
        //Pagina 
       page: 1,
       perPage: 8,
       pages: [],
       numPages:null,
       show: false,
       modals:false,
       key: '',
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
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length/8);
      this.isSelecUsers = [];
      return articles.slice(from, to);
  },
    verificarUsuario(){
      if(!restResourceService.estudiante(this.roles)){
        this.$router.push("/");
      }
    },
    appInit(){
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.modalidad = info.modalidad;
     
    },
    getData() {
      this.isData = true;
      if (this.modalidad) {
        this.$proxies._aulaProxi
          .updateAulaEstudantes(this.modalidad)
          .then((x) => {
            this.AlgoritmoMyAula(x.data)
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
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
         return this.info
    },
    openModal: function(id){
      this.key= id;
      this.modals = true;
      //document.body.classList.add("modal-open");
    },
    cerrarModal: function(){
      this.key = '0';
      this.modals = false;
     // document.body.classList.remove("modal-open");
    },
  },
  created() {
    this.verificarUsuario();
    this.appInit();
    this.getData();
  },
  mounted() {
    this.show = true; // might need this.$nextTick
  }
};
