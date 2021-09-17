//const info = JSON.parse(localStorage.getItem("Xf"));
import Skeleton from '../../../../shared/Skeleton'
export default {
   
   components:{
    Skeleton
   },
   data() {
       return {
        user: this.$store.state.user,
        info: {},
        isData: false,
        curso: '',
        index: '',
        name: 'MenuCursos',
        modals1: 'closedd',
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
      }
   },
   created() {
       this.getData();
   }
};