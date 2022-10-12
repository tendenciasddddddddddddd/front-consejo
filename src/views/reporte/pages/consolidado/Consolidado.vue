<template>
  <Modal @close="close">
    <template v-slot:header> CONSOLIDADO DE MATRICULAS</template>
    <template v-slot:body>
      <p v-if="ifview=='1'" class="h6 fuente negros" style="font-weight:400;">
        Puede descargar por el consolidado
      </p>
      <p v-if="ifview=='2'" style="font-weight:400;" class="h6 fuente negros">
        El archivo a descargar en un documento con la lista de todas las matriculas del periodo actual</p>
      <div class="text-center">
        <img width="240" src="../../../../assets/img/consolidado.svg" alt="">
      </div>
    </template>
    <template v-slot:acccion>
      <div v-if="ifview=='1'">
        <ButtonLoading v-if="ifLoad" />
        <button @click="getData" v-else type="submit" class="btn btnNaranja mt-2"
          style="background-color: #0c2ccc !important;">
          Cargar Data
        </button>
      </div>
      <div v-if="ifview=='2'">
        <ButtonLoading v-if="isTodo" />
        <button @click="__todo" v-else type="submit" class="btn btnNaranja mt-2"
          style="background-color: #0c2ccc !important;">
          Descargar archivo
        </button>
      </div>
    </template>
  </Modal>

</template>
<script src="./Consolidado.js"></script>
