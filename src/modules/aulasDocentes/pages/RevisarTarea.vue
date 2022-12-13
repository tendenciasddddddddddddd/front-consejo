<template>
    <ScrimModal @close="close">
        <template v-slot:header> {{ collects.nombre }}  
            <a v-if="collects.archivo" :href="collects.archivo" target="_blank" class=" btn btnNaranja2 ms-3" style=" padding: 10px !important;color: rgb(0, 0, 0) !important;
    background-color: rgb(255, 255, 255) !important;" >
                                   <span >Mostrar archivo cargado</span>
                                </a>
        </template>
        <template v-slot:body>
            <div class="row">
                <div class="col-sm-3 croll panel1" style="overflow-y: auto;">
                    <ActionsCheck @changeSearch="changeSearchs" />
                    <NoFound2 v-if="!displayedArticles.length" />
                    <section v-else>
                        <div v-for="item in displayedArticles" :key="item.id" class="mt-3">
                            <div class=" mb-2">
                                <div class="list-decoration" @click="changeNote(item)" style="cursor: pointer;">
                                    <span class="text-xs negros text-media">
                                        <svg class="me-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="23" viewBox="0 0 24 24"><path d="M5.75 12.75a.75.75 0 0 1 0 1.5H4V16a.75.75 0 0 1-1.5 0v-1.75H.75a.75.75 0 0 1 0-1.5H2.5V11A.75.75 0 0 1 4 11v1.75h1.75zm13.6 3.74a.6.6 0 0 0 .13.01h3.02a.8.8 0 0 0-.47-.74l-2.56-1.12a1.5 1.5 0 0 1-.9-1.38v-.51a1.5 1.5 0 0 1 .65-1.24c.96-.66 1.7-2.47 1.7-4.26 0-1.93-.8-2.75-2.44-2.75-.15 0-.3 0-.43.02a5.5 5.5 0 0 0-.7-1.4c.18-.03.8-.12 1.13-.12 2.4 0 3.95 1.41 3.95 4.25 0 1.7-.66 2.68-1.54 4.73l-.82.77v.51l2.56 1.13A2.31 2.31 0 0 1 24 16.5a1.5 1.5 0 0 1-1.5 1.5h-2.35a2.98 2.98 0 0 0-.8-1.5v-.01zm-4.82-1.27 2.73 1.2A2.92 2.92 0 0 1 19 19.1v.4a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-.4c0-1.16.69-2.2 1.75-2.66l2.75-1.18v-1.24C7.92 12.62 7 9.99 7 7.5 7 3.9 8.91 2 11.97 2 15.03 2 17 3.79 17 7.38c0 2.44-.92 5.1-2.47 6.54v1.3zm-1.5-1.3a1.5 1.5 0 0 1 .48-1.1c1.18-1.1 1.99-3.3 1.99-5.44 0-2.66-1.2-3.88-3.53-3.88-2.27 0-3.47 1.29-3.47 4 0 2.18.81 4.36 1.99 5.39a1.5 1.5 0 0 1 .51 1.13v1.24a1.5 1.5 0 0 1-.9 1.38l-2.76 1.18a1.39 1.39 0 0 0-.84 1.28v.4h11v-.4c0-.56-.33-1.07-.84-1.3l-2.74-1.21a1.5 1.5 0 0 1-.89-1.37v-1.3z"></path></svg>
                                        
                                        {{ item.nombre }}
                                    </span> <br>
                                    <div class="ms-2">
                                        <span v-if="item.tarea === ''" class="text-dark text-xs fuente"> <span
                                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>Sin enviar</span>
                                        <span v-else class="text-dark text-xs fuente"><span
                                                style="background-color: rgb(0, 189, 165);"
                                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span> Enviado</span>
                                        <span class="text-dark text-xs fuente ms-2" v-if="item.nota">
                                            <span style="background-color: rgb(0, 189, 165);"
                                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                            {{ item.nota }}
                                        </span>
                                        <span class="text-dark text-xs fuente ms-2" v-else>
                                            <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                            Sin nota
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                   
                </div>
                <div class="col-sm-6 " style="border-right: 1px solid rgb(203 214 226);">
                    <NoFound2 v-if="!detalleTask.id" />
                    <section v-else >
                                <span class="h5 negros gordo ">
                                 <b class=" text-media">{{ detalleTask.nombre }}</b><br>
                            </span><br>
                                <span v-if="subpanel" class="text-sm negros">
                                <button href="javascript:;" disabled class="btn btnNaranja2 w-100">
                                    Sin archivo 
                                </button>
                            </span> 
                             
                            <span v-else class="text-sm negros ">
                                <a :href="detalleTask.tarea" target="_blank" class=" btn btnNaranja w-100" style=" padding: 10px !important;">
                                   <span class="">Click para revisar el trabajo</span>
                                </a>
                            </span>
                            <hr>
                            <div   style="overflow-y: auto;height: calc(85vh - 150px);overflow-x: auto;">
                                <p  class="parrafo mt-2">
                                Detalle de la tarea:
                                <span v-html="detalleTask.comentario"> </span>

                            </p>
                            </div>
                            
                    </section>
                </div>
                <div class="col-sm-3 croll panel1"  style="overflow-y: auto;">
                    <NoFound2 v-if="!detalleTask.id" />
                    <div v-else>
                            <form @submit.prevent="save" role="form" class=" ">
                                <span class="text-sm negros">Calificación de la tarea</span>

                                <CustomInput v-model="model.nota" class=" mt-2"/>
                                <p class="mb-2 text-xs fuente text-danger">
                                    {{ validation.firstError("model.nota") }}
                                </p>
                                <hr>
                                <span class="text-sm negros">Comentarios de retroalimentación</span>
                                <Editor v-model="model.observar" class="mt-2"/>
                                <ButtonLoading v-if="ifLoad" />
                                <button v-else role="button" type="submit" class="btn btnNaranja2 mt-3">Guardar
                                    Nota</button>
                            </form>
                        </div>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <button @click="close"  class="btn btnNaranja2">
                <b>Regresar</b>
            </button>
            <ButtonLoading v-if="ifLoad" />
            <button v-else type="submit" @click="getData" class="btn btnNaranja ms-4">
                Guardar todo y salir
            </button>
        </template>
    </ScrimModal>
