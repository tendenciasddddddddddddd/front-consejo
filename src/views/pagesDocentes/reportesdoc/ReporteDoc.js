import Spinner from "../../../shared/Spinner";
import XLSX from 'xlsx'
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "ReporteDoc",
  components: {
    Spinner,
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      user: this.$store.state.user,
      info: {},
      isData: false,
      isModal: "cerrado",
      isDatas: false,
      isVerific: {},
      isCantidad: 0,
    };
  },
  methods: {
    //updateInfoDocentes(id)
    getData() {
      this.isData = true;
      if (this.user.id) {
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
    __listarEStudiantes(idCurso, paralelo) {
      this.isModal = 'abrir';
      this.isDatas = true;
      this.$proxies._notasProxi
        .getAll(idCurso)
        .then((x) => {
          this.isVerific = x.data.filter((x) => x.curso == paralelo);
          this.isCantidad=this.isVerific.length;
          this.isDatas = false;
        })
        .catch((x) => {
          alert("Error"+ x);
          this.isDatas = false;
        });
    },
    __exportEcxel(contador){
      this.isExcel= true;
      var anArray = [];
      for(let i=0; i<contador; i++){
        var objeto =   {
          index : i,
          nombres: this.isVerific[i].nombre,
          paralelo:  this.isVerific[i].curso,
          }
          anArray.push(objeto);
      }
      let data = XLSX.utils.json_to_sheet(anArray, {
        header: ['index', 'nombres', 'paralelo']
      })
      data['A1'].v = 'INDEX'
      data['B1'].v = 'NOMBRES'
      data['C1'].v = 'PARALELO'
     
      const workbook = XLSX.utils.book_new()
      const filename = 'Lista'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
      this.isExcel= false;
      this.isModal = 'cerrar';
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
  },
};
