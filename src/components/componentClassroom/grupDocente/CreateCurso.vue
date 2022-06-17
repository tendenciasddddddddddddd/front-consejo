<template>
     <FullModal @close="close">
        <template v-slot:header> Aulas virtuales</template>
         <template v-slot:body>
            <form @submit.prevent="save" id="aulas">
              <div class="mt-2">
                <span class="parrafo">Curso</span>
                <IsSelect v-if="isCurso"></IsSelect>
                  <Dropdown v-model="model.nombre"  v-else :options="listniveles"/>
                <p class="mb-0 text-xs fuente text-danger">
                  {{ validation.firstError("model.nombre") }}
                </p>
              </div>
              <div class="mt-3 ">
                <span class="parrafo">Materia</span>
                 <CustomInput v-model="model.materia" />
                <p class="mb-0 text-xs fuente text-danger">
                  {{ validation.firstError("model.materia") }}
                </p>
              </div>
              <div class="mt-3">
                <span class="parrafo ">A que modalidad pertenece?</span>
                <div  v-for="item in modalidades" :key="item.id">
                   <div class="form-check mb-2 mt-2">
                            <input
                              :class="{
                               error: validation.hasError('model.icono'),
                             }"
                              class="form-check-input"
                              v-model="model.icono"
                              type="radio"
                              name="ite.id"
                              :value="item.nombre"
                              required
                            />
                            <a class="parrafo" :for="item.nombre">
                              {{ item.nombre }}</a
                            >
                          </div>
                 <p class="mb-0 text-xs fuente text-danger">
                  {{ validation.firstError("model.icono") }}
                </p>
              </div>
              </div>
              <div class="mt-3">
                <span class="parrafo">Código de acceso</span>
                <CustomInput v-model="model.codigo" />
                <p class="mb-0 text-xs fuente text-danger">
                  {{ validation.firstError("model.codigo") }}
                </p>
              </div>
            <div class="mt-3">
              <span class="parrafo">Que aprenderán en este Curso?</span>
              <vue-editor
                id="editor"
                :class="{ error: validation.hasError('model.descripcion') }"
                v-model="model.descripcion"
                :editorToolbar="customToolbar"
                class="fuente"
              >
              </vue-editor>
              <p class="mb-0 text-sm text-danger">
                {{ validation.firstError("model.descripcion") }}
              </p>
            </div>
          </form>
         </template>
          <template v-slot:footer>
             <a class="btn btnNaranjaClaro"  @click="$emit('myEvent2')">
              <i class="ni ni-bold-left"></i> &nbsp; Volver
            </a>
            &nbsp; &nbsp;
             <a v-if="!isComplete" class="btn btnDisabled">Guardar</a>
             <template v-else>
              <ButtonLoading v-if="ifLoad"/>
            <button v-else type="submit"
              class="btn btnNaranja"
              form="aulas">
              Guardar
            </button>
             </template>
          </template>
     </FullModal>
</template>
<script>
import IsSelect from '../../../shared/IsSelect'
import FullModal from "../../../shared/FullModal.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import Dropdown from "../../../shared/Dropdown.vue";
import { VueEditor} from "vue2-editor";
export default {
    name: 'AulaCreate',
    components:{
         VueEditor, IsSelect, FullModal,CustomInput, ButtonLoading, Dropdown
       },
    data() {
        return {
          tab: "iniciar",
          isVisible: 'ventana1',
           user: this.$store.state.user,
           fistname: '',
           ifLoad: false,
            model: {
              _id: null,
              fecha: null, 
              fdocente: null, 
              nombre: null,
              materia: null, 
              codigo: null, 
              descripcion: null,
              icono: null,
              doc: null,
            },
            htmlForEditor: "",
            
              customToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                
              ],
              isCurso: false, 
              listniveles : [],
              modalidades:[
                {id:1, nombre: 'Intensivo'},
                {id:2, nombre: 'Extraordinaria'},
              ],
        }
    },
    methods: {
      appInit(){
        const info = JSON.parse(localStorage.getItem("Xf"));
        this.fistname = info.nombre;
      },
       close(){
        this.$emit('myEvent2');
      },
      __listNivele() {
        //-----------TRAE LA LISTA DE LOS ROLES
        this.isCurso = true;
        this.$proxies._gestionProxi
          .getNiveles()
          .then((x) => {
            let filtrosNiveles = x.data;
            this.listniveles = filtrosNiveles.filter((x) => x.modalidad == 'Extraordinaria' );
            this.isCurso = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isCurso = false;
          });
      },
      save() {
        //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
        this.$validate().then((success) => {
          //METODO PARA GUARDAR
          if (!success) {
            this.toast('Por favor llena correctamente los campos solicitados')
           
            return;
          }
          if (this.user.id) {
            this.model.fdocente = this.user.id;
            this.model.fecha = this.__calcularFecha();
            this.ifLoad = true;
            this.model.doc = this.fistname;
            this.model.nombre = this.model.nombre.nombre
             this.$proxies._aulaProxi
              .create(this.model) //-----------EDITAR CON AXIOS
               .then(() => {
                 this.ifLoad = false;
                 this.$emit('clickSave')
                 this.toast('Creaste exitosamente un nuevo curso')
               })
               .catch((err) => {
                 console.log("Error", err);
                 this.ifLoad = false;
               });
           } else{
             console.log("No esta identificado")
           }
        });
      },
      __calcularFecha() {
        let tiempoTranscurrido = Date.now();
        let hoy = new Date(tiempoTranscurrido);
        return hoy.toLocaleString();
      },
      toast(message) {
        this.$toasted.info(message, {
          duration: 2300,
          position : 'bottom-center',
          icon: "check-circle",
          theme: "toasted-primary",
          action : {
            text : 'CERRAR',
            onClick : (e, toastObject) => {
                toastObject.goAway(0);
            }
          }
        });
      },
    },
    created() {
      this.appInit();
      this.__listNivele();
    },
    computed: {
      isComplete () {
        return this.model.nombre && this.model.materia && this.model.codigo && this.model.descripcion && this.model.icono;
      }
    },
    validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
      'model.nombre'(value) {
        return this.$validator
          .value(value)
          .required()
      },
      'model.materia'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(50);
      },
      'model.codigo'(value) {//
        return this.$validator
          .value(value)
          .required()
          .minLength(5)
          .maxLength(50);
    },
    'model.descripcion'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(10)
    },
    'model.icono'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    },
};
</script>