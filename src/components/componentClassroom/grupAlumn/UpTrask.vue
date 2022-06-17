<template>
  <FullModal @close="close">
    <template v-slot:header> Tareas</template>
    <template v-slot:body>
       <div  v-if="!tarea_atrazada">
            <Spinner v-if="ifcarga"></Spinner>
                  <div v-else >
                    <p class="h5 fuente" style="font-weight: 400;">
                      {{ collects.title }}<span>&#160;</span>
                    </p>
                    <div class="mt-3" style="padding:9px; background-color: rgb(243, 243, 243);">
                         <p class="parrafo" v-html="collects.descrition"></p>
                    </div>
                    <div class="mt-2" >
                    
                      <p class="parrafo text-sm">
                          <span > {{isPlaso}} </span>
                        </p>
                    </div>
                    <div lass="mt-2">
                           <a
                          v-if="collects.recursos"
                          class="parrafo"
                          style=" cursor: pointer;"
                          target="_blank"
                          :href="collects.recursos"
                        >
                         <span class=" links">Detalle de esta tarea (Desacargar)</span> 
                        </a>
                    </div>
                    <vue-dropzone class="mt-2"
                        style="height:180px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                        ref="dropzone" @vdropzone-success="afterComplete" id="drop1" :options="dropOptions">
                    </vue-dropzone>
                      <a  
                          @click="removeAllFiles"
                          class="fuente tamanio"
                          href="javascript:;"
                          ><i class="far fa-trash-alt me-2 iconos"></i>
                          <b class=" me-2 links">Quitar documento</b>
                        </a>
                      <p class="parrafo text-sm mt-3">
                          <a class="text-primary">Vence: </a> {{collects.datetimes}} 
                        </p>
                  </div>
       </div>
       <div v-else >
                <div class="mt-5 text-center" >
                   <img alt="Image placeholder" class=" move-on-hover " src="../../../assets/img/icons/private.svg"/> 
                         </div>
                         <p class="h5 fuente" style="font-weight: 400;">
                              Tarea atrasada
                         </p>
                         <p class="parrafo">No puede subir la tarea porque el tiempo ya expiró </p>
                </div>
    </template>
    <template v-slot:footer>
              <div  v-if="!tarea_atrazada">
                      <a class="btn btnNaranjaClaro me-3" @click="close">
                        Volver
                      </a>
                       <ButtonLoading v-if="ifLoad"/>
                      <button v-else class="btn btnNaranja "  @click="saveArbolEntrega()">
                        Guardar
                      </button>
                </div>
                <div class="text-end" v-else>
                      <a class="btn btnNaranjaClaro" @click="close">
                        Volver
                      </a>
                </div>
    </template>
  </FullModal>
</template>

<script>
import FullModal from "../../../shared/FullModal.vue";
//import ProgressBar from "../../../shared/ProgressBar";
import { StorageRef } from "../../../boot/firebase";
import 'vue2-datepicker/index.css';
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import ButtonLoading from "../../../shared/ButtonLoading.vue";
let image = require("../../../assets/img/usados/all.svg");
//Servicios
import serviceTask from '../grupDocente/ServiceTASK';
const ResultServiceTask = new serviceTask();
export default {
  name: 'UpTrask',
  components: { FullModal, vueDropzone, ButtonLoading},
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
          _id: null,
            entrega: {
             idUser: this.$store.state.user.id,
             nota: '',
             link: "",
          },
        },
      },
       model2: {
          link: '',
       },
      htmlForEditor: "",
      customToolbar: [
      ],
      idTasks: '',
      ifLoad: false,
      ifLoad2: false,
      img1: '',
      isPlaso: '',
      dateTask: '',
      ifcarga: false,
      tarea_atrazada: false,
      isUpdateTask: false,
    }
  },
  methods: {
    close() {
      this.$emit('EventClose');
    },
    initial() {
      this.taskTime(this.collects.datetimes);
      this.fechas(this.collects.datetimes);
      if (this.collects.link!=="") {
        this.isUpdateTask = true;
      }
    },
    taskTime(fecha2){
      let fecha = new Date().toISOString();
      if (fecha2<= fecha) {
        this.tarea_atrazada = true;
      }
    },
    afterComplete(upload) {
      this.ifLoad = true;
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
          this.ifLoad = false;
          alert('no se puede subir este archivo revise el internet')
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            this.model.task.entrega.link = this.img1;
            this.model2.link = this.img1;
            this.ifLoad = false;
          });
        }
      );
    },
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
      this.model.task.archivo = '';
    },
    saveArbolEntrega(){
        if(this.model.task.entrega.link!=''){
          if (this.isUpdateTask) {
            this.optionUpdate();
          } else {
          this.ifLoad = true;
          this.$proxies._aulaProxi
            .sendTask(this.collects.id, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.close();
              this.getData();
              this.toast('Tarea enviada exitosamente!!');
            })
            .catch((err) => {
              console.log("Error", err);
              this.ifLoad = false;
            });
          }
        }else{
          this.$dialog.alert('❌ :::Por favor subir la tarea:::') 
        }
    },
    optionUpdate() {
      let message = {
        title: "Editar entrega",
        body: " ¿Esta seguro que quiere actualizar la entrega?",
      };
      let options = {
        loader: true,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.dialogUpdate();
          setTimeout(() => {
            dialog.close();

          }, 1200);
        })
        .catch(function () {
        });
    },
    dialogUpdate(){
        this.ifLoad = true;
        let keys = this.$route.params.id + ',' + this.collects.id + ',' + this.collects.id2;
          this.$proxies._aulaProxi
            .updateTask(keys, this.model2) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.close();
              this.getData();
              this.toast('Entrega Actualizada!!');
            })
            .catch((err) => {
              console.log("Error", err);
              this.ifLoad = false;
        });
    },
    getData() {
      this.$emit('getData');
    },
    fechas(event) {
      if (event != null) {
        this.isPlaso = ResultServiceTask.fechasLimite(event);
      }
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