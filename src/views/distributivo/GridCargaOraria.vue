<template>
  <div>
    <div class="row mb-3 mt-2">
      <div class="col-sm-3">
        <div class="input-group" style="margin-bottom: 7px;">
          <span class="input-group-text negros buscador busca">
          <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
        </span>
        <input type="text" id="quickFilter" v-on:input="onQuickFilterChanged()" class="form-control buscador buscaa" placeholder="Buscar" />
        </div>
      </div>
      <div class="col-sm-8 ">
        <button v-on:click="onBtAdd()" role="button" class="btn btnNaranja2 ">
          Insertar fila
        </button>
        <button v-on:click="clearData()" role="button" class="btn btnNaranja2 ms-3">
          Eliminar
        </button>
        <button v-on:click="openModal" role="button" class="btn btnNaranja2 ms-3">
          Distri.. ordenado
        </button>
        <button v-on:click="getRowData()" role="button" class="btn btnNaranja ms-3">
          Guardar cambios
        </button>
        
      </div>
    </div>
        <Spinner v-if="isLoading"></Spinner>
    <section v-else style="height: calc(100vh - 220px);">
      <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs" :defaultColDef="defaultColDef" :editType="editType" :rowData="rowData"
        :rowSelection="rowSelection" :rowDragManaged="true" :animateRows="true" :isRowSelectable="isRowSelectable"
        :enableRangeSelection="true" :suppressRowClickSelection="true" :enableFillHandle="true" @grid-ready="onGridReady($event, 0)">
      </ag-grid-vue>
    </section>
   
     <ScrimModal v-show="visible" @close="close">
        <template v-slot:header> Lista de distributivo por curso y paralelo</template>
        <template v-slot:body>
          <Spinner v-if="isLoading"></Spinner>
    <section v-else style="height: calc(100vh - 120px);">
      <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="topColumns" :defaultColDef="defaultColDef" :editType="editType" :rowData="rowData"
        :rowSelection="rowSelection" :rowDragManaged="true" :animateRows="true" :isRowSelectable="isRowSelectable"
        :enableRangeSelection="true" :suppressRowClickSelection="true" :enableFillHandle="true" @grid-ready="onGridReady($event, 2)">
      </ag-grid-vue>
    </section>
        </template>
        
      </ScrimModal>
    <div v-if="ifload" class="loadingg">
      <div class="inn ">
        <h4 style="font-weight:400" class="text-white mb-0 fadeIn2 fadeInBottom">Configurando distributivo
          <div  class="text-center me-3">
      <div class="spinner-grow text-danger me-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning me-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
    <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
        </div>
        </h4>
      </div>
    </div>
    <div v-if="ifyoutuve">
          <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'768849465'"/>
        </div>
        
  </div>
</template>
<style>
  .ag-header-cell-label .ag-header-cell-text {
    writing-mode: horizontal-tb !important; transform: rotate(0deg) !important;
    line-height: 2em;
    margin-top: 10px;
    width: 150px !important;
  }</style>
