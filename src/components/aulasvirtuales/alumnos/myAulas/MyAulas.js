import RestResource from '../../../../service/isAdmin'
const restResourceService = new RestResource();
import Analitic from '../../../../shared/Analitic'
export default {
  name: "MenuCursos",
  components: {
    Analitic
  },
  data() {
    return {
      user: this.$store.state.user,
      roles: this.$store.state.user.roles,
      info: [],
      isData: false,
      modalidad: '',
      my : this.$store.state.user.id,
      isResult: [],
    };
  },
  methods: {
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
    }
  },
  created() {
    this.verificarUsuario();
    this.appInit();
    this.getData();
  },
};
