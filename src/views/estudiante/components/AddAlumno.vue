<template>
 <div class="row">
     <FullModal @close="close">
        <template v-slot:header> Registro de estudiantes</template>
            <template v-slot:body>
                  <Spinner v-if="ifcarga"></Spinner>
                  <div v-else >
                  <form @submit.prevent="save"  id="docentes">
                      <span class="parrafo">Número de Cédula</span>
                       <input v-model="model.cedula" @change="__validarCedula($event)" class=" form-control buscador " type="text" />
                       <p v-if="mensaje!=''" class="text-xs text-info">{{ mensaje }}</p>
                     <p class="mb-2 text-xs fuente text-danger">
                      {{ validation.firstError("model.cedula") }}
                     </p>

                     <span class="parrafo">Apellidos Completos</span>
                       <CustomInput v-model="model.apellidos" />
                      <p class="mb-2 text-xs fuente text-danger">
                        {{ validation.firstError("model.apellidos") }}
                      </p>

                      <span class="parrafo">Nombres Completos</span>
                       <CustomInput v-model="model.nombres" />
                      <p class="mb-2 text-xs fuente text-danger">
                        {{ validation.firstError("model.nombres") }}
                      </p>

                      <span class="parrafo">Numero Teléfono</span>
                      <CustomInput v-model="model.telefono" />
                     
                      
                      <span class="parrafo">Correo Electrónico</span>
                       <CustomInput v-model="model.email" />
                     

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
<script src="./AddAlumno.js"></script>

