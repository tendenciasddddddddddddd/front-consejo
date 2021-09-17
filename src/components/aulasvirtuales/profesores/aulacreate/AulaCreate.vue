<template>
  <div>
     
      <div class="fixed-plugin" :class="{ 'show w-100': tab === 'iniciar' }">
      <a @click="tab = 'init1'" class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: rgb(14, 114, 237);">
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div  class="card shadow-lg blur desplega"  :class="{ 'w-100': tab === 'iniciar' }"
      style="overflow-y: auto; z-index: 9999; top:35px;">
        <div class="card-header pb-0 pt-3  bg-transparent " style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;">
          <div class="float-start">
             <h5 style="font-weight: 400;" class="mt-3 mb-0 fuente">
              Crear Aula Virtual 😊
            </h5>
          </div>
          <div class="float-end mt-4">
            <router-link to="/aulas-lista"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>
        
        <div class="card-body pt-sm-3 pt-0">
          <div class="row">
            <div class="col-lg-5 col-12 mx-auto">
                 <form @submit.prevent="save" >
                     
            <div class="row mt-2">
              <div class="col-6">
                <p class="parrafo">Nombre de Curso</p>
                <input :class="{ error: validation.hasError('model.nombre') }"
                        v-model="model.nombre"
                class="form-control buscador fuente" type="text" placeholder="Octavo" >
              <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.nombre") }}
                      </p>
              </div>
              <div class="col-6 ">
                    <p class="parrafo">Materia</p>
                <input :class="{ error: validation.hasError('model.materia') }"
                        v-model="model.materia"
                 class="form-control buscador fuente" type="text" >
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
               <p class="parrafo">Codigo de acceso</p>
                <input :class="{ error: validation.hasError('model.codigo') }"
                        v-model="model.codigo"
                class="form-control buscador fuente" type="text" >
                <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.codigo") }}
                      </p>
            </div>
            </div>
           
             <div class="mt-4">
                 <p class="parrafo">Que aprenderan en este Curso?</p>
                   <vue-editor id="editor"
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
            
            
            <div class="text-end">
              <router-link to="/aulas-lista"  name="button" class="btn btn-sm mt-3" style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;">Cancelar</router-link>
                 <button v-if="ifLoad"
                      class="btn btn-sm btnNaranja m-0 ms-2"
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
              <button v-else type="submit" name="button" class="btn btn-sm btnNaranja m-0 ms-2">Crear Curso</button>
            </div>
           
         
           
             </form>
           </div>
           <div class="col-lg-4">
              <div class="text-center">
                            <img
                class="w-100"
                src="../../../../assets/img/shapes/lista.svg"
                alt="fondo"
              />
                  </div>
                  <div class="" style="  margin-top:-40px">
                            <img
                class=""
                src="../../../../assets/img/logos/fondoIzquierdo.svg"
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

<script src="./AulaCreate.js"></script>

<style>

</style>