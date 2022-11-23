<template>
    <div>
        <Spinner v-if="isLoading1"></Spinner>
        <div v-else>
            <Dropdown v-model="curso" :options="listniveles" />
            <Astronauta v-if="isPrint" />
            <Spinner v-if="isTabla"></Spinner>
            <section v-else>
                <div v-if="infoMat.length" class="mt-3 ">
                    <div class="row mb-2">
                        <div class="col-lg-4">
                            <div class="input-group" style="margin-bottom: 7px;">
                                <span class="input-group-text text-body buscador busca">
                                    <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22"
                                        height="22" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                                        </path>
                                    </svg>
                                </span>
                                <input class="form-control buscador buscaa" type="text" v-model="searchQuery"
                                    style="background: white;" placeholder="Buscar por paralelo">
                            </div>
                        </div>
                        <div class="col-lg-8 text-start">
                            <div class="btn-group dropup">
                                <a class="tamanio  me-3" role="button" @click="activar">
                                    <svg class="me-1" data-testid="geist-icon" fill="none" height="18"
                                        shape-rendering="geometricPrecision" stroke="currentColor"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                                        <path d="M14 2v6h6"></path>
                                        <path d="M16 13H8"></path>
                                        <path d="M16 17H8"></path>
                                        <path d="M10 9H8"></path>
                                    </svg>
                                    <b class="gordo links2">Generar libretas</b>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive ">
                        <table class="dataTable-table table s-table-flush">
                            <thead class="thead-light">
                                <tr class="cabeza">
                                    <th style="background-color: rgb(234, 240, 246); ">
                                        <div class="d-flex ms-3">
                                            <div v-if="!allSelected" class="form-check my-auto"
                                                style="min-height: 0rem;">
                                                <input class="form-check-input cheka" type="checkbox"
                                                    @click="selectAll" />
                                            </div>
                                            <i @click="deletedSelected" v-else class="fa fa-minus s-icon-all"
                                                aria-hidden="true"></i>
                                            <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                                                Nombres
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                        Paralelo
                                    </th>
                                    <th
                                        class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                        Fecha
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in displayedArticles" :key="item.id"
                                    :class="{ 's-ifactive': isSelecMatricula.includes(item._id) }">
                                    <td>
                                        <div class="d-flex ms-3">
                                            <div class="form-check my-auto supcheka">
                                                <input class="form-check-input cheka" type="checkbox"
                                                    v-model="isSelecMatricula" :value="item._id"
                                                    @click="selectcursos(item._id)" />
                                            </div>
                                            &nbsp;&nbsp;
                                            <span class="mb-0 mt-1 text-xs negros fuente">
                                                {{ item.nombre }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="text-xs text-center text-dark fuente">
                                        {{ item.curso }}
                                    </td>
                                    <td class="text-xs text-center text-dark fuente">
                                        {{ item.fecha }}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <Paginate :numPages="numPages" :page="page" :total="infoMat.length" @pagechanged="onPageChange">
                        </Paginate>
                    </div>
                </div>
                <section v-else>
                    <NoFound />
                </section>
            </section>
            <section v-if="iflibretas" style="display: none">
          <Quimestral :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
            :numQuimestre="numQuimestre" :parcial="parcial" :parcial2="parcial2" />
        </section>
            <section v-if="isActive">
                <Modal @close="closeModal">
                    <template v-slot:header> Libretas escolares</template>
                    <template v-slot:body>
                        <div>
                            <p class="h6 fuente negros" style="font-weight:400;">
                                Seleccionar uno de los dos quimestres
                            </p>
                            <div>
                                <section>
                                    <div class="">
                                        <div class="form-check mb-1">
                                            <input class="form-check-input" v-model="checked" type="radio" name="ite.id"
                                                :id="0" :value="0" />
                                            <span class="parrafo"> Primer quimestre</span>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check mb-1">
                                            <input class="form-check-input" v-model="checked" type="radio" name="ite.id"
                                                :id="1" :value="1" />
                                            <span class="parrafo"> Segundo quimestre</span>
                                        </div>
                                    </div>
                                </section>
                                <section class="mt-3 ">
                                    <p class="h6 fuente negros" style="font-weight:400;">
                                        Seleccionar uno o varios parciales para generar el reporte
                                    </p>
                                    <div>
                                        <div class="form-check my-auto supcheka">
                                            <input class="form-check-input cheka" type="checkbox" value="1"
                                                v-model="parcial" />
                                        </div> <span class="ms-4 parrafo negros"> &nbsp; Primer parcial</span>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check my-auto supcheka">
                                            <input class="form-check-input cheka" type="checkbox" value="2"
                                                v-model="parcial2" />
                                        </div><span class="ms-4 parrafo negros">&nbsp; Segundo parcial</span>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </template>
                    <template v-slot:acccion>
                        <button @click="libretas_pdf" type="submit" class="btn btnNaranja mt-2">
                            Generar Reporte
                        </button>
                    </template>
                </Modal>
            </section>
        </div>
    </div>
</template>
  
<script>
import Spinner from "../../shared/Spinner.vue";
import Dropdown from "../../shared/Dropdown.vue";
import NoFound from "../../shared/NoFound"
import Paginate from "../../shared/Paginate.vue";
import Astronauta from "../../shared/Astronauta"
import Modal from "../../shared/Modal"
export default {
    name: 'Report',
    components: {
        Spinner, Dropdown, NoFound, Paginate, Astronauta, Modal,
        Quimestral: () => import( /* webpackChunkName: "FormatoLibretas" */ "./pages/Quimestral.vue"),
    },
    data() {
        return {
            user: this.$store.state.user,
            listniveles: [],
            isLoading1: false,
            isTabla: false,
            infoMat: {},
            curso: "",
            rowData: [],
            iflibretas: false,
            isPrint: false,
            searchQuery: '',
            //Pagina 
            page: 1,
            perPage: 9,
            pages: [],
            numPages: 0,
            totalNotas: 0,
            nextCourse: '',
            isSelecMatricula: [],
            allSelected: false,
            isActive: false,
            numQuimestre: 0,
            settings: {},
            checked: 0,
            parcial: false,
            parcial2: false,
        }
    },
    watch: {
        curso: function (value) {
            if (value) {
                this.isSelecMatricula = [];
               this.__cambios(value._id, value.paralelo );   
            }
           
        }
    },
    computed: {
        displayedArticles: function () {
            if (this.searchQuery.length > 0) {
                return this.infoMat.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.curso.toLowerCase().includes(v));
                });
            } else {
                return this.paginate(this.infoMat);
            }

        }
    },
    methods: {
        activar() {
            this.isActive = true;
        },
        selectcursos(ids) {
            if (!this.isSelecMatricula.includes(ids)) {
                this.isSelecMatricula.push(ids);
            } else {
                this.isSelecMatricula.splice(this.isSelecMatricula.indexOf(ids), 1);
            }
        },
        selectAll: function () {
            this.allSelected = true;
            this.isSelecMatricula = [];
            if (this.allSelected) {
                for (let user in this.infoMat) {
                    this.isSelecMatricula.push(this.infoMat[user]._id);
                }
            }
        },
        deletedSelected: function () {
            this.allSelected = false;
            this.isSelecMatricula = [];
        },
        paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);

            this.numPages = Math.ceil(articles.length / 8);
            return articles.slice(from, to);
        },
        onPageChange: function (page) {
            this.page = page;

        },
        verificarUsuario() {
            let text_1 = 'Tutores';
            let text_2 = 'Libretas'
            this.$store.commit('updateHeader',{text_1, text_2})
            this.$proxies._settingProxi.getConfigure()
                .then((x) => {
                    const { rector,logo, unidadeducativa, ubicacion, direccion, telefono } = x.data[0];
                    this.settings = {
                        rector: rector,
                        unidadeducativa: unidadeducativa,
                        ubicacion: ubicacion,
                        telefono: telefono,
                        direccion: direccion,
                        logo:logo
                    }
                }).catch(() => {
                    console.log("Error")
                });
        },
        changeStatus(ev) {
            if (ev == '100') {
                this.isPrint = false;
                this.iflibretas = true
            }
        },
        __listNivele() {
            this.isLoading1 = true;
            this.$proxies._gestionProxi
                .getTutorDocentes(this.user.id)
                .then((x) => {
                    const result = x.data;
                    if (result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            const element = result[i].fnivel;
                            const paralelo = result[i].paralelo
                            this.listniveles.push({_id: element._id, paralelo: paralelo, nombre: element.nombre + ':: PARALELO (' + paralelo + ')'})
                        }
                    }
                    this.isLoading1 = false;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.isLoading1 = false;
                });
        },

        __cambios(cursos, para) {
            this.infoMat = []
            this.isTabla = true;
            this.$proxies._matriculaProxi
                .getInfoListReport(cursos)
                .then((x) => {
                    const datas = x.data
                    this.infoMat = datas.filter((x) => x.curso == para)
                    this.isTabla = false;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.isTabla = false;
                });
        },
        close() {
            this.$emit('myEventClosedModalReporte');
        },
        closeModal() {
            this.isActive = false;
        },
        libretas_pdf: function () {
            if (this.isSelecMatricula.length > 0) {
                if (this.parcial != '' || this.parcial2 != '') {
                    this.numQuimestre = this.checked;
                    this.iflibretas = true
                    this.closeModal();
                    this.isPrint = true;
                    this.rowData = this.isSelecMatricula
                } else {
                    this.$dialog.alert("Seleccionar un parcial");
                }
            } else {
                this.$dialog.alert("Seleccione un estudiante al menos");
            }
        },
    },
    created() {
        this.verificarUsuario();
        this.__listNivele();
    },
};


</script>
  
    
  