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
                <div class="col-lg-5">
                    <div class="d-flex justify-content-start">
                      <div class="d-flex justify-content-start">
                        <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="id"  :value="ite"
                          @click="onChange(ite)" v-model="searchQuery"/>
                        <span class="negros" for="ite">
                          {{ ite}}</span>
                      </div>
                    </div>
                      </div>
                    <div class="ms-3">
                      <div class="input-group" style="min-width: 280px;">
        <span class="input-group-text text-body buscador busca"><i class="fas fa-search" aria-hidden="true"></i></span>
        <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
    </div>
                    </div>
                    
                  </div>
                </div>
                <a role="button" v-if="!iseliminaddo" class="tamanio"
              :class="{ disabled: isSelecMatricula.length === 0 }" v-on="
                isSelecMatricula.length ? { click: () => remove() } : {}
              " v-tooltip.top-center="isSelecMatricula.length? '': 'Seleccionar una o muchas filas para eliminar'">
              
              <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"></path></svg>
              <b class="gordo" :class="{ links2: isSelecMatricula.length != 0 }">Eliminar matriculas</b>
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
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
export default {
  name: "ListaMatricula",
  components: {
    //Espera,
    Spinner, ScrimModal,  Dropdown, NoFound
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
      allSelected: false,
      curso: '',
      idCurso: '',
      paralelos: [],
      search:  "",
      order: {},
    };
  },
  computed: {
    displayedArticles: function () {
      if (this.search.length>0) {
        return this.infoMat.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.nombre.toLowerCase().includes(v));
        });
      }else{
        return this.infoMat;
      }
      
    }
  },
  watch: {
    curso: function (value) {
      this.idCurso = value._id
      this.searchQuery = 'A'
      this.paralelos = [],
      this.isSelecMatricula = [];
      this.__cambios(this.idCurso);
    }
  },
  methods: {
    onChange: function(nom){
      this.infoMat = this.order.filter((x) => x.curso ==nom) 
      this.isSelecMatricula = [];
      this.allSelected = false;
  },
    verificarUsuario() {
      this.__listNivele();
    },
    onPageChange: function (page) {
      this.page = page;
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
      this.isTabla = true;
      this.infoMat = []
      this.order = []
      this.$proxies._matriculaProxi
        .getFullMatricula(cursos)
        .then((x) => {
          const data= x.data.matriculados;
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
          this.infoMat = this.order.filter((x) => x.curso =="A")
          this.isTabla = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
          this.$Progress.fail();
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
        title: "??Destruir registro?",
        body: " Esta acci??n no se puede deshacer",
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