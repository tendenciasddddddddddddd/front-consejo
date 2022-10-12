<template>
  <ScrimModal @close="close">
        <template v-slot:header> Migraciones de matriculas</template>
         <template v-slot:body>
              <div class="row">
                <div class="col-sm-3">
                    <div class="input-group">
                <span class="input-group-text text-body buscador"
                  ><i class="fas fa-search links" aria-hidden="true"></i
                ></span>
                <input
                  type="text"  v-model.lazy="search"
                  class="form-control buscador"
                  placeholder="Buscar por nombre"
                />
              </div>
                </div>
                <div class="col-sm-9">
                  <div class="d-flex ">
                    <div class="w-50">
                       <Spinner v-if="ifLoadPeriodo"></Spinner>
                       <Dropdown  v-model="namePeriodo"  :options="arrayDocumentsLevel"/>
                    </div>
                     <div class="w-50 ms-3">
                        <Spinner v-if="ifLoadCourse"></Spinner>
                         <Dropdown  v-model="curso"  :options="arrayDocumentsCourse"/>
                     </div>
                  </div>   
                </div>
              </div>
                <Spinner v-if="isLoading"></Spinner>
                <div v-else class="table-responsive mt-3">
                  <div v-if="!collections.length" >
                    <NoFound2/>
                  </div>
                  <section v-else>
                         <table class="dataTable-table table s-table-flush">
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
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          Curso
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                         Periodo
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in displayedArticles" :key="item.id">
                        <td>
                          <div class="d-flex ms-3">
                            <div class="form-check my-auto supcheka">
                              <input
                                class="form-check-input cheka"
                                type="checkbox"
                                v-model="isSelecMatricula"
                                :value="item._id" @click="selectOne(item._id)"
                              />
                            </div>
                            &nbsp;&nbsp;
                            <a class="mb-0 text-xs mt-1 colorestabla fuente">
                              {{ item.nombre? item.nombre:'Undefined' }}
                            </a> 
                          </div>
                        </td>
                         <td class="text-sm text-center colorestabla fuente">
                          <p class="mb-0 text-xs"> {{ item.fknivel ? item.fknivel.nombre:'Undefined' }}</p>
                        </td>
                        <td class="text-sm text-center colorestabla fuente">
                          <p class="mb-0 text-xs">{{ item.academico ? item.academico.nombre:'Undefined' }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Paginate :numPages="numPages" :page="page" :total="collections.length" @pagechanged="onPageChange">
                </Paginate>
                  </section>
                </div>
         </template>
        <template v-slot:footer>
              <a @click="close" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio links me-3">
        <b>Salir de aqui</b>
      </a>
         </template>
    </ScrimModal>
</template>

<script >
import ScrimModal from "../../../../shared/ScrimModal";
import Spinner from "../../../../shared/Spinner";
import Paginate from "../../../../shared/Paginate.vue";
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound2 from "../../../../shared/NoFound2";
export default {
  name: "MigrationnList",
  components: {
    Spinner,
    ScrimModal,
    Paginate,
    Dropdown,
    NoFound2
  },
  data() {
    return {
      collections: {},
      page: 1,
      perPage: 10,
      pages: [],
      numPages: 0,
      totalNotas: 0,
      isLoading: false,
      isSearch: false,
      search: '',
      arrayDocumentsCourse: [],
      arrayDocumentsLevel: [],
      ifLoadPeriodo: false,
      ifLoadCourse: false,
      nameCourse: '',
      namePeriodo: '',
      isSelecMatricula: [],
      allSelected: false,
      curso: '',
    };
  },
  watch: {
    search: function (value) {
         this.changeSearch(value);
    },
    curso: function (value) {
      if (this.namePeriodo!='' && this.namePeriodo!=null) {
        this.searchForCourseAndLever(value._id);
      } else {
        this.$dialog.alert('Seleccione un año electivo')
      }  
    }
  },
  computed: {
    displayedArticles: function() {
      return this.paginate(this.collections);
    },
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);

      this.numPages = Math.ceil(articles.length / 10);
      return articles.slice(from, to);
    },
    selectOne(ids) {
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
        for (let user in this.collections) {
          this.isSelecMatricula.push(this.collections[user]._id);
        }
      }
    },
    deletedSelected: function () {
      this.allSelected = false;
      this.isSelecMatricula = [];
    },
    close() {
      this.$emit("myEventClosedModalMigracion2");
    },

    changeSearch(textSearch) { //queryUsuario
      if (textSearch.length > 3) {
        this.isSearch = true;
        this.isLoading = true;
        this.$proxies._migracionProxi
          .queryMatriculas(textSearch) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
          .then((x) => {
            this.collections = x.data;
            this.isLoading = false;
            this.search= '';
          })
          .catch(() => {
            console.log("Error imposible");
            this.isLoading = false;
          });
      }
    },
    __getPeriodo() {
      this.ifLoadPeriodo = true;
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          this.arrayDocumentsLevel = x.data.niveles;
          this.ifLoadPeriodo = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.ifLoadPeriodo = false;
        });
    },
    __listNivele() {
      this.ifLoadCourse = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.arrayDocumentsCourse = x.data;
          this.ifLoadCourse = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.ifLoadCourse = false;
        });
    },
    searchForCourseAndLever: function(nameCourseId){
      this.isLoading = true;
      this.isSearch = true;
      this.$proxies._migracionProxi
        .getByIdOfCourseAndPeriod(this.namePeriodo._id, nameCourseId)
        .then((x) => {
          this.collections = x.data;
          console.log(this.collections);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading = false;
        });
    },
    onPageChange: function (page) {
      this.page = page;
    },
  },
  created() {
    this.__getPeriodo();
    this.__listNivele();
  },
};

</script>

