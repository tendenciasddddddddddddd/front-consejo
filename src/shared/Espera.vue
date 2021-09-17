<template>
  <div class="carga">
    <div class="entro">
      Esperando a que elija una opcion...
      <div class="spinner-border text-default" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Espera',
    props: {
    mensaje: {
      type: String,
    },
   
  },
};
</script>

<style>
.carga {
  position: relative;
  z-index: 3;
  background-color: #ffffffb3;
  top: 0;
  left: 0;
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.entro {
  text-align: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 1rem;
}
</style>
