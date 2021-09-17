<template>
  <div class="row">
    <div class="col-12">
       <Navss

            :actualText="popular"
            :rutas="rutass"
          ></Navss>
      <div class="multisteps-form mb-1">
            
        <div class="row">
          <div class="col-12 col-lg-8 mx-auto my-4">
            <div class="multisteps-form__progress">
              
                 <button
                @click="tab = 'sec3'"
                :class="{ 'js-active': tab === 'sec3' }"
                class="multisteps-form__progress-btn fuente"
                type="button"
                title="Address"
              >
                Mas Información
              </button>
              <button
                @click="tab = 'sec'"
                :class="{ 'js-active': tab === 'sec' }"
                class="multisteps-form__progress-btn fuente"
                type="button"
                title="Address"
              >
                Ubicación
              </button>
                 <button
                @click="tab = 'sec2'"
                :class="{ 'js-active': tab === 'sec2' }"
                class="multisteps-form__progress-btn fuente"
                type="button"
                title="Address"
              >
                Mas Información
              </button>
           
            </div>
          </div>
        </div>
        <!--form panels-->
        <Spinner v-if="ifcarga"></Spinner>
        <div v-else class="row">
          <div class="col-12 col-lg-8 m-auto mol">
            <form @submit.prevent="save" class="multisteps-form__form ">
              <!--single form panel-->
              
              <!--single form panel-->
               <div
                v-if="tab === 'sec3'"
                class="p-3 border-radius-xl bg-white js-active"
                data-animation="FadeIn"
              >
                <h5 class="font-weight-bolder mb-0 fuente">
                  {{ model._id ? "Actualizar Registro" : "Crear Registro" }}
                </h5>
                
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col-12">
                      <p class="parrafo">Cedula</p>
                      <input
                        :class="{ error: validation.hasError('model.cedula') }"
                        v-model="model.cedula"
                        @change="__validarCedula($event)"
                        class="multisteps-form__input form-control buscador fuente"
                        type="number"
                      />
                      <p class="text-xs text-info">{{mensaje}}</p>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.cedula") }}
                      </p>

                    </div>
                   
                  </div>
                  <div class="row mt-2">
                    <div class="col-12 col-sm-6">
                      <p class="parrafo">Nombres</p>
                      <input
                        :class="{ error: validation.hasError('model.nombres') }"
                        v-model="model.nombres"
                        class="multisteps-form__input form-control buscador fuente"
                        type="text"
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
                    <div class="col-12 col-sm-6">
                      <p class="parrafo">Numero Celular</p>
                      <input
                        :class="{
                          error: validation.hasError('model.telefono buscador'),
                        }"
                        v-model="model.telefono"
                        class="multisteps-form__input form-control buscador fuente"
                        type="number"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.telefono") }}
                      </p>
                    </div>
                     <div class="col-12 col-sm-6">
                      
                      <p class="parrafo">Email</p>
                      <input
                        :class="{ error: validation.hasError('model.email') }"
                        v-model="model.email"
                        class="multisteps-form__input form-control buscador fuente"
                        type="email"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.email") }}
                      </p>
                    </div>
                  </div>
                  
                  
                  <div class="button-row d-flex mt-4">
                   
                    <button
                     @click="tab = 'sec'"
                      class="btn bg-gradient-light ms-auto mb-0 js-btn-next fuente"
                      type="button"
                      title="Next"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
              <!--single form panel-->
              <div
                v-if="tab === 'sec'"
                class=" p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <h5 class="font-weight-bolder fuente">Ubicacion</h5>
                <div class="multisteps-form__content">
                   <div class="row mt-3">
                     
                      <IsSelect  v-if="isEtnia"></IsSelect>
                     <div v-else class="col-12 col-sm-6">
                      <p class="parrafo">Etnia</p>
                       <v-select  :class="{
                          error: validation.hasError('model.fketnia'),
                        }"
                        :options="listEtnia" label="nombre"  v-model="model.fketnia" required>
                      <template #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                       <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fketnia") }}
                      </p>
                    </div>
                      
                       <div  class="col-12 col-sm-6">
                      <p class="parrafo">Genero</p>
                       <v-select  :class="{
                          error: validation.hasError('model.sexo'),
                        }"
                        :options="sexos" label="nombre" v-model="model.sexo" required>
                      <template #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.sexo") }}
                      </p>
                    </div>
                  </div>
                   <div class="row mt-3">
                      <IsSelect  v-if="isNacion"></IsSelect>
                    <div v-else class="col-12 col-sm-6">
                      <p class="parrafo">Nacionalidad</p>
                       <v-select  
                        :options="listNacionalidad" label="nombre" v-model="model.fknacionalidad" required>
                      <template #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                   
                    </div>
                    <IsSelect  v-if="isParroquia"></IsSelect>
                    <div v-else class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <p class="parrafo">Parroquia</p>
                         <v-select   :class="{
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
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fkparroquia") }}
                      </p>
                    </div>
                  </div>
                 <div class="row mt-3">
                      
                    <div  class="col-12">
                      <p class="parrafo">Recomendacion (Opcional)</p>
                        <textarea placeholder="Recomend" class="form-control ">

                        </textarea>
                   
                    </div>
                 
                  </div>

                  <div class="row">
                    <div class="button-row d-flex mt-4 col-12">
                      <button
                        @click="tab = 'sec3'"
                        class="btn bg-gradient-light mb-0 js-btn-prev"
                        type="button"
                        title="Prev"
                      >
                        Regresar
                      </button>
                      <button
                     @click="tab = 'sec2'"
                      class="btn bg-gradient-light ms-auto mb-0 js-btn-next"
                      type="button"
                      title="Next"
                    >
                      Siguiente
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="tab === 'sec2'"
                class=" p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <h5 class="font-weight-bolder fuente">Mas Información</h5>
                <div class="multisteps-form__content">
                   <div class="row mt-2">
                    
                     <div class="col-12 col-sm-6">
                       
                          <label class="parrafo">Modalidad</label>
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
                        <label class="custom-control-label fuente" :for="ite.name">
                          {{ ite.name }}</label
                        >
                     </div>

                    </div>
                    </div>
                     <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <p class="parrafo">Estado</p>
                      
                         <p class="parrafo">
                  Para que el estudiante pueda acceder al sistema notas aulas y mas..
                </p>
                    <div class="form-check form-check-info ">
                      
                      <input
                          v-model="model.status"
                          class="form-check-input"
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
                   <br />
                      <div  class="text-center">
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
                      class="btn btn-sm btnNaranja"
                    >
                      {{
                        model._id ? "Actualizar Registro " : "Guardar Registro"
                      }}
                    </button>
                  </div>
                  <div class="row">
                    <div class="button-row d-flex mt-4 col-12">
                      <button
                        @click="tab = 'sec'"
                        class="btn bg-gradient-light mb-0 js-btn-prev"
                        type="button"
                        title="Prev"
                      >
                        Regresar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--single form panel-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./AddEstudiante.js"></script>
