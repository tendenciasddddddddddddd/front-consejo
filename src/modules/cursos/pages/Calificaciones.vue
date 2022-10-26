<template>
  <div >
    <fullscreen v-model="fullscreen" style="background: #fff;">
      <Astronauta v-if="isPrint"/>
    <div v-else>
      <ActionRowNotas v-if="!ifsaved" @remove="remove" @save="save" @openModal="onBtExport" @open="open" @changeSearch="changeSearch" @toggle="toggle"/>
    </div>
    <section style="height: calc(100vh - 265px);">
      <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData"
      :defaultColDef="defaultColDef" :enableRangeSelection="true" :suppressCopySingleCellRanges="true"
        :enableFillHandle="true" @grid-ready="onGridReady">
    </ag-grid-vue>
    </section>
    </fullscreen>

    <div v-if="iftask">
         <Report  @EventClosed="closed" @getData="getDataAll" :rowData="rowData" @changeStatus="changeStatus"/>
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
        sortable: true,
        filter: true,
      },
      rowSelection: null,
      columnDefs: [{
        headerName: 'LISTADO',
        children: [
        { field: "nombres", headerName: 'ESTUDIANTES', minWidth: 270, pinned: 'left',},
        ]
      },{
        headerName: 'QUIMESTRE 1',
        children: [
          
          { field: "a1", headerName: 'A1', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "a2", headerName: 'A2', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "a3", headerName: 'A3', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "a4", headerName: 'A4', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "a5", headerName: 'A5', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          {
            field: "promedio1", headerName: 'P1', minWidth: 60, cellStyle: cellStyle, columnGroupShow: 'open',
            valueGetter: params => {
              let p1 = params.data.a1.toString().replace(",", "."),p2 = params.data.a2.toString().replace(",", "."),
               p3 = params.data.a3.toString().replace(",", "."),p4 = params.data.a4.toString().replace(",", "."),
               p5 = params.data.a5.toString().replace(",", ".")
              let a1 = parseFloat(p1), a2 = parseFloat(p2), a3 = parseFloat(p3), a4 = parseFloat(p4), a5 = parseFloat(p5)
              let suma = 0;
              let promedio = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              promedio = (suma / aux).toFixed(2);
              return promedio;
            }
          },
          { field: "b1", headerName: 'A1', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "b2", headerName: 'A2', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "b3", headerName: 'A3', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "b4", headerName: 'A4', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "b5", headerName: 'A5', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          {
            field: "promedio2", headerName: 'P2', minWidth: 60, cellStyle: cellStyle, columnGroupShow: 'open',
            valueGetter: params => {
              let p1 = params.data.b1.toString().replace(",", "."), p2 = params.data.b2.toString().replace(",", "."),
                  p3 = params.data.b3.toString().replace(",", "."), p4 = params.data.b4.toString().replace(",", "."),
                  p5 = params.data.b5.toString().replace(",", ".")
              let a1 = parseFloat(p1), a2 = parseFloat(p2), a3 = parseFloat(p3), a4 = parseFloat(p4), a5 = parseFloat(p5)
              let suma = 0;
              let promedio = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              promedio = (suma / aux).toFixed(2);
              return promedio;
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
          { field: "examenfinal", headerName: 'EX', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          {
            field: "promedio5", headerName: '20%', minWidth: 60,
            valueGetter: totalParcialExamen,
          },
          {
            field: "qfinal", headerName: 'QUI 1', minWidth: 60, cellStyle: cellStyle,
            valueGetter: totalFinalQuim,
          },
        ]
      }, //########################################SEGUNDO PARCIAL########################################
      {
        headerName: 'QUIMESTRE 2',
        children: [
          { field: "x1", headerName: 'A1', editable: true ,columnGroupShow: 'open', valueFormatter: saleValueFormatter},
          { field: "x2", headerName: 'A2', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "x3", headerName: 'A3', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "x4", headerName: 'A4', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "x5", headerName: 'A5', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          {
            field: "promedio11", headerName: 'P1', minWidth: 60, cellStyle: cellStyle, columnGroupShow: 'open',
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
              let suma = 0;
              let promedio = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              promedio = (suma / aux).toFixed(2);
              return promedio;
            }
          },
          { field: "y1", headerName: 'A1', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "y2", headerName: 'A2', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "y3", headerName: 'A3', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "y4", headerName: 'A4', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          { field: "y5", headerName: 'A5', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          {
            field: "promedio22", headerName: 'P2', minWidth: 60, cellStyle: cellStyle, columnGroupShow: 'open',
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
              let suma = 0;
              let promedio = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              promedio = (suma / aux).toFixed(2);
              return promedio;
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
          { field: "examenfinal2", headerName: 'EX', editable: true, columnGroupShow: 'open', valueFormatter: saleValueFormatter },
          {
            field: "promedio55", headerName: '20%', minWidth: 60, 
            valueGetter: totalParcialExamen2,
          },
          {
            field: "qfinal2", headerName: 'QUI 2', minWidth: 60, cellStyle: cellStyle, 
            valueGetter: totalFinalQuim2,
          },
        ]
      },
      {
        headerName: 'P ANUAL',
        children: [
        { field: "promed", headerName: 'PA', minWidth: 100, cellStyle: cellStyle, valueGetter: totalPromedioAnual},
       
        ]
      }
      ],
      quimestre: 'p1',
      gridApi: null,
      iftask: false,
      fullscreen: false,
      ifsaved: false
    };
  },
  components: {
    AgGridVue, ActionRowNotas,Astronauta,
    Report: () => import( /* webpackChunkName: "Reporth" */ "./Report.vue"),
  },
  created() {
    this.rowSelection = 'multiple';
    this.onGridReadys();
  },
  methods: {
    toggle () {
        this.fullscreen = !this.fullscreen
      },
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
        const quim = this.object[i].notas
        var objeto = {
          id: this.object[i].id,
          fora: this.object[i].fora,
          nombres: this.object[i].name,
          a1: quim[0].a1, a2: quim[0].a2, a3: quim[0].a3, a4: quim[0].a4, a5: quim[0].a5,
          b1: quim[0].b1, b2: quim[0].b2, b3: quim[0].b3, b4: quim[0].b4, b5: quim[0].b5,
          examenfinal: quim[0].examen,
          x1: quim[1].a1, x2: quim[1].a2, x3: quim[1].a3, x4: quim[1].a4, x5: quim[1].a5,
          y1: quim[1].b1, y2: quim[1].b2, y3: quim[1].b3, y4: quim[1].b4, y5: quim[1].b5,
          examenfinal2: quim[1].examen,
        }
        anArray.push(objeto);
      }
      this.rowData = anArray;
    },
    remove() {
      console.log("remove");
    },
    changeSearch(value) {
      this.gridApi.setQuickFilter(value);
    },
    getDataAll() {
      this.$emit('getDataTask');
    },
    open: function(){
      this.iftask = false;
      setTimeout(() => this.iftask = true, 100);
      this.isPrint = true;
    },
    closed: function () {
        this.iftask = false
    },
    changeStatus(ev){
      if (ev=='100') {
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
        if (!this.validateNumber(element.a1)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.a2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.a3)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.a4)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.a5)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.b1)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.b2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.b3)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.b4)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.b5)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.x1)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.x2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.x3)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.x4)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.x5)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.y1)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.y2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.y3)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.y4)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.y5)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.examenfinal)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        if (!this.validateNumber(element.examenfinal2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
        result.push({
          id: element.id,
          fora: element.fora,
          promediof:  ResultServiceNota.calcular_promedio_final(element),
          notas: [{          
            quimestre: 'p1',
            a1: element.a1.toString().replace(",", "."),
            a2: element.a2.toString().replace(",", "."),
            a3: element.a3.toString().replace(",", "."),
            a4: element.a4.toString().replace(",", "."),
            a5: element.a5.toString().replace(",", "."),
            b1: element.b1.toString().replace(",", "."),
            b2: element.b2.toString().replace(",", "."),
            b3: element.b3.toString().replace(",", "."),
            b4: element.b4.toString().replace(",", "."),
            b5: element.b5.toString().replace(",", "."),
            examen: element.examenfinal.toString().replace(",", ".")
          },{
            quimestre: 'p2',
            a1: element.x1.toString().replace(",", "."),
            a2: element.x2.toString().replace(",", "."),
            a3: element.x3.toString().replace(",", "."),
            a4: element.x4.toString().replace(",", "."),
            a5: element.x5.toString().replace(",", "."),
            b1: element.y1.toString().replace(",", "."),
            b2: element.y2.toString().replace(",", "."),
            b3: element.y3.toString().replace(",", "."),
            b4: element.y4.toString().replace(",", "."),
            b5: element.y5.toString().replace(",", "."),
            examen: element.examenfinal2
          }]
        })
      }
        this.ifsaved = true;
             this.$proxies._notasProxi
              .updateFullNote(this.$route.params.id, result) //-----------EDITAR CON AXIOS
             .then(() => {
              this.ifsaved = false;
               this.getDataAll();
               this.toast("Se guardo las notas con exito");
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
  let at = ((aux2 + aux1)/2).toFixed(2);
  return at;
};
var cellStyle = function (params) {
  const color = numberToColor(params.value);
  return {
    backgroundColor: color,
  };
};
var numberToColor = function (val) {
  if (val < 7) {
    return '#FEB6C4';
  } else if (val >= 7 && val <= 10) {
    return '#aaffaa';
  } else {
    return '#aaaaff';
  }
};
</script>
