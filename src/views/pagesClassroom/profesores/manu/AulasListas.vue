<template>
  <div class="cLLkJw ">
    <vue-progress-bar  style="margin-top:-23px"></vue-progress-bar>
    <div class="ifjUET">
      <ProgressBar v-if="isData"></ProgressBar>
      <div v-else>
      
        <div class="row mt-2">
              <div class="col-md-5">
                  <span
              class=""
              style="font-weight: 700;color:#181B32; font-size: 21px;"
              >Gestión de aulas virtuales</span
            >
              </div>
              <div class="col-md-7">
                 <div class="d-flex justify-content-center">
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
                class="fuente tamanio links paginates ms-3 me-2 isPaginateActive"
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
                class="fuente tamanio links paginates isPaginateActive"
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
       

        <div v-if="displayedArticles.length" class="mt-2">
          <section class="flex-containes2 mt-3">
            <div
              class="carde fadeIn1 fadeInBottom "
              :class="[`animation-${index}`]"
              v-for="(item, index) in displayedArticles"
              :key="item.id"
            >
              <div class="card-header1">
                <span
                  style="height: 130px;"
                  class="mask bg-gradient-dark"
                ></span>
                <div class="mosText text-center text-white">
                  <a
                    class="mt-5"
                    @click="openModal(item._id)"
                    href="javascript:;"
                    ><b style="color:white;" class="fuente"
                      ><i class="fa fa-eye" aria-hidden="true"></i> &nbsp; Ver
                      Aula</b
                    >
                  </a>
                </div>
                <div
                  class="form-check my-auto"
                  style=" position: absolute;top: 100px;right: 8px;"
                >
                  <input
                    class="form-check-input cheka"
                    type="checkbox"
                     v-model="isSelecTask"
                     :value="item._id"
                     @click="selectOne(item._id)"
                  />
                </div>

                <img
                  src="../../../../assets/img/icons/cursos-online.png"
                  alt="rover"
                />
              </div>

              <div class="card-bodys ">
                <span class="cardTitle fuente" style="font-size: 17px;">
                  {{ item.nombre }}
                </span>
                <p
                  class="text-xs  fuente mt-2"
                  style="color: #516f90 !important;"
                >
                  {{ item.materia }}
                </p>
                <span
                  class="tag fuente"
                  v-bind:class="[
                    item.icono == 'Intensivo' ? 'tag-purple' : '',
                    'tag-teal',
                  ]"
                >
                  {{ item.icono }}</span
                >
              </div>
            </div>
          </section>

         
        </div>
        <section v-else>
          <div class="d-flex justify-content-center mt-8">
            <div class="text-center">
              <img
                style="width: 120px;"
                src="../../../../assets/img/icons/descarga.svg"
                alt="fondo"
              />
              <div class=" mt-4 letra fuente">
                No hay datos que mostrar, sin cursos
              </div>
            </div>
          </div>
        </section>
        <div class="piepagina" v-if="isSelecTask.length != 0">
          <div class="text-end">
            <span class="text-sm fuente"
              >Elegiste {{ isSelecTask.length }} curso/s de tu cuenta.</span
            >
            <button
              type="submit"
              class="btn btnNaranja me-2 ms-4"
              @click="__eliminar()"
            >
              Eliminar cursos
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class=" fdYSBu">
      
      <div class="itemActive w-100 ">
        <span class=" text-dark">
          Modalidades
        </span>
      </div>
       <div class="d-flex ms-1 mt-3">
        <a
         
          @click="openChildNew"
          type="button"
          class="fuente tamanio ms-3"
        >
          <i class="fa fa-plus me-2 iconos"></i>
          <b class="links">Nuevo curso</b>
        </a>
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

      <div class="itemActive w-100 mt-4">
        <span class=" text-dark">
          Calendario
        </span>
      </div>

      <div class="d-flex  mt-2">
        <router-link to="/my-calendar">
          <img class="w-100"
            
            src="../../../../assets/img/icons/calendar.jpg"
            alt=""
          />
        </router-link>
      </div>
    </div>
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
                <a @click="openChildGruopen" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde6 text-center ">
                    <img
                      class="w-35 mt-1"
                      src="../../../../assets/img/icons/users.png"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Estudiantes
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="">
                <router-link :to="`/task-config/${key}`" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde1 text-center ">
                    <img
                      class="w-35 mt-2"
                      src="../../../../assets/img/icons/tareas.png"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Tareas
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="">
                <router-link :to="`/507`" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde2 text-center ">
                    <img
                      class="w-35 mt-2"
                      src="../../../../assets/img/icons/cuadro.png"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Evaluaciones
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
                      src="../../../../assets/img/icons/foros.png"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Foros
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ifChildGroup">
      <ListAllEstudiantes :idGet="key" @myEvent="closedChildGruopen"></ListAllEstudiantes>
    </div>
    <div v-if="ifChildNew">
      <CreateCurso @myEvent2="closedChildNew" @clickSave="refresh"></CreateCurso>
    </div>
  </div>
</template>

<script src="./AulasListas.js"></script>


