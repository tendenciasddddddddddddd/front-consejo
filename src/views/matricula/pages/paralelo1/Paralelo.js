import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import Spinner from "../../../../shared/ProgressBar.vue";
import Paginate from "../../../../shared/Paginate.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
import Modal from "../../../../shared/Modal"

export default {
  name: "EslistarParalelo",
  components: {
    Spinner,
    Paginate,ScrimModal, Dropdown, NoFound, AgGridVue, Modal
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      idds: null,
      paralelos: [
        {
          id: "0",
          nombre: "A",
        },
        {
          id: "1",
          nombre: "B",
        },
        {
          id: "2",
          nombre: "C",
        },
        {
          id: "3",
          nombre: "D",
        },
       
      ],
      check: null,
      check2 : null,
      listPeriodo: null,
      isLoading1: false,
      listniveles: null,
      isTabla: false,
      isConfig: null,
      filtros: {},
      infoMat: {},
      infoMat2: null,
      model: {
        curso: null,
        calificaciones: [],
        asistencias: [],
        iniciales: [],
        dhi: []
      },
      model2: {
        curso: null,
        calificaciones: [],
        asistencias: [],
        iniciales: [],
        dhi: [],
        fknivel: null
      },
      isSelecCurosos: {},
      isClick: false,
      isClick2: false,
      isRemoveSelecC: [],
      isSelected: false,
      arrays: [],
      allSelected: false,
      curso: '',
      idCurso: '',
      //tablas
      leftRowData: [],
      rightRowData: [],
      topRowData: [],
      leftApi: null,
      leftColumnApi: null,
      rightApi: null,
      topApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 50,
        sortable: true,
        filter: true,
        resizable: true,
      },
      leftColumns: [
        { field: 'nombre', headerName: 'ESTUDIANTES SIN ASIGNAR PARALELO',
        colId: 'checkbox',
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true,},
      ],
  
      topColumns: [
        { field: 'curso',  rowGroup: true, hide: true,},
        {
          field: 'nombre', headerName: 'ESTUDIANTES CON PARALELO ASIGNADO',
        checkboxSelection: true,
        suppressMenu: true,
        showDisabledCheckboxes: true,
        },
       
      ],
      rowSelection: null,
      groupDisplayType: 'groupRows',
      isCambio : false,
      modelCambios :''
    };
  },
  watch: {
    curso: function (value) {
      this.idCurso = value._id
      this.__cambios(this.idCurso);
    }
  },
  methods: {
    onQuickFilterChanged() {
      this.leftApi.setQuickFilter(document.getElementById('quickFilter').value);
    },
    update (){
      if (this.check2 !=null) {
       
        var selectedRowData = this.leftApi.getSelectedRows();
        const idArrays = []
        selectedRowData.forEach(function (node) {
          idArrays.push(node._id);
        })
         if (idArrays.length==0) return; 
         this.$Progress.start();
         this.model2.curso = this.check2;
         this.model2.fknivel = this.modelCambios._id;
         this.isTabla = true;
         this.$proxies._matriculaProxi
         .updateMatricula(idArrays, this.model2)
         .then(() => {
          this.isTabla = false;
           this.__cambios(this.idCurso);
           this.toast("Cambio exitoso "  );
           this.closeModal()
           this.modelCambios = ''
           this.check2 = null;
           this.$Progress.finish();
         })
         .catch(() => {
           this.$dialog.alert('Error en ng server')
           this.isTabla = false;
           this.$Progress.fail();
         });
      } else  {
        this.$dialog.alert('LLENE LOS CAMPOS')
      }
    },
    onRemoveSelected2() {
      var selectedRowData = this.topApi.getSelectedRows();
      this.topApi.applyTransaction({ remove: selectedRowData });
      var idArrays = []
      for (let i = 0; i < selectedRowData.length; i++) {
        const element = selectedRowData[i]._id;
        idArrays.push(element)
      }
      if (idArrays.length > 0) {
        this.model.curso =  "Undefined";
        this.isTabla = true;
        this.$Progress.start();
        this.$proxies._matriculaProxi
        .updateMatricula(idArrays, this.model)
        .then(() => {
          this.isTabla = false;
          this.__cambios(this.idCurso);
          this.toast("Cambio exitoso"  );
          this.$Progress.finish();
        })
        .catch(() => {
          this.isTabla = false;
          this.$dialog.alert('Error en ng server')
          this.$Progress.fail();
        });
      }else  {
        this.$dialog.alert('SELECIONE UN ESTUDIANTE')
      }
    },
    getRowId(params) {
      return params.data.nombre;
    },
    closeModal: function(){
      this.isCambio = false;
    },
    openModal: function(){
      this.isCambio = true
      this.modelCambios = ''
      this.check2 = null;
    },
    onChange(id) {
      this.check = id;
      this.isSelected = true;
    },
    onChange2(id) {
      this.check2 = id;
    },
    loadGrids() {
      this.leftRowData = [...this.rawData];
      this.rightRowData = [];
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

  save(){
    if (this.check !=null) {
      this.$Progress.start();
      var selectedRowData = this.leftApi.getSelectedRows();
      const idArrays = []
      selectedRowData.forEach(function (node) {
        idArrays.push(node._id);
      })
       if (idArrays.length==0) return; 
       this.model.curso = this.check;
       this.isTabla = true;
       this.$proxies._matriculaProxi
       .updateMatricula(idArrays, this.model)
       .then(() => {
        this.isTabla = false;
         this.__cambios(this.idCurso);
         this.toast("Registro exitoso "  );
         this.check = null;
         this.$Progress.finish();
       })
       .catch(() => {
         this.$dialog.alert('Error en ng server')
         this.isTabla = false;
         this.$Progress.fail();
       });
    } else {
      this.$dialog.alert('SELECIONE UN PARALELO PARA CONTINUAR')
    }
  },

    __listNivele() {
      this.isLoading1 = true;
      this.$Progress.start();
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.listniveles = x.data;
          this.isLoading1 = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
          this.$Progress.fail();
        });
    },
    __cambios(cursos) {
      this.$Progress.start();
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getFullMatricula(cursos)
        .then((x) => {
          this.filtros = x.data.matriculados;
          this.infoMat = this.filtros.filter((x) => x.curso == "Undefined");
          this.leftRowData = this.infoMat.sort(function (a, b) {
            var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
            if (nameA < nameB) 
              return -1;
            if (nameA > nameB)
              return 1;
            return 0; 
          });
          const filterSave = this.filtros.filter((x) => x.curso != "Undefined");
          this.topRowData =  filterSave.sort(function (a, b) {
            var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
            if (nameA < nameB) 
              return -1;
            if (nameA > nameB)
              return 1;
            return 0; 
          });
          this.isTabla = false; 
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
          this.$Progress.fail();
        });
    },


    close(){
      this.$emit('myEventClosedModalParalelo1');
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

  created() {
    this.__listNivele();
  },
};
