<template>
  <div>
    <Spinner v-if="isData"></Spinner>
    <div v-else class="row ">
      <div class="col-lg-11 col-12 mx-auto" v-bind:style="{ backgroundImage: 'url(' + image + ')' }" style="background-color:null;min-height: 63vh; background-size: cover;border-radius: 3px;">
         <div class=" text-start" >
            <router-link
              to="/aulas-lista"
              class="btn btn-sm "
              style="box-shadow: none"
            >
              <img
                height="23px"
                src="../../../../assets/img/usados/regresar.png"
              />
            </router-link>
           
            
            <span class="fuente h5 links ms-3" style="font-weight: 400;">
              {{ info.materia }} - {{ info.nombre }} 
            </span>
            
          </div>
          
           <hr class="horizontal dark mb-1">
        <div class="mt-4 h3 text-center" style="font-weight: 700;">
          <img alt="" class="" src="../../../../assets/img/icons/mark.svg">
          Módulos del curso</div>
        
        <section class="flex-containes mt-5" >
          <div class="">
            <a @click="empujarAlumnos()" href="javascript:;">
              <div
                class="cajas noactive foco2 text-center"
                style="max-width: 200px;margin-right: 15px!important; padding: 5px;"
              >
                <div class="avatar-group mt-2">
                  <a
                    href="javascript:;"
                    class="avatar avatar-lg avatar-lg rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=""
                    data-bs-original-title="Martin Doe"
                  >
                    <img
                      alt="Image placeholder"
                      src="../../../../assets/img/jira/estudiantes.svg"
                    />
                  </a>
                  <a
                    href="javascript:;"
                    class="avatar avatar-lg avatar-lg rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=""
                    data-bs-original-title="Romina Hadid"
                  >
                    <img
                      alt="Image placeholder"
                      src="../../../../assets/img/jira/estudiantes2.svg"
                    />
                  </a>
                  <br />
                </div>
                <div class="p-1">
                <p class="cardTitle fuente mt-1">Estudiantes</p>
                <p class="parrafo cardSubTitle">
                  Mostrar la lista de los estudiantes ya registrados en este
                  curso
                </p>
                </div>
                
              </div>
            </a>
          </div>
          <div class="">
            <router-link :to="`/task-config/${ids}`" href="javascript:;">
              <div
                class="cajas  noactive foco2 text-center"
                style="max-width: 200px;margin-right: 15px!important;padding: 5px;"
              >
                <img
                  class="w-35 mt-1"
                  src="../../../../assets/img/logs/tarea.svg"
                  alt="fondo"
                />
                <div class="p-1">
                  <p class="cardTitle fuente ">Tareas</p>
                  <p class="parrafo cardSubTitle">
                    Puede crear eliminar o editar tareas para todos sus estudiantes
                   </p>
                </div>
               
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link :to="`/507`" href="javascript:;">
              <div
                class="cajas noactive foco2 text-center"
                style="max-width: 200px;margin-right: 15px!important;padding: 5px;"
              >
                <img
                  class="w-50 mt-2"
                  src="../../../../assets/img/usados/using.png"
                  alt="fondo"
                />
                <div class="p-1">
                    <p class="cardTitle fuente mt-1">Evaluaciones</p>
                <p class="parrafo cardSubTitle">
                  Registre evaluaciones o test por cada parcial para tener dicho aporte
                </p>
                </div>
                
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link :to="`/507`" href="javascript:;">
              <div
                class="cajas noactive foco2 text-center"
                style="max-width: 200px;margin-right: 15px!important;padding: 5px;"
              >
                <img
                  class="w-30 mt-1"
                  src="../../../../assets/img/usados/turbo.png"
                  alt="fondo"
                />
                <div class="p-1">
                      <p class="cardTitle fuente mt-1">Foros</p>
                <p class="parrafo cardSubTitle">
                  Puede crear foros de discusión para que participen los estudiantes
                </p>
                </div>
               
              </div>
            </router-link>
          </div>
         
          <!-- <div class="">
            <a @click="mostrar()" href="javascript:;">
              <div
                class="cajas noactive foco2 text-center"
                style="max-width: 200px;margin-right: 15px!important;padding: 5px;"
              >
                <img
                  class="w-80 mt-3"
                  src="../../../../assets/img/shapes/value-prop-1.7b09051298cb7d34c5d9cf9c0225e7c4.8.png"
                  alt="fondo"
                />
                <p class="cardTitle fuente text-danger mt-2">Eliminar</p>
                <p class="parrafo">
                  Puedes eliminar esta aula virtual si ya no esta en uso
                </p>
              </div>
            </a>
          </div> -->
        </section>
        <div class="text-end mt-4">
        <a class="links" @click="mostrar()" href="javascript:;">Eliminar Curso</a>
        
        </div>
        
      </div>
   

      <div class="fixed-plugin" :class="{ 'show w-100': tabb === 'iniciarr' }">
        <div
          class="card shadow-lg  desplega"
          :class="{ 'w-100': tabb === 'iniciarr' }"
          style="overflow-y: auto; z-index: 9999; "
        >
          <div
             class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
          >
            <div class="float-start">
              <h4 class="mt-2 mb-0 fuente text-white" style="font-weight: 400;">
                Estudiantes registrados en este curso
              </h4>
            </div>
            <div class="float-end mt-2">
              <button
                @click="tabb = 'cerrarr'"
                class="btn btn-link text-dark p-0 fixed-plugin-close-button"
              >
                <i style="font-size: 30px" class="fa fa-close text-white"></i>
              </button>
            </div>
            <!-- End Toggle Button -->
          </div>

          <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
            <!-- Sidebar Backgrounds -->
            <div class="row">
              <div class="col-lg-9 col-12 mx-auto">
               
                <Refresh class="mt-10" v-if="isCargar"></Refresh>
                <section v-else class="flex-containes mt-2">
                   
                  <div
                    v-for="item in inAlumnos"
                    :key="item.id"
                    class="text-center"
                  >
                    <br />
                   
                      <div class="targetas1 cajas " style="min-width:170px;">
                        <div
                          class="avatar avatar-xl position-relative mt-3"
                          v-bind:style="{ 'background-color': item.colors }"
                          style="border-radius: 100%;"
                        >
                          <p class="text-white h3" style="font-weight: 600;">
                            {{ item.img }}
                          </p>
                        </div>

                        <p class="text-xs fuente mt-3">
                          {{ item.name.slice(0, 30) }}
                        </p>
                      </div>
                   
                    
                  </div>
                
                </section>
              
               
              </div>
            </div>
          </div>
          <div
          class=" modalFooter"
         
        >
          <div class="text-end">
            
              <a
                class="btn btnNaranjaClaro "
                @click="tabb = 'cerrarr'"
              >
                Cancelar 
              </a>
              <a
                class="btn btnNaranja ms-3"
                @click="verLista()"
              >
                Actualizar lista 
              </a>
          </div>
        </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade "
        :class="{ 'show ': modals1 === 'opennn' }"
        :style="[modals1 === 'opennn' ? { display: 'block' } : {}]"
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
                ¿Eliminar este curso?
              </p>

              <p class="parrafo">
                Estás a punto de eliminar a de esta cuenta. Esta acción no se
                puede deshacer
              </p>
              <div class="mt-3">
                <a
                  @click="modals1 = 'cier'"
                  class="btn btn-sm "
                  style="background-color: #eaf0f6;
                      border-color: #cbd6e2; color: #506e91; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                  name="button"
                  >Cancelar</a
                >&nbsp; &nbsp;
                <button @click="__eliminar()" class="btn btn-sm btnRojo">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Aulaprincipal.js"></script>

<style>
.bOSBYo {
  display: flex;
  height: 200px;
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  color: inherit;
  background: rgb(222, 235, 255);
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-image: initial;
  border-radius: 3px;
  border-left: 20px solid rgb(188, 216, 253);
  box-sizing: border-box;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px;
  transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
}
.fwkeBY {
  border-radius: 3px;
  height: 180px;
  min-width: 140px;
  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.fwkeBY:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
.esnRuO {
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
    90deg,
    rgb(235, 236, 240) 0%,
    rgb(244, 245, 247) 100%
  );
}

.targetas {
  border-radius: 3px;
  height: 180px;

  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.targetas:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
.cardTitle {
  color: #1d1c1d;
  font-size: 24px;
  line-height: 30px;
}
.cardSubTitle {
  font-size: 13px!important;color: #516f90!important;
}

</style>
