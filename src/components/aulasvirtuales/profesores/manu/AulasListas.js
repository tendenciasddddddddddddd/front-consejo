//const info = JSON.parse(localStorage.getItem("Xf"));
import RestResource from '../../../../service/isAdmin'
const restResourceService = new RestResource();
let img = require('../../../../assets/img/icons/banner.jpg')
import Analitic from '../../../../shared/Analitic'
export default {
   
   components:{
    Analitic
   },
   data() {
       return {
        user: this.$store.state.user,
        roles: this.$store.state.user.roles,
        isRole: false,
        info: {},
        isData: false,
        curso: '',
        index: '',
        name: 'MenuCursos',
        modals1: 'closedd',
        imagen : img
       }
   },
   methods: {
       //updateInfoDocentes(id)
       getData(){
           this.isData = true;
           if(this.user.id){
            this.$proxies._aulaProxi
            .updateAulaDocentes(this.user.id)
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
       __eliminar() {
        this.$proxies._aulaProxi
        .remove(this.index) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then(() => {
          this.modals1= 'closedd';
          this.$notify({
            group: "global",
            text: "Registro destruido",
          });
          this.getData();
        })
        .catch((x) => {
          alert("Error 401", x.response);
        });
    
      },
      mostrar(ids, curs){
        this.modals1= 'opennn';
        this.curso = curs;
        this.index = ids;
      },
      __cancelar(){
        this.modals= 'closedd';
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