<template>
  <div>
    <div v-if="tabla === 'ontask'" class="altural"></div>
    <!-- MODAL-->
    <div class="fixed-plugin" :class="{ 'show repon': tabla === 'ontask' }">
      <div
        class="card shadow-lg desplega"
        :class="{ repon: tabla === 'ontask' }"
        style="overflow-y: auto; z-index: 9999; "
      >
        <div
          class=" cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 58px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-3 mb-0 fuente text-white">
              Registro Estudiates
            </h5>
            <!--  <p class="parrafo">{{nombre}}</p> -->
          </div>
          <div class="float-end mt-2">
            <router-link
              to="/List-Estudiate"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 30px;" class="fa fa-close text-white"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
          <!-- Sidebar Backgrounds -->
          <div class="row">
            <Spinner v-if="ifcarga"></Spinner>
            <div v-else class="col-lg-12 col-12 mx-auto">
              <!--single form panel-->
              <div v-if="tab === 'options'">
                <h5 class="font-weight-bolder mb-0 fuente mt-4">
                  Crea nuevos usuarios, uno a la vez.
                </h5>
                <p class="parrafo mt-2">
                  Agrega un nuevo usuario al sistema con una dirección de correo
                  electrónico.
                </p>
                <div class="w-60">
                  <p class="parrafo">Agregar direccion de correo</p>
                  <input
                    v-model="model.email"
                    class="multisteps-form__input form-control buscador fuente"
                    type="email"
                    @input="onChange"
                  />
                </div>
                <div class="mt-5">
                  <hr />
                  <h5 class="font-weight-bolder mb-0 fuente mt-2">
                    O crea múltiples usuarios a la vez.
                  </h5>
                  <div
                    class="csvv w-50 text-center mt-3"
                    style="max-width: 200px;"
                  >
                    <a
                      href="javascript:;"
                      @click="openInport()"
                      style="padding:10px;"
                    >
                      <img
                        class="w-75"
                        src="../../../assets/img/logs/hoja.svg"
                        alt="fondo"
                      />
                      <p style="font-size: 16px;" class="fuente mt-3">
                        Archivo TXT
                      </p>
                      <span class="fuente text-xs"
                        >Carga un archivo TXT o un archivo de texto simple en
                        formato TXT</span
                      >
                    </a>
                  </div>
                </div>
              </div>
              <!--single form panel-->
              <div v-if="tab === 'inport'">
                <h5 class="font-weight-bolder mb-0 fuente mt-4">
                  Elige un archivo para importarlo
                </h5>
                <p class="parrafo mt-2">
                  Para importar varios contactos a la vez (100), tu archivo debe ser
                  un TXT. Solo necesitas tener columnas con la información
                  básica.
                </p>

                <div class="mt-5">
                  <vue-dropzone
                    class="mt-5"
                    style="height:200px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                    ref="dropzone"
                    @vdropzone-complete="afterComplete"
                    id="drop1"
                    :options="dropOptions"
                  >
                  </vue-dropzone>
                  <p class="parrafo text-danger mt-3">{{ isError }}</p>
                  <div>
                    <span class="parrafo">Número de filas: {{ rows }}</span>
                    <br />
                    <a
                      class="fuente tamanio links mt-3"
                      href="javascript:;"
                      @click="removeAllFiles()"
                    >
                      <b>Limpiar archivos cargados</b>
                    </a>
                  </div>
                </div>
              </div>
              <div v-if="tab == 'ViewInport'">
                <h5 class=" mb-0 fuente mt-4" style="font-weight: 400;">
                  Registra a los estudiantes a la plataforma.
                </h5>
                <div class="mt-3 scrorable alertinfo">
                  <v-select
                    v-model="isData"
                    multiple
                    :options="isData"
                    label="email"
                    item-value="email"
                  >
                    <template #option="{ email }">
                      <h6 style="margin: 0">{{ email }}</h6>
                    </template>
                    <template #no-options="{ }">
                      Lo siento, no hay opciones de coincidencia.
                    </template>
                  </v-select>
                </div>
                
                <div v-if="ifOcultar" class="loadingg">
                  <div class="inn fuente h5">
                    Aceptados  {{contador}} de {{rows}}   <span class="text-danger ">Rechazados {{ifDocumentosDuplicados}}</span>
                  </div>

                </div>
                <template v-if="ifmostrarRechasados" > 
                  <div class="alertdanger scrorable mt-2">
                      <h6 style="font-weight: 400;" class=" mb-0 fuente mt-3">
                 No procesados, es posibel que sean usuarios duplicados.
                </h6>
                  <v-select
                  class="mt-3"
                    v-model="objetosRechasados"
                    multiple
                    :options="objetosRechasados"
                    label="email"
                    item-value="email"
                  >
                    <template #option="{ email }">
                      <h6 style="margin: 0">{{ email }}</h6>
                    </template>
                    <template #no-options="{ }">
                      Lo siento, no hay opciones de coincidencia.
                    </template>
                  </v-select>
                  </div>
                 
                </template>
              </div>
              <!-- --------------------------------------------------------FORMULARIO ESTUDIANTE--------------->

              <form
                @submit.prevent="save"
                class="multisteps-form__form "
                id="estidiantes"
              >
                <div
                  v-if="tab === 'sec3'"
                  class="p-3 border-radius-xl bg-white js-active"
                  data-animation="FadeIn"
                >
                  <h5 class="font-weight-bolder mb-0 fuente">
                    {{ model._id ? "Actualizar Registro" : "Crear Registro" }}
                  </h5>
                  <div class="mt-4">
                    <div class="d-flex px-2 py-1 ">
                      <div>
                        <img
                          src="https://res.cloudinary.com/stebann/image/upload/v1634918496/default-100_namn33.webp"
                          class="avatar avatar-xl me-3"
                          alt="avatar image"
                          style="border-radius: 50%;"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <b
                          class="mb-0 h5  fuente"
                          style="color: #33475b;font-weight: 400;"
                          >{{ model.email }}</b
                        >
                        <div>
                          <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                          <span
                            class="text-xs text-center font-weight-normal fuente"
                            >Usuario de sistema</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="multisteps-form__content">
                    <div class="row mt-3">
                      <div class="col-12">
                        <p class="parrafo">Número de Cédula</p>
                        <input
                          :class="{
                            error: validation.hasError('model.cedula'),
                          }"
                          v-model="model.cedula"
                          @change="__validarCedula($event)"
                          class=" form-control buscador "
                          type="text"
                        />
                        <p class="text-xs text-info">{{ mensaje }}</p>
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.cedula") }}
                        </p>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-12">
                        <p class="parrafo">Nombres Completos</p>
                        <input
                          :class="{
                            error: validation.hasError('model.nombres'),
                          }"
                          v-model="model.nombres"
                          class="multisteps-form__input form-control buscador fuente"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.nombres") }}
                        </p>
                      </div>
                      <div class="col-12 mt-3">
                        <p class="parrafo">Apellidos Completos</p>
                        <input
                          :class="{
                            error: validation.hasError('model.apellidos'),
                          }"
                          v-model="model.apellidos"
                          class="multisteps-form__input form-control buscador fuente"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.apellidos") }}
                        </p>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-12 ">
                        <p class="parrafo">Número de Teléfono</p>
                        <input
                          :class="{
                            error: validation.hasError(
                              'model.telefono buscador'
                            ),
                          }"
                          v-model="model.telefono"
                          class="multisteps-form__input form-control buscador fuente"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.telefono") }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!--single form panel-->
                <div
                  v-if="tab === 'sec'"
                  class=" p-3 border-radius-xl bg-white"
                  data-animation="FadeIn"
                >
                  <div class="multisteps-form__content">
                    <div class="row mt-1">
                      <div class="col-12 ">
                        <p class="parrafo">Etnia</p>
                        <ChildEtnia
                          :modeloEtnia="model.fketnia"
                          @ComponentChildEtnia="objetoEtnia = $event"
                        />
                      </div>

                      <div class="col-12 mt-3">
                        <p class="parrafo">Género</p>
                        <ChildSexo
                          :modelo="model.sexo"
                          @ComponentChildSexo="objetoSexos = $event"
                        />
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-12 ">
                        <p class="parrafo">Nacionalidad</p>
                        <ChildNacionalidad
                          :modeloNacion="model.fknacionalidad"
                          @ComponentChildNacion="objetoNacion = $event"
                        />
                      </div>

                      <IsSelect v-if="isParroquia"></IsSelect>
                      <div v-else class="col-12 mt-3">
                        <p class="parrafo">Parroquia donde nació</p>
                        <v-select
                          :class="{
                            error: validation.hasError('model.fkparroquia'),
                          }"
                          :options="listParroquia"
                          label="nombre"
                          item-value="nombre"
                          v-model="model.fkparroquia"
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
                          {{ validation.firstError("model.fkparroquia") }}
                        </p>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-12 ">
                        <label class="parrafo">Modalidad de estudio</label>
                        <div class="" v-for="ite in modalidad" :key="ite.id">
                          <div class="form-check mb-3">
                            <input
                              class="form-check-input"
                              v-model="checked"
                              type="radio"
                              name="ite.id"
                              :id="ite.id"
                              :value="ite.name"
                            />
                            <a class="parrafo" :for="ite.name">
                              {{ ite.name }}</a
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mt-3 ">
                        <p class="parrafo">
                          Activar estado para que se configure su cuenta
                        </p>

                        <div class="form-check form-check-info ">
                          <input
                            v-model="model.status"
                            class="form-check-input cheka"
                            style="font-size:20px; "
                            type="checkbox"
                            id="checkbox"
                            value="1"
                            v-bind:true-value="1"
                            v-bind:false-value="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <!--single form panel-->
            </div>
          </div>
        </div>
        <div class="cord-footer modalFooter">
          <div class="text-end">
            <!--FORMULARIO CREATE OPCIONES-->
            <div v-if="tab == 'options'">
              <a v-if="valido" class="btn btnNaranja " @click="tab = 'sec3'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
              <a class="btn btnDisabled" v-else>
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <!--FORMULARIO PARTE UNO-->
            <div v-if="tab === 'sec3'">
              <a class="btn btnNaranjaClaro me-3 " @click="tab = 'options'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <a class="btn btnNaranja " @click="tab = 'sec'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <!--FORMULARIO PARTE DOS-->
            <div v-if="tab === 'sec'">
              <a class="btn btnNaranjaClaro me-3" @click="tab = 'sec3'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <button
                v-if="ifLoad"
                class="btn btnNaranja"
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
              <button
                v-else
                type="submit"
                id="addRowButton"
                class="btn btnNaranja"
                form="estidiantes"
              >
                {{ model._id ? "Actualizar" : "Guardar" }}
              </button>
            </div>
            <!--FOOD DE IMPORTACIONES XLXS -->
            <div v-if="tab === 'inport'">
              <a class="btn btnNaranjaClaro me-3" @click="tab = 'options'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <a v-if="!ifDocListo" class="btn btnDisabled ">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
              <template v-else>
                <button v-if="isProcesDoc" class="btn btnNaranja " disabled>
                  Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                </button>
                <a v-else class="btn btnNaranja " @click="createDOC()">
                  Procesar
                </a>
              </template>
            </div>
            <!--SUBMIT DATA MULTIPLE -->
            <div v-if="tab === 'ViewInport'">
              <a class="btn btnNaranjaClaro me-3" @click="tab = 'options'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <a v-if="!buttonBlock" class="btn btnNaranja" @click="sendAll2()">
                Guardar
              </a>
               <a v-else class="btn btnDisabled" >
                Listo 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./AddEstudiante.js"></script>
<style>
.scrorable {
  max-height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
.loadingg {
  position: fixed;
  z-index: 9999;
  background-color: #ffffffb3;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.inn {
  text-align: center;
  padding: 2rem;
  font-weight: 600;
}
.alertdanger{
  background-color: #fef8f0;
    border-color: #fae0b5;
    color: #33475b;    border-style: solid;
    border-width: 1px;padding: 8px 20px;
}
.alertinfo{
  background-color: rgb(234, 240, 246);
    border-color: rgb(182, 198, 214);
    color: #33475b;    border-style: solid;
    border-width: 1px;padding: 8px 20px;
}
</style>
