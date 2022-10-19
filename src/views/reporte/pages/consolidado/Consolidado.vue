<template>
  <Modal @close="close">
    <template v-slot:header> CONSOLIDADO DE MATRICULAS</template>
    <template v-slot:body>

      <p  style="font-weight:400;" class="h6 fuente negros">
        El archivo a descargar en un documento con la lista de todas las matriculas del periodo actual</p>
      <div class="text-center">
        <img width="240" src="../../../../assets/img/consolidado.svg" alt="">
      </div>
    </template>
    <template v-slot:acccion>
        <ButtonLoading v-if="ifLoad" />
        <button @click="getData" v-else type="submit" class="btn btnNaranja mt-2"
          style="background-color: #0c2ccc !important;">
          Cargar archivo
        </button>
    </template>
  </Modal>

</template>
<script src="./Consolidado.js"></script>
