<template>
  <div>
    <ProgressBar v-if="isCarga"></ProgressBar>
    <div v-else>
      <div v-if="!ifAdd">
        <div v-if="info.length">
          <div class="w-70">
            <form @submit.prevent="save">
              <p class="text-sm negros h6  mb-1 mt-4">Logo del colegio</p>
              <div class="row">
                <div class="col-8">
                  <img :src="url ? url : model.logo" alt="logo" class="avatar avatar-xl rounded-circle ava">
                </div>
                <div class="col-4 text-end">
                  <input type="file" class="form-control" @change="onFileChange">
                </div>
              </div>

              <hr>
              <p class="text-sm negros h6 mb-1 mt-2">Unidad Educativa</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifNombre" class="negros text-sm">{{ model.unidadeducativa }}</span>
                  <CustomInput v-else v-model="model.unidadeducativa" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.unidadeducativa") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifNombre = !ifNombre" class="links2 gordo">{{ ifNombre ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-1 mt-2">Ubicación</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifUbicacion" class="negros text-sm">{{ model.ubicacion }}</span>
                  <CustomInput v-else v-model="model.ubicacion" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.ubicacion") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifUbicacion = !ifUbicacion" class="links2 gordo">{{ ifUbicacion ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-2 mt-2">Teléfono</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifTelefono" class="negros text-sm">{{ model.telefono }}</span>
                  <CustomInput v-else v-model="model.telefono" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.telefono") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifTelefono = !ifTelefono" class="links2 gordo">{{ ifTelefono ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-2 mt-2">Dirección</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifDireccion" class="negros text-sm">{{ model.direccion }}</span>
                  <CustomInput v-else v-model="model.direccion" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.direccion") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifDireccion = !ifDireccion" class="links2 gordo">{{ ifDireccion ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-2 mt-2">Rector</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifRector" class="negros text-sm">{{ model.rector }}</span>
                  <CustomInput v-else v-model="model.rector" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.rector") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifRector = !ifRector" class="links2 gordo">{{ ifRector ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-2 mt-2">Vicerector</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifVice" class="negros text-sm">{{ model.vicerector }}</span>
                  <CustomInput v-else v-model="model.vicerector" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.vicerector") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifVice = !ifVice" class="links2 gordo">{{ ifVice ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-2 mt-2">Secretario</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifSecreto" class="negros text-sm">{{ model.secretario }}</span>
                  <CustomInput v-else v-model="model.secretario" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.secretario") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifSecreto = !ifSecreto" class="links2 gordo">{{ ifSecreto ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>
              <p class="text-sm negros h6 mb-2 mt-2">Inspector</p>
              <div class="row">
                <div class="col-8">
                  <span v-if="!ifInsper" class="negros text-sm">{{ model.inspector }}</span>
                  <CustomInput v-else v-model="model.inspector" />
                  <p class=" text-xs text-danger">
                    {{ validation.firstError("model.inspector") }}
                  </p>
                </div>
                <div class="col-4 text-end">
                  <a @click="ifInsper = !ifInsper" class="links2 gordo">{{ ifInsper ? 'Cancelar' : 'Editar' }}</a>
                </div>
              </div>
              <hr>

              <button @click="save" type="submit" class="btn btnNaranja ">Actualizar configuración</button>
            </form>
          </div>
        </div>
        <NoFound2 v-else />
      </div>
      <div class="mt-5" v-else>
        chao
      </div>
    </div>

  </div>
</template>

<script>
import NoFound2 from "../../../shared/NoFound2"
import ProgressBar from "../../../shared/ProgressBar";
import CustomInput from "../../../shared/CustomInput.vue";
import * as axios from "axios";
export default {
  name: 'Planificacion',
  props: {
    id: String,
  },
  components: {
    NoFound2, ProgressBar, CustomInput
  },
  data() {
    return {
      displayedArticles: [],
      ifAdd: false,
      archivo: '',
      ifLoad: false,
      model: {
        unidadeducativa: '',
        ubicacion: '',
        telefono: '',
        direccion: '',
        rector: '',
        vicerector: '',
        secretario: '',
        inspector: '',
        logo: '',
      },
      ids: '',
      isCarga: false,
      info: '',
      ifNombre: false,
      ifUbicacion: false,
      ifTelefono: false,
      ifDireccion: false,
      ifRector: false,
      ifVice: false,
      ifSecreto: false,
      ifInsper: false,
      url: null,
    }
  },
  mounted() {
    this.gets()
  },
  methods: {
    openAdd: function () {
      this.ifAdd = !this.ifAdd
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      var formData = new FormData();
      formData.append("myFile", file);
      axios.post("https://uemah.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(result => {
          const urls = result.data;
          this.model.logo= urls;
          console.log(this.model.logo)
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {

      this.$validate().then(success => {
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return
        }
        this.isCarga = true;
        this.$proxies._settingProxi
          .editConfigure(this.ids, this.model) //-----------EDITAR CON AXIOS
          .then(() => {
            this.isCarga = false;
            this.gets();
            this.toast('Actualizacion exitosa');
          })
          .catch(() => {
            this.$dialog.alert("Error estado 500.");
            this.isCarga = false;
          });
      })

    },
    gets() {
      this.ifAdd = false;
      this.isCarga = true;
      this.$proxies._settingProxi.getConfigure()
        .then((x) => {
          const { _id, logo, unidadeducativa, inspector, ubicacion, rector, telefono, secretario, direccion, vicerector } = x.data[0];
          this.info = x.data;
          this.ids = _id;
          this.model.unidadeducativa = unidadeducativa;
          this.model.ubicacion = ubicacion;
          this.model.telefono = telefono;
          this.model.direccion = direccion;
          this.model.inspector = inspector;
          this.model.rector = rector;
          this.model.secretario = secretario;
          this.model.vicerector = vicerector;
          this.model.logo = logo;
          this.isCarga = false;
        }).catch(() => {
          console.log("Error")
          this.isCarga = false;
        });
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
  validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    'model.unidadeducativa'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    'model.ubicacion'(value) {
      return this.$validator
        .value(value)
        .required()
    }, 'model.telefono'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    'model.direccion'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    'model.inspector'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    'model.rector'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    'model.secretario'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    'model.vicerector'(value) {
      return this.$validator
        .value(value)
        .required()
    },
  },
}
</script>
