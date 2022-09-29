<template>
    <ScrimModal @close="close">
        <template v-slot:header> {{ collects.nombre }}</template>
        <template v-slot:body>
            <div class="row">
                <div class="col-lg-4  panel1">
                    <ActionsCheck @changeSearch="changeSearchs" />
                    <NoFound2 v-if="!displayedArticles.length" />
                    <section v-else>
                        <div v-for="item in displayedArticles" :key="item.id" class="mt-3">
                            <div class="s-iems mb-2">
                                <div @click="changeNote(item)" style="cursor: pointer;">
                                    <span class="text-xs negros text-media">
                                        <i class="fa fa-user me-2" style="color: rgb(124, 152, 182);" aria-hidden="true"></i>
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
                                            Sin calificación
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Paginate :numPages="numPages" :page="page" :total="dataUser.length" @pagechanged="onPageChange">
                    </Paginate>
                    </section>
                   
                </div>
                <div class="col-lg-8">
                    <NoFound2 v-if="!detalleTask.id" />
                    <section v-else >
                        <div>
                            <div class="row">
                               <div class="col-lg-6">
                                <span class="text-sm negros ">
                                Estudiante: <u class="ms-4 text-media">{{ detalleTask.nombre }}</u>
                            </span>
                               </div>
                               <div class="col-lg-6">
                                <span v-if="subpanel" class="text-sm negros">
                                Link trabajo:
                                <a href="javascript:;" class="ms-2  tamanio ">
                                    <b class="links text-media"> <del>Tarea sin entregar</del> </b>
                                </a>
                            </span> 

                            <span v-else class="text-sm negros">
                                Link trabajo:
                                <a :href="detalleTask.tarea" target="_blank" class="ms-2  tamanio ">
                                    <b class="links text-media">Click para revisar el trabajo</b>
                                </a>
                            </span>
                               </div>
                            </div>
                            
                           

                            <form @submit.prevent="save" role="form" class="mt-3 text-start">
                                <span class="parrafo ">Ingrese la calificación</span>

                                <CustomInput v-model="model.nota" />
                                <p class="mb-2 text-xs fuente text-danger">
                                    {{ validation.firstError("model.nota") }}
                                </p>
                                <span class="parrafo">Observaciones (Opcional)</span>
                                <Editor v-model="model.observar" />
                                <ButtonLoading v-if="ifLoad" />
                                <button v-else role="button" type="submit" class="btn-vercel-white mt-3">Guardar
                                    Nota</button>
                            </form>
                            <p  class="parrafo mt-2">
                                Comentarios:
                                <span v-html="detalleTask.comentario"> </span>

                            </p>
                        </div>
                    </section>

                </div>

            </div>
        </template>
        <template v-slot:footer>
            <a @click="close" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio">
                <b>Regresar</b>
            </a>
            <ButtonLoading v-if="ifLoad" />
            <a v-else type="submit" @click="getData" class="btn btn-vercel ms-4">
                Guardar todo y salir
            </a>
        </template>
    </ScrimModal>
</template>

<script>
import ScrimModal from "../../../shared/ScrimModal"
import CustomInput from "../../../shared/CustomInput.vue";
import ActionsCheck from "../../../shared/ActionsCheck.vue";
import Paginate from "../../../shared/Paginate"
import NoFound2 from "../../../shared/NoFound2"
import ButtonLoading from "../../../shared/ButtonLoading.vue"
import Editor from "../../../shared/Editor.vue";
export default {
    name: "CheckTask",
    props: {
        collects: Object,
        objectUser: Array
    },
    components: {
        ScrimModal, CustomInput, ActionsCheck, Paginate, NoFound2, ButtonLoading, Editor
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
            //Pagina 
            page: 1,
            perPage: 5,
            pages: [],
            numPages: 0,
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
                return this.paginate(this.dataUser);
            }
        }
    },
    methods: {
        paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            this.numPages = Math.ceil(articles.length / this.perPage);
            return articles.slice(from, to);
        },
        onPageChange(page) {
            this.page = page;
        },
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
