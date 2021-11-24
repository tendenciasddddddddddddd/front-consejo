<template>
  <div class="row mt-3">
    <div class="col-lg-11 col-12 mx-auto">
        <div
        class="mt-1"
        style="background-color: #e5f5f8; padding:2px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <div>
          <div style="margin:3px;font-weight:700; color: #33475b;">
            <router-link to="/opciones-reportes" class="badge" style="box-shadow: none">
              <img
                height="23px"
                src="../../../../assets/img/usados/regresar.png"
              />
            </router-link>
            &nbsp;&nbsp; &nbsp; Puede descargar por todo el consolidado o por modalidad.
          </div>
        </div>
      </div>
          <div v-if= "isconsolidado">
            <div class="text-center mt-4">
               <button @click="mostrarConsolidado()" class="btn btnNaranja w-50"> Cargar Data</button>
            </div>
            
              <div class="row mt-4">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-35"
                  src="../../../../assets/img/logs/lupa.svg"
                  alt="fondo"
                />
                <div class="letra fuente mt-3">
                 Presione el botón para recuperar los datos
                </div>
              </div>
            </div>
          </div>
          </div>
       <div v-else class="mt-4">
          
        <!-- Card header -->
        <div class="row">
          <div class="col-lg-12">

            <div class="contenidotabs">
                <a class="tabss fuente" @click="tab = 'sec3'" :class="{ 'tabsActive links': tab=='sec3' }">Intensivo</a>
                <a class="tabss fuente" @click="tab = 'sec2'" :class="{ 'tabsActive links': tab=='sec2' }">Extraordinario </a>
                <a class="tabss fuente" @click="tab = 'sec1'" :class="{ 'tabsActive links': tab=='sec1' }">Toda la data</a>
            </div>
             <hr style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;"/>
           
          </div>
        </div>
        <Analitic v-if="isTabla"></Analitic>
        <div v-else class="card-body">
            <div  v-if="tab === 'sec3'" class=" h-100">
           
             <div  class="text-center  fuente">
                 <p class="parrafo">Seleccione el icono para descargar el consolidado intensivo 👇</p>
                  <hr class="horizontal dark my-1"/>
                  <Spinner v-if="isIntensivo"></Spinner>
                     <a v-else href="javascript:;" @click="__consolodadoIntensivo()">
                      <div class="position-relative">
                        <div class="blur-shadow-image mt-5">
                          <img class="w-25 h-10 rounded-3 " src="../../../../assets/img/shapes/deployments-feature.svg">
                        </div>
                      </div>
                    </a>
             </div>
        </div>
        <div  v-if="tab === 'sec2'" class=" h-100">
               <div  class="text-center">
                    <p class="parrafo">Seleccione el icono para descargar el consolidado extraordinario 👇</p>
                     <hr class="horizontal dark my-1"/>
                     <Spinner v-if="isExtraordianrio"></Spinner>
                     <a v-else href="javascript:;" @click="__consolidadoExtra()">
                      <div class="position-relative">
                        <div class="blur-shadow-image mt-5">
                          <img class="w-25 h-10 rounded-3 " src="../../../../assets/img/shapes/deployments-feature.svg">
                        </div>
                      </div>
                    </a>
             </div>
        </div>
        <div  v-if="tab === 'sec1'" class=" h-100">
              <div  class="text-center">
                  <p class="parrafo">Seleccione el icono para descargar el consolidado todo 👇</p>
                   <hr class="horizontal dark my-1"/>
                   <Spinner v-if="isTodo"></Spinner>
                     <a v-else href="javascript:;" @click="__todo()">
                      <div class="position-relative">
                        <div class="blur-shadow-image mt-5">
                          <img class="w-25 h-10 rounded-3 " src="../../../../assets/img/shapes/deployments-feature.svg">
                        </div>
                      </div>
                    </a>
             </div>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script src="./Consolidados.js"></script>

<style></style>
