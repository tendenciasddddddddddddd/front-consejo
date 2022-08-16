<template>
    <div>
        <ActionRowDocente :allSelecteds="allSelected" :longitude="isSelecUsers.length" @changeSearch="changeSearchs"
            @getDataAlls="getDataAll" @deletedSelected="deletedSelect" @remove="remove" @gets="editTask"
            @openModal="openModal" @selectAll="selectAlls" />
        <div v-if="displayedArticles.length">
            <table class="dataTable-table table s-table-flush">
                <thead class="thead-light">
                    <tr class="cabeza">
                        <th style="background-color: rgb(234, 240, 246); "
                            class="text-center text-uppercase text-secondary text-xxs ">
                            Nombre
                        </th>
                        <th class="text-center text-uppercase text-secondary text-xxs ">
                            Quim 1
                        </th>
                        <th class="text-center text-uppercase text-secondary text-xxs ">
                            Quim 2
                        </th>
                        <th class="text-center text-uppercase text-secondary text-xxs ">
                            Promedio
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in displayedArticles" :key="item.id" :vars="(aux = 0)">
                        <td>
                            <div class="d-flex ms-3">
                                <div class="form-check my-auto supcheka">
                                    <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers"
                                        :value="item.id" @click="selectOne(item.id)" />
                                </div>

                                <a class="mb-0 ms-3 text-sm colorestabla fuente">
                                    {{ item.name }}
                                </a>
                            </div>
                        </td>
                        <td class="align-middle text-center fuente">
                            <span v-if="item.par1 != 0" class="text-negro text-sm">
                                <b>{{ item.par1 }}</b>
                            </span>
                            <span v-else class="text-sm"> {{ item.par1 }} </span>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <span v-if="item.par2 != 0" class="text-negro text-sm">
                                <b>{{ item.par2 }}</b>
                            </span>
                            <span v-else class="text-sm"> {{ item.par2 }} </span>
                        </td>
                        <td class="align-middle text-center text-sm fuente">
                            <div v-if="
                                item.par1 != 0 && item.par2 != 0 && item.promed == 0
                            ">
                                <a v-if="aux < 2" class="fuente tamanio text-azul">
                                    <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                    Sin confirmar
                                </a>
                            </div>

                            <a v-else class="text-azul" href="javascript:;"> <b>{{ item.promed }}</b> </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Paginate :numPages="numPages" :page="page" :total="object.length" @pagechanged="onPageChange"></Paginate>

        </div>
        <NoFound v-else />
        <div v-if="iftask">
            <AddNota :collects="collectionsEdit" @EventClose="closed" @getData="getDataAll" />
        </div>
        <div v-if="ifChildRevision">
            <ExelNotas :collects="collectionsEdit" @EventClosed="closedChildRewiewTrask" @getData="getDataAll" />
        </div>
    </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
//import TimeEgo from "../../../shared/TimeEgo";
import Paginate from "../../../shared/Paginate"
import ActionRowDocente from "../../../shared/ActionRowDocente.vue";
export default {
    name: 'ListTask',
    props: {
        object: Array,
    },
    components: {
        NoFound, Paginate, ActionRowDocente,
        AddNota: () => import( /* webpackChunkName: "AddNota" */ "./AddNota.vue"),
        ExelNotas: () => import( /* webpackChunkName: "ExelNotas" */ "./ExelNotas.vue"),
    },
    data() {
        return {
            userIds: [],
            iftask: false,
            isSelecUsers: [],
            collectionsEdit: {},
            checkTasks: [],
            checkUser: [],
            allSelected: false,
            searchQuery: '',
            //Pagina 
            page: 1,
            perPage: 7,
            pages: [],
            numPages: 0,
            ifChildRevision: false
        }
    },
    computed: {
        displayedArticles: function () {
            if (this.searchQuery.length > 1) {
                return this.object.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.name.toLowerCase().includes(v));
                });
            } else {
                return this.paginate(this.object);
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
        remove() {
            console.log(this.isSelecUsers.length)
            if (this.isSelecUsers.length ==0) return;
            let message = {
                title: "¿Esta seguro que quiere eliminar?",
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
                    this.dialogDeleteNote();
                    this.numPages = 1;
                    this.page = 1;
                    setTimeout(() => {
                        dialog.close();

                    }, 1200);
                })
                .catch(function () {
                });
        },
        dialogDeleteNote() {
            let longitud = this.isSelecUsers.length;
            let metadata = [];
            if (longitud > 0) {
                for (let i = 0; i < this.isSelecUsers.length; i++) {
                    let oneAlumno = this.object.filter((x) => x.id == this.isSelecUsers[i]);
                    if (oneAlumno[0].promed == 0) {

                        metadata.push({ id: this.isSelecUsers[i], fora: oneAlumno[0].fora })
                    }
                }
            }
            let meta = metadata.length;
            if (meta > 0) {
                this.$proxies._notasProxi
                    .deleteAllNote(this.$route.params.id, metadata) //-----------EDITAR CON AXIOS
                    .then(() => {
                        this.getDataAll();
                        this.isSelecUsers = [];
                        this.toast("Registros destruidos");
                    })
                    .catch(() => {
                        alert("No se puede completar la operación");
                    });
            } else {
                this.toast("No se puede eliminar, ya se encuantra confirmado la nota");
            }
        },
        changeSearchs(value) {
            this.searchQuery = value;
        },
        openModal: function () {
            this.ifChildRevision = true;
            this.collectionsEdit = this.object
        },
        closed: function () {
            this.iftask = false
        },
        openChildRewiewTrask: function (obj) {

            this.checkTasks = {
                descripcion: obj.descripcion,
                entrega: obj.entrega,
                estado: obj.estado,
                nombre: obj.nombre,
                _id: obj._id
            }
            this.ifChildRevision = true;
        },
        closedChildRewiewTrask: function () {
            this.ifChildRevision = false;
        },
        getDataAll() {
            this.$emit('getDataTask');
        },
        selectOne(ids) {
            if (!this.isSelecUsers.includes(ids)) {
                this.isSelecUsers.push(ids);
            } else {
                this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
            }
        },
        selectAlls: function () {
            this.allSelected = true;
            this.isSelecUsers = [];
            if (this.allSelected) {
                for (let user in this.object) {
                    this.isSelecUsers.push(this.object[user].id);
                }
            }
        },
        deletedSelect: function () {
            this.allSelected = false;
            this.isSelecUsers = [];
        },
        editTask() {
            if (this.isSelecUsers.length == 1) {
                for (let index = 0; index < this.object.length; index++) {
                    if (this.object[index].id == this.isSelecUsers[0]) {
                        this.collectionsEdit = this.object[index]
                    }
                }
                console.log("collectionsEdit: ", this.collectionsEdit);
                this.iftask = true; //ABRIR MIDAL
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