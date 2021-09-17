<template>
  <div>
 <div class="row mt-2">
      <div
        class="col-lg-11 col-12 mx-auto"
        style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <div>
          <p class="text-sm text-dark parrafo" style="margin:7px; ">
            La información de su perfil, incluidos su nombre y foto de perfil,
            puede ser visible para otros participantes. Su nombre y dirección de
            correo electrónico también serán visibles El propietario de la
            cuenta y el sistema pueden compartir esta
            información con otras aplicaciones.
          </p>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-lg-10 col-12 mx-auto">
        <div class="row">
          <div  class="col-lg-8 ">
            <div class="text-center">
              
              <img
                class="w-50"
                src="../../../assets/img/jira/globo.svg"
                alt="fondo"
              />
             <p style="font-weight: 400;" class="h4 fuente">{{ name }}</p>
            </div>
          </div>
          <div  class="col-lg-4 ">
            <div class="text-center mt-8">
             
              <button
                @click="get()"
                class="btn btnNaranja w-95"
              >
                Editar Perfil
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
      <div class="fixed-plugin" :class="{ 'show w-100': tabla === 'perfiles' }">
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': tabla === 'perfiles' }"
        style="overflow-y: auto; z-index: 9999; top:35px;"
      >
        <div
          class="card-header pb-0 pt-3"
          style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-3 mb-0 fuente">
              Edita Tu perfil
            </h5>
            <!--  <p class="parrafo">{{nombre}}</p> -->
          </div>
          <div class="float-end mt-4">
            <button
              @click="tabla = 'termina'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
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
             <Spinner v-if="ifcarga"></Spinner>
            <div v-else class="col-lg-6 col-12 mx-auto">
              <form @submit.prevent="save">
                <div class="row mt-4" v-if="isVisible === 'pan1'">
                  <!-- <div class="text-center">
                            <img
                class="w-20"
                src="../../../assets/img/shapes/deployments-feature.svg"
                alt="fondo"
              />
                  </div> -->
                       
                  <p class="h5 text-center fuente">Fotografia</p>
                  <p class="parrafo text-center">Cambie la foto de perfil dando clic Subir Archivo, no olvide guardar cambios 😉</p>
                  <div class="text-center mt-3">
                    <Skeleton v-if="isImageUploads"></Skeleton>
                    <div v-else class=" position-relative">
                      <img
                        :src="
                          img1 ? img1 : foto
                        "
                        class="border-radius-md w-30"
                        alt="team-2"
                      />
                     
                    </div>
                  </div>
                  <div class="text-center mt-3">
                     <input
                       class="parrafo "
                        type="file"
                        accept="image/*"
                        ref="file"
                        id="file"
                        v-on:change="onChangeFileUpload()"
                      />
                  </div>
                  
                
                  <div class="text-end mt-4">
                    <a class="parrafo text-start">Paso 1 de 3</a> &nbsp; &nbsp;
                    &nbsp;
                 
                    &nbsp;
                    <a
                      class="btn btn-sm btnNaranja"
                      @click="isVisible = 'pan2'"
                    >
                      Continuar
                    </a>
                  </div>
                </div>
                  <div class="row mt-2" v-if="isVisible === 'pan2'">
                  <p class="h5 fuente">Información General</p>

                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <p class="parrafo">Nombres</p>
                      <input
                        :class="{ error: validation.hasError('model.nombres') }"
                        class="form-control buscador fuente"
                        type="text"
                        v-model="model.nombres"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.nombres") }}
                      </p>
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                       <p class="parrafo">Apellidos</p>
                      <input
                        :class="{
                          error: validation.hasError('model.apellidos'),
                        }"
                        class="form-control buscador fuente"
                        type="text"
                        v-model="model.apellidos"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.apellidos") }}
                      </p>
                    </div>
                  </div>
                  <div class="row mt-3">
                   
                    <div class="col-6">
                        <p class="parrafo">Parroquia</p>
                      
                      <input
                        :class="{
                          error: validation.hasError('model.fkparroquia'),
                        }"
                        class="form-control buscador fuente"
                        type="text"
                        v-model="model.fkparroquia"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fkparroquia") }}
                      </p>
                    </div>
                    <div class="col-6">
                      
                       <p class="parrafo">Etnia</p>
                      <input
                        :class="{ error: validation.hasError('model.fketnia') }"
                        class="form-control buscador fuente"
                        type="text"
                        v-model="model.fketnia"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fketnia") }}
                      </p>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-sm-6">
                     
                      <p class="parrafo">Teléfono</p>
                      <input
                        :class="{
                          error: validation.hasError('model.telefono'),
                        }"
                        class="form-control buscador fuente"
                        type="text"
                        v-model="model.telefono"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.telefono") }}
                      </p>
                    
                       <p class="parrafo mt-3">Descripción (Opcional)</p>
                      <!-- <p class="form-text text-muted text-xs ms-1 d-inline">
                  (optional)
                </p> -->
                      <textarea
                       
                        class="form-control"
                      >
                      </textarea>
                      
                    </div>
                    <div class="col-sm-6">
                     
                      <p class="parrafo">Genero</p>
                      <input
                        :class="{ error: validation.hasError('model.sexo') }"
                        class="form-control buscador fuente"
                        type="text"
                        v-model="model.sexo"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.sexo") }}
                      </p>
                      <p class="parrafo mt-3">Img</p>
                      <input
                        class="form-control buscador fuente"
                        type="text"
                        readonly
                        required
                        v-model="model.foto"
                      />
                    </div>
                  </div>
                
                  
                     
                  <div class="text-end mt-4">
                    <a class="parrafo text-start">Paso 2 de 3</a> &nbsp; &nbsp;
                    &nbsp;
                    <a
                      @click="isVisible = 'pan1'"
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
                    <button v-else
                      class="btn btn-sm btnNaranja"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
                <div class="row mt-4" v-if="isVisible === 'pan3'">
                  <p class="h6 text-center fuente">Felicidades</p>
                  <p class="parrafo text-center">Su registro es exitoso pero los cambios se aran 
                    efectivos la próxima vez que inicie sesión 😅.</p>
                  <div class="text-center mt-3">
                    <Skeleton v-if="isImageUploads"></Skeleton>
                    <div v-else class=" position-relative">
                      <img
                        src="../../../assets/img/shapes/success-green.svg"
                        class="border-radius-md w-40"
                        alt="team-2"
                      />
                     
                    </div>
                  </div>
               
                  
                     
                  <div class="text-end mt-4">
                    <a class="parrafo text-start">Paso 3 de 3</a> &nbsp; &nbsp;
                    &nbsp;
                 
                    &nbsp;
                    <a
                      class="btn btn-sm btnNaranja"
                      @click="tabla = 'salir'"
                    >
                     Salir de Aqui
                    </a>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg-3 d-md-block d-none
                  
                 "  style="position:absolute;bottom:0;right:0;">
                   <div class="" style="">
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

<script src="./Profile.js"></script>

<style>
div#bg {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}

</style>
