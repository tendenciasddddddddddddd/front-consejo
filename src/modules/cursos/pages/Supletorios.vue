<template>
  <div>
      <Astronauta v-if="isPrint"/>
      <div v-else>
        <ActionRowNotas v-if="!ifsaved"  @save="save" @openModal="onBtExport" @open="open" @changeSearch="changeSearch"/>
      </div>
    <section style="height: calc(100vh - 210px);">
      <ag-grid-vue  :rowHeight="26" style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
      :defaultColDef="defaultColDef" :enableRangeSelection="true" :suppressCopySingleCellRanges="true"
      
      @grid-ready="onGridReady">
    </ag-grid-vue>
    </section>
    <div v-if="iftask" style="display: none">
      <ReporteSupletorio @EventClosed="closed" @getData="getDataAll" :rowData="rowData" @changeStatus="changeStatus" />
    </div>
  </div>
</template>
  
  <script>
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import { AgGridVue } from "ag-grid-vue";
  import ActionRowNotas from "../../../shared/ActionRowNotas.vue";
  import quialifyservice from "./services";
  import Astronauta from "../../../shared/Astronauta"
  const ResultServiceNota = new quialifyservice();
  export default {
    name: "App",
    props: {
      object: Array,
    },
    data() {
      return {
        isPrint: false,
        rowData: [],
        defaultColDef: {
          flex: 1,
          minWidth: 50,
          resizable: true,
        },
        rowSelection: null,
        columnDefs: [
          { field: "nombres", headerName: 'ESTUDIANTES', minWidth: 270, pinned: 'left', },
          { field: "quim1", headerName: 'QUIM 1', minWidth: 60 },
          { field: "quim2", headerName: 'QUIM 2', minWidth: 60 },
          { field: "promed", headerName: 'P ANUAL', minWidth: 70, cellStyle: cellStyle },
          {
          field: "suple", headerName: 'SUPLETORIO', minWidth: 60, editable: true, valueFormatter: saleValueFormatter,},
          { field: "reme", headerName: 'REMEDIAL', minWidth: 60, editable: true, valueFormatter: saleValueFormatter },
          { field: "gracia", headerName: 'GRACIA', minWidth: 60, editable: true, valueFormatter: saleValueFormatter },
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
        quimestre: 'p1',
        gridApi: null,
        iftask: false,
        ifsaved: false
      };
    },
    components: {
      AgGridVue, ActionRowNotas, Astronauta,
      ReporteSupletorio: () => import( /* webpackChunkName: "ReporteSupletorio" */ "./ReporteSupletorio.vue"),
    },
    created() {
      this.rowSelection = 'multiple';
      this.onGridReadys();
    },
    methods: {
      onBtExport() {
        this.gridApi.exportDataAsExcel();
      },
      changeSearch(value) {
      this.gridApi.setQuickFilter(value);
    },
      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      },
      onGridReadys() {
        var anArray = [];
        for (let i = 0; i < this.object.length; i++) {
          const quim = this.object[i].notas;
          let promedio = parseFloat(this.object[i].promed)
          if (promedio >= 0 && promedio < 7) {
            var objeto = {
              id: this.object[i].id,
              fora: this.object[i].fora,
              nombres: this.object[i].name,
              quim1: ResultServiceNota.calcular_primer_quimestre(quim, 0),
              quim2: ResultServiceNota.calcular_primer_quimestre(quim, 1),
              promed: this.object[i].promed,
              suple: this.object[i].suple,
              reme: this.object[i].reme,
              gracia: this.object[i].gracia,
              pfinal: this.object[i].pfinal,
            }
            anArray.push(objeto);
          }
  
        }
        this.rowData = anArray;
      },

      open: function () {
        this.isPrint = true;
        this.iftask = true
      },
      closed: function () {
        this.iftask = false
      },
      changeStatus(ev) {
        if (ev == '100') {
          this.isPrint = false;
          this.iftask = false
        }
      },
      validateNumber(num) {
            let res = num.toString().replace(",", ".")
            if (res >= 0 && res <= 10) return true;
            return false;
        },
      pushPromedioFinal(suple, reme, gracia) {
        var result = 0;
        if (gracia > 0 && gracia <= 10) {
          result = gracia
        } else if (reme > 0 && reme <= 10) {
          result = reme
        } else if (suple > 0 && suple <= 10) {
          result = suple
        } else {
          result = 0
        }
        return result
      },
      save() {
        const result = [];
        for (let i = 0; i < this.rowData.length; i++) {
          const element = this.rowData[i];
          if (!this.validateNumber(element.suple)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
          if (!this.validateNumber(element.reme)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
          if (!this.validateNumber(element.gracia)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
          result.push({
            id: element.id,
            fora: element.fora,
            suple: element.suple,
            reme: element.reme,
            gracia: element.gracia,
            pfinal: this.pushPromedioFinal(element.suple, element.reme, element.gracia),
          })
         
        }
         this.ifsaved = true;
              this.$proxies._notasProxi
               .updateSupletorios(this.$route.params.id, result) 
              .then(() => {
               this.ifsaved = false;
                this.getDataAll();
                this.toast("Se guardo las notas de supletorios con exito");
             })
             .catch(() => {
               this.$dialog.alert("No se puede completar la operación");
               this.ifsaved = false;
             });
      },
      toast(message) {
      this.$toasted.info(message, {
        duration: 1600,
        position: 'top-center',
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: 'CERRAR',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    },
    }
  };
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
      return '#fbe4e7';
    } else if (val >= 7 && val <= 10) {
      return '#aaffaa';
    } else {
      return '#aaaaff';
    }
  };
  </script>
  