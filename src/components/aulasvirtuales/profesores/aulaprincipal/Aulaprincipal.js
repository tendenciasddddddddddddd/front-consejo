import Spinner from "../../../../shared/Spinner.vue";
import Refresh from "../../../../shared/Refresh.vue";
import RestResource from '../../../../service/isAdmin'
const restResourceService = new RestResource();
let img = require('../../../../assets/img/icons/middle-blob.svg')
export default {
  name: "Aulaprincipal",
  components: { Spinner,Refresh },
  data() {
    return {
      roles: this.$store.state.user.roles,
      image: img,
      info: null,
      isData: false,
      tabb: "cerrarr",
      isTabb: "un",
      inAlumnos: [],
      isCargar: false,
      colors: ["#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3"],
      ids: "",
      curso: '',
      index: '',
      modals1: 'closedd',
    };
  },
  methods: {
    getData() {
      this.isData = true;
      if (this.$route.params.id) {
        this.$proxies._aulaProxi
          .getMain(this.$route.params.id)
          .then((x) => {
            this.info = x.data;
            this.isData = false;
            this.ids = this.info._id;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
          });
      }
    },
    empujarAlumnos() {
      this.inAlumnos = [];
      this.tabb = "iniciarr";
      this.isCargar = true;
      for (let i = 0; i < this.info.estudiantes.length; i++) {
        let iniciales = this.info.estudiantes[i].name;
        var arregloDeSubCadenas = iniciales.split(" ");
        let subcadena =
          arregloDeSubCadenas[0].substring(0, 1) //+ arregloDeSubCadenas[2].substring(0, 1);
        var random = this.colors[
          Math.floor(Math.random() * this.colors.length)
        ];
        this.inAlumnos.push({
          name: iniciales,
          img: subcadena,
          colors: random,
        });
      }
      setTimeout(() => this.isCargar = false, 500); 
     // this.isCargar = false;
    },
    __eliminar() {
      this.$proxies._aulaProxi
      .remove(this.$route.params.id) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
      .then(() => {
        this.modals1= 'closedd';
        this.$router.push("/aulas-lista");
      })
      .catch((x) => {
        alert("Error 401", x.response);
      });
  
    },
    mostrar(){
      this.modals1= 'opennn';
    },
    verificarUsuario(){
      if(!restResourceService.docente(this.roles)){
        this.$router.push("/");
      }
    }
  },
  created() {
    this.getData();
    this.verificarUsuario();
  },
};
