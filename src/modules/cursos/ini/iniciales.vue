<template>
  <ScrimModal @close="$router.go(-1)">
    <template v-slot:header>{{ mate }} Paralelo {{ para }}</template>
    <template v-slot:body>
      <Astronauta v-if="isPrint" />
      <vue-progress-bar style="margin-top:-6px;"></vue-progress-bar>
      <ProgressBar v-if="isData"></ProgressBar>
      <div v-else class="row">
        <div class="text-end">
          <button @click="ambitos" class="btn btnNaranja2 me-2">Reporte por ámbitos</button>
          <button @click="destresas" class="btn btnNaranja2 me-2">Reporte por destresas</button>
          <button @click="save" :disabled="ifsaved" class="btn btnNaranja">Guardar</button>
        </div>
        <div>
          <section style="height: calc(100vh - 200px);">
            <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
              @grid-ready="onGridReady" :defaultColDef="defaultColDef" :rowData="rowData"
              :suppressCopySingleCellRanges="true" :enableFillHandle="true" :autoGroupColumnDef="autoGroupColumnDef"
              :enableRangeSelection="true">
            </ag-grid-vue>
          </section>
        </div>
        <div v-if="iftask" style="display: none">
          <InicialReporte :sett="sett" :rowData="rowDatas" @changeStatus="changeStatus" />
        </div>
        <div v-if="iftask2" style="display: none">
          <AmbitosReport :sett="sett" :rowData="rowDatas" @changeStatus="changeStatus" />
        </div>
        <div v-if="iftask3" style="display: none">
          <PrimerosReport :sett="sett" :rowData="rowDatas" @changeStatus="changeStatus" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button @click="$router.go(-1)" class="btn btnNaranja2 me-3">
        Salir de aqui
      </button>
    </template>
  </ScrimModal>
</template>
<style>
  .ag-header-cell-label .ag-header-cell-text {
    writing-mode: horizontal-tb !important; transform: rotate(0deg) !important;
    line-height: 2em;
    margin-top: 10px;
    width: 150px !important;
  }</style>
