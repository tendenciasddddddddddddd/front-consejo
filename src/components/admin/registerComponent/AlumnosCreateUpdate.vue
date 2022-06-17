<template>
     <FullModal @close="close">
         <template v-slot:header> Registro de Usuario</template>
          <template v-slot:body>
            <Spinner v-if="ifcarga"></Spinner>
               <div v-else >
              <div v-if="tab === 'options'">
                <h5 class="font-weight-bolder mb-0 fuente mt-3">
                  Crea nuevos usuarios, uno a la vez.
                </h5>
                <p class="parrafo mt-2">
                  Agrega nuevo usuario con una dirección de correo
                  electrónico.
                </p>
                <div class="w-70">
                  <p class="parrafo">Agregar direccion de correo</p>
                  <input
                    v-model="model.email"
                    class="multisteps-form__input form-control buscador fuente"
                    type="email"
                    @input="onChange"
                  />
                </div>
                <div class="mt-4">
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
                 <AllUsersCsv @clickAlumnos="clickAlumnos" /> 
              </div>
              <!-- --------------------------------------------------------FORMULARIO ESTUDIANTE--------------->
              <form @submit.prevent="save" id="estidiantes">
                <div
                  v-if="tab === 'sec3'">
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
                    <span class="parrafo mt-1">Número de Cédula</span>
                        <input
                          v-model="model.cedula"
                          @change="__validarCedula($event)"
                          class=" form-control buscador "
                          type="text"
                        />
                        <p v-if="mensaje!=''" class="text-xs text-info">{{ mensaje }}</p>
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.cedula") }}
                        </p>

                        <span class="parrafo">Nombres Completos</span>
                        <CustomInput v-model="model.nombres" />
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.nombres") }}
                        </p>
                      
                        <span class="parrafo">Apellidos Completos</span>
                        <CustomInput v-model="model.apellidos" />
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.apellidos") }}
                        </p>
                       
                       <span class="parrafo">Número de Teléfono</span>
                        <CustomInput v-model="model.telefono" />
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.telefono") }}
                        </p>

                        <span class="parrafo">Etnia</span>
                        <IsSelect v-if="isEtnia"></IsSelect>
                       <Dropdown v-else v-model="model.fketnia"  :options="listEtnia"/>
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.fketnia") }}
                        </p>

                        <span class="parrafo">Género</span>
                       <Dropdown v-model="model.sexo"  :options="sexos"/>
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.sexo") }}
                        </p>

                        <span class="parrafo">Nacionalidad</span>
                        <IsSelect v-if="isNacion"></IsSelect>
                       <Dropdown v-else v-model="model.fknacionalidad"  :options="listNacionalidad"/>
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.fknacionalidad") }}
                        </p>

                         <span class="parrafo">Parroquia donde nació</span>
                        <IsSelect v-if="isParroquia"></IsSelect>
                       <Dropdown v-else v-model="model.fkparroquia"  :options="listParroquia"/>
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.fkparroquia") }}
                        </p>
                         <label class="parrafo">Modalidad de estudio</label>
                        <div class="" v-for="ite in modalidad" :key="ite.id">
                          <div class="form-check mb-1">
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
              </form>
            </div>
          </template>
          <template v-slot:footer>
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
               <ButtonLoading v-if="ifLoad"/>
                <button v-else type="submit" class="btn btnNaranja" form="estidiantes"
              >{{model._id ? " Actualizar" : "Guardar" }}
              </button>
            </div>
            <!--FOOD DE IMPORTACIONES XLXS -->
            <div v-if="tab === 'inport'">
              <a class="btn btnNaranjaClaro me-3" @click="tab = 'options'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              
            </div>
          </template>
     </FullModal>
</template>
<script src="./AlumnosCreateUpdate.js"></script>