<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import Spinner from "../../shared/Spinner";
export default {
  components: {
    AgGridVue, Spinner,
    VueYoutuve: () =>import( /* webpackChunkName: "VueYoutuve" */ "../../shared/VueYoutuve.vue"),
    ScrimModal: () =>
        import(/* webpackChunkName: "ScrimModal" */ "../../shared/ScrimModal.vue"),
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'nombre', headerName: 'DOCENTE', cellEditor: 'agSelectCellEditor', checkboxSelection: true, editable: true, rowDrag: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.listDocentes.length; i++) {
              arrays.push(this.listDocentes[i].fullname)
            }
            arrays.sort()
            return {
              values: arrays
            };
          },
        },
        {
          field: 'curso', headerName: 'CURSO',
          cellEditor: 'agSelectCellEditor', editable: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.listniveles.length; i++) {
              arrays.push(this.listniveles[i].nombre)
            }
           // arrays.sort()
            return {
              values: arrays
            };
          },
        },
        {
          field: 'materia',headerName: 'MATERIA', cellEditor: 'agSelectCellEditor', editable: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.listMaterias.length; i++) {
              arrays.push(this.listMaterias[i].nombre)
            }
            arrays.sort()
            return {
              values: arrays
            };
          }
        },
        {
          field: 'paralelo',headerName: 'PARALELO', cellEditor: 'agSelectCellEditor', editable: true,
          minWidth: 70, maxWidth: 70, valueFormatter: saleValueFormatter,
          cellEditorParams: {
            values: ['A', 'B', 'C', 'D', 'E'],
          },
        },
      ],
      topColumns: [
        { field: 'curso',  rowGroup: true, hide: true,},
        { field: 'paralelo', rowGroup: true, hide: true,},
        { field: 'nombre', headerName: 'DOCENTE', },
        { field: 'materia',  },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
      },
      editType: null,
      rowData: [],
      topRowData: [],
      ifload: false,
      rowGroupPanelShow: 'always',
      rowSelection: 'multiple',
      isRowSelectable: null,
      isLoading: false,
      isCurso: false,
      isMateria: false,
      isDocente: false,
      listniveles: {},
      listDocentes: [],
      listMaterias: {},
      ifyoutuve : false,
      leftApi: null,
      topApi: null,
      visible : false
    };
  },
  created() {
    this.verificarUsuario()
    this.__listNivele();
    this.__listdocentes();
    this.__listmaterias();
    this.getAll();
    this.editType = 'fullRow';
    this.isRowSelectable = (rowNode) => {
      return !rowNode.group;
    };
  },
  methods: {
    openModal() {
            this.visible = true;
          },
          close() {
            this.visible = false;
          },
    ClosedYoutuve: function(){
      this.ifyoutuve = false;
    },
    onQuickFilterChanged() {
      this.leftApi.setQuickFilter(document.getElementById('quickFilter').value);
    },
    verificarUsuario() {
      let text_1 = 'Pages'
      let text_2 = 'Distributivo'
      this.$store.commit('updateHeader', { text_1, text_2 })
    },
    __listNivele: function() {
      this.isCurso = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.listniveles = x.data;
          this.isCurso = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isCurso = false;
        });
    },
    __listdocentes: function() {
      this.isDocente = true;
      this.$proxies._registroProxi
        .getListDocentes()
        .then((x) => {
          this.listDocentes = x.data;
          this.isDocente = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isDocente = false;
        });
    },
    __listmaterias: function() {
      this.isMateria = true;
      this.$proxies._gestionProxi
        .getListMaterias()
        .then((x) => {
          this.listMaterias = x.data
          this.isMateria = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isMateria = false;
        });
    },
    onBtAdd() {
    //  var num = this.rowData.length + 1;
      var array = []
      array.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' })
      this.leftApi.applyTransaction({ add: array, addIndex: 0, });
    },
    clearData() {
      var selectedRowData = this.leftApi.getSelectedRows();
      this.leftApi.applyTransaction({ remove: selectedRowData });
    },
    getRowData() {
      this.ifload = true;
      let validate = false;
      let validate2 = false;
      let arrayDocente = this.listDocentes
      let arrayCursos = this.listniveles
      let arrayMaterias = this.listMaterias
      const results = []
      this.leftApi.forEachNode(function (node) {
        if (node.data != null) {
          if (node.data.paralelo != 'En blanco') {
            if (!validateParalelo(node.data.paralelo)) validate2 = true;
            try {
            const docente = seachDocente(node.data.nombre);
            const curso = seachCurso(node.data.curso);
            const materia = seachMateria(node.data.materia);
            results.push({
              fnivel: curso[0]._id,
              fdocente: docente[0]._id,
              fmateria: materia[0]._id,
              paralelo: node.data.paralelo,
              planificacion: node.data.planificacion,
              ifComplementarias : materia[0].estado == 1 ? 0 : 1,
            }) 
            } catch (error) {
              validate = true;
            }
          }
        }
      })
      function seachDocente(items) {
        const result = (arrayDocente).filter((x) => x.fullname == items);
        return result;
      }
      function seachCurso(items) {
        const result = arrayCursos.filter((x) => x.nombre == items);
        return result;
      }
      function seachMateria(items) {
        const result = arrayMaterias.filter((x) => x.nombre == items);
        return result;
      }
      function validateParalelo(paralelo) {
            var formatted = paralelo.toString();
            let par = ['A', 'B', 'C', 'D', 'E']
            if (par.includes(formatted))  return true;
            return false;
      }
      if (validate) { this.$dialog.alert("::: La informaci??n ingresada contiene errores :::"); this.ifload = false; return }
      if (validate2) { this.$dialog.alert("NO SE PUEDE PROCESAR ALGUNOS VALORES"); this.ifload = false; return }
      this.save(results)
    },
    getAll() {
      this.$Progress.start();
      this.isLoading = true;
      this.$proxies._gestionProxi
        .getAllGrid()
        .then((x) => {
          const result = x.data
          if (result.length == 0) {
            this.rowData = toComplete();
          } else if (result.length == 1) {
            this.FormData(x.data)
            this.rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' });
          } else {
            this.FormData(x.data)
          }
          this.isLoading = false;
          this.$Progress.finish();
        })
        .catch(() => {
          console.log("Error imposible");
          this.isLoading = false;
          this.$Progress.fail();
        });
    },
    FormData(array) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let  fullname  = element.fdocente? element.fdocente.fullname : 'Undefined';
        let  nombre  = element.fnivel? element.fnivel.nombre : 'Undefined';
        let materia =  element.fmateria? element.fmateria.nombre : 'Undefined';
        result.push({ nombre: fullname, paralelo: element.paralelo, curso: nombre, materia: materia, planificacion: element.planificacion })
      }
      this.rowData = result
      this.topRowData = result
    },
    save(arrays) {
      if (arrays.length > 0) {
        this.$proxies._gestionProxi
          .createArrayDistributivo(arrays)
          .then(() => {
            this.ifload = false;
            this.toast("Registro exitoso");
            this.getAll()
          })
          .catch(() => {
            this.ifload = false;
            this.toast("error.response.message");
          });
      } else {
        this.ifload = false;
      }
    },
    onGridReady(params, side) {
      this.gridApi = params.api;
      if (side === 0) {
        this.leftApi = params.api;
        this.leftColumnApi = params.columnApi;
      }
      if (side === 1) {
        this.rightApi = params.api;
        this.addGridDropZone();
      }
      if (side === 2) {
        this.topApi = params.api;
      }
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
        position: "top-center",
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: "CERRAR",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  },
}
var toComplete = function () {
  var rowData = [];
  rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' });
  rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' });
  return rowData;
}
var saleValueFormatter = function (params) {
  var formatted = params.value.toString();
  let paralelo = ['A', 'B', 'C', 'D', 'E']
  if (paralelo.includes(formatted)) {
    return formatted;
  } else {
      return '???';
    }
  };
</script>