<script>
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import ProgressBar from "../../../shared/ProgressBar";
import ScrimModal from "../../../shared/ScrimModal";
import Astronauta from "../../../shared/Astronauta"
import json from './data.json'
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar, ScrimModal, AgGridVue,Astronauta,
    InicialReporte: () => import( /* webpackChunkName: "InicialReporte" */ "./InicialReporte.vue"),
    AmbitosReport: () => import( /* webpackChunkName: "AmbitosReport" */ "./AmbitosReport.vue"),
    PrimerosReport: () => import( /* webpackChunkName: "PrimerosReport" */ "./PrimerosReport.vue"),
  },
  data() {
    return {
      myJson: json,
      roles: this.$store.state.user.roles,
      isData: false,
      para: "",
      name: "",
      mate: "",
      num: '',
      isVerific: {},
      iftask: false,
      iftask2: false,
      iftask3: false,
      isPrint: false,
      inAlumnos: [],
      model2: {
        _id: null,
        iniciales: {
          docente: "",
          materia: "",
          notas: [{}],
        },
      },
      columnDefs: [
        { field: 'iden', headerName: 'IDENTIFICADORES', rowGroup: true, hide: true },
        { field: 'des', headerName: 'DESTREZAS', rowGroup: true, hide: true },
        { field: 'name', headerName: 'ESTUDIANTE', minWidth: 290, },
        {
          field: 'quimestre1', headerName: 'QUIM 1', editable: true, cellEditorPopup: true, cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: { cellHeight: 30, values: ['I', 'EP', 'A', 'NE'] },
        },
        {
          field: 'quimestre2', headerName: 'QUIM 2', editable: true, cellEditorPopup: true, cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: { cellHeight: 30, values: ['I', 'EP', 'A', 'NE'] },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      rowData: null,
      rowDatas: [],
      sett: [],
      getRowId: null,
      autoGroupColumnDef: {
        minWidth: 500,
      },
      ifsaved: false
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    LoadCourse: function () {
      const seccio = JSON.parse(localStorage.getItem("myCourse"));
      this.para = seccio.paralelo;
      this.name = seccio.nombre;
      this.mate = seccio.materia;
      this.docentes = seccio.nombredoc;
      this.num = seccio.num;
      this.getData();
      this.sett.push({
        nombredoc: seccio.nombredoc,
        paralelo: seccio.paralelo,
        num: seccio.num,
        nivel: seccio.nivel,
      })
    },
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.$route.params.id) {
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            const isExiste = []
            const filtros = x.data.filter((x) => x.curso == this.para);
            for (let i = 0; i < filtros.length; i++) {
              const element = filtros[i];
              const aux = element.iniciales.filter((x) => x.materia == this.mate);
              if (aux.length == 0) {
                isExiste.push(element._id)
              }
            }
            if (isExiste.length > 0) {
              this.configDocenteMateria(isExiste);
              this.isData = false;
            } else {
              this.isVerific = filtros.sort(function (a, b) {
                var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
                if (nameA < nameB)
                  return -1;
                if (nameA > nameB)
                  return 1;
                return 0;
              });
              const restt = this.llenarTabla(this.isVerific, this.mate)
              this.rowData = restt
              this.isData = false;
              this.$Progress.finish();
            }
          })
          .catch((x) => {
            console.log(x);
            this.isData = false;
            this.$Progress.fail();
          });
      }
    },

    llenarTabla(datas, materia) {
      let archivoJson = [];
      if (this.num == '1') { archivoJson = this.myJson.inicial1 }
      if (this.num == '2') { archivoJson = this.myJson.inicial2 }
      if (this.num == '3') { archivoJson = this.myJson.primero }
      const inAlumnos = [];
      for (let h = 0; h < archivoJson.length; h++) {
        const element = archivoJson[h];
        for (let i = 0; i < datas.length; i++) {
          let id = datas[i]._id;
          let nombre = datas[i].nombre;
          let foranea = "";
          let quimestre1 = '', quimestre2 = ''
          let notas = datas[i].iniciales;
          for (let j = 0; j < notas.length; j++) {
            if (notas[j].materia == materia) {
              let calificar = notas[j].notas;
              foranea = notas[j]._id;
              quimestre1 = calificar[0].cali[h]
              quimestre2 = calificar[1].cali[h]
              break;
            }
          }
          inAlumnos.push({
            id: id,
            name: nombre,
            fora: foranea,
            quimestre1: quimestre1,
            quimestre2: quimestre2,
            idJson: element.id,
            des: element.des,
            iden: element.iden,
          });
        }
      }
      return inAlumnos
    },
    configDocenteMateria(array) {
      const idDestresas = [];
      let destresas = []
      if (this.num == '1') { destresas = this.myJson.inicial1 }
      if (this.num == '2') { destresas = this.myJson.inicial2 }
      if (this.num == '3') { destresas = this.myJson.primero }
      for (let i = 0; i < destresas.length; i++) {
        idDestresas.push('NE')
      }
      const notass = [
        { quimestre: 'p1', cali: idDestresas },
        { quimestre: 'p2', cali: idDestresas }
      ]
      this.model2.iniciales.docente = this.docentes;
      this.model2.iniciales.materia = this.mate;
      this.model2.iniciales.notas = notass;
      this.$proxies._notasProxi
        .updateInicialesReforma(array, this.model2)
        .then(() => {
          this.getDataActualizada();
          array = [];
        })
        .catch(() => {
          this.$dialog.alert("No se puede completar la operación");
          array = [];
        });

    },
    getDataActualizada() {
      if (this.$route.params.id) {
        this.isData = true;
        this.$Progress.start();
        this.$proxies._notasProxi
          .getAll(this.$route.params.id)
          .then((x) => {
            const filtros = x.data.filter((x) => x.curso == this.para);
            this.isVerific = filtros.sort(function (a, b) {
              var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
              if (nameA < nameB)
                return -1;
              if (nameA > nameB)
                return 1;
              return 0;
            });
            const restt = this.llenarTabla(this.isVerific, this.mate)
            this.rowData = restt
            this.isData = false;
            this.$Progress.finish();
          })
          .catch((x) => {
            console.log("Error", x);
            this.isData = false;
            this.$Progress.finish();
          });
      }
    },
    destresas() {
      if (this.isVerific.length > 0) {
        this.isPrint = true;
        this.rowDatas = []
        for (let i = 0; i < this.isVerific.length; i++) {
          const element = this.isVerific[i];
          const result = element.iniciales[0].notas
          const idDestresas = [];
          let destresas = []
          if (this.num == '1') { destresas = this.myJson.inicial1 }
          if (this.num == '2') { destresas = this.myJson.inicial2 }
          if (this.num == '3') { destresas = this.myJson.primero }
          for (let h = 0; h < destresas.length; h++) {
            idDestresas.push({
              id: destresas[h].id,
              des: destresas[h].des,
              qui1: result[0].cali[h],
              qui2: result[1].cali[h]
            })
          }
          this.rowDatas.push({
            nombre: element.nombre,
            datas: idDestresas,
            periodo: element.academico ? element.academico.nombre : 'Undefined'
          })
        }
        if (this.num==3){ this.iftask3 = true}
        else {this.iftask = true}
      }
    },
    ambitos() {
      if (this.isVerific.length > 0) {
        this.isPrint = true;
        this.rowDatas = []
        for (let i = 0; i < this.isVerific.length; i++) {
          const element = this.isVerific[i];
          const result = element.iniciales[0].notas
          const idDestresas = [];
          let destresas = []
          if (this.num == '1') { destresas = this.myJson.inicial1 }
          if (this.num == '2') { destresas = this.myJson.inicial2 }
          if (this.num == '3') { destresas = this.myJson.primero }
          for (let h = 0; h < destresas.length; h++) {
            idDestresas.push({
              id: destresas[h].id,
              iden: destresas[h].iden,
              qui1: result[0].cali[h],
              qui2: result[1].cali[h]
            })
          }
          const distinctIds = [];
          idDestresas.forEach(entry => {
            const { id, iden, qui1, qui2 } = entry;
            const exists = distinctIds.find(y => y.iden === entry.iden)
            if (!exists) {
              distinctIds.push({ id, iden: iden, data: [{ qui1: qui1, qui2: qui2 }] })
            } else {
              exists.data.push({ qui1: qui1, qui2: qui2 })
            }
          })
          const final = []
          for (let h = 0; h < distinctIds.length; h++) {
            const element = distinctIds[h];
            let cont = 0;
            let cont2 = 0;
            for (let m = 0; m < element.data.length; m++) {
              const qui1 = element.data[m].qui1;
              const qui2 = element.data[m].qui2;
              let aux = this.returnNumber(qui1);
              cont = cont + aux
              let aux2 = this.returnNumber(qui2);
              cont2 = cont2 + aux2
            }
            let mep = parseInt(cont / element.data.length)
            var letra1 = this.retornarLetra(mep)
            let mep2 = parseInt(cont2 / element.data.length)
            var letra2 = this.retornarLetra(mep2)
            final.push({
              iden: element.iden,
              letra1: letra1,
              letra2: letra2
            })
          }
          this.rowDatas.push({
            nombre: element.nombre,
            datas: final,
            periodo: element.academico ? element.academico.nombre : 'Undefined'
          })
        }
         this.iftask2 = true
      }
    },
    returnNumber(letra) {
      let aux = 0;
      switch (letra) {
        case "I": aux = 4;
          break;
        case "EP": aux = 3;
          break;
        case "A": aux = 2;
          break;
        case "NE": aux = 1;
          break;
        default:
          break;
      }
      return aux;
    },
    retornarLetra(mep) {
      var letra = 'NE'
      switch (mep) {
        case 4: letra = 'I';
          break;
        case 3: letra = 'EP';
          break;
        case 2: letra = 'A';
          break;
        case 1: letra = 'NE';
          break;
        default:
          break;
      }
      return letra;
    },
    changeStatus(ev) {
      if (ev == '100') {
        this.isPrint = false;
        this.iftask = false
        this.iftask2 = false
        this.iftask3 = false
      }
    },
    verificarUsuario() {
      if (restResourceService.docente(this.roles) || restResourceService.admin(this.roles)) {
        this.LoadCourse();
      } else {
        this.$router.push("/page-not-found");
      }
    },
    validateNumber(num) {
      let paralelo = ['I', 'EP', 'A', 'NE']
      if (paralelo.includes(num)) {
        return true;
      } else {
        return false;
      }
    },
    save() {
      if (this.isVerific.length > 0) {
        const result = [];
        for (let i = 0; i < this.isVerific.length; i++) {
          const element = this.isVerific[i];
          const res = this.rowData.filter((x) => x.id == element._id);
          let quim1 = []
          let quim2 = []
          for (let h = 0; h < res.length; h++) {
            const elemn = res[h];
            if (!this.validateNumber(elemn.quimestre1)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
            if (!this.validateNumber(elemn.quimestre2)) return this.$dialog.alert(` NO SE PUEDE PROCESAR ALGUNOS VALORES`);
            quim1.push(elemn.quimestre1)
            quim2.push(elemn.quimestre2)
          }
          result.push({
            id: element._id,
            fora: element.iniciales[0]._id,
            iniciales: [
              { quimestre: 'p1', cali: quim1 },
              { quimestre: 'p2', cali: quim2 }
            ]
          })
        }
        this.ifsaved = true;
        this.$proxies._notasProxi
          .updateIniciales(this.$route.params.id, result)
          .then(() => {
            this.ifsaved = false;
            this.getDataActualizada();
            this.toast("Se guardo las notas de comportamiento con exito");
          })
          .catch(() => {
            this.$dialog.alert("No se puede completar la operación");
            this.ifsaved = false;
          });
      }

    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2300,
        position: 'bottom-center',
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
  },
  created() {
    this.verificarUsuario();

  },

}


</script>
