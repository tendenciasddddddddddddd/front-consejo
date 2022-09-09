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
                            <span class="negros text-sm">REPORTE DE NOTAS</span> <br>
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
            columnDefs: [{
                headerName: '',
                children: [
                    { field: "nombres", headerName: 'Nombre', minWidth: 225, },
                ]
            }, {
                headerName: 'QUIMESTRE 1',
                children: [
                    {
                        field: "promedio1", headerName: 'P1', minWidth: 60,
                        valueGetter: params => {
                            let p1 = params.data.a1.toString().replace(",", ".")
                            let a1 = parseFloat(p1)
                            let p2 = params.data.a2.toString().replace(",", ".")
                            let a2 = parseFloat(p2)
                            let p3 = params.data.a3.toString().replace(",", ".")
                            let a3 = parseFloat(p3)
                            let p4 = params.data.a4.toString().replace(",", ".")
                            let a4 = parseFloat(p4)
                            let p5 = params.data.a5.toString().replace(",", ".")
                            let a5 = parseFloat(p5)
                            let suma = a1 + a2 + a3 + a4 + a5
                            let promedio = (suma / 5).toFixed(2);
                            return `${promedio}`;
                        }
                    },
                    {
                        field: "promedio2", headerName: 'P2', minWidth: 60,
                        valueGetter: params => {
                            let p1 = params.data.b1.toString().replace(",", ".")
                            let a1 = parseFloat(p1)
                            let p2 = params.data.b2.toString().replace(",", ".")
                            let a2 = parseFloat(p2)
                            let p3 = params.data.b3.toString().replace(",", ".")
                            let a3 = parseFloat(p3)
                            let p4 = params.data.b4.toString().replace(",", ".")
                            let a4 = parseFloat(p4)
                            let p5 = params.data.b5.toString().replace(",", ".")
                            let a5 = parseFloat(p5)
                            let suma = a1 + a2 + a3 + a4 + a5
                            let promedio = (suma / 5).toFixed(2);
                            return `${promedio}`;
                        },

                    },
                    {
                        field: "promedio3", headerName: 'PRO', minWidth: 60,
                        valueGetter: totalValueGetter,
                    },
                    {
                        field: "promedio4", headerName: '80%', minWidth: 60,
                        valueGetter: totalPromedioAportes,
                    },
                    { field: "examenfinal", headerName: 'EX', },
                    {
                        field: "promedio5", headerName: '20%', minWidth: 60,
                        valueGetter: totalParcialExamen,
                    },
                    {
                        field: "qfinal", headerName: 'QUI', minWidth: 60, cellStyle: cellStyle,
                        valueGetter: totalFinalQuim,
                    },
                ]
            }, //########################################SEGUNDO PARCIAL########################################
            {
                headerName: 'QUIMESTRE 2',
                children: [

                    {
                        field: "promedio11", headerName: 'P1', minWidth: 60,
                        valueGetter: params => {
                            let p1 = params.data.x1.toString().replace(",", ".")
                            let a1 = parseFloat(p1)
                            let p2 = params.data.x2.toString().replace(",", ".")
                            let a2 = parseFloat(p2)
                            let p3 = params.data.x3.toString().replace(",", ".")
                            let a3 = parseFloat(p3)
                            let p4 = params.data.x4.toString().replace(",", ".")
                            let a4 = parseFloat(p4)
                            let p5 = params.data.x5.toString().replace(",", ".")
                            let a5 = parseFloat(p5)
                            let suma = a1 + a2 + a3 + a4 + a5
                            let promedio = (suma / 5).toFixed(2);
                            return `${promedio}`;
                        }
                    },

                    {
                        field: "promedio22", headerName: 'P2', minWidth: 60,
                        valueGetter: params => {
                            let p1 = params.data.y1.toString().replace(",", ".")
                            let a1 = parseFloat(p1)
                            let p2 = params.data.y2.toString().replace(",", ".")
                            let a2 = parseFloat(p2)
                            let p3 = params.data.y3.toString().replace(",", ".")
                            let a3 = parseFloat(p3)
                            let p4 = params.data.y4.toString().replace(",", ".")
                            let a4 = parseFloat(p4)
                            let p5 = params.data.y5.toString().replace(",", ".")
                            let a5 = parseFloat(p5)
                            let suma = a1 + a2 + a3 + a4 + a5
                            let promedio = (suma / 5).toFixed(2);
                            return `${promedio}`;
                        }
                    },
                    {
                        field: "promedio33", headerName: 'PRO', minWidth: 60,
                        valueGetter: totalValueGetter2,
                    },
                    {
                        field: "promedio44", headerName: '80%', minWidth: 60,
                        valueGetter: totalPromedioAportes2,
                    },
                    { field: "examenfinal2", headerName: 'EX', },
                    {
                        field: "promedio55", headerName: '20%', minWidth: 60,
                        valueGetter: totalParcialExamen2,
                    },
                    {
                        field: "qfinal2", headerName: 'QUI', minWidth: 60, cellStyle: cellStyle,
                        valueGetter: totalFinalQuim2,
                    },
                ]
            },
            {
                headerName: 'P ANUAL',
                children: [
                    { field: "nombres", headerName: 'PA', minWidth: 100, cellStyle: cellStyle, valueGetter: totalPromedioAnual },

                ]
            }
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


var totalValueGetter = function (params) {
    var q1 = params.getValue('promedio1');
    var q2 = params.getValue('promedio2');
    var suma = parseFloat(q1) + parseFloat(q2)
    let promedio = (suma / 2).toFixed(2);
    return promedio;
};
var totalValueGetter2 = function (params) {
    var q1 = params.getValue('promedio11');
    var q2 = params.getValue('promedio22');
    var suma = parseFloat(q1) + parseFloat(q2)
    let promedio = (suma / 2).toFixed(2);
    return promedio;
};
var totalPromedioAportes = function (params) {
    var rest = params.getValue('promedio3');
    var test = rest.toString().replace(",", ".")
    let aux = parseFloat(test)
    let promedio = ((aux * 8) / 10).toFixed(2);
    return promedio;
};
var totalPromedioAportes2 = function (params) {
    var rest = params.getValue('promedio33');
    var test = rest.toString().replace(",", ".")
    let aux = parseFloat(test)
    let promedio = ((aux * 8) / 10).toFixed(2);
    return promedio;
};
var totalParcialExamen = function (params) {
    var rest = params.getValue('examenfinal');
    var test = rest.toString().replace(",", ".")
    let aux = parseFloat(test)
    let promedio = ((aux * 2) / 10).toFixed(2);
    return promedio;
};
var totalParcialExamen2 = function (params) {
    var rest = params.getValue('examenfinal2');
    var test = rest.toString().replace(",", ".")
    let aux = parseFloat(test)
    let promedio = ((aux * 2) / 10).toFixed(2);
    return promedio;
};
var totalFinalQuim = function (params) {
    var pro1 = params.getValue('promedio4');
    var test1 = pro1.toString().replace(",", ".")
    let aux1 = parseFloat(test1)
    var pro2 = params.getValue('promedio5');
    var test2 = pro2.toString().replace(",", ".")
    let aux2 = parseFloat(test2)
    return (aux2 + aux1).toFixed(2);
};
var totalFinalQuim2 = function (params) {
    var pro1 = params.getValue('promedio44');
    var test1 = pro1.toString().replace(",", ".")
    let aux1 = parseFloat(test1)
    var pro2 = params.getValue('promedio55');
    var test2 = pro2.toString().replace(",", ".")
    let aux2 = parseFloat(test2)
    return (aux2 + aux1).toFixed(2);
};
var totalPromedioAnual = function (params) {
    var pro1 = params.getValue('qfinal');
    var test1 = pro1.toString().replace(",", ".")
    let aux1 = parseFloat(test1)
    var pro2 = params.getValue('qfinal2');
    var test2 = pro2.toString().replace(",", ".")
    let aux2 = parseFloat(test2)
    return ((aux2 + aux1) / 2).toFixed(2);
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
