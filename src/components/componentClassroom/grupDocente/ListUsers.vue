<template>
    <div>
        <ActionRowDocente :allSelecteds="allSelected" :longitude="isSelecUsers.length" @changeSearch="changeSearchs"
            @getDataAlls="getDataAll" @deletedSelected="deletedSelect" @remove="remove" @selectAll="selectAlls" />
        <NoFound v-if="displayedArticles.length == 0" />
        <section  class="row" v-else>
            <div v-for="(item, index) in displayedArticles" :key="item.id" class="liTask  col-sm-6">
                <div class="d-flex cajasTask fadeIn1 animate__animated animate__fadeInUp "
                    :class="[`animations-${index}`]">
                    <div class="d-flex py-1">
                        <div class="form-check my-auto">
                            <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers"
                                :value="item._id" @click="selectOne(item._id)" />
                        </div>
                        <div class="d-flex flex-column justify-content-center ms-3">
                            <h6 class="mb-0 text-sm negros">
                                {{ item.name }}
                            </h6>
                            <div class="text-sm colorestabla fuente">
                                <div>
                                    <span style="background-color: rgb(0, 189, 165);"
                                        class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                    Usuario activo
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dropstart ms-auto">
                        <div class="d-flex  mt-2">
                            {{ item.name.slice(0, 2).toUpperCase() }}
                        </div>
                    </div>
                </div>
            </div>
            <Paginate :numPages="numPages" :page="page" :total="objectUser.length" @pagechanged="onPageChange">
            </Paginate>
        </section>
    </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
import ActionRowDocente from "../../../shared/ActionRowDocente.vue";
import Paginate from "../../../shared/Paginate"
export default {
    name: 'ListUsers',
    props: {
        objectUser: Array,
    },
    components: { NoFound, ActionRowDocente, Paginate },
    data() {
        return {
            colors: ["#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3"],
            isSelecUsers: [],
            allSelected: false,
            searchQuery: '',
            page: 1,
            perPage: 10,
            pages: [],
            numPages: 0,
        }
    },
    computed: {
        displayedArticles: function () {
            if (this.searchQuery.length > 1) {
                return this.objectUser.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.name.toLowerCase().includes(v));
                });
            } else {
                return this.paginate(this.objectUser);
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
        getDataAll() {
            this.$emit('getDataTask');
        },
        changeSearchs(value) {
            this.searchQuery = value;
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
                for (let user in this.objectUser) {
                    this.isSelecUsers.push(this.objectUser[user]._id);
                }
            }
        },
        deletedSelect: function () {
            this.allSelected = false;
            this.isSelecUsers = [];
        },
        ejecuta_eliminar() {
            let longitud = this.isSelecUsers.length;//removeUsers
            if (longitud > 0) {
                this.$proxies._aulaProxi
                    .removeUsers(this.$route.params.id, this.isSelecUsers) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
                    .then(() => {
                        this.isSelecUsers = [];
                        this.getDataAll();
                        this.toast('Usuarios eliminados exitosamente')
                    })
                    .catch((x) => {
                        alert("Error server not found", x.response);
                    });
            }
        },
        remove() {
            let message = {
                title: "Eliminar",
                body: "¿Esta seguro que quiere remover estudiantes de este curso?",
            };
            let options = {
                okText: "Continuar",
                cancelText: "Cancelar",
                animation: "bounce",
            };
            this.$dialog
                .confirm(message, options)
                .then(() => {
                    this.ejecuta_eliminar();
                })
                .catch(function () {

                });
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
    }
}
</script>

