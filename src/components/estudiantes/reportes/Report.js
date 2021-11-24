
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
        info: {}
      }
  },
  methods: {
       __open(){
        this.tablar = 'notasr';
        this.isVisibler = 'nota';
        this.__openMODAL();
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
            })
            .catch(() => {
              console.log("Error");
              this.isLoads = false;
            });
        }
       

      },
      test() {

        var element = document.getElementById('root');

        // Generate the PDF.
        html2pdf().from(element).set({
            margin: 0,
            fontSize : 9,
            filename: 'test.pdf',
            html2canvas: { scale: 4 },
            jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
        }).save();
        
     },
     __calcularfechaActual(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "Agosto", "September", "October", "November", "December"];
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
     
  },
}