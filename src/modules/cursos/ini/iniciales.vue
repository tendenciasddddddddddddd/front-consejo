<template>
  <ScrimModal @close="$router.go(-1)">
    <template v-slot:header>{{ mate }} Paralelo {{ para }}</template>
    <template v-slot:body>

      <ProgressBar v-if="isData"></ProgressBar>
      <div v-else class="row">
        <div class="text-end">
          <button @click="save" :disabled="ifsaved" class="btn btnNaranja">Guardar</button>
        </div>
        <div>
          <section style="height: calc(100vh - 210px);">
            <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
              @grid-ready="onGridReady" :defaultColDef="defaultColDef" :rowData="rowData"
              :autoGroupColumnDef="autoGroupColumnDef" :enableRangeSelection="true" >
            </ag-grid-vue>
          </section>
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

<script>
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import ProgressBar from "../../../shared/ProgressBar";
import ScrimModal from "../../../shared/ScrimModal";
import json from './data.json'
export default {
  name: 'ModuloAula',
  components: {
    ProgressBar, ScrimModal, AgGridVue
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
      if (this.num =='1') {archivoJson = this.myJson.inicial1}
      if (this.num =='2') {archivoJson = this.myJson.inicial2}
      if (this.num =='3') {archivoJson = this.myJson.primero}
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
        if (this.num =='1') {destresas = this.myJson.inicial1}
        if (this.num =='2') {destresas = this.myJson.inicial2}
        if (this.num =='3') {destresas = this.myJson.primero}
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
    verificarUsuario() {
      if (restResourceService.docente(this.roles)||restResourceService.admin(this.roles)){
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
