<template>
  <FullModal @close="close">
    <template v-slot:header> Tareas</template>
    <template v-slot:body>
      <form @submit.prevent="save" id="task">
        <div v-if="collects._id != null" class=" alertdanger">
          <span class="parrafo">Fecha de entrega actual</span><br />
          <a class="parrafo ">
            <b>{{ dateTask }}</b>
          </a>
        </div>
        <div v-if="collects._id != null">
           <div class=" mt-2">
          <span class="parrafo ">Establecer nueva fecha</span>
          <date-picker v-model="model.task.finicio" @input="fechas($event)" type="datetime" class="w-100 fuente" :class="{
            error: validation.hasError('model.task.finicio'),
          }">
          </date-picker>
          <p class="mb-0 text-xs text-danger">
            {{ validation.firstError("model.task.finicio") }}
          </p>
          <span class="parrafo" style="color:rgb(124, 152, 182);">
            {{ isPlaso }}
          </span>
        </div>
        </div>
        <div v-else>
           <div>
          <span class="parrafo">Nombre de Tarea</span>
          <CustomInput v-model="model.task.nombre" />
          <p class="mb-0 text-xs text-danger">
            {{ validation.firstError("model.task.nombre") }}
          </p>
        </div>
        <div class=" mt-2">
          <span class="parrafo ">Establecer nueva fecha</span>
          <date-picker v-model="model.task.finicio" @input="fechas($event)" type="datetime" class="w-100 fuente" :class="{
            error: validation.hasError('model.task.finicio'),
          }">
          </date-picker>
          <p class="mb-0 text-xs text-danger">
            {{ validation.firstError("model.task.finicio") }}
          </p>
          <span class="parrafo" style="color:rgb(124, 152, 182);">
            {{ isPlaso }}
          </span>
        </div>
        <div class="mt-2">
          <span @click="openCont" class="links text-sm fuente">
            <b> Subir archivo 👆 (Opcional)</b>
          </span>
          <div v-if="clickme == true">
            <vue-dropzone class="mt-1"
              style="height:180px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
              ref="dropzone" @vdropzone-success="afterComplete" id="drop1" :options="dropOptions">
            </vue-dropzone>
            <a @click="removeAllFiles" class="fuente tamanio" href="javascript:;"><i
                class="far fa-trash-alt me-2 iconos"></i>
              <b class=" me-2 links">Eliminar documento</b>
            </a>
          </div>
        </div>

        <div class="mt-2">
          <span class="parrafo">Descripción</span>
          <vue-editor id="editor" :class="{
            error: validation.hasError('model.task.descripcion'),
          }" v-model="model.task.descripcion" :editorToolbar="customToolbar" class="fuente">
          </vue-editor>
          <p class="mb-0 text-xs text-danger">
            {{ validation.firstError("model.task.descripcion") }}
          </p>
        </div>
        </div>
        
      </form>
    </template>
    <template v-slot:footer>
      <a class="btn btnNaranjaClaro" @click="close">
        Cancelar
      </a>
      &nbsp; &nbsp;
      <button v-if="ifLoad" class="btn  btnNaranja" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Trabajando...
      </button>

      <button v-else type="submit" id="addRowButton" class="btn btnNaranja" form="task">
        Guardar
      </button>
    </template>
  </FullModal>
</template>

<script>
import FullModal from "../../../shared/FullModal.vue";
//import ProgressBar from "../../../shared/ProgressBar";
import { VueEditor } from "vue2-editor";
import DatePicker from 'vue2-datepicker';
import { StorageRef } from "../../../boot/firebase";
import 'vue2-datepicker/index.css';
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import CustomInput from "../../../shared/CustomInput.vue";
let image = require("../../../assets/img/usados/all.svg");
//Servicios
import serviceTask from './ServiceTASK';
const ResultServiceTask = new serviceTask();
export default {
  name: 'CreateOrUpdate',
  components: { FullModal, VueEditor, DatePicker, vueDropzone, CustomInput },
  props: {
    collects: Object
  },
  data() {
    return {
      dropOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-12px;' height='130px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm fuente links'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
        `,
        maxFilesize: 1,
        maxFiles: 1,
        thumbnailHeight: 140,
      },
      model: {
        _id: null,
        task: {
          nombre: null,
          descripcion: null,
          archivo: null,
          finicio: null,
          estado: null,
          fechad: ''
        },
      },
      htmlForEditor: "",
      customToolbar: [
      ],
      clickme: false,
      idTasks: '',
      ifLoad: false,
      ifLoad2: false,
      img1: '',
      isPlaso: 'Sin plazo',
      dateTask: ''
    }
  },
  methods: {
    close() {
      this.$emit('EventClose');
    },
    initial() {
      if (this.collects._id != undefined) {
        let obj = this.collects
        this.model.task.nombre = obj.nombre;
        this.model.task.descripcion = obj.descripcion;
        this.model.task.archivo = obj.archivo;
        this.model.task.estado = obj.estado;
        this.dateTask = obj.finicio;
      }
    },
    isObjEmpty: function (obj) {
      return Object.keys(obj).length === 0;
    },
    save() {
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return;
        }
        if (this.collects._id) { //editTask
          this.ifLoad = true;
          let keys = this.$route.params.id + ',' + this.collects._id
          console.log(this.model);
          this.$proxies._aulaProxi
            .editTask(keys, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.toast('Tarea editada exitosamente!!');
              this.close();
              this.getData();
            })
            .catch(() => {
              this.$dialog.alert("El servidor responde con un codigo de estado 413.");
              this.ifLoad = false;
            });
        } else {
          this.ifLoad = true;
          this.model.task.estado = 0;
          this.model.task.fechad = ResultServiceTask.calcular_fecha_local();
          this.$proxies._aulaProxi
            .createTask(this.$route.params.id, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.close();
              this.getData();
              this.toast('Tarea creada exitosamente!!');
            })
            .catch(() => {
              this.$dialog.alert("El servidor responde con un codigo de estado 413.");
              this.ifLoad = false;
            });
        }
      });
    },
    afterComplete(upload) {
      this.ifLoad2 = true;
      var date = new Date();
      let result = date.toISOString();
      const storageRef = StorageRef.ref(`arctask/${result}`).put(
        upload
      );
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.ifLoad2 = false;
          alert('no se puede subir este archivo revise el internet')
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            this.model.task.archivo = this.img1;
            this.ifLoad2 = false;
          });
        }
      );
    },
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
      this.model.task.archivo = '';
    },
    fechas(event) {
      if (event != null) {
        this.isPlaso = ResultServiceTask.calcular_fecha_limite(event);
      }
    },
    openCont: function () {
      this.clickme = !this.clickme
    },
    getData() {
      this.$emit('getData');
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2100,
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
  mounted() {
    this.initial()
  },
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    "model.task.nombre"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
    "model.task.descripcion"(value) {
      return this.$validator
        .value(value)
        .required()
    },
    "model.task.finicio"(value) {
      //
      return this.$validator
        .value(value)
        .required()
        .minLength(1)
        .maxLength(150);
    },

  },
}
</script>