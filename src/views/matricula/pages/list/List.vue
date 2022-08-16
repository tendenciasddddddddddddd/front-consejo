<template>
      <ScrimModal @close="close">
         <template v-slot:header>  Lista de matriculas actuales</template>
          <template v-slot:body>
            <div class="row">
            <div class="col-lg-11 col-12 mx-auto">
              <div class="row" v-if="isVisible === 'panel1'">
                <div
                  class="h5 mt-3 fuente text-start"
                  style="font-weight: 400;"
                >
                  Selecciona uno de los cursos.
                </div>
                <Spinner v-if="isLoading1"></Spinner>
                <section v-else class="flex-containes2 mt-4">
                  
                  <a  v-for="(item, i) in listniveles"
                    :key="item.id" type="button" @click="clicMe(item._id, item.nombre)"
                    class="flex-none s-shadow s-pb-2 category-card s-center card-template s-py-3 s-px-2 s-decoration-none s-borderline-top animate__animated animate__fadeInUp"
                    href="javascript:;"
                     :class="[`s-borde-${i} animations-${i} ` ]"
                  >
                    <img
                      class="img  s-mb-1 w-35"
                      :src="arrays[i]"
                    />
                    <span class="s-span mt-2"
                      >Curso de...</span
                    >
                    <h6 class=" cardTitle text-start" style="font-size: 0.9rem;">
                       {{item.nombre}}
                    </h6>
                    
                  </a>
                </section>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="mt-3">
                  <a
                    @click="regresar"
                    class="btn btn-sm"
                    style="box-shadow: none"
                  >
                    <img
                      height="23px"
                      src="../../../../assets/img/usados/regresar.png"
                    />
                  </a>
                  <a
                    role="button"
                    v-if="!iseliminaddo"
                    class="fuente tamanio ms-4"
                    :class="{ disabled: isSelecMatricula.length === 0 }"
                    v-on="
                      isSelecMatricula.length ? { click: () => remove() } : {}
                    "
                    v-tooltip.top-center="
                      isSelecMatricula.length
                        ? ''
                        : 'Seleccionar una o muchas filas para eliminar'
                    "
                  >
                    <i class="far fa-trash-alt me-2" aria-hidden="true"> </i>
                    <b :class="{ links: isSelecMatricula.length != 0 }"
                      >Eliminar matriculas</b
                    >
                  </a>
                </div>
                <Spinner v-if="isTabla"></Spinner>
                <div v-else class="table-responsive mt-4">
                  <div v-if="!infoMat.length" class="row mt-3">
                    <div class="col-lg-9 col-12 mx-auto">
                      <div class="text-center mt-6">
                        <img
                          class="w-15"
                          src="../../../../assets/img/usados/undraw_search.svg"
                          alt="fondo"
                        />
                        <div class="letra fuente mt-4">
                          No hay datos que mostrar en esta vista
                        </div>
                      </div>
                    </div>
                  </div>
                  <section v-else>
                         <table class="dataTable-table table s-table-flush">
                    <thead class="thead-light">
                      <tr class="cabeza">
                       <th style="background-color: rgb(234, 240, 246); ">
                   <div class="d-flex ms-3">
                      <div v-if="!allSelected " class="form-check my-auto" style="min-height: 0rem;">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectAll"
                        />
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
                          Paralelo
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
                                 v-model="isSelecMatricula" :value="item._id"
                                @click="selectcursos(item._id)"
                              />
                            </div>
                            &nbsp;&nbsp;
                            <a class="mb-0 text-sm colorestabla fuente">
                              {{ item.nombre }}
                            </a>
                          </div>
                        </td>
                        <td class="text-sm text-center colorestabla fuente">
                          <p class="mb-0 text-xs">{{ nombre_curso }}</p>
                        </td>
                        <td class="text-sm text-center colorestabla fuente">
                          ({{ item.curso }})
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Paginate :numPages="numPages"  :page="page" :total="infoMat.length" @pagechanged="onPageChange"></Paginate>
                  </section>
                </div>
              </div>
            </div>
          </div>
          </template>
           <template v-slot:footer>
                  <div v-if="isVisible === 'panel1'">
              <a
                v-if="index != '0'"
                class="btn btnNaranja "
                @click="verLista()"
              >
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
              <a v-else class="btn btnDisabled">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible == 'panel2'">
              <a class="btn btnNaranjaClaro" @click="regresar">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
            </div>
           </template>
      </ScrimModal>
</template>
<script>
import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Paginate from "../../../../shared/Paginate.vue";
import ServiceMatricula from '../../../../service/funcions';
const ResultServiceMatricula = new  ServiceMatricula();
export default {
  name: "ListaMatricula",
  components: {
    //Espera,
    Spinner, ScrimModal, Paginate
  },
  props:{
    modalidad:{
      type: String,
    }
  },
  data() {
    return {
      tab: "inicio",
      isVisible: "panel1",
      isModalidad: this.modalidad,
      isLoading1: false,
      isLoading2: false,
      isTabla: true,
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
       perPage: 8,
       pages: [],
       numPages:0,
       totalNotas: 0,
       allSelected: false,
       isOptionsModalidad: ''
    };
  },
   computed: {
    displayedArticles: function () {
      if (this.searchQuery.length>1) {
        return this.infoMat.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.nombre.toLowerCase().includes(v));
        });
      }else{
        return this.paginate(this.infoMat);
      }
      
    }
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      
      this.numPages = Math.ceil(articles.length/8);
      return articles.slice(from, to);
  },
   verificarUsuario(){
      if (this.isModalidad=='m1') {
           this.isOptionsModalidad = 'Intensivo';
         } 
         if (this.isModalidad=='m2'){
          this.isOptionsModalidad = 'Extraordinaria';
         }
         this.__listNivele();
         this.arrays = ResultServiceMatricula.arrays_of_avatar();
         
   },
     onPageChange: function(page) {
      this.page = page;
    },
    __listNivele() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isLoading1 = true;

      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtros = x.data;
          this.listniveles = filtros.filter((x) => x.modalidad == this.isOptionsModalidad);
          // this.isTabla = false;
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          // this.isTabla = false;
          this.isLoading1 = false;
        });
    },
    __cambios(cursos) {
      this.isTabla = true;
      //let modalidad = "m1";
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
    selectAll: function() {
      this.allSelected= true;
      this.isSelecMatricula = [];
      if (this.allSelected) {
        for (let user in this.infoMat) {
          this.isSelecMatricula.push(this.infoMat[user]._id);
        }
      } 
    },
    deletedSelected: function() {
      this.allSelected= false;
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
              this.isVisible = "panel1";
              this.allSelected = false;
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
        .catch(function() {});
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

    verLista: function() {
      if (this.index != "0") {
        this.__cambios(this.index);
        this.isVisible = "panel2";
        this.isSelecMatricula = [];
      }
    },
    clicMe: function(keys, nombreCurso) {
      if (keys ) {
         this.index = keys;
        this.nombre_curso = nombreCurso;
      }
    },
    regresar: function() {
      this.isVisible = "panel1";
      this.index = "0";
      this.allSelected = false;
    },
     close(){
      this.$emit('myEventClosedModalRemove');
    },
  },
  created() {
    this.verificarUsuario();
  },
  
};
</script>