<template>
    <div>
        <Astronauta v-if="isPrint"/>
        <div >
            <ActionRowNotas @remove="remove" @save="save" @openModal="onBtExport" @open="open" />
        </div>
        <ag-grid-vue style="width: 100%; height: 455px" class="ag-theme-alpine" :columnDefs="columnDefs"
            :rowData="rowData" :defaultColDef="defaultColDef" :enableRangeSelection="true"
            :suppressCopySingleCellRanges="true" :pagination="true" :paginationPageSize="paginationPageSize"
            :cacheBlockSize="cacheBlockSize" @grid-ready="onGridReady">
        </ag-grid-vue>

        <div v-if="iftask">
            <ReportConducta @EventClosed="closed" @getData="getDataAll" :rowData="rowData"
                @changeStatus="changeStatus" />
        </div>
    </div>
</template>
    
<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import ActionRowNotas from "../../../shared/ActionRowNotas.vue";
import Astronauta from "../../../shared/Astronauta"
//import quialifyservice from "./services";
//const ResultServiceNota = new quialifyservice();
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
                { headerName: 'LISTADO', children: [{ field: "nombres", headerName: 'ESTUDIANTES', minWidth: 190, pinned: 'left', }] },
                {
                    headerName: 'QUIMESTRE 1',
                    children: [
                        { field: "p1", headerName: 'P1', minWidth: 60, editable: true, valueFormatter: saleValueFormatter, },
                        { field: "p2", headerName: 'P2', minWidth: 60, editable: true, valueFormatter: saleValueFormatter, },
                        { field: "v1", headerName: 'C1', minWidth: 60,  valueGetter: parcilaValue1},
                        { field: "v2", headerName: 'C2', minWidth: 60, valueGetter: parcilaValue2 },
                        {
                            field: "promedio1", headerName: 'PR', minWidth: 60,cellStyle: cellStyle,
                            valueGetter: params => {
                                let p1 = params.data.p1.toString().replace(",", ".")
                                let re1 = parseFloat(p1)
                                let p2 = params.data.p2.toString().replace(",", ".")
                                let re2 = parseFloat(p2)
                                var result = (re1 + re2) / 2
                                return `${result.toFixed(2)}`;
                            },
                        },
                        {
                            field: "eq1", headerName: 'PR', minWidth: 60,
                            valueGetter: quimestreValue1
                        },
                    ]
                },
                {
                    headerName: 'QUIMESTRE 2',
                    children: [
                        { field: "p3", headerName: 'P1', minWidth: 60, editable: true, valueFormatter: saleValueFormatter, },
                        { field: "p4", headerName: 'P2', minWidth: 60, editable: true,  valueFormatter: saleValueFormatter,},
                        { field: "v3", headerName: 'C1', minWidth: 60,  valueGetter: parcilaValue3},
                        { field: "v4", headerName: 'C2', minWidth: 60, valueGetter: parcilaValue4 },
                        {
                            field: "promedio2", headerName: 'PR', minWidth: 60,cellStyle: cellStyle,
                            valueGetter: params => {
                                let p1 = params.data.p3.toString().replace(",", ".")
                                let re1 = parseFloat(p1)
                                let p2 = params.data.p4.toString().replace(",", ".")
                                let re2 = parseFloat(p2)
                                var result = (re1 + re2) / 2
                                return `${result.toFixed(2)}`;
                            },
                        },
                        {
                            field: "eq2", headerName: 'PR', minWidth: 60,
                            valueGetter: quimestreValue2
                        },
                    ]
                },
                {
                    headerName: 'FINAL',
                    children: [
                        { field: "final", headerName: 'PF', minWidth: 60, editable: true,cellStyle: cellStyle,
                        valueGetter: params => {
                                let p1 = params.data.p1.toString().replace(",", ".")
                                let re1 = parseFloat(p1)
                                let p2 = params.data.p2.toString().replace(",", ".")
                                let re2 = parseFloat(p2)
                                let p3 = params.data.p3.toString().replace(",", ".")
                                let re3 = parseFloat(p3)
                                let p4 = params.data.p4.toString().replace(",", ".")
                                let re4 = parseFloat(p4)
                                var result = (re1 + re2 + re3 + re4) / 4
                                return `${result.toFixed(2)}`;
                            },
                         },
                        { field: "fin", headerName: 'F', minWidth: 60, editable: true, 
                    valueGetter: final},
                        
                    ]
                },
            ],
            paginationPageSize: 0,
            cacheBlockSize: 0,
            quimestre: 'p1',
            gridApi: null,
            iftask: false,
        };
    },
    components: {
        AgGridVue, ActionRowNotas,Astronauta ,
        ReportConducta: () => import( /* webpackChunkName: "ReportConducta" */ "./ReportConducta.vue"),
    },
    created() {
        this.rowSelection = 'multiple';
        this.onGridReadys();
        this.paginationPageSize = 8;
        this.cacheBlockSize = 8;
    },
    methods: {
        onBtExport() {
            this.gridApi.exportDataAsExcel();
        },

        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        },
        onGridReadys() {
            var anArray = [];
            for (let i = 0; i < this.object.length; i++) {
                const quim = this.object[i].comportamiento;
                let promedio = parseFloat(this.object[i].promed)
                if (promedio >= 0 && promedio < 7) {
                    var objeto = {
                        id: this.object[i].id,
                        fora: this.object[i].fora,
                        nombres: this.object[i].name,
                        p1: quim[0].p1,
                        p2: quim[0].p2,
                        p3: quim[1].p1,
                        p4: quim[1].p2,
                    }
                    anArray.push(objeto);
                }
            }
            this.rowData = anArray;
        },
        remove() {
            console.log("remove");
        },
        getDataAll() {
            this.$emit('getDataTask');
        },
        open: function () {
            this.iftask = false;
            setTimeout(() => this.iftask = true, 100);
            this.isPrint = true;
        },
        closed: function () {
            this.iftask = false
        },
        changeStatus(ev) {
            if (ev == '100') {
                this.isPrint = false;
            }
        },
        validateNumber(num) {
            let res = num.toString().replace(",", ".")
            if (res >= 0 && res <= 10) return true;
            return false;
        },
        save() {
            const result = [];
            for (let i = 0; i < this.rowData.length; i++) {
                const element = this.rowData[i];
                if (!this.validateNumber(element.p1)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
                if (!this.validateNumber(element.p2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
                if (!this.validateNumber(element.p3)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
                if (!this.validateNumber(element.p4)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
                result.push({
                    id: element.id,
                    fora: element.fora,
                    comportamiento: [
                        { p1: element.p1, p2 : element.p2},
                        { p1: element.p3, p2 : element.p4}
                    ]
                })

            }
             this.ifsaved = true;
             this.$proxies._notasProxi
                 .updateComportamiento(this.$route.params.id, result)
                 .then(() => {
                     this.ifsaved = false;
                     this.getDataAll();
                     this.toast("Se guardo las notas de comportamiento con exito");
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
var parcilaValue1 = function (params) {
    let res = params.data.p1.toString().replace(",", ".")
    let num = parseFloat(res)
    var result = ''
    if (num <= 10 && num >= 9) {
        result = 'A'
    } else if (num <= 8.99 && num >= 7) {
        result = 'B'
    } else if (num <= 6.99 && num >= 4.01) {
        result = 'C'
    } else if (num <= 4 && num >= 1) {
        result = 'D'
    } else {
        result = 'NA'
    }
    return `${result}`;
};
var parcilaValue2 = function (params) {
    let res = params.data.p2.toString().replace(",", ".")
    let num = parseFloat(res)
    var result = ''
    if (num <= 10 && num >= 9) {
        result = 'A'
    } else if (num <= 8.99 && num >= 7) {
        result = 'B'
    } else if (num <= 6.99 && num >= 4.01) {
        result = 'C'
    } else if (num <= 4 && num >= 1) {
        result = 'D'
    } else {
        result = 'NA'
    }
    return `${result}`;
};
var quimestreValue1 = function (params) {
    let p1 = params.data.p1.toString().replace(",", ".")
    let re1 = parseFloat(p1)
    let p2 = params.data.p2.toString().replace(",", ".")
    let re2 = parseFloat(p2)
    var prom = (re1 + re2) / 2
    let num = prom.toFixed(2)
    let result = ''
    if (num <= 10 && num >= 9) {
        result = 'A'
    } else if (num <= 8.99 && num >= 7) {
        result = 'B'
    } else if (num <= 6.99 && num >= 4.01) {
        result = 'C'
    } else if (num <= 4 && num >= 1) {
        result = 'D'
    } else {
        result = 'NA'
    }
    return `${result}`;
};
var parcilaValue3 = function (params) {
    let res = params.data.p3.toString().replace(",", ".")
    let num = parseFloat(res)
    var result = ''
    if (num <= 10 && num >= 9) {
        result = 'A'
    } else if (num <= 8.99 && num >= 7) {
        result = 'B'
    } else if (num <= 6.99 && num >= 4.01) {
        result = 'C'
    } else if (num <= 4 && num >= 1) {
        result = 'D'
    } else {
        result = 'NA'
    }
    return `${result}`;
};
var parcilaValue4 = function (params) {
    let res = params.data.p4.toString().replace(",", ".")
    let num = parseFloat(res)
    var result = ''
    if (num <= 10 && num >= 9) {
        result = 'A'
    } else if (num <= 8.99 && num >= 7) {
        result = 'B'
    } else if (num <= 6.99 && num >= 4.01) {
        result = 'C'
    } else if (num <= 4 && num >= 1) {
        result = 'D'
    } else {
        result = 'NA'
    }
    return `${result}`;
};
var quimestreValue2 = function (params) {
    let p1 = params.data.p3.toString().replace(",", ".")
    let re1 = parseFloat(p1)
    let p2 = params.data.p4.toString().replace(",", ".")
    let re2 = parseFloat(p2)
    var prom = (re1 + re2) / 2
    let num = prom.toFixed(2)
    let result = ''
    if (num <= 10 && num >= 9) {
        result = 'A'
    } else if (num <= 8.99 && num >= 7) {
        result = 'B'
    } else if (num <= 6.99 && num >= 4.01) {
        result = 'C'
    } else if (num <= 4 && num >= 1) {
        result = 'D'
    } else {
        result = 'NA'
    }
    return `${result}`;
};
 var final = function (params) {
     let p1 = params.data.p1.toString().replace(",", ".")
     let re1 = parseFloat(p1)
     let p2 = params.data.p2.toString().replace(",", ".")
     let re2 = parseFloat(p2)
     let p3 = params.data.p3.toString().replace(",", ".")
     let re3 = parseFloat(p3)
     let p4 = params.data.p4.toString().replace(",", ".")
     let re4 = parseFloat(p4)
     
     var prom = (re1 + re2 + re3 + re4) / 4
     let num = prom.toFixed(2)
     let result = ''
     if (num <= 10 && num >= 9) {
         result = 'A'
     } else if (num <= 8.99 && num >= 7) {
         result = 'B'
     } else if (num <= 6.99 && num >= 4.01) {
         result = 'C'
     } else if (num <= 4 && num >= 1) {
         result = 'D'
     } else {
         result = 'NA'
     }
     return `${result}`;
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
         return '#ffaaaa';
       } else if (val >= 7 && val <= 10) {
         return '#aaffaa';
       } else {
         return '#aaaaff';
       }
     };
</script>
    