//const info = JSON.parse(localStorage.getItem("Xf"));
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
import Analitic from '../../../shared/Analitic'
export default {
   name: 'MenuCursos',
   components:{
   Analitic
   },
   data() {
       return {
        roles: this.$store.state.user.roles,
        user: this.$store.state.user,
        info: {},
        isData: false,
       }
   },
   methods: {
       //updateInfoDocentes(id)
       getData(){
           this.isData = true;
           if(this.user.id){
            this.$proxies._gestionProxi
            .updateInfoDocentes(this.user.id)
            .then((x) => {
              this.info = x.data;
              this.isData = false;
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
            });
           }
       },
       verificarUsuario(){
        if(!restResourceService.docente(this.roles)){
          this.$router.push("/");
        }
      }
   },
   created() {
    this.verificarUsuario();
       this.getData();
   }
};