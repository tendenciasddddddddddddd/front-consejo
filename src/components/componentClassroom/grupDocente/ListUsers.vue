<template>
    <div>
        <ActionsTrask :isRoles="1" :isbtn="1" :allSelecteds="allSelected" :longitude="isSelecUsers.length"
            @changeSearch="changeSearchs" @getDataAlls="getDataAll" @deletedSelected="deletedSelect" @remove="remove"
            @selectAll="selectAlls" />
        <NoFound v-if="displayedArticles.length == 0" />
        <section v-else class="flex-containes2 ">
            <div v-for="(item, index) in displayedArticles" :key="item.id" class="text-center">
                <br />
                <div class="targetas1 cajas "
                    style="min-width:170px; width: 170px!important;margin-top: 0px!important;">
                    <div class="form-check my-auto">
                        <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                            style="float: right; right: 10px; top: 10px;" @click="selectOne(item._id)" />
                    </div>
                    <div class="avatar avatar-lg position-relative mt-2"
                        v-bind:style="{ 'background-color': colors[index] }" style="border-radius: 100%;">
                        <span class="text-white h4" style="font-weight: 600;">
                            {{ item.name.slice(0, 2).toUpperCase() }}
                        </span>
                    </div>
                    <p class="text-xs fuente mt-3">
                        {{ item.name }}
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ActionsTrask from "../../../shared/ActionsTrask.vue";
import NoFound from "../../../shared/NoFound"
export default {
    name: 'ListUsers',
    props: {
        objectUser: Array,
    },
    components: { ActionsTrask, NoFound },
    data() {
        return {
            colors: ["#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3"],
            isSelecUsers: [],
            allSelected: false,
            searchQuery: '',
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
                return this.objectUser;
            }
        }
    },
    methods: {
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

