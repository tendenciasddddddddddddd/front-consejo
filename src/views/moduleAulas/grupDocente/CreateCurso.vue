<template>
  <div>
    <div v-if="tab === 'iniciar'" class="altural"></div>
    <div class="fixed-plugin" :class="{ 'show reponv1': tab === 'iniciar' }">
      <a
        @click="tab = 'init1'"
        class="fixed-plugin-button text-dark position-fixed px-3 py-2"
        style="background-color: rgb(14, 114, 237);"
      >
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div
        class="card shadow-lg desplega"
        :class="{ reponv1: tab === 'iniciar' }"
        style="overflow-y: auto; z-index: 9999;"
      >
        <div
          class=" cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h4 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Aulas virtuales
            </h4>
          </div>
          <div class="float-end mt-2">
            <button
              @click="$emit('myEvent2')"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path
                      d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <form @submit.prevent="save" id="aulas">
            
              <div class="mt-2">
                <span class="parrafo">Curso</span>
                <IsSelect v-if="isCurso"></IsSelect>
                <v-select
                  class="style-chooser"
                  placeholder="Selecionar curso"
                  v-else
                  :class="{ error: validation.hasError('model.nombre') }"
                  :options.sync="listniveles"
                  label="nombres"
                  v-model="model.nombre"
                  required
                >
                  <template #option="{ nombres }">
                    <h6 style="margin: 0">{{ nombres }}</h6>
                  </template>
                  <template #no-options="{ }">
                    Lo siento, no hay opciones de coincidencia.
                  </template>
                </v-select>
                <p class="mb-0 text-xs fuente text-danger">
                  {{ validation.firstError("model.nombre") }}
                </p>
              </div>
              <div class="mt-3 ">
                <span class="parrafo">Materia</span>
                <input
                  :class="{ error: validation.hasError('model.materia') }"
                  v-model="model.materia"
                  class="form-control buscador fuente"
                  type="text"
                />
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
                <input
                  :class="{ error: validation.hasError('model.codigo') }"
                  v-model="model.codigo"
                  class="form-control buscador fuente"
                  type="text"
                />
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
        </div>
        <div class="modalFooter">
          <div class="text-end">
            <a class="btn btnNaranjaClaro"  @click="$emit('myEvent2')">
              <i class="ni ni-bold-left"></i> &nbsp; Volver
            </a>
            &nbsp; &nbsp;
             <a v-if="!isComplete" class="btn btnDisabled">Guardar</a>
             <template v-else>
              <button
              v-if="ifLoad"
              class="btn btn-sm btnNaranja"
              type="button"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Enviando...
            </button>

            <button
              v-else
              type="submit"
              id="addRowButton"
              class="btn btnNaranja"
              form="aulas"
            >
              Guardar
            </button>
             </template>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IsSelect from '../../../shared/IsSelect'
import { VueEditor} from "vue2-editor";
export default {
    name: 'AulaCreate',
    components:{
         VueEditor, IsSelect
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
            this.model.nombre = this.model.nombre.nombres
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