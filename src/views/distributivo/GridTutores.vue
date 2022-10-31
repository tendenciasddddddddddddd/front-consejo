<template>
    <div>
      <div class="row mb-3 mt-2">
        <div class="col-sm-4">
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
            Eliminar selección
          </button>
          <button v-on:click="getRowData()" role="button" class="btn btnNaranja ms-3">
            Guardar 
          </button>
        </div>
      </div>
  
      <Spinner v-if="isLoading"></Spinner>
      <section v-else style="height: calc(100vh - 250px);">
        <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :columnDefs="columnDefs"
          @grid-ready="onGridReady" :defaultColDef="defaultColDef" :editType="editType" :rowData="rowData"
          :rowSelection="rowSelection" :rowDragManaged="true" :animateRows="true" :isRowSelectable="isRowSelectable"
          :suppressRowClickSelection="true" >
        </ag-grid-vue>
      </section>
      <div v-if="ifload" class="loadingg">
        <div class="inn ">
          <h4 style="font-weight:400" class="text-white mb-0 fadeIn2 fadeInBottom">Configurando distributivo
            <div class="spinner-border text-light mt-2" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </h4>
        </div>
      </div>
      <div v-if="ifyoutuve">
            <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'F3jhGLxjeXA'"/>
          </div>
          <div class="fixed-plugin">
      <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff;
      border-radius: 20px 20px 2px 20px;
      box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
        Ver video explicativo
      </a>
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
      AgGridVue, Spinner,
      VueYoutuve: () =>import( /* webpackChunkName: "VueYoutuve" */ "../../shared/VueYoutuve.vue"),
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
              return {
                values: arrays
              };
            },
          },
          {
            field: 'paralelo',headerName: 'PARALELO', cellEditor: 'agSelectCellEditor', editable: true,
            minWidth: 120, maxWidth: 120, valueFormatter: saleValueFormatter,
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
        isDocente: false,
        listniveles: {},
        listDocentes: [],
        ifyoutuve : false,
      };
    },
    created() {
      this.verificarUsuario()
      this.__listNivele();
      this.__listdocentes();
      this.getAll();
      this.editType = 'fullRow';
  
      this.isRowSelectable = (rowNode) => {
        return !rowNode.group;
      };
    },
    methods: {
      ClosedYoutuve: function(){
        this.ifyoutuve = false;
      },
      onQuickFilterChanged() {
        this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
      },
      verificarUsuario() {
        let text_1 = 'Asignar'
        let text_2 = 'Tutores'
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
      onBtAdd() {
        var num = this.rowData.length + 1;
        var array = []
        array.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco' })
        this.gridApi.applyTransaction({ add: array, addIndex: num, });
      },
      clearData() {
        var selectedRowData = this.gridApi.getSelectedRows();
        this.gridApi.applyTransaction({ remove: selectedRowData });
      },
  
      getRowData() {
        this.ifload = true;
        let validate = false;
        let validate2 = false;
        let arrayDocente = this.listDocentes
        let arrayCursos = this.listniveles
        const results = []
        this.gridApi.forEachNode(function (node) {
          if (node.data != null) {
            if (node.data.paralelo != 'En blanco') {
              if (!validateParalelo(node.data.paralelo)) validate2 = true;
              try {
              const docente = seachDocente(node.data.nombre);
              const curso = seachCurso(node.data.curso);
              results.push({
                fnivel: curso[0]._id,
                fdocente: docente[0]._id,
                paralelo: node.data.paralelo,
                planificacion: []
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
        function validateParalelo(paralelo) {
              var formatted = paralelo.toString();
              let par = ['A', 'B', 'C', 'D', 'E']
              if (par.includes(formatted))  return true;
              return false;
        }
        if (validate) { this.$dialog.alert("::: La información ingresada contiene errores :::"); this.ifload = false; return }
        if (validate2) { this.$dialog.alert("NO SE PUEDE PROCESAR ALGUNOS VALORES"); this.ifload = false; return }
        this.save(results)
      },
      getAll() {
        this.isLoading = true;
        this.$proxies._gestionProxi
          .getAllGridTutor()
          .then((x) => {
            const result = x.data
            if (result.length == 0) {
              this.rowData = toComplete();
            } else if (result.length == 1) {
              this.FormData(x.data)
              this.rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco', });
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
          let  fullname  = element.fdocente? element.fdocente.fullname : 'Undefined';
          let  nombre  = element.fnivel? element.fnivel.nombre : 'Undefined';
          result.push({ nombre: fullname, paralelo: element.paralelo, curso: nombre })
        }
        this.rowData = result
      },
      save(arrays) {
        if (arrays.length > 0) {
          this.$proxies._gestionProxi
            .createArrayTutor(arrays)
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
    rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco',  });
    rowData.push({ nombre: 'En blanco', paralelo: 'En blanco', curso: 'En blanco',  });
    return rowData;
  }
  var saleValueFormatter = function (params) {
    var formatted = params.value.toString();
    let paralelo = ['A', 'B', 'C', 'D', 'E']
    if (paralelo.includes(formatted)) {
      return formatted;
    } else {
        return '❓';
      }
    };
  </script>
  