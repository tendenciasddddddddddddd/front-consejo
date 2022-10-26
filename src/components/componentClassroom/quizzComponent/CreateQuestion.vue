<template>
  <FullModal @close="close">
    <template v-slot:header> Examen</template>
    <template v-slot:body>
      <form @submit.prevent="save" id="exam">
          <span class="parrafo">Nombre del examen</span>
          <CustomInput v-model="model.examen.nombre" />
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.examen.nombre") }}
          </p>

          <span class="parrafo ">Fecha de inicio <span class="text-danger">{{start}}</span> </span>
          <date-picker v-model="model.examen.startDate"  type="datetime" class="w-100 fuente">
          </date-picker>
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.examen.startDate") }}
          </p>
          
           <span class="parrafo ">Fecha de finalización <span class="text-danger">{{end}}</span></span>
           <date-picker v-model="model.examen.endDate"  type="datetime" class="w-100 fuente">
           </date-picker>
           <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.examen.endDate") }}
          </p>

          <span class="parrafo">Tiempo de examen en (MINUTOS)</span>
          <CustomInput v-model="model.examen.time" />
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.examen.time") }}
          </p>

           <!-- <span class="parrafo">Intentos permitidos</span>
          <CustomInput aria-disabled="" v-model="model.examen.intenAllowed" />
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.examen.intenAllowed") }}
          </p> -->

          <span class="parrafo">Presentacion de preguntas aleatorias</span>
           <div class="form-check form-switch mt-1">
                    <input
                      v-model="model.examen.randomize"
                      class="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      value="1"
                      v-bind:true-value="1"
                      v-bind:false-value="0"
                    />
                  </div><br>
           <span class="parrafo">Seguridad para el examen (Opcional)</span>
          <CustomInput v-model="model.examen.security" />
         
          <span class="parrafo">Permitir revision</span>
           <div class="form-check form-switch mt-1">
                    <input
                      v-model="model.examen.check"
                      class="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      value="1"
                      v-bind:true-value="1"
                      v-bind:false-value="0"
                    />
                  </div>

           <br><span class="parrafo mt-2">Descripción</span>
          <Editor v-model="model.examen.descripcion" />
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.examen.descripcion") }}
          </p>
          
      </form>
    </template>
    <template v-slot:footer>
      <button class="btn btnNaranja2 me-2" @click="close">
        Cancelar
      </button>
      <ButtonLoading v-if="ifLoad"/>
      <button v-else type="submit" id="addRowButton" class="btn btnNaranja" form="exam">
        Guardar
      </button>
    </template>
  </FullModal>
</template>

<script>
import FullModal from "../../../shared/FullModal.vue";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import CustomInput from "../../../shared/CustomInput.vue";
import Editor from "../../../shared/Editor.vue";
import serviceTask from '../grupDocente/ServiceTASK';
import ButtonLoading from "../../../shared/ButtonLoading.vue";
 const ResultServiceTask = new serviceTask();
export default {
  name: 'CreateQuestion',
  components: { FullModal,Editor, DatePicker,  CustomInput,ButtonLoading },
  props: {
    collects: Object
  },
  data() {
    return {
      
      model: {
        _id: null,
        examen: {
          nombre:'',
          descripcion: 'Calificación automática',
          startDate: '',
          endDate: '',
          time: '',
          createQuizz: '',
          randomize: 1, 
          intenAllowed: 1,
          security: '',
          check : 1
        },
      },
      idTasks: '',
      ifLoad: false,
      dateTask: '',
      start: '',
      end: '',
    }
  },
  methods: {
    vueInit(){
       if (this.collects._id != undefined) {
        this.model.examen = this.collects
        this.start = this.collects.startDate;
        this.end = this.collects.endDate;
      }
    },
    close() {
      this.$emit('EventClose');
    },
    save() {
      this.$validate().then((success) => {
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return;
        }
         if (this.collects._id) { 
          this.ifLoad = true;
          let keys = this.$route.params.id + ',' + this.collects._id
          this.$proxies._aulaProxi
            .editQuizz(keys, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.toast('Examen actualizado!!');
              this.close();
              this.getData();
            })
            .catch(() => {
              this.$dialog.alert("Imposible procesar.");
              this.ifLoad = false;
            });
        } else {
          this.ifLoad = true;
          this.model.examen.createQuizz = ResultServiceTask.calcular_fecha_local();
          this.$proxies._aulaProxi
            .createQuizz(this.$route.params.id, this.model)
            .then(() => {
              this.ifLoad = false;
              this.close();
              this.getData();
              this.toast('Examen creado exitosamente!!');
            })
            .catch(() => {
              this.ifLoad = false;
            });
        }
         
      });
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
  created(){
    this.vueInit()
  },
  validators: {
    "model.examen.nombre"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
    "model.examen.descripcion"(value) {
      return this.$validator
        .value(value)
        .required()
    },
    "model.examen.startDate"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(1)
        .maxLength(150);
    },
    "model.examen.endDate"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(1)
        .maxLength(150);
    },
    "model.examen.time"(value) {
      return this.$validator
        .value(value)
        .integer()
        .required()
    },
    "model.examen.intenAllowed"(value) {
      return this.$validator
        .value(value)
        .integer()
        .required()
    },
  },
}
</script>