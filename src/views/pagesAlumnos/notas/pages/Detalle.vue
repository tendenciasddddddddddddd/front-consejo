<template>
    <ScrimModal @close="close">
      <template v-slot:header> Detalle de calificaciones </template>
      <template v-slot:body>
        <div v-if="dataRow.length" class="card-body px-0 pt-0 pb-2 mt-2">
            <span class="text-sm negros">Docente : <b >{{ dataRow[0].docente }}</b></span> <br>
            <span class="text-sm negros">Materia : <b >{{ dataRow[0].materia }}</b></span> <br>         
                      <div class="table-responsive mt-3">
                        <table class="dataTable-table table s-table-flush">
                          <thead>
                            <tr class="cabeza">
                              <th style="background-color: rgb(234, 240, 246)" class="text-uppercase text-secondary text-xxs font-weight-bolder">
                                Quimestre
                              </th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> a1</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> a2</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> a3</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> a4</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> a5</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> b1</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> b2</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> b3</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> b4</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder"> b5</th>
                              <th style="background: #ebebec" class="text-center text-uppercase text-secondary text-xxs"> Examen </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in dataRow[0].notas" :key="item.id">
                              <td>
                                <div v-if="item.quimestre == 'p1'">
                                  <span class="text-sm colorestabla fuente">
                                    Primer Quimestre</span>
                                </div>
                                <div v-if="item.quimestre == 'p2'">
                                  <span class="text-sm colorestabla fuente">
                                    Segundo Quimestre</span>
                                </div>
                              </td>
                              <td class="text-sm colorestabla fuente">{{ item.a1 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.a2 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.a3 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.a4 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.a5 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.b1 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.b2 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.b3 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.b4 }}</td>
                              <td class="text-sm colorestabla fuente">{{ item.b5 }}</td>
                              <td style="background: #ebebec" class="text-sm colorestabla fuente text-center font-weight-bolder">
                                {{ item.examen }}
                              </td>
                              
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
      </template>
      <template v-slot:footer>
          <a @click="close" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio">
                <b>Regresar</b>
            </a>
      </template>
    </ScrimModal>
  </template>
  <script>

  import ScrimModal from "../../../../shared/ScrimModal"

  export default {
    name: "ListaMatricula",
    components: {
       ScrimModal
    },
    props: {
      dataRow: {
        type: Array,
      }
    },
    data() {
      return {
    
      };
    },
    methods: {
      close() {
        this.$emit('myEventClosed');
      },
    },
  
  };
  </script>