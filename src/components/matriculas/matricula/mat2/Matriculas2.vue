<template>
<div>
  <div class="row mb-5">
      <div class="col-lg-11 col-12 mx-auto">
        <div>
          <span class="fuente h3 " style="font-weight: 400;">Funciones de modalidad extraordinaria</span>
            <p class="parrafo mt-2" >
              <i class="ni ni-air-baloon"></i> &nbsp; Primero registre las matriculas, luego puede divir el curso en los paralelos... 👌
              
              <a type="button" class="fuente tamanio ms-3" v-tooltip.bottom="'Mirar la demostración de el proceso de matriculas y generar los paralelos'"> 
                <i class="fa fa-eye" aria-hidden="true"></i> 
              <b class="links ms-2">Ver demostración</b> 
              </a>
            </p>
          </div>
          <hr>
  
            


          <div class="row">
            <section class="flex-containes mt-5">
                    <div class=""  >
                        <router-link
                          to="/Create-Matricula-v2"
                          href="javascript:;"
                        >
                          <div class="cajas foco2 borde1 text-center" style="max-width: 200px;margin-right: 13px!important;">
                            <img
                              class="w-50"
                              src="../../../../assets/img/shapes/contacts.svg"
                              alt="fondo"
                            />
                              <p class="cardTitle fuente " >Matricula</p>
                             <p class="parrafo cardSubTitle p-1" >
                               Crear nueva matricula extraordinaria
                             </p>
                           
                          </div>
                        </router-link>
                      </div>
                      <div class="">
                        <router-link
                          to="/Actual-Matricula-m2"
                          href="javascript:;"
                        >
                          <div class="cajas foco2 borde2 text-center" style="max-width: 200px;margin-right: 13px!important;">
                            <img
                              class="w-60"
                              src="../../../../assets/img/usados/ticket.svg"
                              alt="fondo"
                            />
                            <p class="cardTitle fuente " >Listas</p>
                             <p class="parrafo cardSubTitle p-1">
                               Listado de todas las matriculas
                             </p>
                          
                          </div>
                        </router-link>
                      </div>
                        <div class="">
                        <div class="cajas foco2 borde3 text-center" style="max-width: 200px;">
                          <router-link :to="`/Lista-Paralelo-v2`">
                            <img
                              class="w-50"
                              src="../../../../assets/img/usados/multiple-objects.svg"
                              alt="fondo"
                            />
                            <p class="cardTitle fuente " > Paralelos</p>
                             <p class="parrafo cardSubTitle p-1">
                               Generar paralelos de todos los cursos
                             </p>
                          
                          </router-link>
                        </div>
                      </div>
                       <div >
                        <div class="cajas foco2 borde4 text-center" style="max-width: 200px; ">
                          <router-link :to="`/507`">
                            <img
                              class="w-50"
                              src="../../../../assets/img/logs/documents.svg"
                              alt="fondo"
                            />
                           <p class="cardTitle  fuente " > Respaldo</p>
                             <p class="parrafo cardSubTitle p-1">
                               Reguardar la información en un BD de resepaldos
                             </p>
                          
                          </router-link>
                        </div>
                      </div>
                   

  <!-- <button v-tooltip.top-center="'msg'">Hover me</button> -->
               </section>
           
          </div>
        
      

          
        
      </div>
    </div>

</div>
  
</template>

<script src="./Matriculas2.js"></script>
