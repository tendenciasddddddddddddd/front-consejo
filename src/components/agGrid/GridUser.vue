<template>
    <ScrimModal @close="close">
      <template v-slot:header>Copiar y pegar</template>
      <template v-slot:body>
        <div class="row mb-3">
          <div class="col-md-3">
            <input v-on:keyup.enter="addItems" type="number" placeholder="Ingrese un número" class="form-control buscador" v-model="contador">
          </div>
          <div class="col-md-9">
            <button v-on:click="clearData()" role="button" class="btn btnNaranja2 ms-3">
              Limpiar todo
            </button>
            <button v-on:click="onBtExport()" role="button" class="btn btnNaranja2 ms-3">
              Descargar archivo 
            </button>
            <button v-on:click="getRowData()" role="button" class="btn btnNaranja ms-3 ">
              Guardar usuarios
            </button>
          </div>
        </div>
        <section style="height: calc(100vh - 210px);">
          <ag-grid-vue style="width: 100%; height: 100%;" :rowHeight="rowHeight" class="ag-theme-alpine"
            :columnDefs="columnDefs" @grid-ready="onGridReady" :defaultColDef="defaultColDef" :rowData="rowData"
            :enableRangeSelection="true"  :suppressMultiRangeSelection="true" :enableFillHandle="true"></ag-grid-vue>
        </section>
        <div v-if="ifload" class="loadingg">
      <div class="inn ">
        <h4 style="font-weight:400" class="text-white mb-0 fadeIn2 fadeInBottom">Configurando cuentas
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
      
      </template>
      <template v-slot:footer>
        <button @click="close"  class="btn btnNaranja2 me-3">
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
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import ScrimModal from "../../shared/ScrimModal"
export default {
  components: {
    AgGridVue, ScrimModal
  },
  props: {
    typo: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  data() {
    return {
      columnDefs: [
        { field: 'num', headerName: 'NUM', minWidth: 60, maxWidth: 60,  
        valueGetter: params => {
          let p1 = params.data.num
          if (p1==null) return '🚫'
          return p1
        }},
        {
          field: 'cedula', headerName: 'CÉDULA*', editable: true, maxWidth: 130,
          cellStyle: cellStyle
        },
        { field: 'fullname', headerName: 'APELLIDOS/NOMBRES*', editable: true, minWidth:280 },
        { field: 'fknacionalidad', headerName: 'NACIONALIDAD (OPC)', editable: true },
        { field: 'fkparroquia', headerName: 'PARROQUIA (OPC)', editable: true },
        { field: 'sexo', headerName: 'GÉNERO (OPC)', editable: true, maxWidth: 130 },
        { field: 'telefono', headerName: 'TELÉFONO (OPC)', editable: true, cellStyle: cellStyle3 },
        { field: 'email', headerName: 'EMAIL (OPC)', editable: true, cellStyle: cellStyle2 },
      ],
      rowHeight: 40,
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        filter: true,
        resizable: true,
      },
      rowData: [],
      rowSelection: 'multiple',
      contador: '',
      ifload: false,
      objetosRechasados: [],
    };
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel();
    },
    close() {
      this.$emit('myEventClosedAgGrid');
    },
    clearData() {
      this.gridApi.setRowData([]);
    },
    getRowData() {
      this.ifload = true;
      var tipos = this.typo;
      const rowData = [];
      const results = []
      let foto = this.$store.state.imgs;
      let validate = false;
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
        if (node.data.cedula == '' ||  
          node.data.fullname == '' 
        ) { validate = true }
        try {
          results.push({
          cedula: node.data.cedula.toString().trim(), //const result = typeof str === 'string' ? str.trim() : '';
          email: node.data.email.trim(),
          fullname: node.data.fullname.trim(),
          nombres: node.data.nombres.trim(),
          telefono: node.data.telefono.trim(),
          sexo: node.data.sexo.trim(),
          fknacionalidad: node.data.fknacionalidad.trim(),
          fkparroquia: node.data.fkparroquia.trim(),
          fketnia: "Mestizo",
          typo: tipos,
          foto: foto,
          username: node.data.cedula.trim(),
          password: psw(node.data.fullname.trim(), node.data.cedula.trim()),
          roles: "",
        });
        } catch (error) {
          console.log(error)
          validate = true
        }
      });
      
      function psw(apell, ced) {
        let l = apell.toLowerCase().charAt(0);
        let result = l + ced;
        return result;
      }
      if (validate) { this.$dialog.alert("::: Los campos con * son requeridos :::"); this.ifload = false; return }
      this.save(results)
      
    },
    save(arrays){
      if (arrays.length > 0) {
        this.$proxies._registroProxi
          .createMany(this.role, arrays) 
          .then((res) => {
            this.ifload = false;
            this.rowData = res.data.duplicados;
            this.toast("Elemento duplicados quedan en la tabla");
            this.$emit("clickAlumnos");// ACTULIZAR TABLA
          })
          .catch((error) => {
            this.rowData = []
            this.ifload = false;
            this.$emit("clickAlumnos");
            if (error.response) {
              if (error.response.status == 500) {
                this.toast("DUPLICADOS");
              }
            } else {
              this.toast("DUPLICADOS");
            }
          });
      }else {
        this.ifload = false;
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    __getPasswods(apell, ced) {
      let l = apell.toLowerCase().charAt(0);
      let result = l + ced;
      return result;
    },
    addItems() {
      this.clearData()
      var aux = parseInt(this.contador)
      if (aux >= 1 && aux <= 300) {
        var newItems = []
        for (let i = 1; i < aux + 1; i++) {
          newItems.push(createNewRowData(i))
        }
        this.gridApi.applyTransaction({
          add: newItems,
          addIndex: 3,
        });
      } else {
        this.$dialog.alert("Rango de filas no admitido");
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
var createNewRowData = function (num) {
  const newData = {
    num: num,
    cedula: '',
    email: '',
    apellidos: '',
    nombres: '',
    telefono: '',
    sexo: '',
    fknacionalidad: '',
    fkparroquia: ''
  };
  return newData;
};
var cellStyle = function (params) {
  const color = numberToColor(params.value);
  return {
    backgroundColor: color,
  };
};
var numberToColor = function (cedula) {
  if (cedula.length == 10) {
    var digito_region = cedula.substring(0, 2);
    if (digito_region >= 1 && digito_region <= 24) {
      var ultimo_digito = cedula.substring(9, 10);
      var pares =
        parseInt(cedula.substring(1, 2)) +
        parseInt(cedula.substring(3, 4)) +
        parseInt(cedula.substring(5, 6)) +
        parseInt(cedula.substring(7, 8));
      var numero1 = cedula.substring(0, 1);
      numero1 = numero1 * 2;
      if (numero1 > 9) {
        numero1 = numero1 - 9;
      }

      var numero3 = cedula.substring(2, 3);
      numero3 = numero3 * 2;
      if (numero3 > 9) {
        numero3 = numero3 - 9;
      }

      var numero5 = cedula.substring(4, 5);
      numero5 = numero5 * 2;
      if (numero5 > 9) {
        numero5 = numero5 - 9;
      }

      var numero7 = cedula.substring(6, 7);
      numero7 = numero7 * 2;
      if (numero7 > 9) {
        numero7 = numero7 - 9;
      }

      var numero9 = cedula.substring(8, 9);
      numero9 = numero9 * 2;
      if (numero9 > 9) {
        numero9 = numero9 - 9;
      }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      var suma_total = pares + impares;

      var primer_digito_suma = String(suma_total).substring(0, 1);

      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      digito_validador = decena - suma_total;

      if (digito_validador == 10) var digito_validador = 0;
      if (digito_validador == ultimo_digito) {
        return '#e4f7eb';
      } else {
        return '#f9d5d5';
      }
    } else {
      return '#f9d5d5';
    }
  }

};
var cellStyle2 = function (params) {
  const color = validarEmail(params.value);
  return {
    backgroundColor: color,
  };
};
var validarEmail = function (email) {
  if (email.length > 0) {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {
      return '#e4f7eb';
    } else {
      return '#f9d5d5';
    }
  }
}
var cellStyle3 = function (params) {
  const color = validarPhone(params.value);
  return {
    backgroundColor: color,
  };
};
var validarPhone = function (email) {
  if (email.length == 10) {
    return '#e4f7eb';
  } else if (email.length >= 1) {
    return '#f9d5d5';
  }
}

</script>
<!-- <style>
.ag-theme-alpine {
  /* bright green, 10% opacity */
  /* --ag-selected-row-background-color: rgb(0, 255, 0, 0.1); */
  --ag-odd-row-background-color: #f7f7f7;
}

</style> -->

