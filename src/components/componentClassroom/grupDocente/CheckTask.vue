<template>
    <ScrimModal @close="close">
        <template v-slot:header> {{ collects.nombre }}</template>
        <template v-slot:body>
            <div class="row">
                <div v-if="panel == '1'" class="col-lg-10 col-12 mx-auto">
                    <ActionsCheck @_taskload="_taskload" :estado="collects.estado" @changeSearch="changeSearchs"
                        @openModal="getData" />
                    <NoFound v-if="!displayedArticles.length" />

                    <div v-else class="table-responsive mt-3">
                        <table class="dataTable-table table s-table-flush">
                            <thead class="thead-light">
                                <tr class="cabeza">
                                    <th style="background-color: rgb(234, 240, 246); "
                                        class="text-uppercase text-center text-xxs font-weight-bolder">
                                        Estudiante
                                    </th>
                                    <th class="text-uppercase text-center text-xxs font-weight-bolder">
                                        Estado tarea
                                    </th>
                                    <th class="text-uppercase text-center text-xxs font-weight-bolder">
                                        Estado nota
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in displayedArticles" :key="item.id"
                                    :class="{ 's-ifactive': isSelecTask.includes(item.id) }">
                                    <td>
                                        <div class="d-flex ms-3">
                                            <div class="form-check my-auto">
                                                <input class="form-check-input cheka" type="checkbox"
                                                    @click="selectOne(item.id)" />
                                            </div>

                                            <span class="mb-0 ms-3 text-sm colorestabla fuente">
                                                <i class="fa fa-user me-2" style="color: rgb(124, 152, 182);"
                                                    aria-hidden="true"></i>
                                                {{ item.nombre }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div v-if="item.tarea === ''" class="fuente  text-sm">
                                            <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>Sin enviar
                                        </div>
                                        <div v-else class="fuente  text-sm">
                                            <span style="background-color: rgb(0, 189, 165);"
                                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                            Enviado
                                        </div>
                                    </td>
                                    <td class="text-sm text-center colorestabla fuente">
                                        <div v-if="item.nota">
                                            <span style="background-color: rgb(0, 189, 165);"
                                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                            {{ item.nota }}
                                        </div>
                                        <div v-else>
                                            <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                            Sin calificación
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Paginate :numPages="numPages" :page="page" :total="dataUser.length"
                            @pagechanged="onPageChange">
                        </Paginate>
                    </div>
                </div>
                <div v-if="panel == '2'" class="col-lg-9 col-12 mx-auto">
                    <div>
                        <a href="javascript:;" @click="_regresar()" class="s-regresar me-2 ms-2 mb-3">
                            <svg data-testid="geist-icon" fill="none" height="15" shape-rendering="geometricPrecision"
                                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                viewBox="0 0 24 24" width="15" style="color: black;">
                                <path d="M19 12H5"></path>
                                <path d="M12 19l-7-7 7-7"></path>
                            </svg>
                            Atrás
                        </a>
                    </div>
                    <div class="p-3 ">
                        <div style="padding: 30px 60px; border: 2px dashed rgb(166, 182, 198);color: rgb(51, 71, 91);">
                            <p class="parrafo">
                                Estudiante: <b class="ms-4">{{ detalleTask[0].nombre }}</b>
                            </p>
                            <div v-if="subpanel">
                                <div class="text-center ">
                                    <img class="w-20 mt-2" src="../../../assets/img/logs/descanso.svg" alt="fondo" />
                                    <div class="letra fuente mt-2">
                                        Tarea sin entregar
                                    </div>
                                </div>
                            </div>
                            <p v-else class="parrafo">
                                Link trabajo:
                                <a :href="detalleTask[0].tarea" target="_blank" class="ms-2 btn btn-sm btn-vercel">
                                    <span>Click para revisar el trabajo</span>
                                </a>
                            </p>

                            <form @submit.prevent="save" role="form" id="notas" class="w-50 text-start">
                                <span class="parrafo ">Ingrese la calificación</span>

                                <CustomInput v-model="model.nota" />
                                <p class="mb-0 text-xs fuente text-danger">
                                    {{ validation.firstError("model.nota") }}
                                </p>
                                <span class="parrafo">Observaciones (Opcional)</span>

                                <div class="input-group mb-3 ">
                                    <textarea style="height: 87px;" type="text"
                                        :class="{ error: validation.hasError('model.observar') }"
                                        v-model="model.observar" class="form-control buscador"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div v-if="panel == '1'">
                <a @click="$emit('myEventTask')" style="text-decoration: underline;" href="javascript:;"
                    class="fuente tamanio">
                    <b>Cancelar</b>
                </a>
                <a v-if="isSelecTask.length == 1" type="submit" id="addRowButton" class="btn btnNaranja ms-4"
                    @click="nextO">
                    Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                </a>
                <a v-else type="submit" class="btn btnDisabled ms-4">
                    Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                </a>
            </div>
            <div v-if="panel == '2'">

                <a @click="_regresar" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio"
                    to="/aulas-lista">
                    <b>Regresar</b>
                </a>
                <a v-if="!model.nota" type="submit" class="btn btnDisabled ms-4">
                    Guardar
                </a>
                <button v-else type="submit" id="addRowButton" class="btn btnNaranja ms-4" form="notas">
                    Guardar
                </button>
            </div>
        </template>
    </ScrimModal>
</template>

<script>
import ScrimModal from "../../../shared/ScrimModal"
import CustomInput from "../../../shared/CustomInput.vue";
import ActionsCheck from "../../../shared/ActionsCheck.vue";
import Paginate from "../../../shared/Paginate"
import NoFound from "../../../shared/NoFound"
export default {
    name: "CheckTask",
    props: {
        collects: Object,
        objectUser: Array
    },
    components: {
        ScrimModal, CustomInput, ActionsCheck, Paginate, NoFound
    },
    data() {
        return {
            dataUser: [],
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
                nota: '',
                observar: ''
            },
            panel: '1',
            subpanel: false,
            user: this.$store.state.user,
            ifLoad: false,
            isView: false,
            isSelecTask: [],
            detalleTask: [],
            //Pagina 
            page: 1,
            perPage: 7,
            pages: [],
            numPages: 0,
            searchQuery: '',
            model2: {
                _id: null,
                task: {
                    _id: null,
                    entrega: {
                        idUser: '',
                        nota: '',
                        link: "",
                    },
                },
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
                for (let i = 0; i < this.objectUser.length; i++) {
                    id = this.objectUser[i].usuario;
                    idTask = '0';
                    nombre = this.objectUser[i].name;
                    tarea = '';
                    nota = '';
                    for (let j = 0; j < this.collects.entrega.length; j++) {
                        if (this.collects.entrega[j].idUser == id) {
                            idTask = this.collects.entrega[j]._id
                            tarea = this.collects.entrega[j].link;
                            nota = this.collects.entrega[j].nota;
                            break;
                        }
                    }
                    this.dataUser.push({ id: id, tarea: tarea, idTask: idTask, nombre: nombre, nota: nota })
                }
            }
        },
        selectOne(ids) {
            if (!this.isSelecTask.includes(ids)) {
                this.isSelecTask.push(ids);
            } else {
                this.isSelecTask.splice(this.isSelecTask.indexOf(ids), 1);
            }
        },
        changeSearchs(value) {
            this.searchQuery = value;
        },
        nextO() {
            let longitud = this.isSelecTask.length;
            if (longitud == 1) {
                this.detalleTask = this.dataUser.filter(x => x.id == this.isSelecTask[0]);
                this.model.nota = this.detalleTask[0].nota;
                this.panel = '2';
                if (this.detalleTask[0].tarea == '') {
                    this.subpanel = true
                }
            }
        },
        _regresar() {
            this.isSelecTask = [];
            this.detalleTask = []
            this.panel = '1';
            this.model.nota = '';
            this.model.observar = '';
            this.subpanel = false;
        },
        save() {
            this.$validate().then((success) => {
                if (!success) {
                    this.toast('Por favor llena correctamente los campos solicitados')
                    return;
                }
                if (this.$route.params.id) {
                    if (this.detalleTask[0].idTask&& this.detalleTask[0].nota==''&& this.detalleTask[0].tarea=='') {
                        this.optionUpdate()
                    } else {
                        this.ifLoad = true;
                        let keys = this.$route.params.id + ',' + this.collects._id + ',' + this.detalleTask[0].idTask;
                        this.$proxies._aulaProxi
                            .calificarTask(keys, this.model)
                            .then(() => {
                                this.ifLoad = false;
                                this.toast('Tarea calificada exitosamente');
                                for (let i = 0; i < this.dataUser.length; i++) {
                                    if (this.dataUser[i].id == this.detalleTask[0].id) {
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
            this.model2.task.entrega.nota = this.model.nota;
            this.model2.task.entrega.idUser = this.detalleTask[0].id;
            this.$proxies._aulaProxi
                .sendTask(this.collects._id, this.model2) //-----------EDITAR CON AXIOS
                .then(() => {
                    this.ifLoad = false;
                    this.toast('Tarea calificada exitosamente');
                    for (let i = 0; i < this.dataUser.length; i++) {
                        if (this.dataUser[i].id == this.detalleTask[0].id) {
                            this.dataUser[i].nota = this.model.nota
                        }
                    }
                    this.model2.task.entrega.nota = ''
                    this.model2.task.entrega.idUser = ''
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
        _taskload() {
            let keys = this.$route.params.id + ',' + this.collects._id;
            if (keys) {
                this.isView = true;
                this.$proxies._aulaProxi
                    .reviewTasks(keys, '1') //-----------EDITAR CON AXIOS
                    .then(() => {
                        this.isView = false;
                        this.toast('Esta tarea esta marcada como revisada')
                    })
                    .catch(() => {
                        this.toast('Error en el servidor por favor notificar le problema')

                        this.isView = false;
                    });
            }
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
