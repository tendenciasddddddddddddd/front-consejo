//const info = JSON.parse(localStorage.getItem("Xf"));
import Skeleton from '../../../shared/Skeleton'
export default {
   name: 'MenuCursos',
   components:{
    Skeleton
   },
   data() {
       return {
        user: this.$store.state.user,
        info: {},
        isData: false,
        rutass: [
            {
              id: "0",
              nombre: "Home",
              url:"/",
            },
    
          ],
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
   },
   created() {
       this.getData();
   }
};