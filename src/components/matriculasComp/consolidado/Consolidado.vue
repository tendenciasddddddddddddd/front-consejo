<template>
     <div
      class="modal fade "
      :class="{ 'show ': modals === true }"
      :style="[modals === true ? { display: 'block' } : {}]"
      style="overflow-y: auto;   z-index: 9999;"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content ">
          <div class="modalheader">
            <p class="h5 fuente text-white mt-3 ms-3" style="font-weight:400;">
              Puede descargar por el consolidado
            </p>
            <button
              @click="$emit('myEventClosedModalConsolidado')"
              class="btn btn-link text-white fuente"
              style="margin-top: -100px; margin-right: -20px;"
            >
              CERRAR &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <div v-if="ifview=='1'">
                   <button v-if="ifLoad"  class="btn btnNaranja" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" ></span>
                   Trabajando...
                   </button>
                    <button v-else @click="getData" class="btn btnNaranja" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                    Cargar Data
                    </button>
              </div>

               <div v-if="ifview=='2'">
                 <p class="parrafo">Elegir el tipo de matriculas que quiere descargar, puede ser todas las matriculas del periodo vigente</p>
                   <button v-if="isIntensivo" class="btn btnNaranja me-2" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                   </button>
                    <button v-else @click="__consolodadoIntensivo" class="btn btnNaranja me-2" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                   Intensivo
                   </button>


                    <button v-if="isExtraordianrio" class="btn btnNaranja me-2" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                    </button>
                      <button v-else @click="__consolidadoExtra" class="btn btnNaranja me-2" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                    Extraordinaria
                    </button>


                     <button v-if="isTodo" class="btn btnNaranja" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                     <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                     </button>
                      <button v-else @click="__todo" class="btn btnNaranja" style="background-color: #4B22F4;    color: #fff;box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);">
                     Todo
                     </button>
              </div>  
            </div>
           
          </div>
        </div>
      </div>
    </div>
</template>
<script src="./Consolidado.js"></script>
