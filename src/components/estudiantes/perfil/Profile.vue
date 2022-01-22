<template>
  <div>
     <div class="row ">
      <div class="col-lg-11 col-12 mx-auto">
         <div class="contenidotabs">
                <a class="tabss fuente" @click="istabs=1" :class="{ 'tabsActive links': istabs=='1' }">Perfil</a>
                <a class="tabss fuente" @click="istabs=2" :class="{ 'tabsActive links': istabs=='2' }">Información general </a>
                <a class="tabss fuente" @click="limpiar()">Imagen de perfil</a>
            </div>
             <hr style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;"/>
        <p class="parrafo mt-2"><i class="ni ni-air-baloon"></i> &nbsp;Estas preferencias solo se aplican a ti.</p>
        <hr class="horizontal dark my-1"/>
      </div>
    </div>

    <div class="row mt-2" v-if="istabs=='1'">
      <div class="col-lg-11 col-12 mx-auto">
        <div class="row">
          <Spinner v-if="ifcarga"></Spinner>
          <div v-else class="col-lg-5">
            <span class="h5 fuente"> Global</span><br />
            <span class="parrafo"
              >Esto se aplica en toda la plataforma administrativa.</span
            >
            <p class="parrafo mt-4"><b>Imagen de perfil</b></p>

            <div class=" mt-3">
              <div class=" position-relative">
                <div @click="limpiar()" class="maperr avatar avatar-xl">
                  <img
                    :src="img1 ? img1 : foto"
                    class=" "
                    alt="abc"
                    style="border-radius: 50%;"
                  />
                </div>
              </div>
            </div>

            <form @submit.prevent="save" id="pefilD">
              <div class="row mt-3">
                <div class="col-sm-12">
                  <span class="parrafo">Nombres</span>
                  <input
                    :class="{ error: validation.hasError('model.nombres') }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.nombres"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.nombres") }}
                  </p>
                </div>
                <div class="col-sm-12 mt-3">
                  <span class="parrafo">Apellidos</span>
                  <input
                    :class="{
                      error: validation.hasError('model.apellidos'),
                    }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.apellidos"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.apellidos") }}
                  </p>
                </div>
                <div class="col-sm-12 mt-3">
                  <span class="parrafo">Email</span>
                  <input
                    :class="{
                      error: validation.hasError('model.email'),
                    }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.email"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.email") }}
                  </p>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 ">
                  <span class="parrafo">Parroquia</span>

                  <input
                    :class="{
                      error: validation.hasError('model.fkparroquia'),
                    }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.fkparroquia"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.fkparroquia") }}
                  </p>
                </div>
                <div class="col-sm-6 ">
                  <span class="parrafo">Etnia</span>
                  <input
                    :class="{ error: validation.hasError('model.fketnia') }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.fketnia"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.fketnia") }}
                  </p>
                </div>
              </div>
              <div class="row ">
                <div class="col-sm-12 mt-3">
                  <span class="parrafo">Teléfono</span>
                  <input
                    :class="{
                      error: validation.hasError('model.telefono'),
                    }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.telefono"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.telefono") }}
                  </p>

                </div>
                <div class="col-sm-12 mt-2">
                  <span class="parrafo">Género</span>
                  <input
                    :class="{ error: validation.hasError('model.sexo') }"
                    class="form-control buscador fuente mt-1"
                    type="text"
                    v-model="model.sexo"
                    @input="OnEdit"
                  />
                  <p class="mb-0 text-sm text-danger">
                    {{ validation.firstError("model.sexo") }}
                  </p>
                </div>
              </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>

    <div v-if="tabla === 'perfiles'" class="altural"></div>
    <div class="fixed-plugin" :class="{ 'show reponv1': tabla === 'perfiles' }">
      <div
        class="card shadow-lg desplega"
        :class="{ reponv1: tabla === 'perfiles' }"
        style="overflow-y: auto; z-index: 9999; "
      >
        <div
          class=" cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Edita tu foto de perfil
            </h5>
            <!--  <p class="parrafo">{{nombre}}</p> -->
          </div>
          <div class="float-end mt-2">
            <button
              @click="tabla = 'termina'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g></svg>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <!-- Sidebar Backgrounds -->
          <div class="row">
            <div class="alertdanger mt-4">
              <p class="parrafo">
                Tu foto de avatar es visible para todos en la plataforma y en
                cualquier contexto público tales como como el chat.
              </p>
            </div>
            <div v-if="!isFile" class="fontImg mt-4 text-center p-7">
              <i
                style="font-size:66px;"
                class="fa fa-picture-o"
                aria-hidden="true"
              ></i>
              <span
                style="cursor: pointer;"
                class="button fuente tamanio links"
                @click="$refs.file.click()"
              >
                <input
                  type="file"
                  class="btn btnNaranja"
                  ref="file"
                  @change="uploadImage($event)"
                  accept=".png, .jpg, .jpeg"
                />
                <b>Elegir una foto</b>
              </span>
            </div>
            <div v-else class="mt-3">
              <span
                style="cursor: pointer;"
                class="button fuente tamanio links"
                @click="$refs.file.click()"
              >
                <input
                  type="file"
                  class="btn btnNaranja"
                  ref="file"
                  @change="uploadImage($event)"
                  accept="image/*"
                />
                <b>Cambiar foto</b>
              </span>
              <div class="fondot mt-2">
                <cropper
                  ref="cropper"
                  class="cropper"
                  :src="image.src"
                  :stencil-component="$options.components.Stencil"
                 
                ></cropper>
              </div>
             
            </div>
          </div>
        </div>
        <div class="cord-footer modalFooter" style="">
          <div class="text-end">
            <a @click="tabla = 'termina'" class="btn btnNaranjaClaro"
              >Cancelar</a
            >

            <button v-if="!isFile" class="btn btnDisabled ms-3">
              Guardar
            </button>
            <template v-else>
              <button
                v-if="isImageUploads"
                class="btn btnNaranja ms-3"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Trabajando...
              </button>
              <button v-else class="btn btnNaranja ms-3" @click="cropImages()">
                Guardar
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isCambios" class="piepagina">
      <div class="text-end">
        <a class="btn btnNaranjaClaro me-3" @click="isCambios = false">
          Cancelar
        </a>
        <button v-if="ifLoad" class="btn btnNaranja" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Enviando...
        </button>
        <button v-else type="submit" class="btn btnNaranja" form="pefilD">
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./Profile.js"></script>


