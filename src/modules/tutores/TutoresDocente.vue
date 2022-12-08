<template>
    <div>
        <Spinner v-if="isLoading1"></Spinner>
        <div v-else>
            <Dropdown v-model="curso" :options="listniveles" />
            <Astronauta v-if="isPrint" />
            <Emergente @closeEmergente="(ifEmergente=false)" v-if="ifEmergente" />
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
                                    style="background: white;" placeholder="Buscar por nombre">
                            </div>
                        </div>
                        <div class="col-lg-8 text-start">
                            <button :disabled="!isSelecMatricula.length" @click="activar" class="btn btnNaranja2"> 
                                Libretas </button>
                                <button :disabled="!isSelecMatricula.length" @click="openJuntas()" class="btn btnNaranja2 ms-2">
                  Juntas de curso </button>
                          <button :disabled="!isSelecMatricula.length" @click="openParcial()" class="btn btnNaranja2 ms-2"> 
                            Consolidado parcial </button>   
                            <button :disabled="!isSelecMatricula.length" @click="notas_pdf()" class="btn btnNaranja2 ms-2"> Consolidado anual </button>
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
                                            <svg @click="deletedSelected" style="cursor: pointer;color: #8b3dff;" v-else  data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" ><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>
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
                                    <td class="text-xs text-center negros gordo ">
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
        <section v-if="ifParcial" style="display: none">
          <Parcial :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
            :numQuimestre="numQuimestre" :parcial="parcial3"  />
        </section>
        <section v-if="ifConsolidado" style="display: none">
            <ConsolidadoNotas :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
              :numQuimestre="numQuimestre"  />
          </section>
          <section v-if="ifjuntas" style="display: none">
          <JuntasCurso :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
            :numQuimestre="numQuimestre" :parcial="parcial10" :parcial2="parcial11" />
        </section>
        <div v-if="ifyoutuve">
            <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'pf_3Ip_leRY'" />
        </div>
        <div class="fixed-plugin" v-if="!$store.state.isAppMobile">
            <a @click="ifyoutuve = true"
                class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white"
                style="background-color: #8b3dff; border-radius: 20px 20px 2px 20px; box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
                Ver video explicativo
            </a>
        </div>
            <section v-if="isActive">
                <Modal @close="closeModal">
                    <template v-slot:header> LIBRETAS ESCOLARES</template>
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
                                        <div class="form-check ">
                                            <input class="form-check-input cheka" type="checkbox" value="1"
                                                v-model="parcial" />
                                                <label class="form-check-label  parrafo negros"> &nbsp; Primer parcial</label>
                                        </div> 
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check ">
                                            <input class="form-check-input cheka" type="checkbox" value="2"
                                                v-model="parcial2" />
                                                <label class="form-check-label parrafo negros">&nbsp; Segundo parcial</label>
                                        </div>
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
            <section v-if="isActive2">
          <Modal @close="closeModal2">
            <template v-slot:header> CONSOLIDADO PARCIAL</template>
            <template v-slot:body>
              <div>
                <p class="h6 fuente negros" style="font-weight:400;">
                  Seleccionar uno de los dos quimestres
                </p>
                <div>
                  <section>
                    <div class="">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" 
                          :value="0" />
                        <span class="parrafo"> Primer quimestre</span>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" 
                          :value="1" />
                        <span class="parrafo"> Segundo quimestre</span>
                      </div>
                    </div>
                  </section>
                  <section class="mt-3 ">
                    <p class="h6 fuente negros" style="font-weight:400;">
                      Seleccionar un parciales para generar el reporte
                    </p>
                    <div class="">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial3" type="radio" name="ite.id" :id="3"
                          :value="3" />
                        <span class="parrafo"> PARCIAL 1</span>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial3" type="radio" name="ite.id" :id="4"
                          :value="4" />
                        <span class="parrafo"> PARCIAL 2</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </template>
            <template v-slot:acccion>
              <button @click="paralelo_pdf" type="submit" class="btn btnNaranja mt-2">
                Generar Reporte
              </button>
            </template>
          </Modal>
        </section>
        <section v-if="isActive3">
          <Modal @close="closeModal3">
            <template v-slot:header> Juntas de cursos</template>
            <template v-slot:body>
              <div>
                <p class="h6 fuente negros" style="font-weight:400;">
                  Seleccionar uno de los dos quimestres
                </p>
                <div>
                  <section>
                    <div class="">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" name="ite.id" :id="0"
                          :value="0" />
                        <span class="parrafo"> Primer quimestre</span>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" name="ite.id" :id="1"
                          :value="1" />
                        <span class="parrafo"> Segundo quimestre</span>
                      </div>
                    </div>
                  </section>
                  <section class="mt-3 ">
                    <p class="h6 fuente negros" style="font-weight:400;">
                      Seleccionar uno o varios parciales para generar el reporte
                    </p>
                    <div>
                      <div class="form-check ">
                        <input class="form-check-input cheka" type="checkbox" value="10" v-model="parcial10" />
                        <label class="form-check-label  parrafo negros"> &nbsp; Primer parcial</label>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check ">
                        <input class="form-check-input cheka" type="checkbox" value="11" v-model="parcial11" />
                        <label class="form-check-label parrafo negros">&nbsp; Segundo parcial</label>
                      </div>
                    </div>

                  </section>
                </div>
              </div>
            </template>
            <template v-slot:acccion>
              <button @click="juntas_pdf" type="submit" class="btn btnNaranja mt-2">
                Generar Reporte
              </button>
            </template>
          </Modal>
        </section>
        </div>
    </div>
