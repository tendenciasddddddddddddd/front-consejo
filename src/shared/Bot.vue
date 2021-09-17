<template>
  <div >
    
    <div class="fixed-plugin" :class="{ 'show': tab === 'bot-start' }">
      <a @click="tab = 'bot-start'" class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: #6a78d1;">
        <i class="ni ni-chat-round me-1 cursor-pointer text-white"> </i>
      </a>
      <div  class="card shadow-lg blur desplega" style="overflow-y: auto;">
        <div class="card-header pb-0 pt-3  bg-transparent ">
          <div class="float-start">
            <h5 class="mt-3 mb-0 fuente">Hola</h5>
            <p class="parrafo">{{nombre}}</p>
          </div>
          <div class="float-end mt-4">
            <button @click="tab = 'bot-end'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 20px;" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>
        <hr class="horizontal dark my-1" />
        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
         <div >
            <p class="parrafo" style="padding:9px; background-color: rgb(243, 243, 243);"> 
                Hola, soy el asistente virtual Bol de este sistema. ⚡️
                </p>
         </div>
           <div >
            <p class="parrafo" style="padding:9px; background-color: rgb(243, 243, 243);"> 
                Si tienes una duda o problema del funsionamiento y uso de este sistema 
                por favor preguntame ⚡️
                </p>
         </div>
          <div >
            <p class="parrafo" style="padding:9px; background-color: rgb(243, 243, 243);"> 
               ¿Cómo puedo ayudar?⚡️
                </p>
         </div>
          <div class="mt-4">
            <input class="form-control buscador" />
         </div>
         <div class="mt-3">
            <button class="btn btn-sm btnNaranja w-100"> Enviar</button>
         </div>
         <div v-if="isEnviado">
             <img
        class="w-80"
        
        src="../assets/img/shapes/success-green.svg"
        alt=""
      />
         </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const info = JSON.parse(localStorage.getItem('Xf'));
export default {
  name: "Default",
  data() {
    return {
      tab: "bot-end",
      isEnviado: false,
      nombre: info.nombre,
    };
  },

  methods: {
  
  },
  created() {},
};
</script>
<style>

</style>

