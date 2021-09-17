import Spinner from '../../../../shared/Spinner'
import Navs from '../../../../shared/Navs'
import Navss from '../../../../shared/Navss'
export default {
  name: "Matriculas2",
  components: {
    Spinner,Navss,Navs
},
  data() {
    return {

      searchQuery: null,
      info : null,
      isActive: true,
        model: {
          _id:null, 
          cedula: null, 
          nombres:null, 
          apellidos: null,
          foto: null,
        },
        isLoading: false,
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
    };
  },
  methods: {
    getAll() {
      this.isLoading = true;
      let mat = 'Extraordinaria';
      this.$proxies._matriculaProxi
        .getAllEstudiantes(mat) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.model = x.data;
          this.isLoading = false;
          this.isActive = false;
        })
        .catch(() => {
          console.log("Error imposible");
          this.isLoading = false;
          this.isActive = false;
        });
    },

  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.model.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.apellidos.toLowerCase().includes(v))
      })
      }
    }
  },

};
