<template>
    <section>
        <Modal @close="close">
            <template v-slot:header> Apertura de notas</template>
            <template v-slot:body>
                <ProgressBar v-if="isCarga"></ProgressBar>
                <div v-else>
                    <form @submit.prevent="save" id="apertura">

                        <p class="text-sm negros h6 mb-1 mt-2">Fecha de Inicio </p>
                        <Picker v-model="model.inicio"/>
                        <p class=" text-xs text-danger">
                            {{ validation.firstError("model.inicio") }}
                        </p>
                        <p class="text-sm negros h6 mb-1 mt-2">Fecha Fin </p>
                        <Picker v-model="model.fin"/>
                        <p class=" text-xs text-danger">
                            {{ validation.firstError("model.fin") }}
                        </p>
                        <div class="text-center">
                            <img src="../../assets/img/fecha.svg" alt="">
                        </div>
                        
                    </form>
                </div>
            </template>
            <template v-slot:acccion>
                <ButtonLoading v-if="ifLoad" />
                <button v-else type="submit" form="apertura" class="btn btnNaranja mt-2">
                    Guardar
                </button>
            </template>
        </Modal>
    </section>

</template>
<script >
import Modal from "../../shared/Modal.vue";
import ButtonLoading from "../../shared/ButtonLoading.vue";
import ServiceMatricula from '../../service/funcions';
import ProgressBar from "../../shared/ProgressBar";
import Picker from "../../shared/Picker.vue"
const ResultServiceMatricula = new ServiceMatricula();
export default {
    name: 'MigracionMatricula',
    components: {
        Modal, ButtonLoading, ProgressBar, Picker
    },
    data() {
        return {
            ifLoad: false,
            model: {
                inicio: '',
                fin: '',
            },
            info: '',
            ids: '',
            isCarga: false,
        }
    },
    created() {
        this.gets();
    },

    methods: {
        close() {
            this.$emit('myEventCloseApertura')
        },
        save() {
            this.$validate().then(success => {
                if (!success) {
                    this.toast('Por favor llena correctamente los campos solicitados');
                    return
                }
                this.isCarga = true;
                this.$proxies._settingProxi
                    .editApertura(this.ids, this.model) //-----------EDITAR CON AXIOS
                    .then(() => {
                        this.isCarga = false;
                        this.close();
                        this.$router.push("/");
                        this.toast('Actualizacion exitosa');
                    })
                    .catch(() => {
                        this.$dialog.alert("Error estado 500.");
                        this.isCarga = false;
                        this.close();
                        this.$router.push("/");
                    });
            })
        },
        gets() {
            this.ifAdd = false;
            this.isCarga = true;
            this.$proxies._settingProxi.getApertura()
                .then((x) => {
                    const { _id, inicio, fin } = x.data[0];
                    this.info = x.data;
                    this.ids = _id;
                    let fecha = inicio;
                    this.model.inicio = new Date(fecha);
                    let fecha2 = fin;
                    this.model.fin = new Date(fecha2);
                    this.isCarga = false;
                }).catch((er) => {
                    console.log(er)
                    this.isCarga = false;
                });
        },
        toast(message) {
            this.$toasted.info(message, {
                duration: 3000,
                position: 'bottom-center',
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
        fechaActual() {
            this.fecha = ResultServiceMatricula.calcular_fecha();
        },
    },
    validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
        'model.inicio'(value) {
            return this.$validator
                .value(value)
                .required()
        },
        'model.fin'(value) {
            return this.$validator
                .value(value)
                .required()
        },
    },
}
</script>
  