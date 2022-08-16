<template> 
 <div>
     <section v-if="faceImport===1">
          <h5 class="font-weight-bolder mb-0 fuente mt-4">
                  Elige un archivo para importarlo
                </h5>
                <p class="parrafo mt-2">
                  Para importar varios contactos a la vez (100), tu archivo debe ser
                  un TXT. Solo necesitas tener columnas con la información
                  básica.
                </p>

                <div class="mt-5">
                  <vue-dropzone
                    class="mt-5"
                    style="height:200px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                    ref="dropzone"
                    @vdropzone-complete="afterComplete"
                    id="drop1"
                    :options="dropOptions"
                  >
                  </vue-dropzone>
                  <p class="parrafo text-danger mt-3">{{ isError }}</p>
                  <div>
 
                    <div class="text-center mt-3">
                      <a
                      class="fuente tamanio links "
                      href="javascript:;"
                      @click="removeAllFiles()"
                    >
                      <b>Limpiar archivos cargados</b>
                    </a>
                    <br>
                      <a @click="createDOC" v-if="ifDocListo" class="btn btnCreana mt-3"> Procesar</a>
                    </div>
                      <span class="parrafo">Número de filas: {{ rows }}</span>
                  </div>
                </div>
     </section>
     <section v-if="faceImport===2">
      
           <h5 class=" mb-0 fuente mt-4" style="font-weight: 400;">
                  Registra a ({{ rows }}) estudiantes a la plataforma.
                </h5>
                <div class="mt-3 scrorable alertinfo">
                  <v-select
                    v-model="isData"
                    multiple
                    :options="isData"
                    label="email"
                    item-value="email"
                  >
                    <template #option="{ email }">
                      <h6 style="margin: 0">{{ email }}</h6>
                    </template>
                    <template #no-options="{ }">
                      Lo siento, no hay opciones de coincidencia.
                    </template>
                  </v-select>
                </div>
                <div class="text-center mt-2">
                   <a @click="sendAll2" v-if="isData.length" class="btn btnCreana mt-3"> Procesar</a>
                </div>
                <div v-if="ifOcultar" class="loadingg">
                  <div class="inn fuente h5">
                    Trabajando en este evento loops...
                  </div>

                </div>
                <template v-if="objetosRechasados.length" > 
                  <div class="alertdanger scrorable mt-2">
                      <h6 style="font-weight: 400;" class=" mb-0 fuente mt-3">
                 No procesados, es posibel que sean usuarios duplicados.
                </h6>
                  <v-select
                  class="mt-3"
                    v-model="objetosRechasados"
                    multiple
                    :options="objetosRechasados"
                    label="email"
                    item-value="email"
                  >
                    <template #option="{ email }">
                      <h6 style="margin: 0">{{ email }}</h6>
                    </template>
                    <template #no-options="{ }">
                      Lo siento, no hay opciones de coincidencia.
                    </template>
                  </v-select>
                  </div>
                  <br>
                
                </template>
     </section>
 </div>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let image = require("../../../assets/img/usados/all.svg");
