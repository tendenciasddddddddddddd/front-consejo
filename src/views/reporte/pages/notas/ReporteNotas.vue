<template>
  <ScrimModal @close="close">
    <template v-slot:header>Reporte de notas</template>
    <template v-slot:body>
      <Spinner v-if="isLoading1"></Spinner>
      <div v-else>
        <Dropdown v-model="curso" :options="listniveles" />
        <Astronauta v-if="isPrint" />
        <Emergente @closeEmergente="(ifEmergente = false)" v-if="ifEmergente" />
        <Spinner v-if="isTabla"></Spinner>
        <section v-else>
          <div v-if="infoMat.length" class="mt-3 ">
            <div class="row mb-2">
              <div class="col-lg-5">
                <div class="d-flex justify-content-start">
                  <div class="d-flex justify-content-start">
                    <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="id" :value="ite" @click="onChange(ite)"
                          v-model="searchQuery" />
                        <span class="negros gordo" for="ite">
                          {{ ite }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ms-3">
                    <div class="input-group" style="min-width: 280px;">
                      <span class="input-group-text text-body buscador busca"><i class="fas fa-search"
                          aria-hidden="true"></i></span>
                      <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
                    </div>
                  </div>

                </div>
              </div>
              <div class="col-lg-7 text-start">
                <button :disabled="!isSelecMatricula.length" @click="openLibreta()" class="btn btnNaranja2 me-2">
                  Libretas </button>
                  <button :disabled="!isSelecMatricula.length" @click="openJuntas()" class="btn btnNaranja2 me-2">
                  Juntas de curso </button>
                <button :disabled="!isSelecMatricula.length" @click="openParcial()" class="btn btnNaranja2 me-2">
                  Consolidado parcial </button>
                <button :disabled="!isSelecMatricula.length" @click="notas_pdf()" class="btn btnNaranja2 ms-2">
                  Consolidado anual </button>

              </div>
            </div>
            <div class="table-responsive " v-if="displayedArticles.length">
              <table class="dataTable-table table s-table-flush mt-2">
                <thead class="thead-light">
                  <tr class="cabeza">
                    <th style="background-color: rgb(234, 240, 246); ">
                      <div class="d-flex ms-3">
                        <div v-if="!allSelected" class="form-check my-auto" style="min-height: 0rem;">
                          <input class="form-check-input cheka" type="checkbox" @click="selectAll" />
                        </div>
                        <svg @click="deletedSelected" style="cursor: pointer;color: #8b3dff;" v-else
                          data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision"
                          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          viewBox="0 0 24 24" width="24">
                          <path d="M9 11l3 3L22 4"></path>
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                        </svg>
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Nombres
                        </span>
                      </div>
                    </th>
                    <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                      Paralelo
                    </th>
                    <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
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
                          <input class="form-check-input cheka" type="checkbox" v-model="isSelecMatricula"
                            :value="item._id" @click="selectcursos(item._id)" />
                        </div>
                        &nbsp;&nbsp;
                        <span class="mb-0 mt-1 text-xs negros fuente">
                          {{ item.nombre }}
                        </span>
                      </div>
                    </td>
                    <td class="text-xs text-center text-dark fuente">
                      <b>{{ item.curso }}</b>
                    </td>
                    <td class="text-xs text-center text-dark fuente">
                      {{ item.fecha }}
                    </td>

                  </tr>
                </tbody>
              </table>

            </div>
            <section v-else>
              <NoFound />
            </section>
          </div>
          <section v-else>
            <NoFound />
          </section>
        </section>
        <section v-if="ifConsolidado" style="display: none">
          <ConsolidadoNotas :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :settings="settings" :numQuimestre="numQuimestre" />
        </section>
        <section v-if="ifParcial" style="display: none">
          <ConsolidadoParcial :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :settings="settings" :numQuimestre="numQuimestre" :parcial="parcial" />
        </section>
        <section v-if="iflibretas" style="display: none">
          <FormatoLibretas :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
            :numQuimestre="numQuimestre" :parcial="parcial3" :parcial2="parcial2" />
        </section>
        <section v-if="ifjuntas" style="display: none">
          <JuntasCurso :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
            :numQuimestre="numQuimestre" :parcial="parcial10" :parcial2="parcial11" />
        </section>
        <section v-if="isActive">
          <Modal @close="closeModal">
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
                        <input class="form-check-input" v-model="checked" type="radio" :value="0" />
                        <span class="parrafo"> Primer quimestre</span>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" :value="1" />
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
                        <input class="form-check-input" v-model="parcial" type="radio" name="ite.id" :id="3"
                          :value="3" />
                        <span class="parrafo"> PARCIAL 1</span>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="parcial" type="radio" name="ite.id" :id="4"
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
        <section v-if="isActive2">
          <Modal @close="closeModal2">
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
                        <input class="form-check-input cheka" type="checkbox" value="1" v-model="parcial3" />
                        <label class="form-check-label  parrafo negros"> &nbsp; Primer parcial</label>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check ">
                        <input class="form-check-input cheka" type="checkbox" value="2" v-model="parcial2" />
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
    </template>
    <template v-slot:footer>
      <button @click="close" class="btn btnNaranja2 me-3">
        <b>Salir de aqui</b>
      </button>
    </template>
  </ScrimModal>
</template>
  
<script>
import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
import Astronauta from "../../../../shared/Astronauta"
import Emergente from "../../../../shared/Emergente.vue"
import Modal from "../../../../shared/Modal"
export default {
  name: 'Report',
  components: {
    Spinner, ScrimModal, Dropdown, NoFound, Astronauta, Emergente,
    ConsolidadoNotas: () => import( /* webpackChunkName: "ConsolidadoNotas" */ "./ConsolidadoNotas.vue"),
    ConsolidadoParcial: () => import( /* webpackChunkName: "ConsolidadoParcial" */ "./ConsolidadoParcial.vue"),
    FormatoLibretas: () => import( /* webpackChunkName: "FormatoLibretas" */ "./FormatoLibretas.vue"),
    JuntasCurso: () => import( /* webpackChunkName: "JuntasCurso" */ "./JuntasCurso.vue"),
    Modal
  },
  data() {
    return {
      listniveles: {},
      isLoading1: false,
      isTabla: false,
      infoMat: {},
      info: null,
      isReporte: false,
      curso: "",
      rowData: [],
      ifConsolidado: false,
      isPrint: false,
      searchQuery: 'A',
      ifEmergente: false,
      nextCourse: '',
      isSelecMatricula: [],
      allSelected: false,
      isActive: false,
      isActive2: false,
      isActive3: false,
      numQuimestre: 0,
      settings: {},
      numActual: 0,
      paralelos: [],
      search: "",
      order: {},
      ifParcial: false,
      checked: 0,
      parcial: 3,
      iflibretas: false,
      parcial2: false,
      parcial3: false,
      ifjuntas: false,
      parcial10 : false,
      parcial11 : false,
    }
  },
  watch: {
    curso: function (value) {
      this.isSelecMatricula = [];
      this.searchQuery = 'A'
      this.paralelos = [],
        this.__cambios(value._id, value.num);
      this.numActual = value.num;
      this.deletedSelected()
    }
  },
  computed: {
    displayedArticles: function () {
      if (this.search.length > 0) {
        return this.infoMat.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.nombre.toLowerCase().includes(v));
        });
      } else {
        return this.infoMat;
      }

    }
  },
  methods: {
    onChange: function (nom) {
      this.infoMat = this.order.filter((x) => x.curso == nom)
      this.isSelecMatricula = [];
      this.allSelected = false;
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
        for (let user in this.displayedArticles) {
          this.isSelecMatricula.push(this.displayedArticles[user]._id);
        }
      }
    },
    deletedSelected: function () {
      this.allSelected = false;
      this.isSelecMatricula = [];
    },
    onPageChange: function (page) {
      this.page = page;

    },
    verificarUsuario() {
      this.$proxies._settingProxi.getConfigure()
        .then((x) => {
          const { rector, logo, secretario, unidadeducativa, ubicacion, direccion, telefono } = x.data[0];
          this.settings = {
            secretario: secretario,
            rector: rector,
            unidadeducativa: unidadeducativa,
            ubicacion: ubicacion,
            telefono: telefono,
            direccion: direccion,
            logo: logo,
          }
        }).catch(() => {
          console.log("Error")
        });
    },
    changeStatus(ev) {
      if (ev == '100') {
        this.isPrint = false;
        this.ifConsolidado = false;
        this.ifParcial = false;
        this.iflibretas = false;
        this.ifjuntas = false;
      }
      if (ev == '500') {
        this.isPrint = false;
        this.ifConsolidado = false;
        this.ifParcial = false;
        this.iflibretas = false;
        this.ifjuntas = false;
        this.ifEmergente = true;
      }
    },
    __listNivele() {
      this.$Progress.start();
      this.isLoading1 = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.listniveles = x.data;
          this.isLoading1 = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
          this.$Progress.fail();
        });
    },

    __cambios(cursos) {
      this.$Progress.start();
      this.infoMat = []
      this.order = []
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getInfoListReport(cursos)
        .then((x) => {
          const data = x.data;
          this.paralelos = []
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              const element = data[i];
              if (!this.paralelos.includes('A')) {
                if (element.curso == "A") this.paralelos.push("A")
              }
              if (!this.paralelos.includes('B')) {
                if (element.curso == "B") this.paralelos.push("B")
              }
              if (!this.paralelos.includes('C')) {
                if (element.curso == "C") this.paralelos.push("C")
              }
              if (!this.paralelos.includes('D')) {
                if (element.curso == "D") this.paralelos.push("D")
              }
              if (!this.paralelos.includes('Undefined')) {
                if (element.curso == "Undefined") this.paralelos.push("Undefined")
              }
            }
          }
          this.order = data.sort(function (a, b) {
            var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
            if (nameA < nameB)
              return -1;
            if (nameA > nameB)
              return 1;
            return 0;
          });
          this.infoMat = this.order.filter((x) => x.curso == "A")
          this.isTabla = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
          this.$Progress.fail();
        });
    },
    close() {
      this.$emit('myEventClosedModalReporte');
    },
    closeModal() {
      this.isActive = false;
    },
    closeModal2() {
      this.isActive2 = false;
    },
    closeModal3: function() {
      this.isActive3 = false;
    },
    openParcial() {
      this.isActive = true;
    },
    openLibreta() {
      this.isActive2 = true;
    },
    openJuntas: function() {
      this.isActive3 = true;
    },
    paralelo_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
        if (this.parcial != '') {
          this.numQuimestre = this.checked;
          this.closeModal();
          this.isPrint = true;
          this.ifParcial = true;
          this.rowData = this.isSelecMatricula
        } else {
          this.$dialog.alert("Seleccionar un parcial");
        }
      } else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    notas_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
        this.isPrint = true;
        this.ifConsolidado = true;
        this.rowData = this.isSelecMatricula
      } else {
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
          this.closeModal2();
          this.isPrint = true;
          this.iflibretas = true
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
  
    
  