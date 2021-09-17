<template>
  <div>
    <Spinner v-if="isData"></Spinner>
    <template v-else>
      <div v-if="!info" class="row">
        <div class="col-lg-11 col-12 mx-auto mt-4">
          <div
            class="row"
            style="background-color: rgb(222, 235, 255); padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div class="col-lg-1 text-end">
              <img
                class="w-100"
                src="../../../assets/img/jira/dataNull.svg"
                alt="fondo"
              />
            </div>
            <div class="col-lg-11">
              <p class="text-sm fuente text-dark">
                Su matrícula aun no está registrada, para resolver esto
                comuníquese con secretaria para registre su matrícula.
              </p>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-40"
                  src="../../../assets/img/logs/lupa.svg"
                  alt="fondo"
                />
                <div class="letra fuente">
                  No hay datos que mostrar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="row mt-2">
          <div
            class="col-lg-11 col-12 mx-auto"
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark parrafo" style="margin:7px; ">
                Recuerde que usted puede visualizar sus notas una vez que ya
                haya terminado por lo menos un quimestre
              </p>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-8 col-12 mx-auto mt-4">
            <div class="row">
              <div class="col-lg-6 mt-4">
                <p class="h5 fuente ">
                  Haz seguimiento del tus notas si para que no existe
                  confusiones ni sorpresas
                </p>
                <p class="fuente text-sm text-dark">
                  {{ info.fkestudiante.fullname }} 😎
                </p>

                <p class="parrafo">
                  ⮕ {{ info.academico.nombre }} ⮕{{ info.fknivel.nombres }} ⮕{{
                    info.curso
                  }}
                  <br />
                </p>
                <div class="mt-4">
                  <button @click="tabla = 'notasv'" class="btn btnNaranja">
                    Visualizar
                  </button>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="text-start">
                  <img
                    height="280px"
                    class="w-100"
                    src="../../../assets/img/jira/tele.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-11 col-12 mx-auto mt-5">
            <p class="h6 fuente">Quimestres</p>
            <div class="mb-4">
              <div v-if="info.notas.length" class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-secondary text-xxs font-weight-bolder"
                        >
                          Materia
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder "
                        >
                          Docente
                        </th>
                        <th
                          class="text-center text-uppercase text-secondary text-xxs "
                        >
                          Quim 1
                        </th>

                        <th
                          class="text-center text-uppercase text-secondary text-xxs "
                        >
                          Quim 2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in info.notas"
                        :key="item.id"
                        :vars="(aux = 0)"
                      >
                        <td class="text-xs text-dark font-weight-normal fuente">
                          {{ item.materia }}
                        </td>
                        <td class="text-xs text-dark font-weight-normal fuente">
                          {{ item.docente }}
                        </td>
                        <td
                          class="align-middle text-dark text-center text-sm fuente"
                        >
                          <div v-if="item.quimestre == 'p1'">
                            {{ item.promedio }}
                          </div>
                        </td>
                        <td
                          class="align-middle text-dark text-center text-sm fuente"
                        >
                          <div v-if="item.quimestre == 'p2'">
                            {{ item.promedio }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-else>
                <div
                  class="row "
                  style="background-color: #e5f5f8; padding:7px; margin-right:10px; border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
                >
                  <div class="col-lg-1 text-end">
                    <img
                      class="w-100"
                      src="../../../assets/img/jira/dataNull.svg"
                      alt="fondo"
                    />
                  </div>
                  <div class="col-lg-11">
                    <p class="text-sm fuente text-dark mt-2">
                      Aun no tiene notas asignadas, espera a que los docentes
                      registren sus notas.
                    </p>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-9 col-12 mx-auto">
                    <div class="text-center">
                      <img
                        class="w-40"
                        src="../../../assets/img/logs/lupa.svg"
                        alt="fondo"
                      />
                      <div class="letra fuente">
                        No hay datos que mostrar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-11 col-12 mx-auto mt-2">
            <p class="h6 fuente">Promedios Finales</p>
            <div class="mb-4">
              <div
                v-if="info.confirmar.length"
                class="card-body px-0 pt-0 pb-2"
              >
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-secondary text-xxs font-weight-bolder"
                        >
                          Materia
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder "
                        >
                          Promedio Final
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in info.confirmar"
                        :key="item.id"
                        :vars="(aux = 0)"
                      >
                        <td class="text-sm font-weight-normal fuente">
                          {{ item.materia }}
                        </td>
                        <td class="text-xs font-weight-normal fuente">
                          <p  v-if="item.promedio <= 7">
                            {{ item.promedio }} 😅
                          </p>
                          <p class="parrafo" v-else>{{ item.promedio }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else>
                <div
                  class="row "
                  style="background-color: #e5f5f8; padding:7px; margin-right:10px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
                >
                  <div class="col-lg-1 text-end">
                    <img
                      class="w-100"
                      src="../../../assets/img/jira/dataNull.svg"
                      alt="fondo"
                    />
                  </div>
                  <div class="col-lg-11">
                    <p class="text-sm fuente text-dark mt-2">
                      La notas confirmadas solo se muestran cuando el docente
                      confirma las mismas.
                    </p>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-lg-9 col-12 mx-auto">
                    <div class="text-center">
                      <img
                        class="w-40"
                        src="../../../assets/img/logs/lupa.svg"
                        alt="fondo"
                      />
                      <div class="letra fuente">
                        No hay datos que mostrar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fixed-plugin" :class="{ 'show w-100': tabla === 'notasv' }">
          <div
            class="card shadow-lg blur desplega"
            :class="{ 'w-100': tabla === 'notasv' }"
            style="overflow-y: auto; z-index: 9999; top:35px;"
          >
            <div
              class="card-header pb-0 pt-3"
              style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
            >
              <div class="float-start">
                <h5 style="font-weight: 400;" class="mt-3 mb-0 fuente">
                  Edita Tu perfil
                </h5>
                <!--  <p class="parrafo">{{nombre}}</p> -->
              </div>
              <div class="float-end mt-4">
                <button
                  @click="tabla = 'termina'"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <i style="font-size: 35px;" class="fa fa-close"></i>
                </button>
              </div>
              <!-- End Toggle Button -->
            </div>

            <div class="card-body pt-sm-3 pt-0">
              <!-- Sidebar Backgrounds -->
              <div class="row">
                <div
                  class="col-lg-3 
                 
                  d-md-block d-none
                  me-n8"
                  style="position:absolute;bottom:0;left:0;"
                >
                  <div class="top-10" style="">
                    <img
                      class=""
                      src="../../../assets/img/logos/fondoD.svg"
                      alt="fondo"
                    />
                  </div>
                </div>

                <div class="col-lg-6 col-12 mx-auto">
                  <ul class="nav">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#"
                        >Notas de Quimestre</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Notas Finales</a>
                    </li>
                   
                  </ul>
                  <div>
                    <div
                      v-if="info.notas.length"
                      class="card-body px-0 pt-0 pb-2"
                    >
                      <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                          <thead>
                            <tr class="cabeza">
                              <th
                                style="background-color: rgb(234, 240, 246); "
                                class="text-uppercase text-secondary text-xxs font-weight-bolder"
                              >
                                Materia
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder "
                              >
                                Docente
                              </th>
                              <th
                                class="text-center text-uppercase text-secondary text-xxs "
                              >
                                Quim 1
                              </th>

                              <th
                                class="text-center text-uppercase text-secondary text-xxs "
                              >
                                Quim 2
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in info.notas"
                              :key="item.id"
                              :vars="(aux = 0)"
                            >
                              <td
                                class="text-xs text-dark font-weight-normal fuente"
                              >
                                {{ item.materia }}
                              </td>
                              <td
                                class="text-xs text-dark font-weight-normal fuente"
                              >
                                {{ item.docente }}
                              </td>
                              <td
                                class="align-middle text-dark text-center text-sm fuente"
                              >
                                <div v-if="item.quimestre == 'p1'">
                                  {{ item.promedio }}
                                </div>
                              </td>
                              <td
                                class="align-middle text-dark text-center text-sm fuente"
                              >
                                <div v-if="item.quimestre == 'p2'">
                                  {{ item.promedio }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./Nota.js"></script>

<style>
.freemeeting-tip {
  border-radius: 3px;
  background-color: rgba(254, 116, 37, 0.1);
  border: solid 1px #fe7425;
  padding: 15px;
  margin-top: -8px;
}
.letra {
  font-family: Avenir Next W02, Helvetica, Arial, sans-serif;

  font-size: 16px;
  color: #33475b;
  line-height: 24px;
}

</style>
