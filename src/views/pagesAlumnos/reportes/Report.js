import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
import Spinner from "../../../shared/Spinner.vue";
import html2pdf from 'html2pdf.js'
export default {
  name: 'Report',
  components :{Spinner},
  data() {
      return {
        tablar: "notas",
        isVisibler: 'nota1',
        isLoads : false,
        user: this.$store.state.user,
        info: null,
        roles: this.$store.state.user.roles,
        isprint: false,
      }
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.estudiante(this.roles)){
        this.$router.push("/");
      }
    },
       __open(num){
        this.tablar = 'notasr';
        this.isVisibler = 'nota';
        if (this.info==null) {
          this.__openMODAL();
        }
        if (num==1) {
          this.isVisibler = 'nota';
        }
        else if (num==2) {
          this.isVisibler = 'nota2';
        }
       },
      __openMODAL(){
        this.isLoads = true;
        if(this.user.id){
          this.__calcularfechaActual();
          this.fechaActual();
          this.$proxies._matriculaProxi
            .getReporteEstud(this.user.id)
            .then((x) => {
              this.info = x.data;
              this.isLoads = false;
              console.log(this.info)
            })
            .catch(() => {
              console.log("Error");
              this.isLoads = false;
            });
        }
      },
      test() {
        this.isprint = true;
        var element = document.getElementById('root');
        html2pdf().from(element).set({
            margin: 0,
            fontSize : 9,
            filename: 'test.pdf',
            html2canvas: { scale: 4 },
            jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
        }).save();
        setTimeout(() => this.isprint = false, 4000); 
     },
     __calcularfechaActual(){
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const dateObj = new Date();
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
         const output = month  + '\n'+ day  + ',' + year;
         this.fechasActual = output;
      },
      fechaActual(){
        var date = new Date();
        const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        const formatDate = (date)=>{
        let formatted_date = date.getDate() + "-" + months[date.getMonth()] + " DEL " + date.getFullYear()
        return formatted_date;
        }
         formatDate(date);
      }
  },
  created() {
    this.verificarUsuario();
  },
}