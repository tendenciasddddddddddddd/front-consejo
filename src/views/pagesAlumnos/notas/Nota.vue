<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <ProgressBar v-if="isData"></ProgressBar>
    <template v-else>
      <NoFound2 v-if="!info" />
      <div v-else>
        <section>
          <span class=" negros" style="font-weight: 400; font-size: 15px;">
          {{ info.academico.nombre }} {{ info.fknivel.nombre }}
          {{ info.curso }}</span>
          <div>
            <div v-if="inAlumnos.length">
              <div class="table-responsive mt-3">
                <table class="dataTable-table table s-table-flush">
                  <thead>
                    <tr class="cabeza">
                      <th style="background-color: rgb(234, 240, 246)"
                        class=" text-uppercase text-secondary text-xxs font-weight-bolder">
                        Materia
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder">
                        Docente
                      </th>
                      <th class=" text-center text-uppercase  text-secondary  text-xxs">
                        Quimestre 1
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs">
                        Quimestre 2
                      </th>
                      <th style="background: #ebebec" class="text-center text-uppercase text-secondary text-xxs ">
                        Promedio final
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in inAlumnos" :key="item.fora">
                      <td>
                        <div class="d-flex ms-3">
                          <span  @click="open(item.fora)" style="cursor:pointer;font-weight: 600;text-decoration: underline;" class="mb-0 ms-3 text-xs mt-1 negros">
                            {{ item.materia }}
                          </span>
                        </div>
                      </td>
                      <td class="text-xs colorestabla fuente">
                        {{ item.name }}
                      </td>
                      <td class="text-sm colorestabla fuente text-center">
                        {{ item.par1 }}
                      </td>
                      <td class="text-sm colorestabla fuente text-center">
                        {{ item.par2 }}
                      </td>
                      <td style="background: #ebebec" class="text-sm colorestabla fuente text-center">
                        {{ item.promed }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else>
              <div class="row mt-5">
                <div class="col-lg-9 col-12 mx-auto">
                  <div class="text-center">
                    <img class="w-15 mt-4" src="../../../assets/img/usados/undraw_search.svg" alt="fondo" />
                    <div class="mt-3 letra fuente">
                      Hemos buscado en todas partes, pero no tenemos
                      <br />
                      nada que mostrarte. Pregunta a tus<br />
                      docentes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div v-if="ifDetalle">
          <Detalle :dataRow="detalleCalificacion" @myEventClosed="closed" />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import ProgressBar from '../../../shared/ProgressBar';
import NoFound2 from '../../../shared/NoFound2';
export default {
  name: 'Nota',
  components: {
    ProgressBar, NoFound2,
    Detalle: () => import(/* webpackChunkName: "Detalle" */ "./pages/Detalle.vue"),
  },
  data() {
    return {
      info: {},
      user: this.$store.state.user,
      isData: false,
      inAlumnos: [],
      isSelecUsers: [],
      detalleCalificacion: [],
      ifDetalle: false,
    }
  },
  methods: {
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.user.id) {
        this.$proxies._notasProxi
          .get(this.user.id)
          .then((x) => {
            this.info = x.data;
            this.isData = false;
            if (this.info.calificaciones) {
              this.savep();
            }
            this.$Progress.finish();
          })
          .catch((e) => {
            console.log("Error not found", e);
            this.isData = false;
            this.$Progress.finish();
          });
      }
    },
    savep() {
      //updateReforma2
      this.inAlumnos = [];
      let notas = this.info.calificaciones;
      for (let j = 0; j < notas.length; j++) {
        let nombre = '';
        let materia = '';
        let parcial1 = 0;
        let parcial2 = 0;
        let promedio = 0;
        let foranea = "";
        promedio = notas[j].promediof;
        nombre = notas[j].docente;
        materia = notas[j].materia;
        let calificar = notas[j].notas;
        parcial1 = this.calcular_promedio_final(calificar[0])
        parcial2 = this.calcular_promedio_final(calificar[1])
        foranea = notas[j]._id;
        this.inAlumnos.push({
          name: nombre,
          par1: parcial1,
          par2: parcial2,
          promed: promedio,
          fora: foranea,
          materia: materia,
        });
      }
    },
    calcular_promedio_final(array) {
      let sum = parseFloat(array.a1) + parseFloat(array.a2) + parseFloat(array.a3) + parseFloat(array.a4) + parseFloat(array.a5) +
        parseFloat(array.b1) + parseFloat(array.b2) + parseFloat(array.b3) + parseFloat(array.b4) + parseFloat(array.b5)
      let prom = sum / 10;
      let prom2_80 = ((prom * 8) / 10).toFixed(2);
      let exa = array.examen;
      let exam2_20 = ((parseFloat(exa) * 2) / 10).toFixed(2);
      let result = (parseFloat(prom2_80) + parseFloat(exam2_20)).toFixed(2);
      return result;
    },
    open: function (id) {
      this.ifDetalle = true;
      const matricula = this.info.calificaciones;
      this.detalleCalificacion = matricula.filter((x) => x._id == id)
    },
    closed: function () {
      this.ifDetalle = false;
    },
    splitedList(row) {
      return (row !== null) ? row.split('+') : '';
    },
  },
  created() {
    this.getData();
  },
};
</script>
