<template>
  <div class="row">
     <div v-if="tabla === 'ontask'" class="altural"></div>
          <!-- MODAL-->
          <div
            class="fixed-plugin"
            :class="{ 'show repon': tabla === 'ontask' }"
          >
            <div
              class="card shadow-lg desplega"
              :class="{ repon: tabla === 'ontask' }"
              style="overflow-y: auto; z-index: 9999; "
            >
              <div
                class=" cabesa"
                style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
              >
                <div class="float-start">
                  <h5
                    style="font-weight: 400;"
                    class="mt-2 mb-0 fuente text-white"
                  >
                    Registro Docentes
                  </h5>
                  <!--  <p class="parrafo">{{nombre}}</p> -->
                </div>
                <div class="float-end mt-2">
                  <button
                     @click="$emit('myEventClosedMOdalDocente')"
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
                <!-- End Toggle Button -->
              </div>

              <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
                <!-- Sidebar Backgrounds -->
                <div class="row">
                  <Spinner v-if="ifcarga"></Spinner>
                  <div v-else class="col-lg-11 col-12 mx-auto">
                        <form @submit.prevent="save"  id="docentes">
              <!--single form panel-->
              <div v-if="tab === 'init'"
                class="p-3 border-radius-xl bg-white js-active"
                data-animation="FadeIn"
              >
                
                <p class="mb-0 text-sm fuente">Información obligatoria</p>
                <div class="multisteps-form__content">
                  <div class="row mt-4">
                    <div class="col-12">
                      <span class="parrafo">Número de Cédula</span>
                      <input
                        :class="{ error: validation.hasError('model.cedula') }"
                        v-model="model.cedula"
                       
                        class="multisteps-form__input form-control buscador fuente"
                        type="text"
                      />
                      <p class="mb-0 text-xs fuente text-danger">
                        {{ validation.firstError("model.cedula") }}
                      </p>

                    </div>
                   
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 ">
                      <span class="parrafo">Nombres Completos</span>
                      <input
                        :class="{ error: validation.hasError('model.nombres') }"
                        v-model="model.nombres"
                        class="multisteps-form__input form-control buscador fuente"
                        type="text"
                      />
                      <p class="mb-0 text-xs fuente text-danger">
                        {{ validation.firstError("model.nombres") }}
                      </p>
                    </div>
                    <div class="col-12 mt-3">
                      <span class="parrafo">Apellidos Completos</span>
                      <input
                        :class="{
                          error: validation.hasError('model.apellidos'),
                        }"
                        v-model="model.apellidos"
                        class="multisteps-form__input form-control buscador fuente"
                        type="text"
                      />
                      <p class="mb-0 text-xs fuente text-danger">
                        {{ validation.firstError("model.apellidos") }}
                      </p>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 ">
                      <span class="parrafo">Numero Teléfono</span>
                      <input
                        :class="{
                          error: validation.hasError('model.telefono buscador'),
                        }"
                        v-model="model.telefono"
                        class="multisteps-form__input form-control buscador fuente"
                        type="text"
                      />
                      <p class="mb-0 text-xs fuente text-danger">
                        {{ validation.firstError("model.telefono") }}
                      </p>
                    </div>
                     <div class="col-12 mt-3">
                      
                      <span class="parrafo">Correo Electrónico</span>
                      <input
                        :class="{ error: validation.hasError('model.email') }"
                        v-model="model.email"
                        class="multisteps-form__input form-control buscador fuente"
                        type="email"
                      />
                      <p class="mb-0 text-xs fuente text-danger">
                        {{ validation.firstError("model.email") }}
                      </p>
                    </div>
                  </div>

                  
                </div>
              </div>
              <!--single form panel-->

              <!--single form panel-->
              <div v-if="tab === 'sec'"
                class=" p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >

                <div class="multisteps-form__content">
                   <div class="row mt-2">
                    <div class="col-12 ">
                        <span class="parrafo">Nacionalidad</span>
                        <ChildNacionalidad
                          :modeloNacion="model.fknacionalidad"
                          @ComponentChildNacion="objetoNacion = $event"
                        />
                      </div>
                    <div class="col-12 mt-3">
                      <span class="parrafo">Parroquia donde nació</span>
                         <v-select class="style-chooser"   :class="{
                          error: validation.hasError('model.fkparroquia'),
                        }"
                         :options="listParroquia" label="nombre" item-value="nombre" v-model="model.fkparroquia" required>
                      <template #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                      <p class="mb-0 text-xs fuente text-danger">
                        {{ validation.firstError("model.fkparroquia") }}
                      </p>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 ">
                        <span class="parrafo">Etnia</span>
                        <ChildEtnia
                          :modeloEtnia="model.fketnia"
                          @ComponentChildEtnia="objetoEtnia = $event"
                        />
                      </div>
                     <div class="col-12 mt-3">
                        <span class="parrafo">Género</span>
                        <ChildSexo
                          :modelo="model.sexo"
                          @ComponentChildSexo="objetoSexos = $event"
                        />
                      </div>
                    
                  </div>
                  <div class="row mt-3">

                      <div class="col-12 ">
                      <span class="parrafo">Título Actual</span>
                        <textarea
                        v-model="model.titulo"
                        class="multisteps-form__input form-control fuente"
                        type="text"
                        required
                      />
                    </div>
                    <div class="col-12 mt-4">
                       <span class="parrafo">Activar estado para que se configure su cuenta</span>

                      <div class="form-check">
                        <input
                          v-model="model.status"
                          class="form-check-input cheka"
                          style="font-size:20px;"
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

              <!--single form panel-->
            </form>
                  </div>
                </div>
              </div>
              <div class="cord-footer modalFooter" >
                 <div class="text-end">
                    <div v-if="tab === 'init'">
                           <a
                        class="btn btnNaranja " 
                        @click="tab = 'sec'"
                      >
                        <span class="me-2">Siguiente</span>
              <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1.1em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>

                      </a>
                    </div>
                    <div v-if="tab === 'sec'">
                       <a
                        class="btn btnNaranjaClaro"
                       @click="tab = 'init'"
                      >
                      <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1.1em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                       <span class="ms-2">Volver</span>
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
                      id="addRowButton"
                      class="btn btnNaranja"
                      form="docentes"
                    >
                      {{
                        model._id ? "Actualizar" : " Guardar"
                      }}
                    </button>
                    </div>
                     
                    </div>
              </div>
            </div>
          </div>
  </div>
</template>
<script src="./CreateOrUpdateDoc.js"></script>
