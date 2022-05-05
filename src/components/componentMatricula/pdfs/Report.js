import Spinner from "../../../shared/Spinner.vue";
import ScrimModal from "../../../shared/ScrimModal"
import html2pdf from 'html2pdf.js'
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
export default{
    name: 'Report',
    components: {Spinner, ScrimModal},
    data() {
        return {
            tab: "inicio",
            isVisible: 'pa1',
            tabbs : '1',
            listniveles: null,
            isLoading1: false,
            filtros: null,
            listniveles2: null,
            isTabla:false,
            infoMat: null,
            //REPRTES
            fechasActual: null,
            isdescarga: false,
            info:null,
            isReporte: false,
            roles: this.$store.state.user.roles,
            index: "0",
            modalidad: "0",
            isprint: false,
        }
    },
    methods: {
      verificarUsuario() {
        if (!restResourceService.admin(this.roles)) {
          this.$router.push("/");
        }
      },
        __listNivele() {
            //-----------TRAE LA LISTA DE LOS ROLES 
            this.isLoading1 = true;
      
            this.$proxies._gestionProxi
              .getNiveles()
              .then((x) => {
                this.filtros = x.data;
                this.listniveles = this.filtros.filter((x) => x.modalidad == 'Intensivo');
               // this.isTabla = false;
               this.isLoading1 = false;
              })
              .catch((err) => {
                console.log("Error", err);
               // this.isTabla = false;
               this.isLoading1 = false;
              });
          },
          _cambiar(){
            this.tabbs= '2';
            this.index = '0';
            this.modalidad = '0';
            this.listniveles2 = this.filtros.filter((x) => x.modalidad == 'Extraordinaria');
          },
          _cambiar2(){
            this.tabbs= '1';
            this.index = '0';
            this.modalidad = '0';
            this.listniveles = this.filtros.filter((x) => x.modalidad == 'Intensivo');
          },
          clicMe(keys, mod) {
            this.index = keys;
            this.modalidad = mod;
          },
          verLista() {
            if (this.index != "0"&&this.modalidad!=0) {
              this.__cambios(this.index,this.modalidad);
              this.isVisible= 'pa3';
            }
          },

          __cambios(cursos, modalidad) {
            this.isTabla = true;
            this.$proxies._matriculaProxi
              .getInfoListReport(modalidad, cursos)
              .then((x) => {
                this.infoMat = x.data;
                this.isTabla = false;
              })
              .catch((err) => {
                console.log("Error", err);
                this.isTabla = false;
              });
          },
          close(){
            this.$emit('myEventClosedModalReporte');
          },
          
       /////////////////////////////////////REPORTES////////////////////////////////
       get(ids) {
        //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
        if (ids) {
          this.isVisible= 'pa4';
          this.isdescarga = true;
          this.__calcularfechaActual();
          this.fechaActual();
          this.$proxies._matriculaProxi
            .getMatricula(ids)
            .then((x) => {
              this.info = x.data;
              this.isdescarga = false;
            })
            .catch(() => {
              console.log("Error");
              this.isdescarga = false;
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
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];
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
      this. verificarUsuario();
        this. __listNivele();
    },
};



