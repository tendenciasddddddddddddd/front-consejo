<template>
    <div>     
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" :filename="data.nivel+'-'+data.paralelo+'-'+data.materia" :pdf-quality="2"
            :manual-pagination="false" pdf-format="a4" :pdf-margin="10" pdf-orientation="landscape"
            pdf-content-width="1128px" @progress="onProgress($event)" ref="html2Pdf">
            <section slot="pdf-content">
                <section style="background: white; width: 100%;height:calc(100vh - 2rem)">
                    <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span style="font-size: 20px;" class="negros mt-1"><b>ALFONSO HERRERA</b> </span> <br>
                            <span class="negros text-sm">Educación General Básica</span><br>
                            <span class="negros text-sm">REPORTE DE SUPLETORIOS</span> <br>
                            <span class="negros text-sm"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} - {{data.paralelo}} &nbsp; &nbsp; {{data.materia}}</span>
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/alfonso/alfonso.jpg" alt="Logo" /></div>
                    </div>
                    <ag-grid-vue :rowHeight="rowHeight" style="width: 100%; height:70%;"
                        class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
                        :defaultColDef="defaultColDef">
                    </ag-grid-vue>
                    <div class="d-flex justify-content-around mt-3">
                        <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                        </div>
                        </div>
                    </div>
                </section>
            </section>
        </vue-html2pdf>
    </div>
</template>
<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import VueHtml2pdf from "vue-html2pdf";
export default {
    name: 'AddNota',
    components: { AgGridVue, VueHtml2pdf },
    props: {
        rowData: Array
    },
    data() {
        return {
            rowHeight: 32,
            defaultColDef: {

                flex: 1,
                minWidth: 40,
                resizable: true,
            },
            rowSelection: null,
            columnDefs: [
          { field: "nombres", headerName: 'ESTUDIANTES', minWidth: 190,  },
          { field: "quim1", headerName: 'QUIM 1', minWidth: 60 },
          { field: "quim2", headerName: 'QUIM 2', minWidth: 60 },
          { field: "promed", headerName: 'P ANUAL', minWidth: 70, cellStyle: cellStyle },
          {
          field: "suple", headerName: 'SUPLETORIO', minWidth: 60,  valueFormatter: saleValueFormatter,},
          { field: "reme", headerName: 'REMEDIAL', minWidth: 60,  valueFormatter: saleValueFormatter },
          { field: "gracia", headerName: 'GRACIA', minWidth: 60,  valueFormatter: saleValueFormatter },
          {
            field: "pfinal", headerName: 'PF', minWidth: 60, cellStyle: cellStyle,
            valueGetter: params => {
              let su = params.data.suple.toString().replace(",", ".")
              let suple = parseFloat(su)
              let re = params.data.reme.toString().replace(",", ".")
              let reme = parseFloat(re)
              let gr = params.data.gracia.toString().replace(",", ".")
              let gracia = parseFloat(gr)
              var result = 0
              if (gracia > 0 && gracia <= 10) {
                result = gracia
              } else if (reme > 0 && reme <= 10) {
                result = reme
              } else if (suple > 0 && suple <= 10) {
                result = suple
              } else {
                result = 0
              }
              return `${result}`;
            },
          },
          { field: "estado", headerName: 'ESTADO', minWidth: 60 ,
          valueGetter: params => {
            let su = params.data.pfinal.toString().replace(",", ".")
            let suple = parseFloat(su)
            if (suple >= 0 && suple < 7) {
              return 'Reprobado';
            } else if (suple >= 7 && suple <= 10) {
              return 'Aprobado';
            } else{
              return 'Error';
            }
            }
          },
        ],
            isprint: false,
            statusbar: "",
            data : ''
        }
    },
    watch: {
        statusbar: function (value) {
            this.$emit("changeStatus", value);
        }
    },
    methods: {
        initiaSetap(){
            this.data = JSON.parse(localStorage.getItem("myCourse"));
            console.log(this.rowData)
        },
        close() {
            this.$emit('EventClosed')
        },
        getData() {
            this.$emit('getData');
        },
        onProgress(event) {
            this.statusbar = event;
        },
        hasGenerated() {
            alert("PDF generated successfully!");
        },
        generatePDF() {
            this.$refs.html2Pdf.generatePdf();
        },
    },
    mounted() {
        this.rowSelection = 'multiple';
        this.initiaSetap()
        setTimeout(() => this.generatePDF(), 1000);
    },

}


var saleValueFormatter = function (params) {
    var formatted = params.value.toString().replace(',', '.');
    var result = formatted
    if (formatted >= 0 && formatted <= 10) {
      return result;
    } else {
      return '❓';
    }
  };
  var cellStyle = function (params) {
    const color = numberToColor(params.value);
    return {
      backgroundColor: color,
    };
  };
  var numberToColor = function (val) {
    if (val < 7) {
      return '#ffaaaa';
    } else if (val >= 7 && val <= 10) {
      return '#aaffaa';
    } else {
      return '#aaaaff';
    }
  };
</script>
