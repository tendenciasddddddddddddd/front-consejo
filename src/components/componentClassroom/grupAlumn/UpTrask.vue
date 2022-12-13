<template>
  <FullModal @close="close">
    <template v-slot:header> {{ collects.nombre }}</template>
    <template v-slot:body>
      <div v-if="!tarea_atrazada">
        <div class="is-error"> 
          <span class="text-sm negros gordo">{{ isPlaso }} </span>
        </div>
        <div class="croll" style="overflow-y: auto;height: auto;">
          <p class="parrafo " v-html="collects.descripcion"></p>
        </div>
       
        <div lass="mt-2">
          <a v-if="collects.archivo" class="btn btnNaranja" style=" cursor: pointer;padding: 10px !important;" target="_blank"
            :href="collects.archivo">
            <span class="">Detalle de tarea (Desacargar)</span>
          </a>
        </div>
        <Dropzone @uploadArchive="submitArchive" />
        <span class="parrafo ">Descripción</span>
        <Editor v-model="model.comentario" />
      </div>
      <div v-else>
        <div class="mt-5 text-center">
          <img alt="Image placeholder" class=" move-on-hover " src="../../../assets/img/icons/private.svg" />
        </div>
        <p class="h5 fuente" style="font-weight: 400;">
          Tarea atrasada
        </p>
        <p class="parrafo">No puede subir la tarea porque el tiempo ya expiró </p>
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="!tarea_atrazada">
        <button class="btn btnNaranja2 me-3" @click="close">
          Volver
        </button>
        <button v-if="!isComplete" class="btn btnDisabled">Guardar</button>
        <template v-else>
          <ButtonLoading v-if="ifLoad" />
        <button v-else class="btn btnNaranja " @click="saveArbolEntrega()">
          Guardar
        </button>
        </template>
        
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
import Dropzone from "../../../shared/Dropzone.vue"
import Editor from "../../../shared/Editor.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import serviceTask from '../grupDocente/ServiceTASK';
const ResultServiceTask = new serviceTask();
export default {
  name: 'UpTrask',
  components: { FullModal, Dropzone, ButtonLoading, Editor },
  props: {
    collects: Object
  },
  data() {
    return {
      usuario: this.$store.state.user.id,
      model: {
        idUser: this.$store.state.user.id,
        nota: '',
        link: "",
        comentario: "",
      },
      ifLoad: false,
      isPlaso: '',
      tarea_atrazada: false,
      isUpdateTask: false,
      idEntrega: ''
    }
  },
  computed: {
      isComplete () {
        return this.model.link || this.model.comentario;
      }
    },
  methods: {
    close() {
      this.$emit('EventClose');
    },
    initial() {
      this.validateTaskTimes(this.collects.finicio);
      this.detDateTime(this.collects.finicio);
      let array = this.collects.entrega;
      for (let j = 0; j < array.length; j++) {
        if (array[j].idUser == this.usuario) {
           this.idEntrega = array[j]._id
            this.isUpdateTask = true;
            this.model.link = array[j].link;
            this.model.comentario = array[j].comentario;
            break;
          }
      }
    },
    validateTaskTimes(fecha2) {
      let fecha = new Date().toISOString();
      if (fecha2 <= fecha) {
        this.tarea_atrazada = true;
      }
    },
    submitArchive: function (url) {
      this.model.link = url;
    },
    saveArbolEntrega() {
      if (this.model.link != '' || this.model.comentario != '') {
        if (this.isUpdateTask) {
          this.optionUpdate();
        } else {
          this.ifLoad = true;
          this.$proxies._aulaProxi
            .sendTask(this.collects._id, this.model) //-----------EDITAR CON AXIOS
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
      } else {
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
    dialogUpdate() {
      this.ifLoad = true;
      let keys = this.$route.params.id + ',' + this.collects._id + ',' + this.idEntrega;
      this.$proxies._aulaProxi
        .updateTask(keys, this.model) //-----------EDITAR CON AXIOS
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
    detDateTime(event) {
      if (event != null) {
        this.isPlaso = ResultServiceTask.fechasLimite(event);
      }
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
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
}
</script>