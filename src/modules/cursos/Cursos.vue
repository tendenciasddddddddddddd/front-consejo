<template>
    <div>
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else>
            <ActionRowHeader :IfAdd="0" @changeSearch="changeSearch"></ActionRowHeader>
            <section class="projects_projects__f_nDO mt-3" v-if="displayedArticles.length">
                <div v-for="(item, index) in displayedArticles" :key="item.id"
                    class="styles_projectCardWrapper__zSMNk s-mopa animate__animated animate__fadeInUp"
                    :class="[`animations-${index}`]">
                    <a href="javascript:;" @click="openModules(item._id)"
                        class="link_link__LTNaQ styles_projectCard__2QnBU ">
                        <div class="styles_projectCardDetails__vcWBi stack_stack__A16oG">
                            <div class="stack_stack__A16oG">
                                <div class=" d-flex justify-content-start">
                                    <span class="avatar_avatar__OLijw stack_stack__A16oG"
                                        v-bind:style="{ 'background': colorsh[index] }">
                                        <span class="in-avatar text-center">
                                            <b style="font-weight: 400;">{{ item.fmateria ?
                                                    item.fmateria.nombre.slice(0, 2).toUpperCase() : 'NA'
                                            }}</b>
                                        </span>
                                    </span>
                                    <div class="stack_stack__A16oG ms-3">
                                        <span class="cardTitle fuente" style="font-size: 16px;margin-top: -5px;">{{
                                                item.fmateria ?
                                                    item.fmateria.nombre : 'Undefined'
                                        }}</span>
                                        <span class="tag fuente tag-purple">Curso activo</span>
                                    </div>
                                </div>
                                <div>
                                    <p class="cardTitle fuente mt-2" style="font-size: .80rem;"> {{ item.fnivel ?
                                            item.fnivel.nombre : 'Undefined'
                                    }} - {{item.paralelo}}</p>
                                </div>
                                <div>
                                    <span class="text-xs  fuente mt-2" style="color: #516f90 !important;">
                                        {{item.createdAt }}
                                    </span>
                                    <span style="color:black">
                                        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor"
                                            stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                            class="css-i6dzq1">
                                            <circle cx="18" cy="18" r="3"></circle>
                                            <circle cx="6" cy="6" r="3"></circle>
                                            <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                                            <line x1="6" y1="9" x2="6" y2="21"></line>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;" @click="openModules(item._id)" class="styles_visitButton__Nc7Vp ">
                        <span class="s-btn-redondo">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </span>
                    </a>
                </div>

            </section>
            <section v-else>
                <NoFound />
            </section>
            <Paginate v-if="displayedArticles.length" :numPages="numPages" :page="page" :total="info.length"
                @pagechanged="onPageChange"></Paginate>
        </div>
        <div v-if="ifyoutuve">
            <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'775632387'" />
        </div>
        <Modal v-if="!habilitar">
            <template v-slot:header>Módulo de notas</template>
            <template v-slot:body>
                <span class="negros text-sm">El módulo de registro de notas conducta y asistencia se encuantra
                    temporalmente fuera de linea</span>
                <div class="text-center mt-2">
                    <img width="300" src="../../assets/img/notas_espera.svg" alt="">
                </div>
            </template>
            <template v-slot:acccion>
                <button @click="goToBack" class="btn btnNaranja mt-2">
                    Continuar
                </button>
            </template>
        </Modal>
        <div class="fixed-plugin" v-if="!$store.state.isAppMobile">
            <a @click="ifyoutuve = true"
                class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white"
                style="background-color: #8b3dff; border-radius: 20px 20px 2px 20px; box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
                Ver video explicativo
            </a>
        </div> <br> <br>
    </div>
