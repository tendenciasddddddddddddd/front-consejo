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

                      <span class="parrafo">Numero Teléfono (Opcional)</span>
                      <CustomInput v-model="model.telefono" />
                      
                      <span class="parrafo">Correo Electrónico (Opcional)</span>
                       <CustomInput v-model="model.email" />

                        <span class="parrafo">Nacionalidad (Opcional)</span>
                       <CustomInput v-model="model.fknacionalidad" />

                      <span class="parrafo">Parroquia (Opcional)</span>
                       <CustomInput  v-model="model.fkparroquia" />

                        <span class="parrafo">Etnia (Opcional)</span>
                       <CustomInput v-model="model.fketnia" />

                        <span class="parrafo">Género</span>
                        <CustomInput v-model="model.sexo"  />
 
                      <span class="parrafo">Título Actual</span>
                        <textarea
                        v-model="model.titulo"
                        class="multisteps-form__input form-control fuente"
                        type="text"
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
<script src="./Add.js"></script>
