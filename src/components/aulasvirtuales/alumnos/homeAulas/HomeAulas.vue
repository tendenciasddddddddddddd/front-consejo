<template>
  <div>
    <div class="row ">
      <Spinner v-if="isData"></Spinner>
      <div v-else class="col-lg-11 col-12 mx-auto" style="background-image:url(https://static.hsappstatic.net/pricing-pages-unified-ui/static-1.10527/js/img/middle-blob.svg);background-color:null;min-height: 63vh; background-size: cover;border-radius: 3px;">
         <div class=" text-start" >
            <router-link
              to="/my-lista"
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
          Módulos de aulas virtuales</div>
          <section class="flex-containes mt-5" >
          <div class="">
            <a @click="empujarAlumnos()" href="javascript:;">
              <div
                class="cajas targetas1 borde1 text-center"
                style="max-width: 200px;margin-right: 15px!important; "
              >
                <img
                                class="w-50"
                                src="../../../../assets/img/usados/your_.png"
                                alt="fondo"
                              />
                <div class="p-2">
                <p class="cardTitle fuente ">Estudiantes</p>
                <p class="parrafo cardSubTitle">
                  Mostrar la lista de los participantes actuales en este curso
                </p>
                </div>
                
              </div>
            </a>
          </div>
          <div class="">
            <router-link :to="`/task-config2/${ids}`" href="javascript:;">
              <div
                class="cajas targetas1 borde2 text-center"
                style="max-width: 200px;margin-right: 15px!important;"
              >
                <img
                  class="w-35 mt-1"
                  src="../../../../assets/img/usados/focotarea.png"
                  alt="fondo"
                />
                <div class="p-2">
                  <p class="cardTitle fuente mt-1">Tareas</p>
                  <p class="parrafo cardSubTitle">
                    Enviar y revisar tareas pendientes en este curso, y mostrar su calificación
                   </p>
                </div>
               
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link :to="`/507`" href="javascript:;">
              <div
                class="cajas targetas1 borde3 text-center"
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
                  Resolver evaluaciones pendiantes asignadas por su docente o tutor
                </p>
                </div>
                
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link :to="`/507`" href="javascript:;">
              <div
                class="cajas targetas1 borde4 text-center"
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
                  Participar en todos los foros a tiempo, creados por su docente o tutor 
                </p>
                </div>
               
              </div>
            </router-link>
          </div>
         
         
        </section>
      
      </div>

      <div class="fixed-plugin" :class="{ 'show w-100': tabb === 'iniciarr' }">
        <div
          class="card shadow-lg  desplega"
          :class="{ 'w-100': tabb === 'iniciarr' }"
          style="overflow-y: auto; z-index: 9999;"
        >
          <div
            class=" cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 50px;
         padding: 4px 46px 4px 40px;"
          >
            <div class="float-start">
              <h5 class="mt-3 mb-0 fuente text-white" style="font-weight: 400;">
                Estudiantes en este curso
              </h5>
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

          <div class="card-body pt-sm-3 pt-0">
            <!-- Sidebar Backgrounds -->
            <div class="row">
             
              <div class="col-lg-8 col-12 mx-auto">
                <p class="h5 fuente">Personas</p>
                <Spinner v-if="isCargar"></Spinner>
                <div v-else class="row">
                  <div
                    v-for="item in inAlumnos"
                    :key="item.id"
                    class="col-sm-2"
                  > <br>
                    <div class="text-center ">
                      
                      <div class="targetas">
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
                          {{ item.name.slice(0, 20) }}
                        </p>
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
</template>

<script src="./HomeAulas.js"></script>

<style>
.bOSBYo1 {
  display: flex;
  height: 200px;
  max-width: 100%;
  padding-top: 16px;
  flex-direction: column;
  color: inherit;
  background: rgb(222, 235, 255);
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-image: initial;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px;
  transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
}
.fwkeBY1 {
  border-radius: 3px;

  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.fwkeBY1:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
.esnRuO1 {
  background: rgb(244, 245, 247);
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
</style>
