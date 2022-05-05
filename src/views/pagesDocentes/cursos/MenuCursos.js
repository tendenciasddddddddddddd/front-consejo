import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
import ProgressBar from '../../../shared/ProgressBar'
const arrayColors = ['#0f71ae', '#1466c9', '#303d9d', '#53ab79', '#ba4d8e', '#1976d3', '#874197', '#00b6d3'];
export default {
   name: 'MenuCursos',
   components:{
    ProgressBar
   },
   data() {
       return {
        roles: this.$store.state.user.roles,
        user: this.$store.state.user,
        info: {},
        isData: false,
        searchQuery: '',
       page: 1,
       perPage: 8,
       pages: [],
       numPages:0,
       modals: false,
       key: '',
       context: {},
       colorsh:[],
      imgs:[
        ''
      ]
       }
   },
   computed: {
    displayedArticles: function () {
      if (this.searchQuery.length>1) {
        return this.info.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.fmateria.nombre.toLowerCase().includes(v));
        });
      }else{
        return this.paginate(this.info);
      }
      
    }
  },
   methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length/8);
      this.arrayShorthand();
      return articles.slice(from, to);
  },
  arrayShorthand: function(){
    this.colorsh = arrayColors.sort(function() {return (Math.random()-0.5)});
  },
       getData(){
           this.isData = true;
           this.$Progress.start();
           if(this.user.id){
            this.$proxies._gestionProxi
            .updateInfoDocentes(this.user.id)
            .then((x) => {
              this.info = x.data;
              this.isData = false;
              this.$Progress.finish();
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
            });
           }
       },
       openModal: function(array){
        this.context= array;
        this.modals = true;
        //document.body.classList.add("modal-open");
      },
      cerrarModal(){
        this.context = {};
        this.modals = false;
       // document.body.classList.remove("modal-open");
      },
      nextPage(){
        if (this.context) {
          var myCourse = {
            paralelo: this.context.paralelo,
            nombre:   this.context.nombre,
            materia:  this.context.fmateria.nombre,
           }
           let id= this.context.fnivel._id;
           localStorage.removeItem('myCourse');
           if (!localStorage.getItem("myCourse")) {
             localStorage.setItem("myCourse", JSON.stringify(myCourse));
             this.$router.push({ path: `/qualifys/${id}` });
           
           }
        }
      },
       verificarUsuario(){
        if(!restResourceService.docente(this.roles)){
          this.$router.push("/");
        }
      },
     
   },
   created() {
    this.verificarUsuario();
       this.getData();
      
   },
  
};