<template>
  <div>
    <div v-if="tab === 'iniciar'" class="altural"></div>
    <div class="fixed-plugin" :class="{ 'show reponv2': tab === 'iniciar' }">
      <a
        @click="tab = 'init1'"
        class="fixed-plugin-button text-dark position-fixed px-3 py-2"
        style="background-color: rgb(14, 114, 237);"
      >
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div
        class="card shadow-lg desplega"
        :class="{ reponv2: tab === 'iniciar' }"
        style="overflow-y: auto; z-index: 9999;"
      >
        <div
          class=" cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h4 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Crear aulas virtuales
            </h4>
          </div>
          <div class="float-end mt-2">
            <router-link
              to="/aulas-lista"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close text-white"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
          <div class="row">
            <div class="col-lg-10 col-12 mx-auto">
              <form @submit.prevent="save" id="aulas">
                <div class="row mt-2">
                  <div class="col-6">
                    <p class="parrafo">Nombre de Curso</p>
                    <input
                      :class="{ error: validation.hasError('model.nombre') }"
                      v-model="model.nombre"
                      class="form-control buscador fuente"
                      type="text"
                      placeholder="Octavo de Básica"
                    />
                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.nombre") }}
                    </p>
                  </div>
                  <div class="col-6 ">
                    <p class="parrafo">Materia</p>
                    <input
                      :class="{ error: validation.hasError('model.materia') }"
                      v-model="model.materia"
                      class="form-control buscador fuente"
                      type="text"
                    />
                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.materia") }}
                    </p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-6">
                    <p class="parrafo ">A que Modalidad Pertenece?</p>
                    <select
                      :class="{
                        error: validation.hasError('model.icono'),
                      }"
                      v-model="model.icono"
                      class="form-control buscador"
                      required
                    >
                      <option value="Intensivo">Intensivo</option>
                      <option value="Extraordinaria">Extraordinaria</option>
                    </select>
                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.icono") }}
                    </p>
                  </div>
                  <div class="col-6">
                    <p class="parrafo">Código de acceso</p>
                    <input
                      :class="{ error: validation.hasError('model.codigo') }"
                      v-model="model.codigo"
                      class="form-control buscador fuente"
                      type="text"
                     
                    />
                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.codigo") }}
                    </p>
                  </div>
                </div>

                <div class="mt-4">
                  <p class="parrafo">Que aprenderán en este Curso?</p>
                  <vue-editor
                    id="editor"
                    :class="{ error: validation.hasError('model.descripcion') }"
                    v-model="model.descripcion"
                    :editorToolbar="customToolbar"
                    class="fuente"
                  >
                  </vue-editor>
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.descripcion") }}
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
        <div
          class="modalFooter"
         
        >
          <div class="text-end">

              <router-link
                class="btn btnNaranjaClaro" to="/aulas-lista">
                <i class="ni ni-bold-left"></i> &nbsp; Volver
              </router-link>
              &nbsp; &nbsp;
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
             
                <button v-else
                type="submit"
                id="addRowButton"
                class="btn btnNaranja"
                form="aulas"
              >
                Guardar
              </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./AulaCreate.js"></script>

<style></style>
