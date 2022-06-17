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
          <div class="modalheader2">
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
              <div v-if="ifview=='1'" class="p-5">
                   <button v-if="ifLoad"  class="btn btnCreanaBorder w-100" >
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" ></span>
                   Trabajando...
                   </button>
                    <button v-else @click="getData" class="btn btnCreanaBorder  w-100 " >
    <b> <i class="fa fa-database me-2" aria-hidden="true" ></i>  Cargar Data</b>
                   
                    </button>
              </div>

               <div v-if="ifview=='2'">
                 <p class="parrafo">Elegir el tipo de matriculas que quiere descargar, puede ser todas las matriculas del periodo vigente</p>
                   <button v-if="isIntensivo" class="btn btnCreanaBorder me-2" >
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                   </button>
                    <button v-else @click="__consolodadoIntensivo" class="btn btnCreanaBorder me-2" >
                   Intensivo
                   </button>


                    <button v-if="isExtraordianrio" class="btn btnCreanaBorder me-2" >
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                    </button>
                      <button v-else @click="__consolidadoExtra" class="btn btnCreanaBorder me-2" >
                    Extraordinaria
                    </button>


                     <button v-if="isTodo" class="btn btnCreana" >
                     <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                     </button>
                      <button v-else @click="__todo" class="btn btnCreana" >
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
