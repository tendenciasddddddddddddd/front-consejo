<template>
  <div>
    <div class="row mt-2">
      <div
        class="col-lg-9 col-12 mx-auto"
        style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <div>
          <p class="text-sm text-dark parrafo" style="margin:7px; ">
            Desgargar la lista de los estudiantes en formato para que pueda
            guadar las notas y tomas la asistencia.
          </p>
        </div>
      </div>
    </div>
    <Spinner v-if="isData"></Spinner>
    <div v-else>
      <div v-if="!info.length">
        <div class="row mt-3">
          <div class="col-lg-9 col-12 mx-auto">
            <div class="text-center">
              <img
                class="w-30"
                src="../../../assets/img/jira/search-error.svg"
                alt="fondo"
              />
              <div class=" mt-3 letra fuente">
                Hemos buscado en todas partes, pero no tenemos <br />
                nada que mostrarte. Pregunata a <br />
                secretaria
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row mt-4">
        <div class="col-lg-9 col-12 mx-auto">
          <div v-for="item in info" :key="item.id">
            <figure>
              <blockquote class="blockquote text-start">
                <div class="row">
                  <div class="col-lg-9">
                    <p class="ps-2 parrafo">
                     <mark>{{ item.nombre }} </mark> —— {{ item.fnivel.nombres }}  <b>({{ item.paralelo }}) —— </b> {{ item.fmateria.nombre }}
                    </p>
                  </div>
                  <div class="col-lg-3">
                    <div  class="text-end">
                      <a style="cursor:pointer;" @click="__listarEStudiantes(item.fnivel._id, item.paralelo)">
                         <img
                        
                        class="img w-15 move-on-hover"
                        src="../../../assets/img/shapes/90260b20-d6c6-418f-9961-9282c5d85d78.png"
                      />
                      </a>
                      
                    </div>
                  </div>
                </div>
                <hr class="horizontal dark my-1">
              </blockquote>
            </figure>
          </div>
        </div>
      </div>
        <!-- Modal -->
        <div
          class="modal fade "
          :class="{ 'show ': isModal === 'abrir' }"
          :style="[isModal === 'abrir' ? { display: 'block' } : {}]"
          style="overflow-y: auto;    z-index: 9999;"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content ">
              <div class="modal-body">
                <p class="h4 fuente">
                  ¿Descargar lista?<br />
                 
                </p>
                <Spinner v-if="isDatas"></Spinner>
                <div v-else>
                      <p class="parrafo">
                       En este curso hay <b>{{isCantidad}}</b> ESTUDIANTES, decea imprimir el listado de estos estudiantes
                    </p>
                    
                    <a href="javascript:;" @click="__exportEcxel(isCantidad)"  class="fuente text-center">
                      <i class="ni ni-cloud-download-95"></i>
                        <b style="color: #0091ae;"> &nbsp; Imprimir</b> 
                      </a>
                </div>
               
                 
                 
                <div  class="mt-3">
                  <a
                    @click="isModal = 'cerrar'"
                    class="btn btn-sm btnNegro"
                   
                    name="button"
                    >Cerrar</a
                  >
                
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script src="./ReporteDoc.js"></script>

<style></style>