</template>
<script >
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import ProgressBar from "../../shared/ProgressBar"; //
import ActionRowHeader from "../../shared/ActionRowHeader"
import NoFound from "../../shared/NoFound";
import Modal from "../../shared/Modal"
import Paginate from "../../shared/Paginate"
const arrayColors = [
    "#8b3dff",
    "#0f71ae",
    "#1466c9",
    "#303d9d",
    "#53ab79",
    "#ba4d8e",
    "#1976d3",
    "#874197",
    "#00b6d3",
    "#8b3dff",
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
        ProgressBar, ActionRowHeader, NoFound, Paginate, Modal,
        VueYoutuve: () => import( /* webpackChunkName: "VueYoutuve" */ "../../shared/VueYoutuve.vue"),
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
            perPage: 12,
            pages: [],
            numPages: 0,
            //CHILD
            ifChildGroup: false,
            ifChildNew: false,
            colorsh: [],
            ifyoutuve: false,
            habilitar: true,
        };
    },
    computed: {
        displayedArticles: function () {
            if (this.searchQuery.length > 1) {
                return this.info.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.fmateria.nombre.toLowerCase().includes(v)||item.fnivel.nombre.toLowerCase().includes(v));
                });
            } else {
                return this.paginate(this.info);
            }
        },
    },
    methods: {
        ClosedYoutuve: function () {
            this.ifyoutuve = false;
        },
        paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = page * perPage - perPage;
            let to = page * perPage;
            this.numPages = Math.ceil(articles.length / 12);
            this.isSelecUsers = [];
            this.arrayShorthand();
            return articles.slice(from, to);
        },
        goToBack() {
            this.$router.push("/");
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
            const info = JSON.parse(localStorage.getItem("Xf"));

            for (let i = 0; i < this.info.length; i++) {
               
                const res = this.info[i];
                if (res._id == id) {
                    console.log(this.info[i])
                    try {
                        var myCourse = {
                            paralelo: res.paralelo,
                            nombre: res.nombre,
                            materia: res.fmateria.nombre,
                            area: res.fmateria.area,
                            ifComplementarias : res.ifComplementarias,
                            idDistributivo: res._id,
                            planificacion: res.planificacion,
                            nivel: res.fnivel.nombre,
                            nombredoc: info.nombre,
                            num: res.fnivel.num
                        };
                        let id = res.fnivel._id;
                        localStorage.removeItem("myCourse");
                        if (!localStorage.getItem("myCourse")) {
                            localStorage.setItem("myCourse", JSON.stringify(myCourse));
                            if (res.fnivel.num == 1 || res.fnivel.num == 2 || res.fnivel.num == 3) {
                                this.$router.push({ path: `/iniciales/${id}` });
                            } else {
                                this.$router.push({ path: `/menuCurso/${id}` });
                            }
                        }
                        break;
                    } catch (error) {
                        this.$dialog.alert('No se puede mostrar este curso')
                        console.log(error);
                        break;
                    }
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
                        console.log(x.data)
                        this.info = x.data;
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
            let text_1 = 'Cursos'
            let text_2 = 'Carga Horaria'
            this.$store.commit('updateHeader', { text_1, text_2 })
            if (restResourceService.docente(this.roles) || restResourceService.Inspector(this.roles)|| restResourceService.admin(this.roles)) {
                this.InitialSetup();
            } else {
                this.$router.push("/page-not-found");
            }
        },
        InitialSetup() {
            this.$Progress.start();
            this.isData = true;
            this.$proxies._settingProxi.getApertura()
                .then((x) => {
                    const { inicio, fin } = x.data[0];
                    if (this.validateTimes(inicio, fin)) {
                        this.habilitar = true;
                        this.getData();
                    } else {
                        this.habilitar = false;
                    }
                }).catch((er) => {
                    console.log(er)
                    this.isData = false;
                    this.$Progress.finish();
                });
        },
        validateTimes(fechaInicio, fechaFin) {
            let fechaActual = new Date().toISOString();
            if (fechaActual <= fechaFin && fechaActual >= fechaInicio) return true;
            return false;
        },
    },
    created() {
        this.verificarUsuario();
    },
};

</script>