<template>
  <div>
    <ProgressBar v-if="isData"></ProgressBar>
    <template v-else>
      <NoFound2 v-if="!info" />
      <div v-else>
        <section>
          <p class=" negros" style="font-weight: 400; font-size: 15px;">
          {{ info.academico.nombre }} {{ info.fknivel.nombre }}
          {{ info.curso }}</p> 
          <button @click="getData()" class="btn btnNaranja2">Actualizar notas</button>
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
                          <span  @click="open(item.fora)" style="cursor:pointer;text-decoration: underline;" class="mb-0 ms-3 text-xs mt-1 links2 gordo">
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
              <NoFound2  />
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
import NoFound2 from '../../../shared/NoFound';
import quialifyservice from "../../../modules/cursos/pages/services";
const ResultServiceNota = new quialifyservice();
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
      let text_1 = 'Notas'
      let text_2 = 'Detalle de notas'
      this.$store.commit('updateHeader',{text_1, text_2})
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
        parcial1 = ResultServiceNota.calcular_primer_quimestre(calificar, 0)
        parcial2 = ResultServiceNota.calcular_primer_quimestre(calificar, 1)
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
