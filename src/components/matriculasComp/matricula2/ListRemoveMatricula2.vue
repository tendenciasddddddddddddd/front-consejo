<template>
  <div>
    <!--  @input="checkExist($event)" -->

    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicio' }">
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': tab === 'inicio' }"
        style="overflow-y: auto;  z-index: 9999;"
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
                Todas las matriculas de la modalidad extraordinaria
              </h5>
            </div>
            <div class="col-lg-2">
              <div class="text-end mt-2">
                <button
                  @click="$emit('myEventClosedModalRemoveM2')"
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
              <div class="row " v-if="isVisible === 'panel1'">
                <div
                  class="h5 mt-4 fuente text-center"
                  style="font-weight: 400;"
                >
                  Selecciona los cursos que te gustaría observar
                </div>
                <Spinner v-if="isLoading1"></Spinner>
                <section v-else class="flex-containes mt-2">
                  <div v-for="item in listniveles" :key="item.id">
                    <div
                      class=" p-2 borde5 noactive cajas"
                      :class="{ activado: index === item._id }"
                      style="max-width: 200px;"
                    >
                      <a href="javascript:;" @click="clicMe(item._id, item.nombres)">
                        <div class="text-center position-relative">
                          <div class="blur-shadow-image">
                            <img 
                              class="img  move-on-hover w-40"
                              src="../../../assets/img/logs/electronic-signature.svg"
                            />
                          </div>
                        </div>
                        <div class="text-center">
                        <span class="fuente cardTitle " style="font-size: 20px;">Curso: </span><br>
                        
                        <span class="cardSubTitle">{{ item.nombres.slice(0, 25) }}</span> 
                        <hr>
                        <a class="tamanio fuente">
                          <b class="links">Lista estudiantes <i class="fa fa-plus ms-2" aria-hidden="true"></i></b>
                        </a>
                      </div>
                      </a>
                    </div>
                  </div>
                   
                </section>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="mt-4">
                  <a
                    @click="isVisible = 'panel1'"
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
                     v-tooltip.top-center="isSelecMatricula.length ? '' : 'Seleccionar una o muchas filas para eliminar'"
                    class="fuente tamanio ms-4"
                    :class="{ disabled: isSelecMatricula.length === 0 }"
                    v-on="isSelecMatricula.length ? { click: () => remove() } : {}"
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
                        <div class="text-center mt-3">
                          <img
                            class="w-30"
                            src="../../../assets/img/logs/lupa.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente mt-3">
                            No hay datos que mostrar
                          </div>
                        </div>
                      </div>
                    </div>
                  <table v-else class="elevation-2 table table-flush " style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                    
                    <thead  class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          # Nombres
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
                      <tr v-for="item in infoMat" :key="item.id">
                        <td>
                         <div class="d-flex ms-3">
                            <div class="form-check my-auto supcheka">
                              <input
                                class="form-check-input cheka"
                                type="checkbox"
                                @click="selectcursos(item._id)"
                              />
                            </div>
                            &nbsp;&nbsp;
                            <a class="mb-0 text-sm colorestabla fuente">
                              {{ item.nombre }}
                            </a>
                          </div>
                        </td>
                        <td
                          class="text-sm text-center colorestabla fuente"
                        >
                          <p class="mb-0 text-xs">{{ nombre_curso }}</p>
                        </td>
                        <td class="text-sm text-center fuente">
                          ({{ item.curso }})
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->
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
              <a class="btn btnNaranjaClaro" @click="isVisible = 'panel1'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >

//import Espera from "../../../../shared/Espera";
import Spinner from "../../../shared/Spinner.vue";
export default {
  name: "ListaMatricula",
  components: {
    //Espera,
    Spinner,
  },
  data() {
    return {
      tab: "inicio",
      isVisible: "panel1",
      isLoading1: false,
      isLoading2: false,
      isTabla: true,
      check: null,
      select: null,
      infoMat: null,
      listniveles: null,
      isSelecMatricula: [],
      iseliminaddo: false,
       nombre_curso: '',
      index: "0",
    };
  },
  methods: {

    __listNivele() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isLoading1 = true;

      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtros = x.data;
          this.listniveles = filtros.filter(
            (x) => x.modalidad == "Extraordinaria"
          );
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
      //let modalidad = "m2";
      this.$proxies._matriculaProxi
        .getFullMatricula( cursos)
        .then((x) => {
          this.infoMat = x.data.matriculados;
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },
    selectcursos(key) {
      let longitud = this.isSelecMatricula.length;
      let isExiste = 0;
      if (longitud > 0) {
        for (let i = 0; i < this.isSelecMatricula.length; i++) {
          if (this.isSelecMatricula[i] == key) {
            this.isSelecMatricula.splice(i, 1);
            isExiste = 1;
            break;
          }
        }
        if (isExiste === 0) {
          this.isSelecMatricula.push(key);
        }
      } else {
        this.isSelecMatricula.push(key);
      }
    },

    remove() {
      //METODO PARA ELIMINAR  ROW
      if (
        confirm(
          "ESTA SEGURO QUE QUIERE ELIMINAR? YA QUE ESOS CAMBIOS NO SE PUEDE REVERTIR"
        )
      ) {
        this.iseliminaddo = true;
        let isArray = this.isSelecMatricula.length;
        if(isArray>0){
          for(let i=0; i<this.isSelecMatricula.length; i++){
            this.$proxies._matriculaProxi
            .removeMatricula(this.isSelecMatricula[i])
            .then(() => {
              
            })
            .catch(() => {
              console.log("Error imposible");
              
            });
          }
          this.iseliminaddo = false;
         this.isVisible = "panel1";
       }
      }
    },

    verLista() {
      if (this.index != "0") {
        this.__cambios(this.index);
        this.isVisible = "panel2";
        this.isSelecMatricula = [];
      }
    },
    clicMe(keys, nombreCurso) {
      this.index = keys;
      this.nombre_curso = nombreCurso;
    },
  },
  created() {
    this.__listNivele();
  },
};

</script>


