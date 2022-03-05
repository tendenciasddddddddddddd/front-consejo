<template>
  <div>
    
    <div class="cLLkJw">
      <div class="ifjUET" >
       
         <vue-progress-bar ></vue-progress-bar>
        
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else >
         
                 <div class="row " >
              <div class="col-md-5">
                  <span v-if="!$store.state.isAppMobile" class="ms-2 s-title-page"
              >  Cursos
               <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 20 20" class="small svg-icon fill grey-500 s-mr-2 me-1 ms-1" id="" fill="currentColor" title=""><path d="M6.52776 18.4722C6.16165 18.1061 6.16165 17.5125 6.52776 17.1464L14.3375 9.33669C14.7036 8.97057 15.2972 8.97057 15.6633 9.33669C16.0294 9.70281 16.0294 10.2964 15.6633 10.6625L7.85359 18.4722C7.48747 18.8383 6.89388 18.8383 6.52776 18.4722Z"></path><path d="M6.52776 1.52459C6.16164 1.8907 6.16164 2.4843 6.52776 2.85041L14.3397 10.6624C14.7059 11.0285 15.2995 11.0285 15.6656 10.6624C16.0317 10.2963 16.0317 9.70269 15.6656 9.33657L7.85359 1.52459C7.48747 1.15847 6.89388 1.15847 6.52776 1.52459Z"></path></svg>
            
               Cursos asignados</span
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
             
              <div class="mt-2" v-if="!$store.state.isAppMobile">
                <span class="ms-4" style="color:#181B32; font-size: 18px;"><b style="font-weight: 700;">0{{ page }}</b>/ 0{{ numPages }}</span>
               
              </div>
              <div>
                 <ul class="pagination pagination-dark justify-content-center mt-2 me-3">
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
         
           <!-- <hr class="horizontal dark " style="margin: 0.5rem 0;"> -->
          <div v-if="displayedArticles.length">
            <section class="flex-containes2 mt-3">
              <div
                class="carde s-header-cards animate__animated animate__fadeInUp" :class="[`animations-${index}`]"
                v-for="(item, index) in displayedArticles"
                :key="item.id" @click="openModal(item)"
                style="cursor: pointer;"
              >
                <div class=" text-center"  v-bind:style="{'background':colorsh[index]}">
                    <!-- <span style="height: 130px;" class="mask bg-gradient-dark"></span> -->

                   <div class="d-flex justify-content-center">
                       <img class="w-30 s-header-img"
                    src="../../../assets/img/teams/0.svg"
                    alt="rover"
                  />
                  <span class="text-white mt-4 ms-3 fuente s-texo-description" > {{ item.fnivel.nombres.split(' ')[0] }} {{ item.fnivel.nombres.split(' ')[1] }}
                    <br/> {{ item.fnivel.nombres.split(' ')[2] }}</span>
                   </div>
                 
                </div>
                <!-- socialmedia.svg -->
                <div class="card-bodys ">
                
                  <span class="tag fuente" v-bind:class="[item.nombre == 'Extraordinaria'? 'tag-purple' : '', 'tag-teal']"> {{ item.nombre }}</span>
                 
                  <span class="cardTitle fuente" style="font-size: 17px;">
                    {{ item.fnivel.nombres }}
                  </span>
                  <p class="text-xs  fuente mt-2" style="color: #516f90 !important;">
                    Materia de {{ item.fmateria.nombre }} / Paralelo {{ item.paralelo }}
                  </p>
                  
                </div>
              </div>
             
            </section>

           
          </div>
          <section v-else>
            <div class="d-flex justify-content-center mt-7">
              <div class="text-center">
                <img
                  style="width: 120px;"
                  src="../../../assets/img/icons/EDy-detective.svg"
                  alt="fondo"
                />
                <div class=" mt-4 letra fuente">
                  No hay datos que mostrar para tu búsqueda
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
     
        <!-- <div class=" fdYSBu">
          <div class="itemActive w-100">
            <span class=" text-dark">
              Modalidades
            </span>
          </div>

          <div class="d-flex ms-3 mt-4">
            <div class="form-check my-auto supcheka">
              <input class="form-check-input cheka" checked type="checkbox" />
            </div>

            <a class="mb-0 ms-3 text-sm colorestabla fuente">
              Todo
            </a>
          </div>
          <div class="d-flex ms-3 mt-3">
            <div class="form-check my-auto supcheka">
              <input class="form-check-input cheka" type="checkbox" />
            </div>

            <a class="mb-0 ms-3 text-sm colorestabla fuente">
              Intensivo
            </a>
          </div>
          <div class="d-flex ms-3 mt-3">
            <div class="form-check my-auto supcheka">
              <input class="form-check-input cheka" type="checkbox" />
            </div>

            <a class="mb-0 ms-3 text-sm colorestabla fuente">
              Extraordinario
            </a>
          </div>
          <div class="itemActive w-100 mt-5">
            <span class=" text-dark">
              Otros
            </span>
          </div>
          <div class="d-flex ms-3 mt-2">
            <a class="tamanio links fuente"> <b>Solicitar nuevo</b> </a>
          </div>
        </div> -->
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
              Selecionar uno de estos items
            </p>
            <button
              @click="cerrarModal"
              class="btn btn-link text-white fuente"
              style="margin-top: -100px; margin-right: -20px;"
            >
              CERRAR &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <section class="flex-containes2 mt-1">
              <div class="">
                <a @click="nextPage" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde6 text-center ">
                    <img
                      class="w-35 mt-1"
                      src="../../../assets/img/usados/playbooks.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Notas
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="">
                <a href="javascript:;">
                  <div class="min-caja cajas targetas1 borde1 text-center ">
                    <img
                      class="w-35 mt-2"
                      src="../../../assets/img/logs/events.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Asistencia
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="">
                <router-link :to="`/507`" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde2 text-center ">
                    <img
                      class="w-35 mt-2"
                      src="../../../assets/img/logs/integrations.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Supletorios
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="">
                <router-link :to="`/507`" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde3 text-center ">
                    <img
                      class="w-40 "
                      src="../../../assets/img/logs/add-on-transactional-email.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Correos
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </section>
          </div>
           <!-- :to="{
                  name: 'asistencia',
                  params: {
                    id: info.fnivel._id,
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                  props: {
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                }" -->
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script src="./MenuCursos.js"></script>

