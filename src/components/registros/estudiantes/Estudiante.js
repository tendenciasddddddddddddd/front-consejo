import Navss from '../../../shared/Navss'
import Spinner from '../../../shared/Spinner'
export default {
  name: "indexUsiario",
  components: {
    Spinner, Navss
  },
  data() {
    return {
      totalNotas: 0,
      paginaActual: 1,
      info: null,
      pagg: null,
      pagina: 0,
      paginas: 0,
      isLoading: false, //EL SNIPPER CARGA EN FALSO
      rutass: [
        {
          id: "0",
          nombre: "Home",
          url:"/",
        },

      ],
    };
  },
  methods: {
    getAll(pag) {
      this.isLoading = true;
      this.$proxies._registroProxi
        .getAll(pag, 6) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.info = x.data.usuarios;
          this.pagg = x.data;
          this.pagina = this.pagg.pagina;
          this.paginas = this.pagg.paginas;
          this.totalNotas = this.pagg.total;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error imposible");
          this.isLoading = false;
        });
    },
    __eliminar(idn) {
      this.isLoading = true;
      if (confirm('Estás a punto de eliminar a un estudiante de esta cuenta. Esta acción no se puede deshacer.')) {
        this.$proxies._registroProxi
        .remove(idn) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then(() => {
          this.$notify({
            group: "global",
            text: "Registro destruido",
          });
          this.isLoading = false;
          this.getAll(1);
        })
        .catch((x) => {
          if (x.response.status == 403) {
            //ENVIA EL TOKEN SI NO TIENE EL PERMISO RETORNA UN STATUS 403 NO AUTHORIZATION
            alert("Usted no tiene permisos");
          }
          console.log("Error", x);
          this.isLoading = false;
        });
      }else{
        this.isLoading = false;
      }
     
    },
  },
  mounted() {
    //METODO DE CONSTRUCCIÓN POR DEFAULT FUNCIOAN EN EL ESTADO DE LA APP CARGANDO LOS DATOS CUANTO TEMINA DE CST COMPONENTE
    //this.getAll(1);
  },
  watch: {
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.getAll(pagina);
        this.paginaActual = pagina;
      },
    },
  },
};
