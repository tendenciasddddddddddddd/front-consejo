import quialifyservice from '../../../../components/docentes/qualify/QuialifyService';
const ResultServiceNota = new  quialifyservice();
import Spinner from "../../../../shared/Spinner";
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
let image= require('../../../../assets/img/icons/88fdd.svg');//empty-d.png
import XLSX from 'xlsx';
export default {
    name: 'multiplenote',

    components: {
        Spinner, vueDropzone
      },
      props: {
        id: {
          type: String,
        },
       
      },
    data() {
        return {
            idParam : this.id,
            para: '',
            name: '',
            mate: '',
            docentes: '',
            isVerific:{},
            isData: false,
            modalState: true,
            modalFace1: '1',
            file:File,
            isProcesDoc:true,
            isError : '',
            ifDocListo: false,
            isExcel: false,
            dropOptions: {
              url: "https://httpbin.org/post",
              dictDefaultMessage: `
              <img alt='Image placeholder' style='padding-top:20px;' height='130px;' class='mx-4 mt-n6 ' src='${image}'>
              <p class='text-sm fuente links mt-2'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
              `,
              maxFilesize: 0.5,
              maxFiles: 1,
              thumbnailHeight: 140,
              acceptedFiles: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
            checked:true,
            metadata: [],
            quimestre: '',
            ifsaved: false,
        }
    },
    methods: {
        readmyCourse: function(){
            const seccio = JSON.parse(localStorage.getItem("myCourse"));
            const info = JSON.parse(localStorage.getItem("Xf"));
            const qm = JSON.parse(localStorage.getItem("quimestre"));
            this.para= seccio.paralelo;
            this.name= seccio.nombre;
            this.mate= seccio.materia;
            this.docentes = info.nombre; 
            this.quimestre = qm;
            this.getData();
        },
        getData() {
            if (this.idParam) {
              this.isData = true;
              this.$proxies._notasProxi
                .getAll(this.idParam)
                .then((x) => {
                  this.isVerific = x.data.filter((x) => x.curso == this.para);
                  this.inAlumnos =  ResultServiceNota.validarNotes(this.isVerific, this.mate, this.quimestre);
                  this.isData = false;
                })
                .catch((x) => {
                  console.log("Error", x);
                  this.isData = false;
                });
            }
          },
          toDownload(){
            this.isExcel= true;
            var anArray = [];
            for(let i=0; i<this.inAlumnos.length; i++){
              var objeto =   {
                codigo: this.inAlumnos[i].id,
                nombres:  this.inAlumnos[i].name,
                a1:1, a2:1, a3:1 ,a4:1, a5: 1,
                b1:1, b2:1, b3:1 ,b4:1, b5: 1,
                c1:1, c2:1, c3:1 ,c4:1, c5: 1,
                examenfinal: 1,
                }
                anArray.push(objeto);
            }
            let data = XLSX.utils.json_to_sheet(anArray, {
              header: ['codigo', 'nombres', 'a1','a2','a3', 'a4','a5','b1','b2','b3', 'b4','b5','c1','c2','c3', 'c4','c5','examenfinal']
            })
            data['A1'].v = 'CODIGO'
            data['B1'].v = 'NOMBRES'
            data['C1'].v = 'APORTE 1'
            data['D1'].v = 'APORTE 2'
            data['E1'].v = 'APORTE 3'
            data['F1'].v = 'APORTE 4'
            data['G1'].v = 'APORTE 5'
            data['H1'].v = 'APORTE 6'
            data['I1'].v = 'APORTE 7'
            data['J1'].v = 'APORTE 8'
            data['K1'].v = 'APORTE 9'
            data['L1'].v = 'APORTE 10'
            data['M1'].v = 'APORTE 11'
            data['N1'].v = 'APORTE 12'
            data['O1'].v = 'APORTE 13'
            data['P1'].v = 'APORTE 14'
            data['Q1'].v = 'APORTE 15'
            data['R1'].v = 'EXAMEN FINAL'
            var wscols = [
              {wch:20},
              {wch:20},
              {wch:10},
              {wch:20}
          ];
            const d = new Date();
            let namefill = d.toDateString();
            const workbook = XLSX.utils.book_new()
            const filename = namefill;
            XLSX.utils.book_append_sheet(workbook, data, filename)
            workbook['!cols'] = wscols;
            XLSX.writeFile(workbook, `${filename}.xlsx`)
            setTimeout(() => this.isExcel = false, 1800); 
          },
          afterComplete(upload) {
            if (!/\.(xlsx)$/i.test(upload.name)) {
              this.$dialog.alert("El archivo que cargaste no era xlsx. Solo admite cargar archivos XLSX.");
              this.removeAllFiles();
              return;
            }
            
            this.onChanges(upload);
          },
          onChanges(evento) {
            this.file = evento;
            if (this.file) {
              const reader = new FileReader();
      
              reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                this.info = data;
              };
              this.isError= '';
              reader.readAsBinaryString(this.file);
              this.ifDocListo = true;
            }
          },
          removeAllFiles: function() {
            this.$refs.dropzone.removeAllFiles();
            this.ifDocListo= false;
            this.isError ='';
            
          },
          _regresar: function () {
            this.ifDocListo= false;
            this.modalFace1= '1';
          },
          ProcessingInstructions(){
            this.metadata =[];
            try {
              this.isProcesDoc = true;
              for (let i = 1; i < this.info.length ; i++) {
                let element = this.info[i];
                if (element[0]==this.inAlumnos[i-1].id) {
                   var a = '', b = '',exam = '', quimestre = this.quimestre, promedio= '', notasArrays='', fora='';
                   a = element[0];
                   b = element[1];
                   let total=0;
                   for(let i = 2; i <= 16; i++) {
                     total+=element[i]
                     notasArrays= element[i] +','+ notasArrays;
                     let successfully=  this.validarNota(element[i]);
                     if (!successfully) {
                       this.isError = 'Las notas ingresadas no son validas'
                       this.isProcesDoc= false;
                      return;
                     }
                  }
                  
                  exam = element[17];
                  promedio = this.calculatePromedio(total,exam);
                  fora= this.inAlumnos[i-1].fora;
                  this.metadata.push({id: a, nombre: b, arraysNote: notasArrays,examen: exam,quimestre: quimestre, promedio: promedio, fora: fora});//qualify
                } else {
                  break;
                }
                  
              }
              this.isProcesDoc = false;
              this.modalFace1= '2';
              this.checked= false;
            }catch(e){
              this.$dialog.alert('ARCHIVO DAÑADO');
              this.removeAllFiles();
              console.log(e)
            }
          },
          calculatePromedio(suma, examen){ 
           let promedio = (suma / 15).toFixed(2);
           let proNotas = (promedio * 8) / 10; //EQUIVALENTE A 80 %
           let proExamen = (examen * 2) / 10;  //EQUIVALENTE A 20 %
           return (proNotas + proExamen).toFixed(2);
          },
        save(){
          this.ifsaved = true;
          this.$proxies._notasProxi
          .updateFullNote(this.idParam, this.metadata) //-----------EDITAR CON AXIOS
         .then(() => {
          this.ifsaved = false;
          this.modalFace1= '3';
          this.$emit('saveEvent')
        })
        .catch(() => {
          this.$dialog.alert("No se puede completar la operación");
          this.ifsaved = false;
        });
        },
        validarNota(nota){
          if (nota>0 && nota<=10) {
            return true
          }else{
            return false
          }
        }
    },
    created() {
        this.readmyCourse();
    },
}