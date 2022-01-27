<template>
  <div
    class="row "
  > 
    <Spinner v-if="isData"></Spinner>
    <div v-else class="col-lg-11 col-12 mx-auto">
         <div class="row mt-2 ">
              <div class="col-md-5">
                  <a
             @click="$router.go(-1)"
            class="btn btn-sm me-2"
            style="box-shadow: none; "
          >
            <img
              height="23px"
              src="../../../../assets/img/usados/regresar.png" 
            />
          </a>
                  <span
              class=""
              style="font-weight: 700;color:#181B32; font-size: 21px;padding: 0 !important;"
              > Tareas {{ info.materia }} </span
            >
              </div>
              <div class="col-md-7">
                 <div class="d-flex justify-content-end">
              <div>
                <div class="input-group ">
                  <input style="background: white;"
                    type="text"
                    v-model="searchQuery"
                    class="form-control buscador"
                    placeholder="Buscar por materia"
                  />
                  <span class="input-group-text text-body buscador" style="background: white;"
                    ><i class="fas fa-search colorhs" aria-hidden="true"></i
                  ></span>
                </div>
              </div>
             
              <div class="mt-2">
                <span class="ms-4" style="color:#181B32; font-size: 18px;"><b style="font-weight: 700;">0{{ page }}</b>/ 0{{ numPages }}</span>
               
              </div>
              <div>
                 <ul class="pagination pagination-dark justify-content-center mt-2">
            <li class="page-item">
              <a
                class="fuente tamanio links paginates ms-3 me-2 isPaginateh isPaginateActive"
                :class="{ 'inactivo isNoActive': page == 1 }"
                @click="page--"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="left"
                  width="1.2em"
                  height="1.2em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                  ></path>
                </svg>

                
              </a>
            </li>
           
            <li class="page-item">
              <a
                :class="{ 'inactivo isNoActive': page == numPages || numPages == 0 }"
                class="fuente tamanio links paginates isPaginateh isPaginateActive"
                @click="page++"
              >
              
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="right"
                  width="1.2em"
                  height="1.2em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                  ></path>
                </svg>
              </a>
            </li>

           
          </ul>
              </div>
            </div>
              </div>
            </div>
      
        
         <div v-if="!info.task.length" class="row mt-3">
          <div class="col-lg-12 col-12 mx-auto">
           
            <div class="text-center mt-6">
              <img 
                class="w-10"
                src="../../../../assets/img/usados/undraw_search.svg"
                alt="fondo"
              />
              <div class="letra fuente mt-4">
                No se encontraron tareas en este curso
              </div>
            </div>
          </div>
        </div>
         <template v-else>
         

          <div class=" mt-3">
            <Spinner v-if="!displayedArticles.length"></Spinner>
           
             <section else>
              <div class="row">
                <div class="col-md-6 liTask" v-for="(item, index) in displayedArticles"
                :key="item.id" >
                  <div class="d-flex cajasTask fadeIn1 fadeInBottom " style="    background-color: #F6F7F9;" :class="[`animation-${index}`]" >
                     <a href="javascript:;" @click="openModal(item)">
                    <div class="d-flex py-1">
                      <div class="">
                        <img
                          src="../../../../assets/img/icons/task.png"
                          style="height:40px"
                          alt="avatar image"
                        />
                      </div>
                      <div
                        class="d-flex flex-column justify-content-center ms-3"
                      >
                        <h6 class="mb-0 text-sm negros" style="color: #007dbc;">
                          {{ item.nombre }}
                        </h6>
                        <div class="text-sm colorestabla fuente">
                          <div v-if="item.estado">
                            <span
                              style="background-color: rgb(0, 189, 165);"
                              class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                            ></span> Tarea Entregada
                            
                          </div>
                          <div v-else>
                            <span
                              class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                            ></span> Pendiente Entrega
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div class="dropstart ms-auto">
                    <div class="d-flex  mt-2">
                      <div class="form-check my-auto">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectTask(item._id)"
                        />
                      </div>
                      <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->

                    </div>
                  </div>
                  </div>
                </div>
                
            </div>
            </section>
           
          </div>
        </template>


          <!-- BLUR-->
          <div v-if="tabla === 'ontask'" class="altural"></div>
          <!-- MODAL-->
          <div
            class="fixed-plugin"
            :class="{ 'show repon': tabla === 'ontask' }"
          >
            <div
              class="card shadow-lg desplega"
              :class="{ repon: tabla === 'ontask' }"
              style="overflow-y: auto; z-index: 9999; "
            >
              <div
                class=" cabesa"
                style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 52px;
         padding: 4px 25px 4px 40px;"
              >
                <div class="float-start">
                  <h5
                    style="font-weight: 400;"
                    class="mt-2 mb-0 fuente text-white"
                  >
                    Enviar Tarea
                  </h5>
                  <!--  <p class="parrafo">{{nombre}}</p> -->
                </div>
                <div class="float-end mt-2">
                  <button
                    @click="tabla = 'termina'"
                    class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                  >
                   <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"
                  >
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#ffffff">
                        <path
                          d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  </button>
                </div>
                <!-- End Toggle Button -->
              </div>

              <div class="card-body pt-sm-3 pt-0">
                <!-- Sidebar Backgrounds -->
                <div class="row" v-if="!tarea_atrazada">
                  <Spinner v-if="ifcarga"></Spinner>
                  <div v-else class="col-lg-11 col-12 mx-auto">
                    <div v-if="ifLoad2" class="loadingg">
                    <div class="inn">
                       <img
                          src="../../../../assets/img/icons/astronaut2.svg"
                          style="height:100px;"
                          alt="avatar image"
                          class="movimiento"
                        />
                      
                    </div>
                  </div>
                    <p class="h5 fuente" style="font-weight: 400;">
                      {{ title }}<span>&#160;</span>
                    </p>
                    <div class="mt-3" style="padding:9px; background-color: rgb(243, 243, 243);">
                         <p class="parrafo" v-html="descrition"></p>
                    </div>
                    

                    <div class="mt-4" >
                    
                      <p class="parrafo text-sm">
                         <a class="text-primary"> <img
                          alt="Image placeholder"
                          height="50px;"
                          class="mx-1 mt-n2 move-on-hover"
                          src="../../../../assets/img/icons/reloj.png"
                        /> </a>  <span class="ms-3">{{ isPlaso }}</span>
                        </p>
                    </div>
                    <div lass="mt-4">
                     
                           <a
                          v-if="recursos"
                          class="parrafo"
                          style=" cursor: pointer;"
                          target="_blank"
                          :href="recursos"
                        >
                          <img
                            alt="Image placeholder"
                            height="50px;"
                            class=" move-on-hover ms-1"
                            src="../../../../assets/img/icons/storage_hover.png"
                          /> <span class="ms-4 links">Detalle de esta tarea (Desacargar)</span> 
                        </a>
                        
                    </div>
                    
                    <vue-dropzone class="mt-5"
                      style="height:200px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                      ref="dropzone"
                      @vdropzone-success="afterComplete"
                      id="drop1"
                      :options="dropOptions"
                    >
                    </vue-dropzone>
                      <a v-if="model.task.entrega.link"
                          @click="removeAllFiles"
                          class="fuente tamanio"
                          href="javascript:;"
                          ><i class="far fa-trash-alt me-2 iconos"></i>
                          <b class=" me-2 links">Cambiar este documento</b>
                        </a>
                      <p class="parrafo text-sm mt-3">
                          <a class="text-primary">Vence: </a>{{ datetimes }} 
                        
                        </p>
                  </div>
                </div>
                <div v-else class="row">
                    <div class="col-lg-11 col-12 mx-auto text-center mt-3">
                               
                         
                         <div class="mt-6" >
                       
                             <img
                            alt="Image placeholder"
                           
                            class=" move-on-hover "
                            src="../../../../assets/img/icons/private.svg"
                          /> 
                          
                         </div>
                         <p class="h5 fuente" style="font-weight: 400;">
                              Tarea atrasada
                         </p>
                         <p class="parrafo">No puede enviar la tarea porque el tiempo ya expiro</p>
                    </div>
                </div>
              </div>
              <div class="modalFooter" >
                 <div class="text-end" v-if="!tarea_atrazada">
                      <a
                        class="btn btnNaranjaClaro"
                        
                       @click="tabla = 'termina'"
                      >
                        Volver
                      </a>
                      &nbsp; &nbsp;
                      <button
                        v-if="ifLoad"
                        disabled
                        class="btn  btnNaranja"
                      >
                        Enviando...
                      </button>
                      <button
                        v-else
                        class="btn btnNaranja " 
    
                        @click="saveArbolEntrega()"
                      >
                        Guardar
                      </button>
                    </div>
                    <div class="text-end" v-else>
                      <a
                        class="btn btnNaranjaClaro"
                        
                       @click="tabla = 'termina'"
                      >
                        Volver
                      </a>
                     
                      
                    </div>
              </div>
            </div>
          </div>
       
      
    </div>
  </div>
</template>

<script src="./Tasks.js"></script>

<style >
.cardr-item {
  display: inline-block;
  margin-right: 10px;
}
.cardr-enter-active, .cardr-leave-active {
  transition: all 0.4s;
}
.cardr-enter, .cardr-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30%);
}
</style>
