<template>
    <div>
        <ProgressBar v-if="isCarga"></ProgressBar>
        <div v-else>
            <div class="d-flex justify-content-between">
                <span style="font-size: 18px;" class="  s-title-page"> {{ ifAdd ? "Subir un archivo" : " Lista planificación" }}</span>
                <a class="btn btn-vercel " @click="openAdd">
                    {{ ifAdd ? "Lista planificación" : " Agregar planificación" }}
                </a>
            </div>
            <div v-if="!ifAdd">
                <div v-if="planificacion != ''">
                    <table class="dataTable-table table s-table-flush mt-3">
                        <thead class="thead-light">
                            <tr class="cabeza">
                                <th style="background-color: rgb(234, 240, 246); "
                                    class="text-center text-uppercase text-secondary text-xxs ">
                                    Numero
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs ">
                                    Link
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs ">
                                    Link
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="align-middle text-center fuente">
                                    <span class="text-sm"> 1 </span>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <a :href="planificacion" target="_blank" class="text-sm">
                                        {{ planificacion.substring(0, 80) }} </a>
                                </td>
                                <td class="align-middle text-center text-sm">

                                    <svg data-testid="geist-icon" fill="none" height="20"
                                        shape-rendering="geometricPrecision" stroke="currentColor"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        viewBox="0 0 24 24" width="20" style="color: #000; cursor: pointer;">
                                        <path d="M3 6h18"></path>
                                        <path
                                            d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2">
                                        </path>
                                        <path d="M10 11v6"></path>
                                        <path d="M14 11v6"></path>
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <NoFound2 v-else />
            </div>
            <div class="mt-5" v-else>
                <Dropzone @uploadArchive="submitArchive" />
            </div>
        </div>

    </div>
</template>

<script>
import Dropzone from "../../../shared/Dropzone.vue"
import NoFound2 from "../../../shared/NoFound"
import ProgressBar from "../../../shared/ProgressBar";
export default {
    name: 'Planificacion',
    props: {
        id: String,
    },
    components: {
        Dropzone, NoFound2, ProgressBar
    },
    data() {
        return {
            displayedArticles: [],
            ifAdd: false,
            archivo: '',
            ifLoad: false,
            model: {
                planificacion: '',
            },
            isCarga: false,
            planificacion: ''
        }
    },
    mounted() {
        this.gets()
    },
    methods: {
        openAdd: function () {
            this.ifAdd = !this.ifAdd
        },
        submitArchive: function (url) {
            this.model.planificacion = url;
            this.save();
        },
        save() {
            if (this.model.planificacion == '') {
                this.toast('Por favor subir un nuevo archivo');
                return;
            }
            this.isCarga = true;
            this.$proxies._gestionProxi
                .updatePlanificacion(this.id, this.model) //-----------EDITAR CON AXIOS
                .then(() => {
                    this.isCarga = false;
                    this.gets();
                    this.toast('Tarea creada exitosamente!!');
                })
                .catch(() => {
                    this.$dialog.alert("El servidor responde con un codigo de estado 413.");
                    this.isCarga = false;
                });
        },
        gets() {
            this.ifAdd = false;
            this.isCarga = true;
            this.$proxies._gestionProxi.getPlanificacion(this.id)
                .then((x) => {
                    const { planificacion } = x.data;
                    this.planificacion = planificacion
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
    }
}
</script>
