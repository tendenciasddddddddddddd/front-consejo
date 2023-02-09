<template>
    <div>
      <Spinner v-if="isLoading1"></Spinner>
      <div v-else>
        <Dropdown v-model="curso" :options="listniveles" />
        <Spinner v-if="isTabla"></Spinner>
        <section v-else>
          <div v-if="infoMat.length" class="mt-3 ">
            <div class="row mb-2">
              <div class="col-lg-9">
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
                  <div class="ms-3">
                    <span class="h6">Fecha: {{ fecha }}</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 text-end">
  
                
  
              </div>
            </div>
            <div class="table-responsive " v-if="displayedArticles.length">
              <table class="dataTable-table table s-table-flush mt-2">
                <thead class="thead-light">
                  <tr class="cabeza">
                    <th style="background-color: rgb(234, 240, 246); "
                      class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                      Paralelo
                    </th>
                    <th>
                      <div class="d-flex ms-3">
                        
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Asistencias
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="d-flex ms-3">
                        
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Faltas
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="d-flex ms-3">
                        
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Justificadas
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in displayedArticles" :key="item.id">
                    <td class="text-xs text-start text-dark fuente">
                      <b @click="open(item.lista, item._id)" style="cursor:pointer">{{ item.nombre }}</b>
                    </td>
                    <td>
                      <div class="d-flex ms-3">
                       
                        <span class="mb-0 mt-1 text-xs negros fuente">
                         {{ item.asistencias }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex ms-3">
                       
                        <span class="mb-0 mt-1 text-xs negros fuente">
                         {{ item.faltas }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex ms-3">
                       
                        <span class="mb-0 mt-1 text-xs negros fuente">
                         {{ item.justificadas }}
                        </span>
                      </div>
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
          <Modal v-show="visible" @close="close">
        <template v-slot:header>Lista de asistencias</template>
        <template v-slot:body>
          <table class="dataTable-table table s-table-flush mt-2">
                <thead class="thead-light">
                  <tr class="cabeza">
                    
                    <th>
                      <div class="d-flex ms-3">
                        
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Fecha
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="d-flex ms-3">
                        
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Estado
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="d-flex ms-3">
                        
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Acción
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in listass" :key="item.id">
                    <td class="text-xs text-start text-dark fuente">
                     {{ item.fecha }}
                    </td>
                    <td class="text-xs text-start text-dark fuente">
                     <span v-if="item.estado =='1'">Asiste</span> 
                     <span v-if="item.estado =='0'">Falta</span> 
                     <span v-if="item.estado =='2'">Justificado</span>
                    </td>
                    <td>
                     <button :disabled="item.estado!='0'" @click="justificar(item._id)" class="btn btnNaranja">Justificar</button>
                    </td>
                    
                  </tr>
                </tbody>
              </table>
           
        </template>
        <template v-slot:acccion>
          
          
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
  import Modal from "../../shared/Modal.vue"
  export default {
    name: 'Report',
    components: {
      Spinner, Dropdown, NoFound,Modal
  
    },
    data() {
      return {
        listniveles: {},
        isLoading1: false,
        isTabla: false,
        infoMat: {},
        info: null,
        curso: "",
        searchQuery: 'A',
        isSelecMatricula: [],
        allSelected: false,
        settings: {},
        numActual: 0,
        paralelos: [],
        search: "",
        order: {},
        fecha: "",
        listass : [],
        visible : false,
        idMatricula : "",
      }
    },
    watch: {
      curso: function (value) {
        if(value!= null){
          this.isSelecMatricula = [];
        this.searchQuery = 'A'
        this.paralelos = [],
          this.idcurso = value._id
        this.__cambios(value._id, value.num);
        this.numActual = value.num;
        } else {
          this.infoMat = []
              this.isSelecMatricula = [];
        }
       
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
      justificar(ids){
        console.log(ids, this.idMatricula);
        const model = []
        model.push( {
          _id : this.idMatricula,
          fora : ids
        })
        console.log(model)
        this.$proxies._notasProxi
            .justificarAsistencia('dggerghr54g8ewg8er', model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.toast("Se guardo la asistencia con exito");
              this.curso= null
              this.close()
            })
      },
        close() {
            this.visible = false;
          },
          open(array, idMatricula){
            this.idMatricula = ''
            this.listass = []
            this.visible = true;
            console.log(array)
            this.listass = array
            this.idMatricula = idMatricula
          },
      onChange: function (nom) {
        this.infoMat = this.order.filter((x) => x.curso == nom)
        this.isSelecMatricula = [];
        this.allSelected = false;
      },
 
      onPageChange: function (page) {
        this.page = page;
      },
      verificarUsuario() {
        let text_1 = 'Lista'
        let text_2 = 'Asistencia'
        this.$store.commit('updateHeader', { text_1, text_2 })
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
            const result = this.order.filter((x) => x.curso == "A")
            this.FormData(result)
            this.isTabla = false;
            this.$Progress.finish();
          })
          .catch((err) => {
            console.log("Error", err);
            this.isTabla = false;
            this.$Progress.fail();
          });
      },
      FormData(array){
          if (array.length > 0) {
            const data = []
            console.log(array)
            for (let i = 0; i < array.length; i++) {
                let contador_asistencias = 0;
                let contador_faltas = 0;
                let contador_justificadas = 0;
                const element = array[i];
                if(element.asistencias.length > 0){
                    for (let j = 0; j < element.asistencias.length; j++) {
                        const elemento = element.asistencias[j];
                        if (elemento.estado =='0') {
                            contador_faltas ++
                        }
                        if (elemento.estado =='1') {
                            contador_asistencias ++
                        }
                        if (elemento.estado =='2') {
                            contador_justificadas ++
                        }
                    }
                }
                data.push({
                    _id : element._id,
                    nombre : element.nombre,
                    asistencias : contador_asistencias,
                    faltas : contador_faltas,
                    justificadas : contador_justificadas,
                    lista : element.asistencias
                })
            }
            this.infoMat = data
            console.log(this.infoMat)
          }
      },
      getFecha() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
        this.fecha = currentDate;
      },
      toast(message) {
        this.$toasted.info(message, {
          duration: 3000,
          position: 'top-center',
          icon: "check-circle",
          theme: "toasted-primary",
          action: {
            text: 'CERRAR',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      },
    },
    created() {
      this.verificarUsuario();
      this.__listNivele();
      this.getFecha()
    },
  };
  </script>