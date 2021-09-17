
import Espera from "../../../../shared/Espera";
import Skeleton from "../../../../shared/Skeleton";
import XLSX from 'xlsx'
export default {
    name : 'Consolidados',
    components : {
        Espera,Skeleton
    },
    data() {
        return{
            tab: "sec3",
            isconsolidado: true,
            isTabla: false,
            isExcel: false,
            intensivos: null,
            infoMat: null
        }
    },
    methods: {
        mostrarConsolidado(){
            this.isconsolidado = false;
            this.__getData();
        },
        __getData() {
            this.isTabla = true;
            this.$proxies._matriculaProxi
              .getMatriculas()
              .then((x) => {
                this.infoMat = x.data;
                this.isTabla = false;
                console.log(this.infoMat);
              })
              .catch((err) => {
                console.log("Error", err);
                this.isTabla = false;
              });
          },
        __consolidadoExtra(){
            this.intensivos = this.infoMat.filter((x) => x.typo == "m2" && x.estado == "1");
            var contador = this.intensivos.length;
            this.ExportEcxel(contador, this.intensivos);
        },
        __consolodadoIntensivo(){
            this.intensivos = this.infoMat.filter((x) => x.typo == "m1" && x.estado == "1");
            var contador = this.intensivos.length;
            this.ExportEcxel(contador, this.intensivos);
        },
        __todo(){
            this.intensivos = this.infoMat.filter((x) => x.estado == "1");
            var contador = this.intensivos.length;
            this.ExportEcxel(contador, this.intensivos);
        },
        ExportEcxel(contador, model){
            this.isExcel= true;
            var anArray = [];
            for(let i=0; i<contador; i++){
              var objeto =   {
                index : i,
                nombres: model[i].fkestudiante.fullname,
                cedula:  model[i].fkestudiante.cedula,
                email:  model[i].fkestudiante.email,
                parroquia:  model[i].fkestudiante.fkparroquia,
                sexo:  model[i].fkestudiante.sexo,
                curso : model[i].fknivel.nombres,
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