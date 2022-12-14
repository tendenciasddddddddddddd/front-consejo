<template>
    <div>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else>
            <div v-if="isLoading1">cargando..</div>
                <Dropdown v-model="curso" :options="listniveles" />
            <div v-if="!displayedArticles.length">
                <NoFound />
            </div>
            <div v-else>
               
                <div class="row mt-3">
                    <div class="col-sm-6" v-for="(item) in displayedArticles" :key="item.id">
                        <div class="table-responsive mt-2">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="mb-0 text-sm negros gordo" >{{ item.docente }}</h6>
                            <h6 class="mb-0 text-sm negros gordo" >{{ item.curso }} / {{ item.paralelo }}</h6>
                            <h6 class="mb-0 text-sm negros gordo" >{{ item.materia }}</h6>
                            <div class="progress mt-3">
                                <div class="progress-bar progress-bar-striped  progress-bar-animated" role="progressbar"
                                  :style="{ 'width': item.porcentaje + '%' }"
                                    :aria-valuenow="item.porcentaje" aria-valuemin="0" aria-valuemax="100">{{item.porcentaje}}%</div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                    <Paginate :numPages="numPages"  :page="page" :total="info.length" @pagechanged="onPageChange"></Paginate>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
import Spinner from "../../shared/Spinner";
import Paginate from "../../shared/Paginate"
import NoFound from "../../shared/NoFound";
import Dropdown from "../../shared/Dropdown.vue";
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
export default {
    name: 'Planificacion',
    components: {
        Spinner,
        NoFound,
        Paginate,
        Dropdown
    },
    data() {
        return {
            roles: this.$store.state.user.roles,
            isLoading: false,
            info: [],
            searchQuery: '',
          //Pagina 
         page: 1,
         perPage: 20,
         pages: [],
         numPages:0,
         listniveles: {},
         curso : ''
        }
    },
    watch: {
    curso: function (value) {
        if (value!=null) 
        this.__cambios(value);
    }
  },
    computed: {
      displayedArticles: function () {
        if (this.searchQuery.length>1) {
          return this.info.filter((item) => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every((v) => item.curso.toLowerCase().includes(v));
          });
        }else{
          return this.paginate(this.info);
        }
        
      }
    },
    methods: {
        paginate(articles) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        this.numPages = Math.ceil(articles.length/this.perPage);
        return articles.slice(from, to);
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
    __cambios(value){
        this.searchQuery = value.nombre
    },
    onPageChange(page) {
        this.page = page;
      },
        changedQuery(num) {
            this.rows = num;
            this.getAll(1, num);
        },
        getAll() {
            this.$Progress.start();
            this.isLoading = true;
            this.$proxies._gestionProxi
                .getEstadistica()
                .then((x) => {
                    this.formData(x.data.datos)
                    this.isLoading = false;
                    this.$Progress.finish();
                })
                .catch(() => {
                    console.log("Error imposible");
                    this.isLoading = false;
                    this.$Progress.fail();
                });
        },
        formData(data) {
            try {
                const distributivo = data.distubutivo
                const matricula = data.matricula
                this.info = []
                if (distributivo.length > 0) {
                    for (let i = 0; i < distributivo.length; i++) {
                        const element = distributivo[i];
                        let paralelo = element.paralelo;
                        let materia = element.fmateria ? element.fmateria.nombre : 'Undefined';
                        let nivel = element.fnivel ? element.fnivel._id : 'Undefined';
                        let curso = element.fnivel ? element.fnivel.nombre : 'Undefined';
                        let docente = element.fdocente ? element.fdocente.fullname : 'Undefined'
                        let contador = 0
                        let porcentaje = 0
                        for (let j = 0; j < matricula.length; j++) {
                            const elemento2 = matricula[j];
                            if (nivel == elemento2.fknivel) {
                                if (paralelo == elemento2.curso) {
                                    const calificaciones = elemento2.calificaciones
                                    for (let h = 0; h < calificaciones.length; h++) {
                                        const elem = calificaciones[h];
                                        if (elem.materia == materia) {
                                            contador++;
                                            if (elem.notas.length > 0) {
                                                if (parseInt(elem.notas[0].a1) > 1) porcentaje = 25
                                                if (parseInt(elem.notas[0].b1) > 1) porcentaje = 50
                                                if (parseInt(elem.notas[1].a1) > 1) porcentaje = 75
                                                if (parseInt(elem.notas[1].b1) > 1) porcentaje = 100
                                            }
                                            if (elem.proyectos.length > 0) {
                                                if (elem.proyectos[0].p1 != 'R') porcentaje = 25
                                                if (elem.proyectos[0].p2 != 'R') porcentaje = 50
                                                if (elem.proyectos[1].p1 != 'R') porcentaje = 75
                                                if (elem.proyectos[1].p2 != 'R') porcentaje = 100
                                            }
                                            if (elem.comportamiento.length > 0) {
                                                if (elem.comportamiento[0].p1 != 'E') porcentaje = 25
                                                if (elem.comportamiento[0].p2 != 'E') porcentaje = 50
                                                if (elem.comportamiento[1].p1 != 'E') porcentaje = 75
                                                if (elem.comportamiento[1].p2 != 'E') porcentaje = 100
                                            }
                                            if (elem.dhi.length > 0) {
                                                if (elem.dhi[0].p1 != 'E') porcentaje = 25
                                                if (elem.dhi[0].p2 != 'E') porcentaje = 50
                                                if (elem.dhi[1].p1 != 'E') porcentaje = 75
                                                if (elem.dhi[1].p2 != 'E') porcentaje = 100
                                            }
                                        }
                                    }
                                }
                            }
                            if (contador > 2) break;
                        }
                        this.info.push({ docente: docente, curso: curso, paralelo: paralelo, materia: materia, porcentaje: porcentaje })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        verificarUsuario() {
            let text_1 = 'Estadistica'
            let text_2 = 'Cumplimiento de notas'
            this.$store.commit('updateHeader', { text_1, text_2 })
            if (!restResourceService.admin(this.roles)) {
            this.$router.push("/");
      }
        },
    },
    created() {
        this.verificarUsuario()
        this.getAll();
        this.__listNivele();
    },
}
</script>