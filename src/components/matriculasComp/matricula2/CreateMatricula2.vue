<template>
  <div>
    <div
      class="fixed-plugin"
      :class="{ 'show w-100': tab === 'init1' }"
      style="   
   "
    >
      <a
        @click="tab = 'init1'"
        class="fixed-plugin-button text-dark position-fixed px-3 py-2"
        style="background-color: rgb(14, 114, 237);"
      >
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div
        class="card shadow-lg blur desplega "
        :class="{ 'w-100': tab === 'init1' }"
        style="overflow-y: auto; z-index: 9999; 
    "
      >
         <div
          class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 50px;
         padding: 4px 40px 4px 40px;background-color: #253342;"
        >
        <div class="row">
         
         <div class="col-lg-10">
             <h5 style="font-weight: 400" class="mt-3 ms-5 mb-0 fuente text-white text-center">
                  Filtrar a los estudiantes por su nombre o apellido para la matricula
              </h5>
         </div>
         <div class="col-lg-2">
             <div class="text-end mt-2">
            <button
               @click="$emit('myEventClosedModalMatricula2')"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
             <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
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
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#ffffff">
                        <path
                          d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                        ></path>
                      </g>
                    </g>
                  </svg>
            </button>
          </div>
         </div>
        </div>
          
          <!-- End Toggle Button -->
        </div>
    

        <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
          <!-- Sidebar Backgrounds -->
          <div class="row">
           
            <div class="col-lg-11 col-12 mx-auto">
              <div class="row">
                
                <div v-if="visible == 'uno'" class="col-lg-6 col-12 mx-auto">
                  <div class="row">
                    <div class="input-group mt-3">
                      <span class="input-group-text text-body buscador"
                        ><i class="fas fa-search" aria-hidden="true"></i
                      ></span>
                      <input
                        type="text"
                        v-model="searchQuery"
                        class="form-control buscador"
                        placeholder="Buscar"
                      />
                    </div>
                     <Spinner v-if="isLoading"></Spinner>
                    <div v-else class="mt-4">
                      <div v-if="resultQuery"> 
                        <div class="row" v-for="item in resultQuery.slice(0, 6)" :key="item._id">
                        <div class="d-flex ms-3">
                        <div class="form-check my-auto">
                          <input
                            class="form-check-input cheka"
                            type="checkbox"
                            @click="selectUser(item)"
                          />
                        </div>
                        <div class="d-flex px-2 py-1 ms-4">
                          <div>
                            <img
                              :src="item.foto"
                              class="avatar avatar-sm me-3"
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
                              ></span>
                              <span
                                class="text-xs text-center font-weight-normal fuente"
                                >{{ item.email }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>


                             <hr class="horizontal dark mt-4 mb-0" />
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
                      Buscar por el nombre o apellidos
                    </div>
                  </div>
                </div>
              </div>
            </div>
                    </div>
                  </div>
                  
                </div>
  
                <div v-if="visible == 'dos'" class="col-lg-6 col-12 mx-auto">
                    <div class="mt-4">
                    <div class="d-flex px-2 py-1 ">
                          <div>
                            <img
                              :src="foto"
                              class="avatar avatar-xxl me-3"
                              alt="avatar image"
                              style="    border-radius: 50%;"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <b
                              class="mb-0 h5  fuente"
                              style="color: #33475b;font-weight: 400;"
                              >{{ model.nombre }}</b
                            >
                            <div>
                              <span
                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                              ></span>
                              <span
                                class="text-xs text-center font-weight-normal fuente"
                                >Usuario de sistema</span
                              >
                            </div>
                          </div>
                        </div>
                  </div>

                  <form @submit.prevent="save" id="matricula">
                    <Spinner v-if="isLoading2"></Spinner>
                    <div v-else class="col-12 mt-4">
                      <a class="parrafo mt-3">Cursos</a>
                      <v-select
                        :class="{ error: validation.hasError('model.fknivel') }"
                        :options.sync="listniveles"
                        label="nombres"
                        v-model="model.fknivel"
                        required
                      >
                        <template #option="{ nombres }">
                          <h6 style="margin: 0">{{ nombres }}</h6>
                        </template>
                        <template #no-options="{ }">
                          Lo siento, no hay opciones de coincidencia.
                        </template>
                      </v-select>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fknivel") }}
                      </p>
                    </div>

                    <Spinner v-if="isLoading1"></Spinner>
                    <div v-else class="col-12 mt-4">
                      <p class="parrafo">Periodo</p>
                      <v-select
                        :class="{
                          error: validation.hasError('model.academico'),
                        }"
                        :options.sync="listPeriodo"
                        @input="checkExist($event)"
                        label="nombre"
                        v-model="model.academico"
                        required
                      >
                        <template #option="{ nombre }">
                          <h6 style="margin: 0">{{ nombre }}</h6>
                        </template>
                        <template #no-options="{ }">
                          Lo siento, no hay opciones de coincidencia.
                        </template>
                      </v-select>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.academico") }}
                      </p>
                    </div>

                    <div class="row mt-4">
                      <IsSelect v-if="ifLoad1"></IsSelect>
                      <div v-else class="col-6">
                        <p class="parrafo">Número matricula</p>

                        <input
                          :class="{
                            error: validation.hasError('model.nmatricula'),
                          }"
                          class="form-control buscador"
                          type="number"
                          v-model="model.nmatricula"
                          readonly
                          required
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.nmatricula") }}
                        </p>
                      </div>
                      <IsSelect v-if="ifLoad1"></IsSelect>
                      <div v-else class="col-6">
                        <p class="parrafo">Folio</p>
                        <input
                          :class="{ error: validation.hasError('model.folio') }"
                          class="form-control buscador"
                          type="number"
                          v-model="model.folio"
                          readonly
                          required
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.folio") }}
                        </p>
                      </div>
                    </div>
                    <div
                    v-if="isDuplicado"
                    class="mt-5 alerta"
                    style=" padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
                  >
                    <div>
                      <p class="text-sm " style="margin:7px; ">
                        <strong>Error:</strong>
                        Este Estudiante ya se encuentra matriculado en este
                        periodo academico
                      </p>
                    </div>
                  </div>

                    
                  </form>
                </div>

              </div>
            </div>
           
          </div>

          <!-- Navbar Fixed -->
        </div>
         <div class="modalFooter" >
                 <div class="text-end">
                    <div v-if="visible == 'uno'">
                           <a v-if="isSelecUsers.length === 1"
                        class="btn btnNaranja " 
                        @click="nextO()"
                      >
                        Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                      </a>
                      <a v-else
                        class="btn btnDisabled" 
                       
                      >
                        Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                      </a>
                    </div>
                    <div v-if="visible == 'dos'">
                       <a
                        class="btn btnNaranjaClaro"
                       
                       @click="regresar()"
                      >
                      <i class="ni ni-bold-left"></i> &nbsp; Vulver
                      </a>
                      &nbsp; &nbsp;
                           <button v-if="ifLoad"
                      class="btn btn-sm btnNaranja"
                      type="button"
                      disabled
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Enviando...
                    </button>
                    <button v-else
                      type="submit"
                      class="btn btnNaranja"
                      form="matricula"
                    >
                     Guardar
                    </button>
                    </div>
                     
                    </div>
              </div>
      </div>
    </div>
  </div>
</template>

<script src="./CreateMatricula2.js"></script>
