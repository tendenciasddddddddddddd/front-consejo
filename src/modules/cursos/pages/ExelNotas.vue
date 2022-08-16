<template>
  <ScrimModal @close="close">
    <template v-slot:header>  Importar archivos</template>
    <template v-slot:body>
      <div class="row">
        <div v-if="modalFace1 == 1" class="col-lg-10 col-12 mx-auto">
          <div class="d-flex justify-content-center mt-3">
            <section style="    max-width: 600px;">
              <div class="text-center">
                <p class="fuente h4 mt-2" style="font-weight: 400;">
                  Carga tus archivos
                </p>
                <p v-if="!isExcel" class="parrafo">
                  Antes de cargar los archivos a continuación, asegúrate de
                  descargar el archivo con la
                  <b @click="toDownload()" class="links">Lista de estudiantes
                    <svg class="me-2 ms-2" data-testid="geist-icon" fill="none" height="24"
                      shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: black">
                      <path d="M8 17l4 4 4-4"></path>
                      <path d="M12 12v9"></path>
                      <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                    </svg>
                  </b>

                </p>
                <div v-else class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                
              </div>
              <div class="text-start mt-2">
                <p> <span class="h5">Seleccionar un archivo</span> <span
                    class="fuente text-sm ms-3 text-danger">{{ isError }}</span> </p>
                <vue-dropzone class="mt-4"
                  style="height:200px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                  ref="dropzone" @vdropzone-success="afterComplete" id="drop1" :options="dropOptions">
                </vue-dropzone>
                <br />
                <a @click="removeAllFiles" class="tamanio ">
                  <b class="links me-2">Cambiar el archivo</b>
                  <i class="far fa-trash-alt me-2 iconos"></i></a>

                <div class=" mt-3">
                    <div class="form-check mb-1 me-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            id="one"
                            value="p1"
                           v-model="quimestre"
                          />
                          <span class="parrafo" for="one">
                             Estas notas serán registradas al <b>Primer quimestre</b></span
                          >
                        </div>
                        <div class="form-check mb-1 me-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            id="two"
                            value="p2"
                           v-model="quimestre"
                          />
                          <span class="parrafo" for="two">
                             Estas notas serán registradas al <b>Segundo quimestre</b></span
                          >
                        </div>
                  
                </div>
              </div>
            </section>
          </div>
        </div>
        <div v-if="modalFace1 == 2" class="col-lg-10 col-12 mx-auto">
          <div class="alertdanger mt-3">
            <div class="d-flex">
              <div class="form-check ">
                <input class="form-check-input cheka" v-model="checked" type="checkbox" id="checkbox" value="1"
                  @click="checked = true" />
              </div>
              <a class="text-sm text-dark fuente mt-1">
                Marca la casilla si estas de acuerdo en registrar las notas de
                forma masiva, si ya existia notas estas las van a reeplasar.
              </a>
            </div>
          </div>
          <table class="dataTable-table table s-table-flush mt-2">
            <thead class="thead-light">
              <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); "
                  class="text-center text-uppercase text-secondary text-xxs">
                  Nombres
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs ">
                  Aportes / 80 %
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs ">
                  Examen / 20 %
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs ">
                  Promedio
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in metadata" :key="item.id" :vars="(aux = 0)">
                <td class="text-sm colorestabla colorestabla fuente">
                  {{ item.nombre }}
                </td>
                <td class="align-middle text-center fuente text-sm">
                  {{ item.arraysNote }}
                </td>
                <td class="align-middle text-center text-sm">
                  {{ item.examen }}
                </td>
                <td class="align-middle text-center text-sm fuente">
                  {{ item.promedio }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="text-end" v-if="modalFace1 == 1">
        <a @click="$emit('myEventNotes')" style="text-decoration: underline;" href="javascript:;"
          class="fuente tamanio">
          <b>Cancelar</b>
        </a>
        <a v-if="!ifDocListo" class="btn btnDisabled ms-3">
          Procesar
        </a>
        <template v-else>
          <a v-if="!isProcesDoc" class="btn btnNaranja ms-3" disabled>
            Trabajando
          </a>
          <a v-else class="btn btnNaranja ms-3" @click="ProcessingInstructions">
            Procesar
          </a>
        </template>
      </div>
      <div class="text-end" v-if="modalFace1 == 2">
        <a v-if="!checked" class="btn btnDisabled ms-3">
          Guardar
        </a>
        <template v-else>
          <a v-if="ifsaved" class="btn btnNaranja ms-3">
            Trabajando...
          </a>
          <a v-else @click="save" class="btn btnNaranja ms-3">
            Procesar
          </a>
        </template>

      </div>
    </template>
  </ScrimModal>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import ScrimModal from "../../../shared/ScrimModal"
let image = require('../../../assets/img/icons/88fdd.svg');
import XLSX from 'xlsx';
export default {
  name: "CheckTask",
  props: {
    collects: Object
  },
  components: {
    ScrimModal, vueDropzone
  },
  data() {
    return {
      para: '',
      name: '',
      mate: '',
      docentes: '',
      modalFace1: 1,
      dropOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: `
              <img alt='Image placeholder' style='padding-top:20px;' height='130px;' class='mx-4 mt-n6 ' src='${image}'>
              <p class='text-sm fuente links mt-2'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
              `,
        maxFilesize: 0.5,
        maxFiles: 1,
        thumbnailHeight: 140,
        acceptedFiles: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      isExcel: false,
      inAlumnos: {},
      isError: '',
      ifDocListo: false,
      quimestre: 'p1',
      file: File,
      isProcesDoc: true,
      info: {},
      checked: true,
      metadata: [],
      ifsaved: false,
    }
  },

  methods: {
    close() {
      this.$emit('EventClosed')
    },
    vueInit() {
      const seccio = JSON.parse(localStorage.getItem("myCourse"));
      const info = JSON.parse(localStorage.getItem("Xf"));
      this.para = seccio.paralelo;
      this.name = seccio.nombre;
      this.mate = seccio.materia;
      this.docentes = info.nombre;
      this.inAlumnos = this.collects;
      console.log(this.collects)
    },
    toDownload() {
      this.isExcel = true;
      var anArray = [];
      for (let i = 0; i < this.inAlumnos.length; i++) {
        var objeto = {
          codigo: this.inAlumnos[i].id,
          nombres: this.inAlumnos[i].name,
          a1: 1, a2: 1, a3: 1, a4: 1, a5: 1,
          b1: 1, b2: 1, b3: 1, b4: 1, b5: 1,
          c1: 1, c2: 1, c3: 1, c4: 1, c5: 1,
          examenfinal: 1,
        }
        anArray.push(objeto);
      }
      let data = XLSX.utils.json_to_sheet(anArray, {
        header: ['codigo', 'nombres', 'a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'c1', 'c2', 'c3', 'c4', 'c5', 'examenfinal']
      })
      data['A1'].v = 'CODIGO'
      data['B1'].v = 'NOMBRES'
      data['C1'].v = 'APORTE 1'
      data['D1'].v = 'APORTE 2'
      data['E1'].v = 'APORTE 3'
      data['F1'].v = 'APORTE 4'
      data['G1'].v = 'APORTE 5'
      data['H1'].v = 'APORTE 6'
      data['I1'].v = 'APORTE 7'
      data['J1'].v = 'APORTE 8'
      data['K1'].v = 'APORTE 9'
      data['L1'].v = 'APORTE 10'
      data['M1'].v = 'APORTE 11'
      data['N1'].v = 'APORTE 12'
      data['O1'].v = 'APORTE 13'
      data['P1'].v = 'APORTE 14'
      data['Q1'].v = 'APORTE 15'
      data['R1'].v = 'EXAMEN FINAL'
      var wscols = [
        { wch: 20 },
        { wch: 20 },
        { wch: 10 },
        { wch: 20 }
      ];
      const d = new Date();
      let namefill = d.toDateString();
      const workbook = XLSX.utils.book_new()
      const filename = namefill;
      XLSX.utils.book_append_sheet(workbook, data, filename)
      workbook['!cols'] = wscols;
      XLSX.writeFile(workbook, `${filename}.xlsx`)
      setTimeout(() => this.isExcel = false, 1800);
    },
    afterComplete(upload) {
      if (!/\.(xlsx)$/i.test(upload.name)) {
        this.$dialog.alert("El archivo que cargaste no era xlsx. Solo admite cargar archivos XLSX.");
        this.removeAllFiles();
        return;
      }

      this.onChanges(upload);
    },
    onChanges(evento) {
      this.file = evento;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          this.info = data;
        };
        this.isError = '';
        reader.readAsBinaryString(this.file);
        this.ifDocListo = true;
      }
    },
    ProcessingInstructions() {
      this.metadata = [];
      try {
        this.isProcesDoc = true;
        for (let i = 1; i < this.info.length; i++) {
          let element = this.info[i];
          if (element[0] == this.inAlumnos[i - 1].id) {
            var a = '', b = '', exam = '', quimestre = this.quimestre, promedio = '', notasArrays = '', fora = '';
            a = element[0];
            b = element[1];
            let total = 0;
            for (let i = 2; i <= 16; i++) {
              total += element[i]
              notasArrays = element[i] + ',' + notasArrays;
              let successfully = this.validarNota(element[i]);
              if (!successfully) {
                this.isError = 'Las notas ingresadas no son validas'
                this.isProcesDoc = false;
                return;
              }
            }

            exam = element[17];
            promedio = this.calculatePromedio(total, exam);
            fora = this.inAlumnos[i - 1].fora;
            this.metadata.push({ id: a, nombre: b, arraysNote: notasArrays, examen: exam, quimestre: quimestre, promedio: promedio, fora: fora });//qualify
          } else {
            break;
          }

        }
        this.isProcesDoc = false;
        this.modalFace1 = 2;
        this.checked = false;
      } catch (e) {
        this.$dialog.alert('ARCHIVO DAÑADO');
        this.removeAllFiles();
        console.log(e)
      }
    },
     save(){
          this.ifsaved = true;
          this.$proxies._notasProxi
          .updateFullNote(this.$route.params.id, this.metadata) //-----------EDITAR CON AXIOS
         .then(() => {
          this.ifsaved = false;
          this.close()
           this.$emit('getData');
        })
        .catch(() => {
          this.$dialog.alert("No se puede completar la operación");
          this.ifsaved = false;
        });
        },
    removeAllFiles: function () {
      this.$refs.dropzone.removeAllFiles();
      this.ifDocListo = false;
      this.isError = '';

    },
    calculatePromedio(suma, examen) {
      let promedio = (suma / 15).toFixed(2);
      let proNotas = (promedio * 8) / 10; //EQUIVALENTE A 80 %
      let proExamen = (examen * 2) / 10;  //EQUIVALENTE A 20 %
      return (proNotas + proExamen).toFixed(2);
    },
    validarNota(nota) {
      if (nota > 0 && nota <= 10) {
        return true
      } else {
        return false
      }
    },
    getData() {
      this.$emit('getData');
      this.$emit('EventClosed')
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 1300,
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
  },
  created() {
    this.vueInit()
  },

}
</script>

