<template>
  <div >
    <div class="row mb-3">
       <div class="col-sm-4">
        <div class="input-group" style="margin-bottom: 7px;">
                    <span class="input-group-text text-body buscador"><i class="fas fa-search links"
                        aria-hidden="true"></i></span>
                    <input class="form-control buscador" type="text" v-on:input="onQuickFilterChanged()"
                      style="background: white;" id="quickFilter" placeholder="Buscar">
                  </div>
       </div>
       <div class="col-sm-8 ">
      <a v-on:click="onBtAdd()" class="fuente tamanio " href="javascript:;">
        <svg style=" margin-top: -3px;" data-testid="geist-icon" fill="none" height="18"
          shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="1.5" viewBox="0 0 24 24" width="18">
          <path
            d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z">
          </path>
        </svg>
        <b class="links ms-1">Insertar fila</b>
      </a>
      <a v-on:click="clearData()" role="button" class="fuente tamanio ms-3">
        <svg style=" margin-top: -3px;" data-testid="geist-icon" fill="none" height="18"
          shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="1.5" viewBox="0 0 24 24" width="18">
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M20 4L8.12 15.88"></path>
          <path d="M14.47 14.48L20 20"></path>
          <path d="M8.12 8.12L12 12"></path>
        </svg>
         <b class="links ms-1">Eliminar selección</b> 
      </a>

      <a v-on:click="getRowData()" role="button" class="fuente tamanio ms-3">
        <svg style=" margin-top: -3px;" data-testid="geist-icon" fill="none" height="18"
          shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="1.5" viewBox="0 0 24 24" width="18">
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
          <path d="M17 21v-8H7v8"></path>
          <path d="M7 3v5h8"></path>
        </svg>
         <b class="links ms-1">Guardar distributivo</b> 
      </a>
    </div>
    </div>
    
    <Spinner v-if="isLoading"></Spinner>
    <section  v-else style="height: calc(100vh - 180px);">
      <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
        @grid-ready="onGridReady" :defaultColDef="defaultColDef" :editType="editType" :rowData="rowData"
        :rowSelection="rowSelection" :rowDragManaged="true" :animateRows="true" :isRowSelectable="isRowSelectable" :suppressRowClickSelection="true">
      </ag-grid-vue>
    </section>
    <div v-if="ifload" class="loadingg">
      <div class="inn ">
        <h4 style="font-weight:400" class="text-white mb-0 fadeIn2 fadeInBottom">Configurando distributivo
          ...</h4>
      </div>
    </div>
  </div>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import Spinner from "../../shared/Spinner";
export default {
  components: {
    AgGridVue, Spinner
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'nombre', headerName: 'Docente', cellEditor: 'agSelectCellEditor', checkboxSelection: true, editable: true,rowDrag: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.listDocentes.length; i++) {
              arrays.push(this.listDocentes[i].fullname)
            }
            return {
              values: arrays
            };
          },
        },
        {
          field: 'curso',
          cellEditor: 'agSelectCellEditor', editable: true,
          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.listniveles.length; i++) {
              arrays.push(this.listniveles[i].nombre)
            }
            return {
              values: arrays
            };
          },
        },
        {
          field: 'materia', cellEditor: 'agSelectCellEditor', editable: true,

          cellEditorParams: () => {
            var arrays = [];
            for (let i = 0; i < this.listMaterias.length; i++) {
              arrays.push(this.listMaterias[i].nombre)
            }
            return {
              values: arrays
            };
          }
        },
        {
          field: 'paralelo', cellEditor: 'agSelectCellEditor', editable: true,
          minWidth: 120, maxWidth: 120,
          cellEditorParams: {
            values: ['A', 'B', 'C', 'D', 'E'],
          },
        },
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
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
    },
    verificarUsuario() {
      let text_1 = 'Distributivo'
      let text_2 = 'Año electivo'
      this.$store.commit('updateHeader', { text_1, text_2 })
    },
    __listNivele() {
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
    __listdocentes() {
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
    __listmaterias() {
      this.isMateria = true;
      this.$proxies._gestionProxi
        .getListMaterias()
        .then((x) => {
          this.listMaterias = x.data;
          this.isMateria = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isMateria = false;
        });
    },
    onBtAdd() {
      var num = this.rowData.length +1;
      var array = []
      array.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' })
      this.gridApi.applyTransaction({ add: array, addIndex: num, });
    },
    clearData() {
      var selectedRowData = this.gridApi.getSelectedRows();
      this.gridApi.applyTransaction({ remove: selectedRowData });
    },
 
    getRowData() {
      this.ifload = true;
      let arrayDocente = this.listDocentes
      let arrayCursos = this.listniveles
      let arrayMaterias = this.listMaterias
      const results = []
      this.gridApi.forEachNode(function (node) {
        if (node.data != null) {
          if (node.data.paralelo != 'En blanco') {
            const docente = seachDocente(node.data.nombre);
            const curso = seachCurso(node.data.curso);
            const materia = seachMateria(node.data.materia);
            results.push({
              fnivel: curso[0]._id,
              fdocente: docente[0]._id,
              fmateria: materia[0]._id,
              paralelo: node.data.paralelo,
              planificacion: ''
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
    getAll() {
      this.isLoading = true;
      this.$proxies._gestionProxi
        .getAllGrid()
        .then((x) => {
          const result = x.data
          if (result.length == 0) {
            this.rowData = toComplete();
          } else if(result.length == 1){
            this.FormData(x.data)
            this.rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' });
          } else {
            this.FormData(x.data)
          }
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error imposible");
          this.isLoading = false;
        });
    },
    FormData(array) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let { fullname } = element.fdocente;
        let { nombre } = element.fnivel
        result.push({ nombre: fullname, paralelo: element.paralelo, curso: nombre, materia: element.fmateria.nombre })
      }
      this.rowData = result
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
var toComplete = function () {
  var rowData = [];
  rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' });
  rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', materia: 'En blanco' });
  return rowData;
}
</script>
