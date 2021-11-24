<template>
  <div
    class="fixed-plugin"
    :class="{ 'show w-100': panelAsistencias === 'open' }"
  >
    <div
      class="card shadow-lg blur desplega"
      :class="{ 'w-100': panelAsistencias === 'open' }"
      style="overflow-y: auto; z-index: 9999; "
    >
     

      <div class="card-body pt-sm-3 pt-0" style="background-color:white">
        <!-- Sidebar Backgrounds -->

        <div class="row">
          <Spinner v-if="isData"></Spinner>
          <div v-else class="col-lg-8 col-12 mx-auto">
            <div class="row mt-4" v-if="ispanel === 'open1'">
              <p style="font-weight:400" class="h4 text-center fuente">Lista de estudiantes</p>

              <div class="mt-4">
                <div class=" mb-4">
                  <div class="card-body px-0 pt-0 pb-2">
                    <div v-if="!info.length">
                      <div class="mt-1" style="background-color: rgb(222, 235, 255); padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;">
                        <p class="fuente text-dark">
                          
                          Aún no existen estudiantes en este curso 😢, Puedes
                          preguntar al asistente virtual 😍
                        </p>
                      </div>
                      <div class="row mt-3">
                        <div class="col-lg-9 col-12 mx-auto">
                          <div class="text-center">
                            <img
                              class="w-35"
                              src="../../../assets/img/jira/search-error.svg"
                              alt="fondo"
                            />
                            <div class=" mt-3 letra fuente">
                  Hemos buscado en todas partes, pero no tenemos <br>
                  nada que mostrarte...
                </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="row">
                      <div
                        v-for="item in inAlumnos"
                        :key="item.id"
                        class="col-sm-2"
                      >
                        <div class="text-center ">
                          <div class="targetas" style="min-height: 200px;">
                            <div
                              class="avatar avatar-xl position-relative mt-3"
                              v-bind:style="{ 'background-color': item.colors }"
                              style="border-radius: 100%;"
                            >
                              <p
                                class="text-white h3"
                                style="font-weight: 600;"
                              >
                                {{ item.img }}
                              </p>
                            </div>

                            <p class="cardSubTitle fuente mt-3">
                              {{ item.name }}
                            </p>
                             <div style="padding-left: 48%">
                                <div class="form-check supcheka">
                             <input style="font-size:18px" class="form-check-input cheka" type="checkbox" > 
                          </div> 
                             </div>
                           
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
         
        </div>
      </div>
      <div
          class="modalFooter"
          
        >
          <div class="text-end">
            
          
              <a
                class="btn btnNaranjaClaro"
               
                @click="$router.go(-1)"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>

                <button  
                type="submit"
                id="addRowButton"
                class="btn btnNaranja ms-3"
                @click="$router.go(-1)"
              >
                Guardar
              </button>

            
          </div>
        </div>
    </div>
  </div>
</template>
<script src="./Asiste.js"></script>
