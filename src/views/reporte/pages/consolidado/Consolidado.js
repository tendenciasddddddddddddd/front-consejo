import Spinner from "../../../../shared/Spinner.vue";
import Modal from "../../../../shared/Modal.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
import XLSX from 'xlsx';
export default {
    name: 'Consolidado',
    components : {
        Spinner, Modal, ButtonLoading
    },
    data() {
        return {
            modals: true,
            ifview: '1',
            ifLoad: false,
            infoMat: {},
            isTodo: false,
            intensivos: null,
        }
    },
    methods: {
      close(){
        this.$emit('myEventClosedModalConsolidado')
      },
        getData() {
          this.$Progress.start();
            this.ifLoad = true;
            this.$proxies._matriculaProxi
              .getMatriculas()
              .then((x) => {
                this.infoMat = x.data;
                this.__todo();
                this.ifLoad = false;
                this.$Progress.finish();
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
                this.$Progress.fail();
              });
        },
          __todo(){
            this.ifLoad = true;
              this.intensivos = this.infoMat;
              var contador = this.intensivos.length;
              this.ExportEcxel(contador, this.intensivos);
              setTimeout(() => this.ifLoad = false, 3000); 
          },
          ExportEcxel(contador, model){
              this.isExcel= true;
              var anArray = [];
              for(let i=0; i<contador; i++){
                var objeto =   {
                  index : i,
                  nombres: model[i].fkestudiante? model[i].fkestudiante.fullname: '',
                  cedula:  model[i].fkestudiante? model[i].fkestudiante.cedula: '',
                  email:  model[i].fkestudiante? model[i].fkestudiante.email: '',
                  parroquia:  model[i].fkestudiante? model[i].fkestudiante.fkparroquia: '',
                  sexo:  model[i].fkestudiante?model[i].fkestudiante.sexo: '',
                  curso : model[i].fknivel? model[i].fknivel.nombre: '',
                  paralelo: model[i].curso,
                  }
                  anArray.push(objeto);
              }
              let data = XLSX.utils.json_to_sheet(anArray, {
                header: ['index', 'nombres', 'cedula','email','parroquia','sexo','curso', 'paralelo']
              })
              data['A1'].v = 'INDEX'
              data['B1'].v = 'NOMBRES'
              data['C1'].v = 'CEDULA'
              data['D1'].v = 'EMAIL'
              data['E1'].v = 'PARROQUIA'
              data['F1'].v = 'SEXO'
              data['G1'].v = 'CURSO'
              data['H1'].v = 'PARALELO'
              const workbook = XLSX.utils.book_new()
              const filename = 'Consolidado'
              XLSX.utils.book_append_sheet(workbook, data, filename)
              XLSX.writeFile(workbook, `${filename}.xlsx`)
              this.isExcel= false;
          },
    },
   
}