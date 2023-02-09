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

              <button @click="save()" class="btn btnNaranja">
                Guardar</button>

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
                        Asistencia
                      </span>
                    </div>
                  </th>


                </tr>
              </thead>
              <tbody>
                <tr v-for="item in displayedArticles" :key="item.id">
                  <td class="text-xs text-start text-dark fuente">
                    <b>{{ item.nombre }}</b>
                  </td>
                  <td>
                    <div class="d-flex ms-3">
                      <div class="form-check my-auto supcheka">
                        <input class="form-check-input cheka" type="checkbox" v-model="isSelecMatricula"
                          :value="item._id" @click="selectcursos(item._id)" />
                      </div>
                      &nbsp;&nbsp;
                      <span class="mb-0 mt-1 text-xs negros fuente">
                        {{ isSelecMatricula.includes(item._id) ? 'Asiste' : 'No asiste' }}
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
      </section>

    </div>
  </div>
</template>
  
<script>
import Spinner from "../../shared/Spinner.vue";
import Dropdown from "../../shared/Dropdown.vue";
import NoFound from "../../shared/NoFound"
//import Picker from "../../shared/Picker.vue"
export default {
  name: 'Report',
  components: {
    Spinner, Dropdown, NoFound,//Picker

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
      this.deletedSelected()
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
    save() {
      if (this.infoMat.length == 0) return
      const arrays = [];

      for (let i = 0; i < this.infoMat.length; i++) {
        let aux = 0
        const element = this.infoMat[i];
        const result = element.asistencias
        if (result.length > 0) {
          for (let j = 0; j < result.length; j++) {
            const element = result[j];
            if (element.fecha == this.fecha) {
              this.toast("Ya se encuentra registrado la asistencia en este curso");
            this.isSelecMatricula = [];
              return;
            }
          }
        }
        if (this.isSelecMatricula.includes(element._id)) aux = 1;
        arrays.push({
          _id: element._id,
          fecha: this.fecha,
          estado: aux
        })
      }
      if (arrays.length > 0) {
        this.$proxies._notasProxi
          .updateAsistencia('dggerghr54g8ewg8er', arrays) //-----------EDITAR CON AXIOS
          .then(() => {
            this.toast("Se guardo la asistencia con exito");
            this.infoMat = []
            this.isSelecMatricula = [];
          })
      }
    },
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
      let text_1 = 'Registros'
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
          this.infoMat = this.order.filter((x) => x.curso == "A")
          this.isTabla = false;
          console.log(this.infoMat)
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
          this.$Progress.fail();
        });
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