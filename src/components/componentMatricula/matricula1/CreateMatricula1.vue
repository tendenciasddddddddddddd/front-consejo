<template>
    <ScrimModal @close="close">
        <template v-slot:header> Registrar matriculas en las modalidades disponibles</template>
         <template v-slot:body>
            <div class="row">
            <div class="col-lg-11 col-12 mx-auto">
              <div
              
                class="d-flex justify-content-center"
                style="border: 1px solid #ecf0f3;"
              >
                <div
                  class="base-lista"
                  style="border-right: 1px solid #ecf0f3;"
                >
                  <div style="border-bottom: 1px solid #ecf0f3;">
                    <div
                      class="input-group "
                      id="matint_2"
                      style="padding: 15px;"
                    >
                      <span
                        class="input-group-text text-body buscador"
                        style="background: white;"
                        ><i
                          class="fas fa-search"
                          style="color:#53575a"
                          aria-hidden="true"
                        ></i
                      ></span>
                      <input
                        type="text"
                        v-model="searchQuery"
                        class="form-control buscador"
                        placeholder="Buscar por nombre"
                        style="    background: white;"
                      />
                    </div>
                  </div>

                  <Spinner v-if="isLoading"></Spinner>
                  <div v-else>
                    <div
                      id="matint_3"
                      v-if="resultQuery"
                      style="padding: 15px;"
                    >
                      <div
                        v-for="(item, index) in resultQuery.slice(0, 5)"
                        :key="item._id"
                      >
                        <div
                          class="d-flex ms-1 mb-3 animate__animated animate__fadeInUp list-decoration"
                          :class="[`animations-${index}`]"
                          @click="selectUser(item)"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex px-2 py-1 ms-2">
                            <div>
                              <img
                                :src="item.foto"
                                class="avatar avatar-sm me-2"
                                alt="avatar image"
                              />
                            </div>
                            <div
                              class="d-flex flex-column justify-content-center"
                            >
                              <b
                                class="mb-0 text-sm  fuente"
                                style="color: #0091ae;"
                                >{{ item.fullname }}</b
                              >

                              <div>
                                <span
                                  class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                                  style="background-color: rgb(0, 189, 165);"
                                ></span>
                                <span
                                  class="text-xs text-center font-weight-normal fuente"
                                  >{{ item.email }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="row mt-3">
                        <div class="col-lg-12">
                          <div class="text-center">
                            <img
                              class="w-20 mt-2"
                              src="../../../assets/img/usados/vacio.svg"
                              alt="fondo"
                            />
                            <div class="letra fuente mt-3">
                              Buscar por el nombre o apellido
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="base-lista">
                  <div>
                    <div style="border-bottom: 1px solid #ecf0f3;">
                      <form
                        @submit.prevent="sendArraysMatricula"
                        id="matricula"
                        class="p-3"
                      >
                       <h6 style="color:#273b49">Llenar los datos</h6>
                        <Spinner v-if="isLoading2"></Spinner>
                        <div v-else class="col-12 ">
                          <a class="parrafo mt-4">A que cursos</a>
                           <Dropdown  v-model="model.fknivel"  :options="listniveles"/>
                          <p class="mb-0 text-sm text-danger">
                            {{ validation.firstError("model.fknivel") }}
                          </p>
                        </div>
                          <Spinner v-if="isLoading1"></Spinner>
                        <div v-else class="col-12 mt-2">
                          <span class="parrafo">A que período</span>
                            <Dropdown  v-model="model.academico"  :options="listPeriodo"/>
                          <p class="mb-0 text-sm text-danger">
                            {{ validation.firstError("model.academico") }}
                          </p>
                        </div>
                      </form>
                      <div class="text-end me-3">
                        <span style="color:#8e9ba4" class="me-2 text-sm">{{fecha}}</span>
                         <span style="color:#16ca91" class="text-sm text-end">Lista de estudiantes</span>
                      </div>
                     
                    </div>
                    <div v-if="isSelecUsers.length || isDuplicado" class=" p-3 ">
                     <div class="mola">
                      <div
                        v-if="isDuplicado "
                        class="mt-4 alerta"
                        style=" padding:7px;  border-color: #7fd1de; border-style: solid; border-width: 1px; text-align: left;"
                      >
                        <div>
                          <div class="d-flex justify-content-between">
                            <span class="text-sm p-2 ">
                              <strong>Error:</strong>
                              Los estudiantes ya se encuentran matriculados en
                              este periodo academico
                            </span>
                            <button
                              @click="quitar"
                              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 172 172"
                                style=" fill:#000000;"
                              >
                                <g
                                  fill="none"
                                  fill-rule="nonzero"
                                  stroke="none"
                                  stroke-width="1"
                                  stroke-linecap="butt"
                                  stroke-linejoin="miter"
                                  stroke-miterlimit="10"
                                  stroke-dasharray=""
                                  stroke-dashoffset="0"
                                  font-family="none"
                                  font-weight="none"
                                  font-size="none"
                                  text-anchor="none"
                                  style="mix-blend-mode: normal"
                                >
                                  <path
                                    d="M0,172v-172h172v172z"
                                    fill="none"
                                  ></path>
                                  <g fill="#ffffff">
                                    <path
                                      d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                            </button>
                          </div>
                          <v-select
                            class="mt-3"
                            v-model="objetosRechasados"
                            multiple
                            :options="objetosRechasados"
                            label="nombre"
                            item-value="nombre"
                          >
                            <template #option="{ nombre }">
                              <h6 style="margin: 0">{{ nombre }}</h6>
                            </template>
                            <template #no-options="{ }">
                              Lo siento, no hay opciones de coincidencia.
                            </template>
                          </v-select>
                        </div>
                      </div>
                      <section class="mt-2" v-else>
                        
                        <v-select
                          v-model="isSelecUsers"
                          multiple
                          :options="isSelecUsers"
                          label="name"
                          item-value="name"
                        >
                          <template #option="{ name}">
                            <h6 style="margin: 0">{{ name }}</h6>
                          </template>
                          <template #no-options="{ }">
                            Lo siento, no hay opciones de coincidencia.
                          </template>
                        </v-select>
                      </section>
                     </div>
                     
                    </div>
                    <div v-else>
                      <div class="text-center mt-6">
                        <img
                          class="w-30"
                          src="../../../assets/img/icons/descansa.png"
                          alt="fondo"
                        />
                        <div class="letra fuente mt-4">
                          No hay datos que mostrar en esta vista
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </template>
        <template v-slot:footer>
               <a v-if="!isComplete" class="btn btnDisabled">Guardar</a>
            <template v-else>
               <ButtonLoading v-if="ifLoad"/>
              <button
                v-else
                type="submit"
                class="btn btnNaranja"
                form="matricula"
              >
                Guardar
              </button>
            </template>
         </template>
    </ScrimModal>
</template>

<script src="./CreateMatricula1.js"></script>

<style>
.mola {
  background: #e2f1fd;
  background-image: repeating-linear-gradient(
      0deg,
      #88c8f7,
      #88c8f7 5px,
      transparent 0,
      transparent 15px,
      #88c8f7 0
    ),
    repeating-linear-gradient(
      90deg,
      #88c8f7,
      #88c8f7 5px,
      transparent 0,
      transparent 15px,
      #88c8f7 0
    ),
    repeating-linear-gradient(
      180deg,
      #88c8f7,
      #88c8f7 5px,
      transparent 0,
      transparent 15px,
      #88c8f7 0
    ),
    repeating-linear-gradient(
      270deg,
      #88c8f7,
      #88c8f7 5px,
      transparent 0,
      transparent 15px,
      #88c8f7 0
    );
  background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  min-height: 250px;
}
</style>
