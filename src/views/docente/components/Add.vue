<template>
  <div class="row">
    <FullModal @close="close">
      <template v-slot:header> Registro de Docente</template>
      <template v-slot:body>
        <Spinner v-if="ifcarga"></Spinner>
        <div v-else>
          <form @submit.prevent="save" id="docentes">
            

            <span class="parrafo">Número de Cédula</span>
            <CustomInput v-model="model.cedula" />
            <p class="mb-2 text-xs fuente text-danger">
              {{ validation.firstError("model.cedula") }}
            </p>

            <span class="parrafo">Apellidos / Nombres</span>
            <CustomInput v-model="model.fullname" />
            <p class="mb-2 text-xs fuente text-danger">
              {{ validation.firstError("model.fullname") }}
            </p>

            <span class="parrafo mt-2">Numero Teléfono (Opcional)</span>
            <CustomInput v-model="model.telefono" />

            <span class="parrafo mt-2">Correo Electrónico (Opcional)</span>
            <CustomInput v-model="model.email" />

            <span class="parrafo mt-2">Nacionalidad (Opcional)</span>
            <CustomInput v-model="model.fknacionalidad" />

            <span class="parrafo mt-2">Parroquia (Opcional)</span>
            <CustomInput v-model="model.fkparroquia" />

            <span class="parrafo mt-2">Etnia (Opcional)</span>
            <CustomInput v-model="model.fketnia" />

            <span class="parrafo mt-2">Género</span>
            <CustomInput v-model="model.sexo" />
          
          </form>
        </div>
      </template>
      <template v-slot:footer>
        <ButtonLoading v-if="ifLoad" />
        <button v-else type="submit" class="btn btnNaranja" form="docentes">
          {{ model._id ? "Actualizar" : " Guardar" }}
        </button>
      </template>
    </FullModal>
  </div>
</template>
<script src="./Add.js"></script>
