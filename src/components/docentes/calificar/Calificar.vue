<template>
  <div>
    <div class="row">
      <div class="col-lg-11 col-12 mx-auto">
        <div
          class="mt-1"
          style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p
              class="text-dark fuente "
              style="margin:7px;font-weight: 700; font-size: 16px "
            >
              <a @click="$router.go(-1)" class="badge fuente regresar" style="">
                <i class="ni ni-bold-left"></i>&nbsp;Regresar</a
              >
              &nbsp;&nbsp; &nbsp;&nbsp; Despues de registrar los dos semestres
              confirme la notas. {{ mate }}
            </p>
          </div>
        </div>
        <p class="parrafo mt-3">
          Registre las notas a los estudiantes cada semestre .
        </p>
      </div>
    </div>

    <div class="row">
      <Spinner v-if="isData"></Spinner>
      <div v-else class="col-lg-11 col-12 mx-auto mt-4">
        <div class="row">
          <div class="col-lg-4">
            <div class="input-group">
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
          </div>
          <div class="col-lg-8 text-end">
            <a
              class="btn btn-sm btnNaranja "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Descargar Lista
            </a>
          </div>
        </div>

        <div class="card mb-4">
          
          <div  class="card-body px-0 pt-0 pb-2">
            <div v-if="!info.length">
              <div class="freemeeting-tip mt-3">
                <p class="text-sm text-dark">
                  <strong>Nota: </strong>
                  Aún no existen estudiantes en este curso 😢, Puedes preguntar al asistente virtual 😍
                </p>
              </div>
              <div class="row mt-3">
                <div class="col-lg-9 col-12 mx-auto">
                  <div class="text-center">
                    <img
                      class="w-35"
                      src="../../../assets/img/logs/lupa.svg"
                      alt="fondo"
                    />
                    <div class="letra fuente mt-3">
                      No hay datos que mostrar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="table-responsive p-0 mt-3">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr class="cabeza">
                    <th
                      style="background-color: rgb(234, 240, 246); "
                      class="text-uppercase text-secondary text-xxs "
                    >
                      Estudiante
                    </th>
                    <th class="text-uppercase text-secondary text-xxs ">
                      Quim 1
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Quim 2
                    </th>

                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultQuery" :key="item.id" :vars="(aux = 0)">
                    <td>
                      <div class="d-flex px-3 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <p class="mb-0 text-dark text-sm fuente">
                            {{ item.fkestudiante.apellidos }}
                            {{ item.fkestudiante.nombres }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div v-if="item.notas.length">
                        <div v-for="not in item.notas" :key="not.id">
                          <div
                            v-if="not.materia == mate && not.quimestre == 'p1'"
                          ><!-- @click="DetalleNotas(not, item._id)" -->
                            <a
                              
                              style="cursor: pointer;"
                             
                              class="text-sm text-dark  fuente"
                              >{{ not.promedio }}</a
                            >
                            <div :vars="(aux = aux + 1)"></div>
                          </div>
                        </div>
                      </div>
                      <p
                        v-else
                        class="text-xs text-danger font-weight-bold mb-0"
                      >
                        S/N
                      </p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <div v-if="item.notas.length">
                        <div v-for="not in item.notas" :key="not.id">
                          <div
                            v-if="not.materia == mate && not.quimestre == 'p2'"
                          >
                          <!--  @click="DetalleNotas(not, this)" -->
                            <a
                             
                              style="cursor: pointer;"
                              class="text-sm text-dark  fuente"
                              >{{ not.promedio }}</a
                            >
                            <div :vars="(aux = aux + 1)"></div>
                          </div>
                        </div>
                      </div>
                      <p
                        v-else
                        class="text-xs text-danger font-weight-bold mb-0"
                      >
                        S/N
                      </p>
                    </td>
                    <td class="align-middle text-end">
                      <a
                        v-if="aux < 2"
                        @click="OptenerMatricula(item, this)"
                        style="cursor: pointer;"
                        
                        class="badge badge-sm bg-gradient-dark"
                        >Subir Nota</a
                      >
                      <div v-else>
                        <div
                          v-if="item.confirmar.length"
                          :vars="(isconfirmar = 0)"
                        >
                          <div v-for="con in item.confirmar" :key="con.id">
                            <div v-if="con.materia == mate">
                              <p class="text-success text-xs">
                                Promedio:
                                <b class="text-dark text-sm">
                                  {{ con.promedio }}</b
                                >
                              </p>
                              <div
                                :vars="(isconfirmar = isconfirmar + 1)"
                              ></div>
                            </div>
                          </div>
                          <div v-if="isconfirmar == 0">
                            <a
                              @click="ConfirmarNota(item, this)"
                              style="cursor: pointer;"
                              class="badge badge-sm bg-gradient-info"
                              >Confirmar</a
                            >
                          </div>
                        </div>
                        <div v-else>
                          <a
                            @click="ConfirmarNota(item, this)"
                            style="cursor: pointer;"
                            class="badge badge-sm bg-gradient-info"
                            >Confirmar</a
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->


    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicios' }">
   
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': tab === 'inicios' }"
        style="overflow-y: auto; z-index: 9999; top:35px;"
      >
        <div
          class="card-header pb-0 pt-3 "
          style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-3 mb-0  fuente">
              Registre Notas de {{ mate }} a {{isAlumno }} 😊
               
            </h5>
           
          </div>
          <div class="float-end mt-4">
            <button
              @click="tab = 'init'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </button>
            
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" >
          <!-- Sidebar Backgrounds -->

          <div class="row">
            <div class="col-lg-3 
                 
                  d-md-block d-none
                  me-n8" style="position:absolute;bottom:0;left:0;">
                   <div class="top-10" style="">
                            <img
                class=""
                src="../../../assets/img/logos/fondoDerecho.svg"
                alt="fondo"
              />
                  </div>
            </div>
            <div class="col-lg-4 col-12 mx-auto">
              <form @submit.prevent="save">
                <div class="row mt-4" v-if="isVisible === 'pane1'">
                  <p class="h5 text-center fuente">Primer Parcial</p>
                  <p class="parrafo mt-2">Aporte 1</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte11'),
                      }"
                      v-model="model.notas.aporte11"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte11") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 2</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte12'),
                      }"
                      v-model="model.notas.aporte12"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.aporte12") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 3</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte13'),
                      }"
                      v-model="model.notas.aporte13"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte13") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 4</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte14'),
                      }"
                      v-model="model.notas.aporte14"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte14") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 5</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte15'),
                      }"
                      v-model="model.notas.aporte15"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte15") }}
                    </p>
                  </div>
                  <div class="text-end mt-2">
                    <a class="parrafo text-start">Paso 1 de 4</a> &nbsp; &nbsp;
                    &nbsp;
                    <a
                      class="btn btn-sm btnNaranja"
                      @click="isVisible = 'pane2'"
                    >
                      Siguiente
                    </a>
                  </div>
                </div>
                <div class="row mt-4" v-if="isVisible === 'pane2'">
                  <p class="h5 text-center fuente">Segundo Parcial</p>
                  <p class="parrafo mt-2">Aporte 1</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte21'),
                      }"
                      v-model="model.notas.aporte21"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte21") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 2</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte22'),
                      }"
                      v-model="model.notas.aporte22"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.aporte22") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 3</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte23'),
                      }"
                      v-model="model.notas.aporte23"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte23") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 4</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte24'),
                      }"
                      v-model="model.notas.aporte24"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte24") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 5</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte25'),
                      }"
                      v-model="model.notas.aporte25"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte25") }}
                    </p>
                  </div>
                  <div class="text-end mt-2">
                    <a class="parrafo text-start">Paso 2 de 4</a> &nbsp; &nbsp;
                    &nbsp;
                    <a
                      @click="isVisible = 'pane1'"
                      type="button"
                      class="btn btn-sm "
                      style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                    >
                      Regresar
                    </a>
                    &nbsp;
                    <a
                      class="btn btn-sm btnNaranja"
                      @click="isVisible = 'pane3'"
                    >
                      Siguiente
                    </a>
                  </div>
                </div>
                <div class="row mt-4" v-if="isVisible === 'pane3'">
                  <p class="h5 text-center fuente">Tercer Parcial</p>
                  <p class="parrafo mt-2">Aporte 1</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte31'),
                      }"
                      v-model="model.notas.aporte31"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte31") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 2</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte32'),
                      }"
                      v-model="model.notas.aporte32"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.aporte32") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 3</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte33'),
                      }"
                      v-model="model.notas.aporte33"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte33") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 4</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte34'),
                      }"
                      v-model="model.notas.aporte34"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte34") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">Aporte 5</p>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.aporte35'),
                      }"
                      v-model="model.notas.aporte35"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.aporte35") }}
                    </p>
                  </div>
                  <div class="text-end mt-2">
                    <a class="parrafo text-start">Paso 3 de 4</a> &nbsp; &nbsp;
                    &nbsp;
                    <a
                      @click="isVisible = 'pane2'"
                      type="button"
                      class="btn btn-sm "
                      style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                    >
                      Regresar
                    </a>
                    &nbsp;
                    <a
                      class="btn btn-sm btnNaranja"
                      @click="isVisible = 'pane4'"
                    >
                      Siguiente
                    </a>
                  </div>
                </div>
                <div class="row mt-4" v-if="isVisible === 'pane4'">
                  <p class="h5 text-center fuente">Examen Final</p>
                  <p class="parrafo mt-2">Nota examen</p>
                  <div class="col-12">
                    <input
                      :class="{
                        error: validation.hasError('model.notas.examen'),
                      }"
                      v-model="model.notas.examen"
                      class="form-control buscador"
                      type="text"
                      required
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.notas.examen") }}
                    </p>
                  </div>
                  <p class="parrafo mt-2">A que Quimestre Pertenece?</p>
                  <div class="col-12 ">
                    <select
                      :class="{
                        error: validation.hasError('model.notas.quimestre'),
                      }"
                      v-model="model.notas.quimestre"
                      class="form-control buscador"
                      required
                    >
                      <option value="p1">Primer Quimestre</option>
                      <option value="p2">Segundo Quimestre</option>
                    </select>
                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.notas.quimestre") }}
                    </p>
                  </div>

                  <div class="text-end mt-4">
                    <a class="parrafo text-start">Paso 4 de 4</a> &nbsp; &nbsp;
                    &nbsp;
                    <a
                      @click="isVisible = 'pane3'"
                      type="button"
                      class="btn btn-sm "
                      style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                    >
                      Regresar
                    </a>
                    &nbsp;
                    <button
                    v-if="ifLoad"
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
                  <button v-else class="btn btn-sm btnNaranja">
                    Guardar 
                  </button>
                 
                  </div>
                  <div v-if="isDoble" class="mt-4">
                    <div class="freemeeting-tip">
                <p class="text-sm text-dark fuente">
                  Creo que perdiste el rumbo, revisa nuevamente las notas ya que dichas notas no las puedo procesar tal vez te falto
                  un campo o ingresaste mal una nota con decimal. 😉😉
                </p>
              </div>
                  </div>
                   <div v-if="isDuplicado" class="mt-4">
                    <div class="freemeeting-tip">
                <p class="text-sm text-dark fuente">
                  Tal parece que este estudiante ya tiene registrado una nota en este quimestre, 
                  intenta con otro. 😉😉
                </p>
              </div>
                  </div>
                </div>
              </form>
              <div class="row mt-4" v-if="isVisible === 'pane5'">
                <p class="h6 text-center fuente">Exelente</p>
                  
                <div class="col-12">
                  <div class="text-center ">
                    <img
                      class="w-40"
                      src="../../../assets/img/logs/success.svg"
                      alt="fondo"
                    />
                    
                  </div>
                </div>

                <div class="text-center mt-4">
                 
                 
                  <a @click="tab = 'salir'" class="btn btn-sm btnNaranja">
                    Salir de Aqui
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 d-md-block d-none" style="position:absolute;bottom:0;right:0;">
              
                   
                    
                      <div >
                                       <img
                class=""
                src="../../../assets/img/logos/fondoIzquierdo.svg"
                alt="fondo"
              />
                      </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Calificar.js"></script>
<style>
.freemeeting-tip {
  border-radius: 3px;
  background-color: rgba(254, 116, 37, 0.1);
  border: solid 1px #fe7425;
  padding: 15px;
  margin-top: -8px;
}
</style>
