<template>
    <div>
        <ProgressBar v-if="isCarga"></ProgressBar>
        <div v-else>
            <button v-if="!ifAdd" class="btn btnNaranja" @click="openAdd">
                    Subir archivo
            </button>
            <button v-else class="btn btnNaranja2" @click="openAdd">
                    Mostar lista de planificaciones
            </button>
            <div v-if="!ifAdd">
                <div v-if="planificacion.length">
                    <table class="dataTable-table table s-table-flush mt-2">
                        <thead class="thead-light">
                            <tr class="cabeza">
                                <th style="background-color: rgb(234, 240, 246); "
                                    class="text-center text-uppercase text-secondary text-xxs ">
                                    NOMBRE
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs ">
                                    URL
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs ">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in planificacion" :key="item.id">
                                <td class="align-middle negros text-sm">
                                   {{item.nombre}}
                                </td>
                                <td class="align-middle  text-sm">
                                    <a :href="item.url" target="_blank" class="links2 gordo">
                                        {{ item.url.substring(0, 50) }} </a>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <svg @click="remove(item._id)" data-testid="geist-icon" fill="none" height="20"
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
            <div  v-else>
                <div class="d-flex justify-content-start">
                    <section class="mt-3 ">
                    <p class="h6 negros gordo" style="font-weight:400;">
                     PEIMER QUIMESTRE
                    </p>
                    <div class="">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial1" type="radio" name="ite.id" :id="1"
                          :value="1" />
                        <span class="parrafo"> PARCIAL 1</span>
                      </div>
                    </div>
                    <div class="mt-2">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial2" type="radio" name="ite.id" :id="2"
                          :value="2" />
                        <span class="parrafo"> PARCIAL 2</span>
                      </div>
                    </div>
                  </section>
                  <section class="mt-3 ms-4">
                    <p class="h6 negros gordo" style="font-weight:400;">
                     SEGUNDO QUIMESTRE
                    </p>
                    <div class="">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial3" type="radio" name="ite.id" :id="3"
                          :value="3" />
                        <span class="parrafo"> PARCIAL 1</span>
                      </div>
                    </div>
                    <div class="mt-2">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial4" type="radio" name="ite.id" :id="4"
                          :value="4" />
                        <span class="parrafo"> PARCIAL 2</span>
                      </div>
                    </div>
                  </section>
                </div>
                
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
                planificacion: {
                    url: '',
                    nombre: '',
                },
            },
            isCarga: false,
            planificacion: [],
            iseliminaddo : false,
            parcial1 : 1,
            parcial2 : 0,
            parcial3 : 0,
            parcial4 : 0,
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
            this.model.planificacion.url=url;
            this.save();
        },
        save() {
            if (this.model.planificacion == '') {
                this.toast('Por favor subir un nuevo archivo');
                return;
            }
            this.isCarga = true;
            if (this.parcial1!=0) this.model.planificacion.nombre = 'QUIMESTRE 1 -- PARCIAL 1'
            if (this.parcial2!=0) this.model.planificacion.nombre = 'QUIMESTRE 1 -- PARCIAL 2'
            if (this.parcial3!=0) this.model.planificacion.nombre = 'QUIMESTRE 2 -- PARCIAL 1'
            if (this.parcial4!=0) this.model.planificacion.nombre = 'QUIMESTRE 2 -- PARCIAL 2'
            this.$proxies._gestionProxi
                .updatePlanificacion(this.id, this.model) //-----------EDITAR CON AXIOS
                .then(() => {
                    this.isCarga = false;
                    this.gets();
                    this.toast('Planificación creada exitosamente!!');
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
                    this.planificacion = x.data.planificacion;
                    this.isCarga = false;
                }).catch(() => {
                    console.log("Error")
                    this.isCarga = false;
                });
        },
        remove(id) {
        let message = {
          title: "¿Destruir registro?",
          body: " Esta acción no se puede deshacer",
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
            this.dialogDelete(id);
            setTimeout(() => {
              dialog.close();
              this.toast("Se elimino registros de esta tabla!");
            }, 600);
          })
          .catch(function() {});
      },
      dialogDelete(idPlanificacion) {
        let idss = []
          this.iseliminaddo = true;
          if(idPlanificacion){
            idss.push(idPlanificacion)
            this.$proxies._gestionProxi
          .removeDistributivo(this.id, idss)
              .then(() => {
                this.iseliminaddo = false;
                this.gets();
              })
              .catch(() => {
                console.log("Error imposible");
              });
         }
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
