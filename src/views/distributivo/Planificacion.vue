<template>
    <div>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else>
            <div v-if="!info.length">
                <NoFound />
            </div>
            <div v-else>
                <div class="table-responsive mt-4">
                    <table class="dataTable-table table s-table-flush">
                        <thead class="thead-light">
                            <tr class="cabeza">
                                <th style="background-color: rgb(234, 240, 246); ">
                                    <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                                        Curso / Paralelo
                                    </span>
                                </th>
                                <th class="text-uppercase  text-xxs font-weight-bolder"> Materia</th>
                                <th class="text-uppercase text-center text-xxs font-weight-bolder">
                                    Docente
                                </th>
                                <th class="text-uppercase text-center text-xxs font-weight-bolder">
                                    Planificación
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in info" :key="item.id">
                                <td class="text-xs  negros">
                                    <div class="mb-0 ms-3 text-xs colorestabla fuente">
                                        {{ item.fnivel? item.fnivel.nombre: 'Undefined' }} / {{ item.paralelo }}
                                    </div>
                                </td>
                                <td class="text-xs  text-dark fuente">
                                    {{ item.fmateria? item.fmateria.nombre : 'Undefined' }}
                                </td>
                                <td class="text-xs text-center text-dark fuente">
                                    <span> {{ item.fdocente ? item.fdocente.fullname:'Undefined' }} </span>
                                </td>
                                <td class="text-sm text-center ">
                                    <div v-if="item.planificacion.length">
                                        <div v-for="items in item.planificacion" :key="items.id">
                                            <span style="background-color: rgb(0, 189, 165);" class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                          <a class="links2 gordo" :href="items.url" target="_blank">Enlace de archivo</a>
                                        </div>
                                        
                                    </div>
                                    <div v-else class="text-dark fuente">
                                        <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                        Sin entrega
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Paginate2 :numPages="paginas" :page="pagina" :subtitulo="subtitulo" :total="totalNotas" @pagechanged="onPageChange"
                        @setChangedQuery="changedQuery"></Paginate2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Spinner from "../../shared/Spinner";
import Paginate2 from "../../shared/Paginate2.vue";
import NoFound from "../../shared/NoFound";
export default {
    name: 'Planificacion',
    components: {
        Spinner,
        Paginate2, NoFound
    },
    data() {
        return {
            isLoading: false,
            info: {},
            userIds: [],
            rows: 10,
            pagg: null,
            pagina: 0,
            paginas: 0,
            subtitulo: 'none',
        }
    },
    methods: {
        changedQuery(num) {
            this.rows = num;
            this.getAll(1, num);
        },
        onPageChange(page) {
            this.getAll(page, this.rows);
        },
        getAll(pag, lim) {
            this.$Progress.start();
            this.isLoading = true;
            this.subtitulo = this.rows + ' filas por página';
            this.$proxies._gestionProxi
                .getAllDistributivo(pag, lim)
                .then((x) => {
                    this.info = x.data.niveles;
                    this.pagg = x.data;
                    this.pagina = this.pagg.pagina;
                    this.paginas = this.pagg.paginas;
                    this.totalNotas = this.pagg.total;
                    this.isLoading = false;
                    this.$Progress.finish();
                })
                .catch(() => {
                    console.log("Error imposible");
                    this.isLoading = false;
                    this.$Progress.fail();
                });
        },
        verificarUsuario() {
      let text_1 = 'Pages'
      let text_2 = 'Planificaciones'
      this.$store.commit('updateHeader', { text_1, text_2 })
    },
    },
    created() {
        this.getAll(1, 10);
        this.verificarUsuario()
    },

}
</script>