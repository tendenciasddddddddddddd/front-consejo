<template>
  <ScrimModal @close="close">
    <template v-slot:header> Lista de matriculas actuales</template>
    <template v-slot:body>
          <Spinner v-if="isLoading1"></Spinner>
          <section v-else >
            <Dropdown v-model="curso" :options="listniveles" class="mb-2"/>
            <Spinner v-if="isTabla"></Spinner>
            <section v-else>
              <div v-if="infoMat.length" >
                <a role="button" v-if="!iseliminaddo" class="fuente tamanio"
              :class="{ disabled: isSelecMatricula.length === 0 }" v-on="
                isSelecMatricula.length ? { click: () => remove() } : {}
              " v-tooltip.top-center="isSelecMatricula.length? '': 'Seleccionar una o muchas filas para eliminar'">
              <i class="far fa-trash-alt me-2" aria-hidden="true"> </i>
              <b :class="{ links: isSelecMatricula.length != 0 }">Eliminar matriculas</b>
            </a>
                <div  class="table-responsive mt-3">
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
                      <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Paralelo
                      </th>
                      <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                        Fecha
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in displayedArticles" :key="item.id">
                      <td>
                      <div class="d-flex ms-3">
                        <div class="form-check my-auto supcheka">
                          <input class="form-check-input cheka" type="checkbox" v-model="isSelecMatricula"
                            :value="item._id" @click="selectcursos(item._id)" />
                        </div>
                        &nbsp;&nbsp;
                        <a class="mb-0 text-xs mt-1 colorestabla fuente">
                          {{ item.nombre }}
                        </a>
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
          </section>
    </template>
    <template v-slot:footer>

        <a @click="close" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio links me-3">
        <b>Salir de aqui</b>
      </a>
    </template>
  </ScrimModal>
</template>
<script>
import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Paginate from "../../../../shared/Paginate.vue";
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
export default {
  name: "ListaMatricula",
  components: {
    //Espera,
    Spinner, ScrimModal, Paginate, Dropdown, NoFound
  },
  props: {
    modalidad: {
      type: String,
    }
  },
  data() {
    return {
      isLoading1: false,
      isTabla: false,
      listPeriodo: null,
      check: null,
      select: null,
      infoMat: {},
      listniveles: null,
      isSelecMatricula: [],
      iseliminaddo: false,
      nombre_curso: "",
      index: "0",
      arrays: [],
      //PAGINATE 
      searchQuery: '',
      //Pagina 
      page: 1,
      perPage: 10,
      pages: [],
      numPages: 0,
      totalNotas: 0,
      allSelected: false,
      curso: '',
      idCurso: ''
    };
  },
  computed: {
    displayedArticles: function() {
      return this.paginate(this.infoMat);
    },
  },
  watch: {
    curso: function (value) {
      this.idCurso = value._id
      this.__cambios(this.idCurso);
    }
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);

      this.numPages = Math.ceil(articles.length / 8);
      return articles.slice(from, to);
    },
    verificarUsuario() {
      this.__listNivele();
    },
    onPageChange: function (page) {
      this.page = page;
    },
    __listNivele() {
      this.isLoading1 = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.listniveles = x.data;
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
        });
    },
    __cambios(cursos) {
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getFullMatricula(cursos)
        .then((x) => {
          this.infoMat = x.data.matriculados;
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
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

    dialogDelete() {
      this.iseliminaddo = true;
      let isArray = this.isSelecMatricula.length;
      if (isArray > 0) {
        this.$proxies._matriculaProxi
          .removeMatricula(this.isSelecMatricula)
          .then(() => {
            this.iseliminaddo = false;
            this.allSelected = false;
            this.__cambios(this.idCurso);
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
    close() {
      this.$emit('myEventClosedModalRemove');
    },
  },
  created() {
    this.verificarUsuario();
  },

};
</script>