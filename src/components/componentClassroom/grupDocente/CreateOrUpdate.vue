<template>
  <FullModal @close="close">
    <template v-slot:header> Tareas</template>
    <template v-slot:body>
      <form @submit.prevent="save" id="task">
          <span class="text-sm negros">Nombre de Tarea</span>
          <CustomInput v-model="model.task.nombre" />
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.task.nombre") }}
          </p>

          <span class="text-sm negros ">Fecha de entrega </span>
           <Picker v-model="model.task.finicio"/>
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.task.finicio") }}
          </p>
          
          <span  class="negros text-sm fuente mt-2">
            <b> Subir archivo (Opcional)</b>
          </span>
          <div >
           <Dropzone  @uploadArchive="submitArchive"/>
          </div>
          <br>
          <span class="text-sm negros">Descripción</span>
           <Editor v-model="model.task.descripcion" />
          
          <p class="mb-0 text-xs text-danger">
            {{ validation.firstError("model.task.descripcion") }}
          </p> 
      </form>
    </template>
    <template v-slot:footer>
      <button class="btn btnNaranja2 me-2" @click="close">
        Cancelar
      </button>
      <ButtonLoading v-if="ifLoad"/>
      <button v-else type="submit" id="addRowButton" class="btn btnNaranja" form="task">
        Guardar
      </button>
    </template>
  </FullModal>
</template>

<script>
import FullModal from "../../../shared/FullModal.vue";
import Editor from "../../../shared/Editor.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import Picker from "../../../shared/Picker.vue"
import Dropzone from "../../../shared/Dropzone.vue"
//Servicios
import serviceTask from './ServiceTASK';
const ResultServiceTask = new serviceTask();
export default {
  name: 'CreateOrUpdate',
  components: { FullModal, Editor,  CustomInput, ButtonLoading, Picker, Dropzone },
  props: {
    collects: Object
  },
  data() {
    return {
      model: {
        _id: null,
        task: {
          nombre: null,
          descripcion: 'Formato pdf',
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
    }
  },
  methods: {
    close() {
      this.$emit('EventClose');
    },
    initial() {
      if (this.collects._id != undefined) {
        this.model.task = this.collects;
        let fecha = this.collects.finicio
        this.model.task.finicio = new Date(fecha)
      }
    },
    save() {
      this.$validate().then((success) => {
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return;
        }
        if (this.collects._id) { //editTask
          this.ifLoad = true;
          let keys = this.$route.params.id + ',' + this.collects._id
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

    submitArchive(url){
      this.model.task.archivo = url;
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