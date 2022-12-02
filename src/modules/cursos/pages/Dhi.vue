<template>
    <div>
        <Astronauta v-if="isPrint" />
        <div v-else>
            <ActionRowNotas v-if="!ifsaved" @remove="remove" @save="save" @openModal="onBtExport" @open="open"
                @changeSearch="changeSearch" />
        </div>
        <section style="height: calc(100vh - 140px);">
            <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
                :rowData="rowData" :defaultColDef="defaultColDef" :enableRangeSelection="true"
                :suppressCopySingleCellRanges="true" @grid-ready="onGridReady" :enableFillHandle="true">
            </ag-grid-vue>
        </section>
        <div v-if="iftask" style="display: none">
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
                { headerName: 'LISTADO', children: [{ field: "nombres", headerName: 'ESTUDIANTES', minWidth: 270, pinned: 'left', }] },
                {
                    headerName: 'QUIMESTRE 1',
                    children: [
                        {
                            field: "p1", headerName: 'PARCIAL 1', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2,
                            cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['A', 'B', 'C', 'D', 'E'] },
                        },
                        {
                            field: "p2", headerName: 'PARCIAL 2', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2,
                            cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['A', 'B', 'C', 'D', 'E'] },
                        },
                        {
                            field: "promedio1", headerName: 'PROMEDIO', minWidth: 60, cellStyle: cellStyle,
                            valueGetter: params => {
                                let aux = 0;
                                let aux2 = 0;
                                let p1 = params.data.p1.toString().replace(",", ".")
                                let p2 = params.data.p2.toString().replace(",", ".")
                                switch (p1) {
                                    case "A": aux = 5;
                                        break;
                                    case "B": aux = 4;
                                        break;
                                    case "C": aux = 3;
                                        break;
                                    case "D": aux = 2;
                                        break;
                                    case "E": aux = 1;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p2) {
                                    case "A": aux2 = 5;
                                        break;
                                    case "B": aux2 = 4;
                                        break;
                                    case "C": aux2 = 3;
                                        break;
                                    case "D": aux2 = 2;
                                        break;
                                    case "E": aux2 = 1;
                                        break;
                                    default:
                                        break;
                                }
                                var result = parseInt((aux + aux2) / 2)
                                var letra = 'E'
                                switch (result) {
                                    case 5: letra = 'A';
                                        break;
                                    case 4: letra = 'B';
                                        break;
                                    case 3: letra = 'C';
                                        break;
                                    case 2: letra = 'D';
                                        break;
                                    case 1: letra = 'E';
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
                        {
                            field: "p3", headerName: 'PARCIAL 1', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2,
                            cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['A', 'B', 'C', 'D', 'E'] },
                        },
                        {
                            field: "p4", headerName: 'PARCIAL 2', minWidth: 60, editable: true, valueFormatter: saleValueFormatter2,
                            cellEditor: 'agRichSelectCellEditor', cellEditorPopup: true,
                            cellEditorParams: { cellHeight: 30, values: ['A', 'B', 'C', 'D', 'E'] },
                        },
                        {
                            field: "promedio2", headerName: 'PROMEDIO', minWidth: 60, cellStyle: cellStyle,
                            valueGetter: params => {
                                let aux = 0;
                                let aux2 = 0;
                                let p1 = params.data.p3.toString()
                                let p2 = params.data.p4.toString()
                                switch (p1) {
                                    case "A": aux = 5;
                                        break;
                                    case "B": aux = 4;
                                        break;
                                    case "C": aux = 3;
                                        break;
                                    case "D": aux = 2;
                                        break;
                                    case "E": aux = 1;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p2) {
                                    case "A": aux2 = 5;
                                        break;
                                    case "B": aux2 = 4;
                                        break;
                                    case "C": aux2 = 3;
                                        break;
                                    case "D": aux2 = 2;
                                        break;
                                    case "E": aux2 = 1;
                                        break;
                                    default:
                                        break;
                                }
                                var result = parseInt((aux + aux2) / 2)
                                var letra = 'E'
                                switch (result) {
                                    case 5: letra = 'A';
                                        break;
                                    case 4: letra = 'B';
                                        break;
                                    case 3: letra = 'C';
                                        break;
                                    case 2: letra = 'D';
                                        break;
                                    case 1: letra = 'E';
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
                            field: "final", headerName: 'PROMEDIO FINAL', minWidth: 60, editable: true, cellStyle: cellStyle,
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
                                    case "A": aux = 5;
                                        break;
                                    case "B": aux = 4;
                                        break;
                                    case "C": aux = 3;
                                        break;
                                    case "D": aux = 2;
                                        break;
                                    case "E": aux = 1;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p2) {
                                    case "A": aux2 = 5;
                                        break;
                                    case "B": aux2 = 4;
                                        break;
                                    case "C": aux2 = 3;
                                        break;
                                    case "D": aux2 = 2;
                                        break;
                                    case "E": aux2 = 1;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p3) {
                                    case "A": aux3 = 5;
                                        break;
                                    case "B": aux3 = 4;
                                        break;
                                    case "C": aux3 = 3;
                                        break;
                                    case "D": aux3 = 2;
                                        break;
                                    case "E": aux3 = 1;
                                        break;
                                    default:
                                        break;
                                }
                                switch (p4) {
                                    case "A": aux4 = 5;
                                        break;
                                    case "B": aux4 = 4;
                                        break;
                                    case "C": aux4 = 3;
                                        break;
                                    case "D": aux4 = 2;
                                        break;
                                    case "E": aux4 = 1;
                                        break;
                                    default:
                                        break;
                                }
                                var result = parseInt((aux + aux2 + aux3 + aux4) / 4)
                                var letra = 'E'
                                switch (result) {
                                    case 5: letra = 'A';
                                        break;
                                    case 4: letra = 'B';
                                        break;
                                    case 3: letra = 'C';
                                        break;
                                    case 2: letra = 'D';
                                        break;
                                    case 1: letra = 'E';
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
        ReportConducta: () => import( /* webpackChunkName: "ReportConducta" */ "./ReportConducta.vue"),
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
                const quim = this.object[i].dhi;
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
            let paralelo = ['A', 'B', 'C', 'D', 'E']
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
                    dhi: [
                        { p1: element.p1, p2: element.p2 },
                        { p1: element.p3, p2: element.p4 }
                    ]
                })
            }
            this.ifsaved = true;
            this.$proxies._notasProxi
                .updateDhi(this.$route.params.id, result)
                .then(() => {
                    this.ifsaved = false;
                    this.getDataAll();
                    this.toast("Se guardo las notas de DHI con exito");
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
    let paralelo = ['A', 'B', 'C', 'D', 'E']
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
    if (val == 'D' || val == 'E' || val == 'C') {
        return '#fbe4e7';
    } else if (val == 'A' || val == 'B') {
        return '#aaffaa';
    } else {
        return '#aaaaff';
    }
};
</script>