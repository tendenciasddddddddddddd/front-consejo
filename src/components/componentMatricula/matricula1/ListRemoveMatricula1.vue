<template>
  <div>
    <!--  @input="checkExist($event)" -->

    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicio' }">
      <div
        class="card  desplega"
        :class="{ 'w-100': tab === 'inicio' }"
        style="overflow-y: auto;  z-index: 9999; "
      >
        <div
          class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
        >
          <div class="row">
            <div class="col-lg-10">
              <h5
                style="font-weight: 400"
                class="mt-2 ms-5 mb-0 fuente text-white "
              >
                Todas las matriculas de la modalidad intensivo
              </h5>
            </div>
            <div class="col-lg-2">
              <div class="text-end mt-2">
                <button
                  @click="$emit('myEventClosedModalRemove')"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"
                  >
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#ffffff">
                        <path
                          d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <div class="row">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="row" v-if="isVisible === 'panel1'">
                <div
                  class="h5 mt-4 fuente text-center"
                  style="font-weight: 400;"
                >
                  Selecciona los cursos que te gustaría observar
                </div>
                <Spinner v-if="isLoading1"></Spinner>
                <section v-else class="flex-containes2 mt-4">
                  <!-- <div
                    v-for="(item, i) in listniveles"
                    :key="item.id"
                    class="animate__animated animate__fadeInUp"
                    :class="[`animations-${i}`]"
                  >
                    <a
                      href="javascript:;"
                      type="button"
                      class=" p-2 borde5 noactive cajas"
                      :class="[
                        { activado: index === item._id },
                        { isDisabled: index != item._id && index != '0' },
                      ]"
                      @click="clicMe(item._id, item.nombres)"
                      style="max-width: 200px;"
                    >
                      <div class="text-center position-relative">
                        <div class="blur-shadow-image">
                          <img
                            class="img  move-on-hover w-40"
                            src="../../../assets/img/logs/electronic-signature.svg"
                          />
                        </div>
                      </div>

                      <div class="text-center">
                        <span class="fuente cardTitle " style="font-size: 20px;"
                          >Curso: </span
                        ><br />

                        <span class="cardSubTitle">{{
                          item.nombres.slice(0, 25)
                        }}</span>
                        <hr />
                        <a class="tamanio fuente">
                          <b class="links"
                            >Lista estudiantes
                            <i class="fa fa-plus ms-2" aria-hidden="true"></i
                          ></b>
                        </a>
                      </div>
                    </a>
                  </div> -->
                  
                  <a  v-for="(item, i) in listniveles"
                    :key="item.id" type="button" @click="clicMe(item._id, item.nombres)"
                    class="flex-none s-shadow s-pb-2 category-card s-center card-template s-py-3 s-px-2 s-decoration-none s-borderline-top animate__animated animate__fadeInUp"
                    href="javascript:;"
                     :class="[`s-borde-${i} animations-${i} ` ]"
                  >
                    <img
                      class="img  s-mb-1 w-35"
                      :src="arrays[i]"
                    />
                    <span class="s-span mt-2"
                      >Mostrar c..</span
                    >
                    <h6 class=" cardTitle text-start" style="font-size: 1rem;">
                      Curso de  {{item.nombres}}
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
                      src="../../../assets/img/usados/regresar.png"
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
                          src="../../../assets/img/usados/undraw_search.svg"
                          alt="fondo"
                        />
                        <div class="letra fuente mt-4">
                          No hay datos que mostrar en esta vista
                        </div>
                      </div>
                    </div>
                  </div>
                  <section v-else>
                         <table
                    
                    class="elevation-2 table table-flush "
                    style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
                  >
                    <thead class="thead-light">
                      <tr class="cabeza">
                         <th
                    style="background-color: rgb(234, 240, 246); "
                    class=""
                  >
                   <div class="d-flex ">
                      <div v-if="!allSelected " class="form-check my-auto" style="min-height: 0rem;">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectAll"
                        />
                      </div>
                       <i @click="deletedSelected" v-else style="border: 2px solid; color: rgb(0, 164, 189); height: 19px; width: 19px; border-radius: 3px; cursor: pointer;" class="fa fa-minus" aria-hidden="true"></i>
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
                  <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->
                    <ul class="pagination pagination-dark justify-content-center mt-4">
            <li class="page-item">
              <a
                class="fuente tamanio links paginates me-3"
                :class="{ inactivo: page == 1 }"
                @click="page--"
              >
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1.2em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                  <b class="ms-2">Anterior</b>
              </a>
            </li>

            <li class="page-item active">
              <a class="paginaA">
                <b> {{ page }}</b></a
              >
            </li>

            <li class="page-item">
              <a
                :class="{ inactivo: page == numPages || numPages == 0 }"
                class="fuente tamanio links paginates ms-3"
                @click="page++"
              >
                <b class="me-2">Siguiente</b>
              <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1.2em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>

              </a>
            </li>
            
            <li>
              <strong class="fuente text-sm ms-3"> Total registros: {{ infoMat.length }} </strong>
            </li>
          </ul>
                  </section>
               
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" modalFooter">
          <div class="text-end">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Espera from "../../../../shared/Espera.vue";
import Spinner from "../../../shared/Spinner.vue";


import ServiceMatricula from './ServiceMatriculas';
const ResultServiceMatricula = new  ServiceMatricula();

export default {
  name: "ListaMatricula",
  components: {
    //Espera,
    Spinner,
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
        position: "bottom-center",
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
    },
  },
  created() {
    this.verificarUsuario();
  },
  
};
</script>


