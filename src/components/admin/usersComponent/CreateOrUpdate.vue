<template>
  <div class="row">

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
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Registro Usuario
            </h5>
            <!--  <p class="parrafo">{{nombre}}</p> -->
          </div>
          <div class="float-end mt-2">
            <a
              @click="$emit('myEventClosedMOdalUser')"
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
            </a>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
          <div class="row">
            <Spinner v-if="isedit"></Spinner>
            <div v-else class="col-lg-11 col-12 mx-auto">
              <form @submit.prevent="save" id="usuarios">
                <!--single form panel-->
                <div
                  v-if="tab === 'init'"
                  class="p-3 border-radius-xl bg-white js-active"
                  data-animation="FadeIn"
                >

                 
                  <div class="multisteps-form__content">
                    <div class="row mt-1">
                      <div class="col-12 ">
                        <span class="parrafo">Número de Cédula</span>
                        <input
                          :class="{
                            error: validation.hasError('model.cedula'),
                          }"
                          v-model="model.cedula"
                          class="multisteps-form__input form-control buscador"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.cedula") }}
                        </p>
                      </div>
                      <div class="col-12 mt-3">
                        <span class="parrafo">Correo Electrónico</span>
                        <input
                          :class="{ error: validation.hasError('model.email') }"
                          v-model="model.email"
                          class="multisteps-form__input form-control buscador"
                          type="email"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.email") }}
                        </p>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-12 ">
                        <span class="parrafo">Nombres Completos</span>
                        <input
                          :class="{
                            error: validation.hasError('model.nombres'),
                          }"
                          v-model="model.nombres"
                          class="multisteps-form__input form-control buscador"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
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
                          class="multisteps-form__input form-control buscador"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.apellidos") }}
                        </p>
                      </div>
                    </div>
                    
                      <div class="mt-3">
                        <span class="parrafo">Numero de teléfono</span>
                        <input
                          :class="{
                            error: validation.hasError('model.telefono'),
                          }"
                          v-model="model.telefono"
                          class="multisteps-form__input form-control buscador"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.telefono") }}
                        </p>
                      </div>
                     
                     <div class="row mt-3">
                          <span class="parrafo">Rol</span>
                      <div class="col-12" v-for="ite in listRol" :key="ite._id">
                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            v-model="checked"
                            type="radio"
                            name="ite._id"
                            :id="ite._id"
                            :value="ite._id"
                          />
                          <a class="parrafo " for="ite._id">
                            {{ ite.name }}</a
                          >
                        </div>
                      </div>
                    </div>
                     <div class="mt-2">
                        <span class="parrafo">Activar estado</span>
                        <div class="form-check">
                          <input
                            v-model="model.status"
                            class="form-check-input cheka"
                            type="checkbox"
                            style="font-size:20px; "
                            id="checkbox"
                            value="1"
                            v-bind:true-value="1"
                            v-bind:false-value="0"
                          />

                        </div>
                      </div>
                    
                  </div>
                </div>
                <!--single form panel-->

               
              </form>
            </div>
          </div>
        </div>
        <div
          class="cord-footer modalFooter"
         
        >
          <div class="text-end">
            <div v-if="tab === 'init'">
                 <a
                class="btn btnNaranjaClaro"
               
                @click="$emit('myEventClosedMOdalUser')"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
              <button
                v-if="ifLoad"
                class="btn  btnNaranja"
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
                form="usuarios"
              >
                {{
                  model._id ? " Actualizar" : "Guardar"
                }}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./CreateOrUpdate.js"></script>
