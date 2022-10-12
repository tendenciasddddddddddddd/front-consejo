<template>
    <div>
        <ProgressBar v-if="isCarga"></ProgressBar>
        <div v-else>
            <span style="font-size: 18px;" class=" s-title-page">Configuración de plataforma</span>
            <div v-if="!ifAdd">
                <div v-if="info.length" >
                   <div class="w-50">
                    <form @submit.prevent="save">
                        <p class="parrafo mb-1 mt-2">Rector</p>
                    <CustomInput v-model="model.rector" />
                    <p class=" text-xs text-danger">
                      {{ validation.firstError("model.rector") }}
                    </p>
                    <p class="parrafo mb-1">Vicerector</p>
                    <CustomInput v-model="model.vicerector" />
                    <p class=" text-xs text-danger">
                      {{ validation.firstError("model.vicerector") }}
                    </p>
                    <p class="parrafo mb-1">Secretario</p>
                    <CustomInput v-model="model.secretario" />
                    <p class=" text-xs text-danger">
                      {{ validation.firstError("model.secretario") }}
                    </p>
                    <p class="parrafo mb-1">Inspector</p>
                    <CustomInput v-model="model.inspector" />
                    <p class=" text-xs text-danger">
                      {{ validation.firstError("model.inspector") }}
                    </p>
                    <br>
                    <a @click="save" type="submit" class="btn btn-vercel ">Actualizar información</a>
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
                rector: '',
                vicerector: '',
                secretario: '',
                inspector: '',
            },
            ids: '',
            isCarga: false,
            info: ''
        }
    },
    mounted() {
        this.gets()
    },
    methods: {
        openAdd: function () {
            this.ifAdd = !this.ifAdd
        },
        save() {
           
            this.$validate().then(success => { 
              if (!success){ 
                this.toast('Por favor llena correctamente los campos solicitados');
                return
              }
              this.isCarga = true;
              this.$proxies._settingProxi
                .editConfigure(this.ids,this.model) //-----------EDITAR CON AXIOS
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
                    const {_id, inspector, rector, secretario, vicerector} = x.data[0];
                    this.info = x.data;
                    this.ids = _id;
                    this.model.inspector = inspector;
                    this.model.rector = rector;
                    this.model.secretario = secretario;
                    this.model.vicerector = vicerector;
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
