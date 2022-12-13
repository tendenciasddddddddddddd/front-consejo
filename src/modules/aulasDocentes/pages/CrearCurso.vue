<template>
    <FullModal @close="close">
       <template v-slot:header> Aulas virtuales</template>
        <template v-slot:body>
           <form @submit.prevent="save" id="aulas">
             <div >
               <span class="parrafo">Curso</span>
               <CustomInput v-model="model.nombre" />
               <p class="mb-0 text-xs fuente text-danger">
                 {{ validation.firstError("model.nombre") }}
               </p>
             </div>
             <div class="mt-3 ">
               <span class="parrafo">Paralelo</span>
                <CustomInput v-model="paralelo" />
               <p class="mb-0 text-xs fuente text-danger">
                 {{ validation.firstError("paralelo") }}
               </p>
             </div>
             <div class="mt-3 ">
               <span class="parrafo">Materia</span>
                <CustomInput v-model="model.materia" />
               <p class="mb-0 text-xs fuente text-danger">
                 {{ validation.firstError("model.materia") }}
               </p>
             </div>
             
             <!-- <div class="mt-3">
               <span class="parrafo">Código de acceso</span>
               <CustomInput v-model="model.codigo" />
               <p class="mb-0 text-xs fuente text-danger">
                 {{ validation.firstError("model.codigo") }}
               </p>
             </div> -->
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
           </div>
         </form>
        </template>
         <template v-slot:footer>
            <button class="btn btnNaranja2"  @click="$emit('myEvent2')">
             <i class="ni ni-bold-left"></i> &nbsp; Volver
           </button>
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
import FullModal from "../../../shared/FullModal.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import { VueEditor} from "vue2-editor";
export default {
   name: 'AulaCreate',
   components:{
        VueEditor,  FullModal,CustomInput, ButtonLoading
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
             codigo: 12345, 
             descripcion: '',
             icono: 'Curso activo',
             doc: null,
           },
           htmlForEditor: "",
             customToolbar: [
               ["bold", "italic", "underline"],
               [{ list: "ordered" }, { list: "bullet" }],
               
             ],
             paralelo: ''
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
     save() {
       this.$validate().then((success) => {
         if (!success) {
           this.toast('Por favor llena correctamente los campos solicitados')
           return;
         }
         if (this.user.id) {
           this.model.fdocente = this.user.id;
           this.model.fecha = this.__calcularFecha();
           this.ifLoad = true;
           this.model.doc = this.fistname;
           this.model.nombre = this.model.nombre + '-'+ this.paralelo
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
   },
   computed: {
     isComplete () {
       return this.model.nombre && this.model.materia && this.model.codigo && this.paralelo && this.model.icono;
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
         .minLength(3)
         .maxLength(50);
   },
   'paralelo'(value) {//
       return this.$validator
         .value(value)
         .required()
   },
   },
};
</script>