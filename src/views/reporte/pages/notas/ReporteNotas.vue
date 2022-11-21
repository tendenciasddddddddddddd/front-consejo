<template>
    <ScrimModal @close="close">
      <template v-slot:header>Reporte de notas</template>
      <template v-slot:body>
        <Spinner v-if="isLoading1"></Spinner>
        <div v-else>
          <Dropdown v-model="curso" :options="listniveles" />
          <Astronauta v-if="isPrint" />
          <Spinner v-if="isTabla"></Spinner>
          <section v-else>
            <div v-if="infoMat.length" class="mt-3 ">
              <div class="row mb-2">
                <div class="col-lg-4">
                    <div class="d-flex justify-content-start">
                    <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="ite.id" :id="ite.id" :value="ite.nombre"
                          @click="onChange(ite.nombre)" v-model="searchQuery"/>
                        <span class="negros" for="ite._id">
                          {{ ite.nombre }}</span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                  
                </div>
                <div class="col-lg-8 text-start">
   
                  <a  v-on="isSelecMatricula.length ? { click: () => notas_pdf() } : {}" class="tamanio" role="button" :class="{ disabled: isSelecMatricula.length === 0 }">
                    <svg class="me-1" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                      <path d="M6 9V2h12v7"></path>
                      <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                      <path d="M6 14h12v8H6z"></path>
                    </svg>
                     <b class="gordo " :class="{ links2: isSelecMatricula.length != 0}">Consolidado de notas por curso</b>
                  </a>
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
                          <i @click="deletedSelected" v-else class="fa fa-minus s-icon-all" aria-hidden="true"></i>
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
            <ConsolidadoNotas :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
              :numQuimestre="numQuimestre"  />
          </section>
  
        </div>
      </template>
      <template v-slot:footer>
        <button @click="close"  class="btn btnNaranja2 me-3">
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
export default {
  name: 'Report',
  components: {
    Spinner, ScrimModal, Dropdown, NoFound,Astronauta,
    ConsolidadoNotas: () => import( /* webpackChunkName: "ConsolidadoNotas" */ "./ConsolidadoNotas.vue"),
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
      //Pagina 
    page: 1,
    perPage: 9,
    pages: [],
    numPages:0,
    totalNotas: 0,
    nextCourse: '',
    isSelecMatricula: [],
    allSelected: false,
    isActive:false,
    numQuimestre: 0,
    settings : {},
    numActual: 0,
    paralelos: [
        {
          id: "0",
          nombre: "A",
        },
        {
          id: "1",
          nombre: "B",
        },
        {
          id: "2",
          nombre: "C",
        },
        {
          id: "3",
          nombre: "D",
        },
        {
          id: "4",
          nombre: "Undefined",
        },
      ],
    }
  },
  watch: {
    curso: function (value) {
      this.isSelecMatricula = [];
      this.__cambios(value._id, value.num);
      this.numActual = value.num;
      this.deletedSelected()
    }
  },
  computed: {
    displayedArticles: function () {
      if (this.searchQuery.length>0) {
        return this.infoMat.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.curso.toLowerCase().includes(v));
        });
      }else{
        return this.infoMat
      }
      
    }
  },
  methods: {
    onChange(nom){
        this.searchQuery = nom;  
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
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      
      this.numPages = Math.ceil(articles.length/8);
      return articles.slice(from, to);
  },
  onPageChange: function(page) {
    this.page = page;

  },
    verificarUsuario() {
      this.$proxies._settingProxi.getConfigure()
          .then((x) => {
              const {rector,logo, secretario,unidadeducativa,ubicacion,direccion,telefono} = x.data[0];
              this.settings = {
                secretario : secretario,
                rector : rector,
                unidadeducativa: unidadeducativa,
                ubicacion: ubicacion,
                telefono:telefono,
                direccion: direccion,
                logo : logo,
              }  
          }).catch(() => {
              console.log("Error")
          });
    },
    changeStatus(ev){
      if (ev=='100') {
        this.isPrint = false;
        this.ifConsolidado = false;
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
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getInfoListReport(cursos)
        .then((x) => {
          this.infoMat = x.data;
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
    closeModal(){
      this.isActive = false;
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
  },
  created() {
    this.verificarUsuario();
    this.__listNivele();
  },
};


</script>
  
    
  