</template>

<script>
import ScrimModal from "../../../shared/ScrimModal"
import CustomInput from "../../../shared/CustomInput.vue";
import ActionsCheck from "../../../shared/ActionsCheck.vue";
import NoFound2 from "../../../shared/NoFound"
import ButtonLoading from "../../../shared/ButtonLoading.vue"
import Editor from "../../../shared/Editor.vue";
export default {
    name: "CheckTask",
    props: {
        collects: Object,
        objectUser: Array
    },
    components: {
        ScrimModal, CustomInput, ActionsCheck, NoFound2, ButtonLoading, Editor
    },
    data() {
        return {
            dataUser: [],
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
                nota: '',
                observar: ''
            },
            subpanel: false,
            user: this.$store.state.user,
            ifLoad: false,
            isView: false,
            isSelecTask: [],
            detalleTask: {},
            clickme: false,
            searchQuery: '',
            model2: {
                idUser: '',
                nota: '',
                link: "",
                observar: ''
            },
        }
    },
    computed: {
        displayedArticles: function () {
            if (this.searchQuery.length > 1) {
                return this.dataUser.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.nombre.toLowerCase().includes(v));
                });
            } else {
                return this.dataUser
            }
        }
    },
    methods: {
        close() {
            this.$emit('myEventTask')
        },
        vueInit() {
            this.dataUser = []
            if (this.objectUser.length > 0) {
                let id = '';
                let idTask = '';
                let nombre = '';
                let tarea = '';
                let nota = '';
                let observar = '';
                let comentario = '';
                for (let i = 0; i < this.objectUser.length; i++) {
                    id = this.objectUser[i].usuario;
                    idTask = '0';
                    nombre = this.objectUser[i].name;
                    tarea = '';
                    nota = '';
                    observar = '';
                    comentario = '';
                    for (let j = 0; j < this.collects.entrega.length; j++) {
                        if (this.collects.entrega[j].idUser == id) {
                            idTask = this.collects.entrega[j]._id
                            tarea = this.collects.entrega[j].link;
                            nota = this.collects.entrega[j].nota;
                            observar = this.collects.entrega[j].observar
                            comentario = this.collects.entrega[j].comentario
                            break;
                        }
                    }
                    this.dataUser.push({ id: id, tarea: tarea, idTask: idTask, nombre: nombre, nota: nota, observar: observar, comentario: comentario })
                }
            }
        },
        changeSearchs(value) {
            this.searchQuery = value;
        },
        changeNote(item) {
            this.subpanel = false;
            this.detalleTask = item;
            this.model.nota = item.nota;
            this.model.observar = item.observar;
            if (item.tarea == '') {
                this.subpanel = true
            }
        },
        openCont: function () {
            this.clickme = !this.clickme
        },
        _regresar() {
            this.isSelecTask = [];
            this.detalleTask = {}
            this.model.nota = '';
            this.model.observar = '';
            this.subpanel = false;
            this.clickme = false;
        },
        save() {
            this.$validate().then((success) => {
                if (!success) {
                    this.toast('Por favor llena correctamente los campos solicitados')
                    return;
                }
                if (this.$route.params.id) {
                    if (this.detalleTask.idTask && this.detalleTask.nota == '' && this.detalleTask.tarea == '') {
                        this.optionUpdate()
                    } else {
                        this.ifLoad = true;
                        let keys = this.$route.params.id + ',' + this.collects._id + ',' + this.detalleTask.idTask;
                        this.$proxies._aulaProxi
                            .calificarTask(keys, this.model)
                            .then(() => {
                                this.ifLoad = false;
                                this.toast('Tarea calificada exitosamente');
                                for (let i = 0; i < this.dataUser.length; i++) {
                                    if (this.dataUser[i].id == this.detalleTask.id) {
                                        this.dataUser[i].nota = this.model.nota
                                        this.dataUser[i].observar = this.model.observar
                                    }
                                }
                                this._regresar();
                            })
                            .catch(() => {
                                this.ifLoad = false;
                                this.toast('Error actualizar antes de calificar 2 veces al mismo estudante');
                                this._regresar();
                            });
                    }
                }
            });
        },
        optionUpdate() {
            let message = {
                title: "Tarea sin entrega",
                body: "¿Esta seguro que quiere calificar sin entrega?",
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
                    this.model2.nota = this.model.nota;
                    this.model2.idUser = this.detalleTask.id;
                    this.model2.observar = this.model.observar;
                    this.$proxies._aulaProxi
                        .sendTask(this.collects._id, this.model2) //-----------EDITAR CON AXIOS
                        .then(() => {
                            this.ifLoad = false;
                            this.toast('Tarea calificada exitosamente');
                            for (let i = 0; i < this.dataUser.length; i++) {
                                if (this.dataUser[i].id == this.detalleTask.id) {
                                    this.dataUser[i].nota = this.model.nota
                                    this.dataUser[i].observar = this.model.observar
                                }
                            }
                            this.model2.nota = ''
                            this.model2.idUser = ''
                            this._regresar();
                        })
                        .catch((err) => {
                            console.log("Error", err);
                            this.ifLoad = false;
                        });
        },
        getData() {
            this.$emit('getData');
            this.$emit('myEventTask')
        },
        toast(message) {
            this.$toasted.info(message, {
                duration: 1300,
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
    created() {
        this.vueInit()
    },
    validators: {
        'model.nota'(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },

    },
}
</script>
<style >
.panel1 {
    border-right: 1px solid rgb(203, 214, 226);
    height: calc(85vh - 2rem);
    overflow-y: auto;
}

.s-iems {
    background: #ecf0f3;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 5px;
}

.s-text-items {
    color: #1192ee;
    cursor: pointer;
}
</style>
