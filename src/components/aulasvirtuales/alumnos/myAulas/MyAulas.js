//const info = JSON.parse(localStorage.getItem("Xf"));
import Skeleton from "../../../../shared/Skeleton";
const info = JSON.parse(localStorage.getItem("Xf"));
export default {
  name: "MenuCursos",
  components: {
    Skeleton,
  },
  data() {
    return {
      user: this.$store.state.user,
      info: [],
      isData: false,
      modalidad: info.modalidad,
      my : this.$store.state.user.id,
      isResult: [],
    };
  },
  methods: {
    //updateInfoDocentes(id)
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
    this.getData();
  },
};
