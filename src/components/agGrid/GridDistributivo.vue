<template>
  <ScrimModal @close="close">
    <template v-slot:header>Crear distributivo</template>
    <template v-slot:body>
      <div class="row mb-3">

        <div class="col-md-8">
          <a v-on:click="onBtAdd()" class="fuente tamanio negros " href="javascript:;">
            <svg style=" margin-top: -3px;" class="me-2 ms-1 text-dark"  data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              viewBox="0 0 24 24" width="20" >
              <path
                d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z">
              </path>
            </svg>
            <b class="me-4 links" >Agregar fila</b>
          </a>
          <a v-on:click="clearData()" role="button" class="fuente tamanio negros">
            <svg style=" margin-top: -3px;" class="me-2 ms-1 text-dark" data-testid="geist-icon" fill="none" height="20"
              shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5" viewBox="0 0 24 24" width="20">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88"></path>
              <path d="M14.47 14.48L20 20"></path>
              <path d="M8.12 8.12L12 12"></path>
            </svg>
            <b class="me-4 links" >Recortar fila</b>
          </a>

          <a v-on:click="onBtRefresh()" role="button" class="fuente tamanio negros">
            <svg style=" margin-top: -3px;" class="me-2 ms-1 text-dark" data-testid="geist-icon" fill="none" height="20"
              shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5" viewBox="0 0 24 24" width="20">
              <path d="M17 1l4 4-4 4"></path>
              <path d="M3 11V9a4 4 0 014-4h14"></path>
              <path d="M7 23l-4-4 4-4"></path>
              <path d="M21 13v2a4 4 0 01-4 4H3"></path>
            </svg>
            <b class="me-4 links" >Restablecer</b>
          </a>
          
        </div>
        <div class="col-md-4 text-end">
          <button v-on:click="onBtExport()" class="btn btn-vercel-white me-2">
              <svg style=" margin-top: -3px;" class="me-2 " data-testid="geist-icon" fill="none" height="20"
              shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5" viewBox="0 0 24 24" width="20">
              <path d="M8 17l4 4 4-4"></path>
              <path d="M12 12v9"></path>
              <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
            </svg>
             Descargar
            </button>
            <a class="btn btn-vercel"  v-on:click="getRowData()">
              <svg style=" margin-top: -3px;" class="me-2" data-testid="geist-icon" fill="none" height="20"
              shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5" viewBox="0 0 24 24" width="20">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
              <path d="M17 21v-8H7v8"></path>
              <path d="M7 3v5h8"></path>
            </svg>
              
              Matriculas
            </a>
        </div>
      </div>
      <section style="height: calc(100% - 50px);">
        <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
          @grid-ready="onGridReady" :defaultColDef="defaultColDef" :editType="editType" :rowData="rowData"
           :rowGroupPanelShow="rowGroupPanelShow" 
           :rowSelection="rowSelection"
                :isRowSelectable="isRowSelectable"
                :suppressRowClickSelection="true"
           >
        </ag-grid-vue>
      </section>
      <div v-if="ifload" class="loadingg">
        <div class="inn ">
          <h4 style="font-weight:400" class="text-white mb-0 fadeIn2 fadeInBottom">Configurando distributivo
            ...</h4>
        </div>
      </div>
      <nav>
    
  </nav>
    </template>
    <template v-slot:footer>
      <a @click="close" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio links me-3">
        <b>Salir de aqui</b>
      </a>
    </template>
  </ScrimModal>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import ScrimModal from "../../shared/ScrimModal"
export default {
  components: {
    AgGridVue, ScrimModal
  },
  props: {
    docentes: {
      type: Array,
    },
    cursos: {
      type: Array,
    },
    materias: {
      type: Array,
    }
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'nombre', headerName: 'Docente', rowGroup: true, hide: true, },
        {
          field: 'curso',
          cellEditor: 'agSelectCellEditor', rowGroup: true, hide: true, editable: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.cursos.length; i++) {
              arrays.push(this.cursos[i].nombre)
            }
            return {
              values: arrays
            };
          },
        },
        {
          field: 'materia', cellEditor: 'agSelectCellEditor', editable: true,
          checkboxSelection: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.materias.length; i++) {
              arrays.push(this.materias[i].nombre)
            }
            return {
              values: arrays
            };
          }
        },
        {
          field: 'paralelo', cellEditor: 'agSelectCellEditor', editable: true,

          cellEditorParams: {
            values: ['A', 'B', 'C', 'D'],
          },
        },

      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,

      },
      editType: null,
      rowData: [],
      ifload: false,
      rowGroupPanelShow: 'always',
      rowSelection: 'multiple',
      isRowSelectable: null,
    };
  },
  created() {
    this.editType = 'fullRow';
    this.rowData = toComplete(this.docentes, this.cursos);
    this.isRowSelectable = (rowNode) => {
      return !rowNode.group;
    };
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel();
    },
    close() {
      this.$emit('myEventClosedAgGrid');
    },
    onBtAdd() {
     var selectedRowData = this.gridApi.getSelectedRows()[0];
     if (!selectedRowData) {
        console.warn('No nodes selected!');
        return;
      }
      var array = []
      array.push(createNewRowData(selectedRowData))
     this.gridApi.applyTransaction({ add: array, addIndex: 3, });
    },
    clearData() {
      var selectedRowData = this.gridApi.getSelectedRows();
      this.gridApi.applyTransaction({ remove: selectedRowData });
    },
    onBtRefresh() {
      this.rowData = toComplete(this.docentes, this.cursos);
    },
    getRowData() {
      this.ifload = true;
      let arrayDocente = this.docentes 
      let arrayCursos = this.cursos
      let arrayMaterias = this.materias
      const results = []
      this.gridApi.forEachNode(function (node) {
        if (node.data!=null) {
          if (node.data.paralelo!='En blanco') {
            const docente = seachDocente(node.data.nombre);
            const curso = seachCurso(node.data.curso);
            const materia = seachMateria(node.data.materia);
            results.push({
              fnivel: curso[0]._id, 
              fdocente: docente[0]._id,
              fmateria: materia[0]._id,
              paralelo: node.data.paralelo,
              planificacion:''
            })
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
      this.save(results)
    },
    save(arrays){
      if (arrays.length > 0) {
        this.$proxies._gestionProxi
          .createArrayDistributivo(arrays) 
          .then(() => {
            this.ifload = false;
            this.toast("Registro exitoso");
            this.$emit("getData");
            this.close();
          })
          .catch(() => {
            this.ifload = false;
            this.$emit("getData");
            this.toast("error.response.message");
            this.close();
          });
      }else {
        this.ifload = false;
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
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
var toComplete = function (array, cursos) {
  var rowData = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i].fullname;
    for (let j = 0; j < cursos.length; j++) {
      const result = cursos[j].nombre
      rowData.push({ nombre: element, paralelo: 'En blanco', curso: result, materia: 'En blanco' });
    }
  }
  return rowData;
}
var createNewRowData = function (obj) {
  const newData = {
    nombre: obj.nombre,
    paralelo: 'En blanco',
    curso: obj.curso,
    materia: 'En blanco',
  };
  return newData;
};
 
</script>

<style>
.ag-cell-expandable {
  font-weight: bold;
}


</style>