<template>
  <div>
    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'openIA' }">
      <a
        @click="tab = 'init1'"
        class="fixed-plugin-button text-dark position-fixed px-3 py-2"
        style="background-color: rgb(14, 114, 237);"
      >
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div
        class="card shadow-lg desplega"
        :class="{ 'w-100': tab === 'openIA' }"
        style="overflow-y: auto; z-index: 9999;"
      >
        <div
          class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
        >
          <div class="float-start">
            <h4 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Calificar tareas
            </h4>
          </div>
          <div class="float-end mt-2">
            <button
              @click="$router.go(-1)"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close text-white"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <Spinner v-if="isData"></Spinner>
          <div v-else class="row">
            <div class="col-lg-10 col-12 mx-auto">
              <p class="fuente h4 mt-2">{{ meTask[0].nombre }}</p>
              <p class="parrafo" v-html="meTask[0].descripcion"></p>
              <div class="form-check form-switch mt-2">
                <input
                v-model="meTask[0].estado"
                  class="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                   value="1"
                   v-bind:true-value="1"
                   v-bind:false-value="0"
                />
                <label class="form-check-label" for="rememberMe"
                  >Marcar esta tarea como revisada</label
                >
              </div>
              <div v-if="!meTask[0].entrega.length">
                <div class="text-center mt-6">
                  <img
                    class="w-15"
                    src="../../../../assets/img/logs/descanso.svg"
                    alt="fondo"
                  />
                  <div class="letra fuente mt-4">
                    Sin tareas pendientes por revisar
                  </div>
                </div>
              </div>

              <div v-else class="table-responsive mt-3">
                <table
                  class="table table-flush"
                  id="datatable-basic"
                  style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
                >
                  <thead class="thead-light">
                    <tr class="cabeza">
                      <th
                        style="background-color: rgb(234, 240, 246); "
                        class="text-uppercase text-center text-xxs font-weight-bolder"
                      >
                        Nombre tarea
                      </th>
                      <th
                        class="text-uppercase text-center text-xxs font-weight-bolder"
                      >
                        Link
                      </th>
                      <th
                        class="text-uppercase text-center text-xxs font-weight-bolder"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in meTask[0].entrega" :key="item.id">
                      <td>
                        <div class="d-flex ms-3">
                          <div class="form-check my-auto">
                            <input
                              class="form-check-input cheka"
                              type="checkbox"
                              @click="selectTask(item._id)"
                            />
                          </div>
                          <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->
                          <a class="mb-0 ms-3 text-sm colorestabla fuente">
                            {{ item.nombres }}
                          </a>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="fuente links text-sm">{{
                          item.link.slice(0, 35)
                        }}</span>
                      </td>
                      <td class="text-sm text-center colorestabla fuente">
                        <div v-if="item.nota">
                          <span
                            style="background-color: rgb(0, 189, 165);"
                            class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                          ></span>
                          {{ item.nota }}
                        </div>
                        <div v-else>
                          <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                          Sin calificación
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modalFooter">
          <div class="text-end">
            <a
              @click="$router.go(-1)"
              style="text-decoration: underline;"
              href="javascript:;"
              class="fuente tamanio"
              to="/aulas-lista"
            >
              <b>Cancelar</b>
            </a>

            <button v-if="isSelecTask.length==1"
              type="submit"
              id="addRowButton"
              class="btn btnNaranja ms-4"
              form="aulas"
            >
              Siguiente &nbsp; <i class="ni ni-bold-right"></i>
            </button>
             <button v-else
              type="submit"
              id="addRowButton"
              class="btn btnDisabled ms-4"
              form="aulas"
            >
              Siguiente &nbsp; <i class="ni ni-bold-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./ReviewTasks.js"></script>

<style></style>
