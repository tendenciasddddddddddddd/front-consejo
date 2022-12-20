<template>
    <div>
        <Astronauta v-if="isPrint" />
        <div v-else>
            <ActionRowNotas v-if="!ifsaved" @remove="remove" @save="save" @openModal="onBtExport" @open="open"
                @changeSearch="changeSearch" />
        </div>
        <section style="height: calc(100vh - 210px);">
            <ag-grid-vue  :groupHeaderHeight="45"
    :headerHeight="130" :rowHeight="26" style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
                :rowData="rowData" :defaultColDef="defaultColDef" :enableRangeSelection="true"
                :suppressCopySingleCellRanges="true" @grid-ready="onGridReady" :enableFillHandle="true">
            </ag-grid-vue>
        </section>
        <div v-if="iftask" style="display: none">
            <ReporteProyectos @EventClosed="closed" @getData="getDataAll" :rowData="rowData"
                @changeStatus="changeStatus" />
        </div>
    </div>
</template>
<style>
.ag-header-cell-label .ag-header-cell-text {
   /*Force the width corresponding at how much width
     we need once the text is laid out vertically*/
   width: 55px !important;
   writing-mode: vertical-lr !important; transform: rotate(180deg) !important;
   line-height: 2em;
   margin-top: 10px;
 }</style>
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
                { headerName: 'LISTADO', children: [{ field: "nombres", headerName: 'ESTUDIANTES', minWidth: 270, pinned: 'left', }] },
                {
                    headerName: 'QUIMESTRE 1',
                    children: [
                        {
                            field: "p1", headerName: 'PARCIAL 1', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2,
                            cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['EX', 'MB', 'B', 'R'] },
                        },
                        { field: "p2", headerName: 'PARCIAL 2', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2, 
                        cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['EX', 'MB', 'B', 'R'] },},
                        {
                            field: "promedio1", headerName: 'PROM. PARCIALES', minWidth: 60, cellStyle: cellStyle,
                            valueGetter: params => {
                                let aux = 0;
                                let aux2 = 0;
                                let p1 = params.data.p1.toString().replace(",", ".")
                                let p2 = params.data.p2.toString().replace(",", ".")
                                switch (p1) {
                                    case "EX": aux = 5;
                                        break;
                                    case "MB": aux = 4;
                                        break;
                                    case "B": aux = 3;
                                        break;
                                    case "R": aux = 2;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p2) {
                                    case "EX": aux2 = 5;
                                        break;
                                    case "MB": aux2 = 4;
                                        break;
                                    case "B": aux2 = 3;
                                        break;
                                    case "R": aux2 = 2;
                                        break;
                                    default:
                                        break;
                                }
                                var result = parseInt((aux + aux2) / 2)
                                var letra = 'E'
                                switch (result) {
                                    case 5: letra = 'EX';
                                        break;
                                    case 4: letra = 'MB';
                                        break;
                                    case 3: letra = 'B';
                                        break;
                                    case 2: letra = 'R';
                                        break;
                                    default:
                                        break;
                                }
                                return `${letra}`;
                            },
                        },

                    ]
                },
                {
                    headerName: 'QUIMESTRE 2',
                    children: [
                        { field: "p3", headerName: 'PARCIAL 1', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2,
                        cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['EX', 'MB', 'B', 'R'] }, },
                        { field: "p4", headerName: 'PARCIAL 2', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2, 
                        cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['EX', 'MB', 'B', 'R'] },},

                        {
                            field: "promedio2", headerName: 'PROM. PARCIALES', minWidth: 60, cellStyle: cellStyle,
                            valueGetter: params => {
                                let aux = 0;
                                let aux2 = 0;
                                let p1 = params.data.p3.toString()
                                let p2 = params.data.p4.toString()
                                switch (p1) {
                                    case "EX": aux = 5;
                                        break;
                                    case "MB": aux = 4;
                                        break;
                                    case "B": aux = 3;
                                        break;
                                    case "R": aux = 2;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p2) {
                                    case "EX": aux2 = 5;
                                        break;
                                    case "MB": aux2 = 4;
                                        break;
                                    case "B": aux2 = 3;
                                        break;
                                    case "R": aux2 = 2;
                                        break;
                                    default:
                                        break;
                                }

                                var result = parseInt((aux + aux2) / 2)
                                var letra = 'E'
                                switch (result) {
                                    case 5: letra = 'EX';
                                        break;
                                    case 4: letra = 'MB';
                                        break;
                                    case 3: letra = 'B';
                                        break;
                                    case 2: letra = 'R';
                                        break;
                                    default:
                                        break;
                                }
                                return `${letra}`;
                            },
                        },

                    ]
                },
                {
                    headerName: 'FINAL',
                    children: [
                        {
                            field: "final", headerName: 'PROM. FINAL', minWidth: 60, editable: true, cellStyle: cellStyle,
                            valueGetter: params => {
                                let aux = 0;
                                let aux2 = 0;
                                let aux3 = 0;
                                let aux4 = 0;
                                let p1 = params.data.p1.toString()
                                let p2 = params.data.p2.toString()
                                let p3 = params.data.p3.toString()
                                let p4 = params.data.p4.toString()
                                switch (p1) {
                                    case "EX": aux = 5;
                                        break;
                                    case "MB": aux = 4;
                                        break;
                                    case "B": aux = 3;
                                        break;
                                    case "R": aux = 2;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p2) {
                                    case "EX": aux2 = 5;
                                        break;
                                    case "MB": aux2 = 4;
                                        break;
                                    case "B": aux2 = 3;
                                        break;
                                    case "R": aux2 = 2;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p3) {
                                    case "EX": aux3 = 5;
                                        break;
                                    case "MB": aux3 = 4;
                                        break;
                                    case "B": aux3 = 3;
                                        break;
                                    case "R": aux3 = 2;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p4) {
                                    case "EX": aux4 = 5;
                                        break;
                                    case "MB": aux4 = 4;
                                        break;
                                    case "B": aux4 = 3;
                                        break;
                                    case "R": aux4 = 2;
                                        break;
                                    default:
                                        break;
                                }
                                var result = parseInt((aux + aux2 + aux3 + aux4) / 4)
                                var letra = 'E'
                                switch (result) {
                                    case 5: letra = 'EX';
                                        break;
                                    case 4: letra = 'MB';
                                        break;
                                    case 3: letra = 'B';
                                        break;
                                    case 2: letra = 'R';
                                        break;
                                    default:
                                        break;
                                }
                                return `${letra}`;
                            },
                        },

                    ]
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
        ReporteProyectos: () => import( /* webpackChunkName: "ReporteProyectos" */ "./ReporteProyectos.vue"),
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
                const quim = this.object[i].proyectos;
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
            this.rowData = anArray;
        },
        remove() {
            console.log("remove");
        },
        getDataAll() {
            this.$emit('getDataTask');
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
                this.iftask = false;
            }
        },
        validateNumber(num) {
            let paralelo = ['EX', 'MB', 'B', 'R']
            if (paralelo.includes(num)) {
                return true;
            } else {
                return false;
            }
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
                    proyectos: [
                        { p1: element.p1, p2: element.p2 },
                        { p1: element.p3, p2: element.p4 }
                    ]
                })

            }
            this.ifsaved = true;
            this.$proxies._notasProxi
                .updateProyectos(this.$route.params.id, result)
                .then(() => {
                    this.ifsaved = false;
                    this.getDataAll();
                    this.toast("Se guardo las notas de proyectos con exito");
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

var saleValueFormatter2 = function (params) {
    var formatted = params.value.toString();
    let paralelo = ['EX', 'MB', 'B', 'R']
    if (paralelo.includes(formatted)) {
        return formatted;
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
    if (val == 'R' ) {
        return '#fbe4e7';
    } else if (val == 'EX' || val == 'MB'|| val == 'B') {
        return '#aaffaa';
    } else {
        return '#aaaaff';
    }
};
</script>
    