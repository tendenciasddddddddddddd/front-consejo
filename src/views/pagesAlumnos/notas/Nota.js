//const info = JSON.parse(localStorage.getItem("Xf"));
import ProgressBar from '../../../shared/ProgressBar';
import XLSX from 'xlsx';
export default {
    name: 'Nota',
    components:{
      ProgressBar
    },
    data() {
        return {
            info: {},
            user: this.$store.state.user,
            isData: false,
            listNota: null,
            tabla: "notas",
            isVisible: 'nota1',
            name: 'lola',
            isTabla: 'nota',
            inAlumnos: [],
            isSelecUsers : [],
            detalleCalificacion : [],
            isExcel: false,
        }
    },
    methods: {
        getData(){
            this.isData = true;
            this.$Progress.start();
            if(this.user.id){
             this.$proxies._notasProxi
             .get(this.user.id)
             .then((x) => {
               this.info = x.data;
               this.isData = false;
               
               if (this.info.calificaciones) {
                this.savep();
               }
               this.$Progress.finish();
             })
             .catch((e) => {
               console.log("Error not found",e);
               this.isData = false;
             });
            }
        },
        savep() {
            //updateReforma2
              this.inAlumnos = [];
              
              let notas = this.info.calificaciones;
              for (let j = 0; j < notas.length; j++) {
              
              let nombre = '';
              let materia= '';
              let parcial1 = 0;
              let parcial2 = 0;
              let promedio = 0;
              let foranea = "";


                promedio = notas[j].promediof;
                nombre = notas[j].docente;
                materia = notas[j].materia;
                let calificar = notas[j].notas;
                if (promedio == null) {
                    promedio = 0;
                  }
                for (let k = 0; k < calificar.length; k++) {
                    if (calificar[k].quimestre == "p1") {
                      parcial1 = calificar[k].promedio;
                    }
                    if (calificar[k].quimestre == "p2") {
                      parcial2 = calificar[k].promedio;
                    }
                }  
                foranea = notas[j]._id;
                this.inAlumnos.push({
                   
                    name: nombre,
                    par1: parcial1,
                    par2: parcial2,
                    promed: promedio,
                    fora: foranea,
                    materia : materia,
                  });
              }
          },
          selectUser(key){
            let longitud = this.isSelecUsers.length;
            let isExiste = 0;
            if(longitud>0){
               for (let i = 0; i < this.isSelecUsers.length; i++) {
                  if(this.isSelecUsers[i]==key){
                   this.isSelecUsers.splice(i, 1); 
                   isExiste = 1;
                   break;
                  }
               }
               if(isExiste===0){ 
                 this.isSelecUsers.push(key);
               }
            }else{
             this.isSelecUsers.push(key);
            } 
          },
          viewsdetails(){
            if (this.isSelecUsers.length===1) {
              this.tabla = 'notasv';
              this.isTabla = 'notasquimestre';
              let matricula = this.info.calificaciones;
              this.detalleCalificacion = matricula.filter((x)=>x._id==this.isSelecUsers[0])
          
            }
          },
          cerrarModal(){
            this.tabla = 'no';
              this.isTabla = 'no';
          },
       splitedList(row){               
            return (row !== null)?row.split('+'):'';
       },
       __exportEcxel(){
        this.isExcel= true;
        var anArray = [];
        for(let i=0; i<this.inAlumnos.length; i++){
          var objeto =   {
            materia: this.inAlumnos[i].materia,
            docente:  this.inAlumnos[i].name,
            quimestre1:  this.inAlumnos[i].par1,
            quimestre2:  this.inAlumnos[i].par2,
            promedio:  this.inAlumnos[i].promed,
            
            }
            anArray.push(objeto);
        }
        let data = XLSX.utils.json_to_sheet(anArray, {
          header: ['materia', 'docente', 'quimestre1','quimestre2','promedio']
        })
        data['A1'].v = 'MATERIA'
        data['B1'].v = 'DOCENTE'
        data['C1'].v = 'QUIMESTRE I'
        data['D1'].v = 'QUIMESTRE II'
        data['E1'].v = 'PROMEDIO FINAL'
        var wscols = [
          {wch:20},
          {wch:20},
          {wch:10},
          {wch:20}
      ];
      //var ws = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new()
        const filename = 'xlsx Notas'
        XLSX.utils.book_append_sheet(workbook, data, filename)
        workbook['!cols'] = wscols;
        XLSX.writeFile(workbook, `${filename}.xlsx`)
        setTimeout(() => this.isExcel = false, 3000); 
    },
  
    },
    created() {
        this.getData();
    },
};