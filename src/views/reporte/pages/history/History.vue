<template>
  <ScrimModal @close="close">
        <template v-slot:header> Historial de matriculas</template>
         <template v-slot:body>
              <div class="row">
                <div class="col-sm-3">
                    <div class="input-group">
                <span class="input-group-text text-body buscador busca">
                  <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
                </span>
                <input
                  type="text"  v-model.lazy="search"
                  class="form-control buscador buscaa"
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
                    <a role="button" v-if="!iseliminaddo" class="tamanio"
              :class="{ disabled: isSelecMatricula.length === 0 }" v-on="
                isSelecMatricula.length ? { click: () => remove() } : {}
              " v-tooltip.top-center="isSelecMatricula.length? '': 'Seleccionar una o muchas filas para eliminar'">
             <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"></path></svg>
              <b class="gordo" :class="{ links: isSelecMatricula.length != 0 }">Eliminar matriculas</b>
            </a>
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
import NoFound2 from "../../../../shared/NoFound";
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
      valor: '',
      iseliminaddo : false
    };
  },
  watch: {
    search: function (value) {
         this.changeSearch(value);
    },
    curso: function (value) {
      if (this.namePeriodo!='' && this.namePeriodo!=null) {
        this.nameCourse = value._id
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
      this.$emit("myEventClosedModalNotas");
    },

    changeSearch(textSearch) { //queryUsuario
      if (textSearch.length > 3) {
        this.$Progress.start();
        this.isSearch = true;
        this.isLoading = true;
        this.$proxies._migracionProxi
          .queryMatriculas(textSearch) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
          .then((x) => {
            this.collections = x.data;
            this.isLoading = false;
            this.search= '';
            this.$Progress.finish();
          })
          .catch(() => {
            console.log("Error imposible");
            this.isLoading = false;
            this.$Progress.fail();
          });
      }
    },
    __getPeriodo() {
      this.$Progress.start();
      this.ifLoadPeriodo = true;
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          this.arrayDocumentsLevel = x.data.niveles;
          this.ifLoadPeriodo = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.ifLoadPeriodo = false;
          this.$Progress.fail();
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
    dialogDelete() {
      this.iseliminaddo = true;
      let isArray = this.isSelecMatricula.length;
      if (isArray > 0) {
        this.$proxies._migracionProxi
          .removeMigraciones(this.isSelecMatricula)
          .then(() => {
            this.iseliminaddo = false;
            this.allSelected = false;
            this.searchForCourseAndLever(this.nameCourse);
          })
          .catch(() => {
            console.log("Error imposible");
            this.iseliminaddo = false;
            this.allSelected = false;
          });
      }
    },
    remove() {
      let message = {
        title: "¿Destruir registro?",
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
          this.dialogDelete();
          setTimeout(() => {
            dialog.close();
            this.toast("Se elimino matriculas de sistema con su cuenta");
          }, 1000);
        })
        .catch(function () { });
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
        position: "top-center",
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: "CERRAR",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  },
  created() {
    this.__getPeriodo();
    this.__listNivele();
  },
};

</script>