import ServiceRegiste from "../../../service/funcions";
const ResultServiceEstudiante = new ServiceRegiste();
import XLSX from "xlsx";
export default {
  name: "CreaUsuario",
  components: {
    vueDropzone,
  },
  data() {
    return {
      dropOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-16px;' height='120px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm fuente'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Clic o arrastra y suelta. Solo los archivos TXT son compatibles.</p>
        `,
        maxFilesize: 2,
        maxFiles: 1,
        thumbnailHeight: 140,
      },
      isError: "",
      documento: null,
      rows : '',
      isData : [],
      file:File,
      isProcesDoc : false,
      ifDocListo: false,
      info: [],
      ifOcultar: false,
      objetosRechasados: [],
      faceImport:1,
      ifmostrarRechasados : false,
    };
  },
  methods: {
    afterComplete(upload) {
      if (!/\.(txt)$/i.test(upload.name)) {
        this.isError =
          "Este archivo no es TXT. Solo admite cargar archivos TXT.";
        this.removeAllFiles();

        return;
      }
      this.isError = "";
      this.ifDocListo = true;
      
      this.documento = upload;
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
          this.rows = this.info.length;
        };
        reader.readAsBinaryString(this.file);
      }
    },
    removeAllFiles() {
      this.rows = "";
      this.isData = [];
      this.$refs.dropzone.removeAllFiles();
      this.ifDocListo = false;
    },
    createDOC() {
      try {
        this.isProcesDoc = true;
        for (let i = 0; i < this.info.length; i++) {
          var element = this.info[i];
          let cedula = "";
          let email = "";
          let apellidos = "";
          let nombres = "";
          let telefono = "";
          let sexo = "";
          let fknacionalidad = "";
          let fkparroquia = "";
          let modalidad = "";
          let fketnia = "Mestizo";
          let typo = "ESTS";
          let foto =
            "https://res.cloudinary.com/stebann/image/upload/v1631310792/profile_b9t64l.png";

          let num = element[0];
          cedula = num.toString().trim();
          email = element[1].trim();
          apellidos = element[2].trim();
          nombres = element[3].trim();
          telefono = element[4];
          sexo = element[5];
          fknacionalidad = element[6];
          fkparroquia = element[7];
          modalidad = element[8];

          if (
            !cedula ||
            !email ||
            !nombres ||
            !apellidos ||
            !telefono ||
            !sexo ||
            !fknacionalidad ||
            !fkparroquia ||
            !modalidad
          ) {
            this.isError = "ERROR ¡No tiene todos los atributos completos!";
            this.isProcesDoc = false;
            this.removeAllFiles();
            return;
          }
          if (!ResultServiceEstudiante.validarEmail(email)) {
            this.isError = `ERROR, No se puede procesar el correo 😱 👉 ${email}`;
            this.isProcesDoc = false;
            this.removeAllFiles();
            return;
          }
          let password = this.__getPasswods(apellidos, cedula);
          let fullname = apellidos + " " + nombres;
          this.isData.push({
            cedula: cedula,
            email: email,
            apellidos: apellidos,
            nombres: nombres,
            telefono: telefono,
            sexo: sexo,
            fknacionalidad: fknacionalidad,
            fkparroquia: fkparroquia,
            modalidad: modalidad,
            fketnia: fketnia,
            typo: typo,
            foto: foto,
            username: cedula,
            password: password,
            fullname: fullname,
            roles: "",
          });
          if (i > 300) {
            this.isProcesDoc = false;
            this.ifDocListo = true;
            return;
          }
        }
        this.isProcesDoc = false;
        this.ifDocListo = true;
        this.faceImport = 2;
        //console.log(this.isData)
      } catch (e) {
        this.isError = "ARCHIVO DAÑADO";
        this.removeAllFiles();
        this.isProcesDoc = false;
        console.log(e);
      }
    },
    createUserMany() {
      if (this.isData != null) {
        this.ifOcultar = true;
        this.$proxies._registroProxi
          .createMany(this.isData) 
          .then((res) => {
            this.ifOcultar = false;
            this.objetosRechasados = res.data.duplicados;
            this.$emit("clickAlumnos");// ACTULIZAR TABLA
            this.isData = [];
            this.ifmostrarRechasados = true;
          })
          .catch((error) => {
            this.ifOcultar = false;
              this.isData = [];
            this.ifmostrarRechasados = true;
            this.$emit("clickAlumnos");
            if (error.response) {
              if (error.response.status == 500) {
                alert("error.response.message");
              }
            } else {
              this.$notify({
                group: "global",
                text: "ERROR del servidor por favor notificar",
              });
            }
          });
      }
    },
    sendAll2() {
      let message = {
        title: "Ingreso masivo de usuarios",
        body: " Puede ingresar hasta 300 usuarios",
      };
      let options = {
        loader: false,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.createUserMany();
          dialog.close();
        })
        .catch(function() {});
    },
      __getPasswods(apell, ced) {
      //-----------CREA LA CONTRASEÑAS PARA LOS USUARIOS EJMPLO {m1004095632}
      let l = apell.toLowerCase().charAt(0);
      let result = l + ced;
      return result;
    },
  },
};
</script>

