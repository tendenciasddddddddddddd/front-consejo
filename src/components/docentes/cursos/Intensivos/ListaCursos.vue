<template>
  <div>
    <div class="row ">
      
      <div class="col-lg-11 col-12 mx-auto">
       
        <vue-progress-bar  style="margin-top:-23px"></vue-progress-bar>
       
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else class="" >
          <img
            style="margin-top:-20px"
            class="product-core-blobs-desktop hsg-deferred hsg-deferred-loaded"
            data-src="https://f.hubspotusercontent00.net/hubfs/53/Desktop%20Header%20Element.svg"
            alt="Desktop Header Element"
            :src="imgs"
            data-was-processed="true"
          />
          <div v-bind:style="{ backgroundImage: 'url(' + imgs2 + ')' }" style="background-color:null;min-height: 58vh; background-size: cover;border-radius: 3px;">
                  <div class="d-flex pt-4">
            <router-link
              to="/opciones-curso"
              class="btn btn-sm "
              style="box-shadow: none"
            >
              <img
                height="23px"
                src="../../../../assets/img/usados/regresar.png"
              />
            </router-link>

            <p class="h5 fuente links ms-3" style="font-weight: 400;">
              
                {{ info.fmateria.nombre }} &nbsp; -&nbsp;
                {{ info.fnivel.nombres }} ({{ info.paralelo }}) &nbsp;-&nbsp; {{ info.nombre }}
            </p>
            
          </div>
          
             
          <section class="flex-containes mt-5" >
            <div class="">
              <a
               @click="nextPage"
                href="javascript:;"
              >
                <div
                  class="cajas targetas1 borde1 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-45 "
                    src="../../../../assets/img/usados/playbooks.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                      <p class="cardTitle fuente ">Notas</p>
                  <p class="parrafo cardSubTitle">
                    Registre los aportes de cada unos de sus estudiantes asignados
                  </p>
                  </div>
                 
                </div>
              </a>
            </div>
            <div class="">
              <router-link
                :to="{
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
                }"
                href="javascript:;"
              >
                <div
                  class="cajas targetas1 borde2 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-40 mt-2"
                    src="../../../../assets/img/logs/events.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                     <p class="cardTitle fuente ">Asistencia</p>
                  <p class="parrafo cardSubTitle">
                    Registre la asistencia a de sus alumnos segun el calendario académico 
                  </p>
                  </div>
                  
                </div>
              </router-link>
            </div>
            <div class="">
              <router-link :to="`/507`" href="javascript:;">
                <div
                  class="cajas targetas1 borde3 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-45 mt-2"
                    src="../../../../assets/img/logs/integrations.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                      <p class="cardTitle fuente ">Supletorios</p>
                  <p class="parrafo cardSubTitle">
                    Registre las notas de supleorio cuando ya confirmo las calificaciones
                  </p>
                  </div>
                 
                </div>
              </router-link>
            </div>
            <div class="">
              <router-link :to="`/507`" href="javascript:;">
                <div
                  class="cajas targetas1 borde4 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-35 mt-1"
                    src="../../../../assets/img/logs/add-on-transactional-email.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                     <p class="cardTitle fuente ">Correos</p>
                  <p class="parrafo cardSubTitle">
                    Enviar notificaciones, msm o correos masivos a todos sus alumnos 
                  </p>
                  </div>
                  
                </div>
              </router-link>
            </div>
          </section>
          </div>
       
         
         
         
        </div>
      </div>
   <!-- ⮕ -->
    </div>
  </div>
</template>

<script src="./ListaCursos.js"></script>