</template>
  
<script>
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
import Spinner from "../../shared/Spinner.vue";
import Dropdown from "../../shared/Dropdown.vue";
import NoFound from "../../shared/NoFound"
import Paginate from "../../shared/Paginate.vue";
import Astronauta from "../../shared/Astronauta"
import Emergente from "../../shared/Emergente.vue"
import Modal from "../../shared/Modal"
export default {
    name: 'Report',
    components: {
        Spinner,  NoFound, Paginate, Astronauta, Modal,Emergente,Dropdown,
        Quimestral: () => import( /* webpackChunkName: "FormatoLibretas" */ "../../views/reporte/pages/notas/FormatoLibretas.vue"),
        Parcial: () => import( /* webpackChunkName: "Parcial" */ "./pages/Parcial.vue"),
        ConsolidadoNotas: () => import( /* webpackChunkName: "ConsolidadoNotas" */ "../../views/reporte/pages/notas/ConsolidadoNotas.vue"),
        VueYoutuve: () => import( /* webpackChunkName: "VueYoutuve" */ "../../shared/VueYoutuve.vue"),
        JuntasCurso: () => import( /* webpackChunkName: "JuntasCurso" */ "../../views/reporte/pages/notas/JuntasCurso.vue"),
    },
    data() {
        return {
            user: this.$store.state.user,
            roles: this.$store.state.user.roles,
            listniveles: [],
            isLoading1: false,
            isTabla: false,
            infoMat: {},
            curso: "",
            rowData: [],
            iflibretas: false,
            isPrint: false,
            ifParcial : false,
            searchQuery: '',
            ifEmergente : false,
            page: 1,
            perPage: 8,
            pages: [],
            numPages: 0,
            totalNotas: 0,
            nextCourse: '',
            isSelecMatricula: [],
            allSelected: false,
            isActive: false,
            isActive2: false,
            isActive3: false,
            numQuimestre: 0,
            settings: {},
            checked: 0,
            parcial: false,
            parcial2: false,
            ifyoutuve: false,
            parcial3: 3,
            ifConsolidado : false,
            ifjuntas: false,
           parcial10 : false,
           parcial11 : false, 
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
                        .every((v) => item.nombre.toLowerCase().includes(v));
                });
            } else {
                return this.paginate(this.infoMat);
            }

        }
    },
    methods: {
        ClosedYoutuve: function () {
            this.ifyoutuve = false;
        },
        activar() {
            this.isActive = true;
        },
        openParcial(){
      this.isActive2 = true;
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
            if (restResourceService.docente(this.roles) || restResourceService.Inspector(this.roles)|| restResourceService.admin(this.roles)) {
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
            } else {
                this.$router.push("/page-not-found");
            }
          
        },
        changeStatus(ev) {
            if (ev == '100') {
                this.isPrint = false;
                this.iflibretas = false;
                this.ifConsolidado = false;
                this.ifParcial = false;
                this.ifjuntas = false;
            }
            if (ev=='500'){
                this.isPrint = false;
                this.iflibretas = false;
                this.ifParcial = false;
                this.ifConsolidado = false;
                this.ifjuntas = false;
                this.ifEmergente = true;
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
                            this.listniveles.push({_id: element._id, nombre: element.nombre + '--' + paralelo, paralelo: paralelo})
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
                    const filtro = datas.filter((x) => x.curso == para)
                    this.infoMat =   filtro.sort(function (a, b) {
            var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
            if (nameA < nameB) 
              return -1;
            if (nameA > nameB)
              return 1;
            return 0; 
          });
                    this.isTabla = false;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.isTabla = false;
                    this.isLoading1 = false;
                });
        },
        close() {
            this.$emit('myEventClosedModalReporte');
        },
        closeModal() {
            this.isActive = false;
        },
        closeModal3: function() {
      this.isActive3 = false;
    },
        closeModal2() {
            this.isActive2 = false;
        },
        openJuntas: function() {
      this.isActive3 = true;
    },
        notas_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
          this.isPrint = true;
          this.ifConsolidado = true;
          this.rowData = this.isSelecMatricula
      }else {
        this.$dialog.alert("Selecione un estudiante por lo menos");
      }
    },
    juntas_pdf (){
      if (this.isSelecMatricula.length > 0) {
        if (this.parcial10 != '' || this.parcial11 != '') {
          this.numQuimestre = this.checked;
          this.closeModal3();
          this.isPrint = true;
          this.ifjuntas = true
          this.rowData = this.isSelecMatricula
        } else {
          this.$dialog.alert("Seleccionar un parcial");
        }
      } else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
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
        paralelo_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
        if (this.parcial3 !='') {
          this.numQuimestre = this.checked;
          this.closeModal2();
          this.isPrint = true;
          this.ifParcial = true;
          this.rowData = this.isSelecMatricula
        }else {
          this.$dialog.alert("Seleccionar un parcial");
        }
      }else {
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
  
    
  