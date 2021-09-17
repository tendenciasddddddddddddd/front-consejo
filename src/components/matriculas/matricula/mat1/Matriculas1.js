import Spinner from '../../../../shared/Spinner'
//import Navs from '../../../../shared/Navs'
import Navss from '../../../../shared/Navss'
export default {
  name: "Matriculas1",
  components: {
    Spinner,Navss
},
  data() {
    return {
      tab: "init",
      
        rutass: [
          {
            id: "0",
            nombre: "Home",
            url:"/",
          },
          {
            id: "1",
            nombre: "Opciones de Matricula",
            url:"/Opciones-Matricula",
          },
  
        ],
        //
       
    };
  },
  methods: {
    
    //---------------------------------MATRICULA-----
 
  },
 
  mounted() {
    //this.getAll();
  },
};
