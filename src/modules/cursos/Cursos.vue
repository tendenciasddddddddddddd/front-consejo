<template>
    <div>
        <vue-progress-bar style="margin-top:-23px"></vue-progress-bar>
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else>
            <ActionRowHeader :FirstText="'Gestión'" :LastText="' Aulas virtuales'" :numPages="numPages" :page="page"
                :IfAdd="0" @pagechanged="onPageChange" @changeSearch="changeSearch"></ActionRowHeader>
            <section class="projects_projects__f_nDO mt-3" v-if="displayedArticles.length">
                <div v-for="(item, index) in displayedArticles" :key="item.id"
                    class="styles_projectCardWrapper__zSMNk s-mopa animate__animated animate__fadeInUp"
                    :class="[`animations-${index}`]">
                    <Cards :object="{
                        id: item._id,
                        text1: item.fmateria.nombre,
                        text2: 'Curso activo',
                        text3: item.fnivel.nombre,
                        text4: 'PARALELO: ' + item.paralelo,
                        color: colorsh[index]
                    }" @openModules="openModules" />
                </div>
            </section>
            <section v-else>
                <NoFound />
            </section>
        </div>
    </div>
</template>
<script >
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../shared/ProgressBar"; //
import ActionRowHeader from "../../shared/ActionRowHeader"
import NoFound from "../../shared/NoFound"
import Cards from "../../shared/Cards"
const arrayColors = [
    "#0f71ae",
    "#1466c9",
    "#303d9d",
    "#53ab79",
    "#ba4d8e",
    "#1976d3",
    "#874197",
    "#00b6d3",
];
export default {
    components: {
        ProgressBar, ActionRowHeader, NoFound, Cards,
    },
    data() {
        return {
            user: this.$store.state.user,
            roles: this.$store.state.user.roles,
            info: {},
            isData: false,
            isSelecTask: [],
            searchQuery: '',
            key: '0',
            //Pagina
            page: 1,
            perPage: 8,
            pages: [],
            numPages: 0,
            //CHILD
            ifChildGroup: false,
            ifChildNew: false,
            colorsh: []
        };
    },
    computed: {
        displayedArticles: function () {
            if (this.searchQuery.length > 1) {
                return this.info.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.fmateria.nombre.toLowerCase().includes(v));
                });
            } else {
                return this.paginate(this.info);
            }
        },
    },
    methods: {
        paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = page * perPage - perPage;
            let to = page * perPage;
            this.numPages = Math.ceil(articles.length / 8);
            this.isSelecUsers = [];
            this.arrayShorthand();
            return articles.slice(from, to);
        },
        onPageChange: function (page) {
            this.page = page;
        },
        changeSearch: function (spech) {
            this.searchQuery = spech
        },
        arrayShorthand: function () {
            this.colorsh = arrayColors.sort(function () {
                return Math.random() - 0.5;
            });
        },
        openModules(id) {
            for (let i = 0; i < this.info.length; i++) {
                const res = this.info[i];
                if (res._id == id.id) {
                    var myCourse = {
                        paralelo: res.paralelo,
                        nombre: res.nombre,
                        materia: res.fmateria.nombre,
                        idDistributivo : res._id,
                        planificacion : res.planificacion,
                        nivel : res.fnivel.nombre
                    };
                    let id = res.fnivel._id;
                    localStorage.removeItem("myCourse");
                    if (!localStorage.getItem("myCourse")) {
                        localStorage.setItem("myCourse", JSON.stringify(myCourse));
                        this.$router.push({ path: `/menuCurso/${id}` });
                    }
                    break;
                }

            }
        },
        getData() {
            this.isData = true;
            this.$Progress.start();
            if (this.user.id) {
                this.$proxies._gestionProxi
                    .updateInfoDocentes(this.user.id)
                    .then((x) => {
                        this.info = x.data;
                        console.log(this.info);
                        this.isData = false;
                        this.$Progress.finish();
                    })
                    .catch((err) => {
                        console.log("Error", err);
                        this.isData = false;
                        this.$Progress.fail();
                    });
            }
        },

        refresh: function () {
            this.ifChildNew = false;
            this.getData();
        },
        verificarUsuario() {
            let text_1 = 'Gestión'
            let text_2 = 'Cursos'
            this.$store.commit('updateHeader', { text_1, text_2 })
            if (!restResourceService.docente(this.roles)) {
                this.$router.push("/");
            }
        },
    },
    created() {
        this.verificarUsuario();
        this.getData();
    },
};

</script>