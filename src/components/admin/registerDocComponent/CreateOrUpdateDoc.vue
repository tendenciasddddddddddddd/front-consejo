<template>
  <div class="row">
     <FullModal @close="close">
        <template v-slot:header> Registro de Docente</template>
            <template v-slot:body>
                  <Spinner v-if="ifcarga"></Spinner>
                  <div v-else >
                  <form @submit.prevent="save"  id="docentes">
                      <span class="parrafo">Número de Cédula</span>
                       <CustomInput v-model="model.cedula" />
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

                      <span class="parrafo">Numero Teléfono</span>
                      <CustomInput v-model="model.telefono" />
                      <p class="mb-2 text-xs fuente text-danger">
                        {{ validation.firstError("model.telefono") }}
                      </p>
                      
                      <span class="parrafo">Correo Electrónico</span>
                       <CustomInput v-model="model.email" />
                      <p class="mb-2 text-xs fuente text-danger">
                        {{ validation.firstError("model.email") }}
                      </p>

                        <span class="parrafo">Nacionalidad</span>
                         <IsSelect v-if="isNacion"></IsSelect>
                       <Dropdown v-else v-model="model.fknacionalidad"  :options="listNacionalidad"/>
                       <p class="mb-2 text-xs fuente text-danger">
                        {{ validation.firstError("model.fknacionalidad") }}
                      </p>

                      <span class="parrafo">Parroquia</span>
                       <IsSelect v-if="isParroquia"></IsSelect>
                       <Dropdown v-else v-model="model.fkparroquia"  :options="listParroquia"/>
                        <p class="mb-2 text-xs fuente text-danger">
                          {{ validation.firstError("model.fkparroquia") }}
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
 
                      <span class="parrafo">Título Actual</span>
                        <textarea
                        v-model="model.titulo"
                        class="multisteps-form__input form-control fuente"
                        type="text"
                        required
                      />
            </form>
                  </div>
            </template>
            <template v-slot:footer>
               <ButtonLoading v-if="ifLoad"/>
                    <button v-else type="submit" class="btn btnNaranja" form="docentes">
                      {{ model._id ? "Actualizar" : " Guardar" }}
                    </button>
            </template>
     </FullModal>
  </div>
</template>
<script src="./CreateOrUpdateDoc.js"></script>
