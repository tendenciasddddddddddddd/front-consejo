<template>
  <div class="row mt-3">
    <div class="col-lg-10 col-12 mx-auto">
              <div
          class="mt-1"
          style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p class="text-dark fuente " style="margin:7px;font-weight: 700; font-size: 16px ">
             <router-link to="/opciones-reportes" class="badge fuente regresar" style=""> 
               <i class="ni ni-bold-left"></i>&nbsp;Regresar</router-link>
              &nbsp;&nbsp;    &nbsp;&nbsp;  Puede descargar por todo el consolidado o por modalidad.
            </p>
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
                  class="w-30"
                  src="../../../../assets/img/logs/lupa.svg"
                  alt="fondo"
                />
                <div class="letra fuente">
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
            <div class="nav-wrapper" >
              <ul class="nav nav-pills nav-fill p-1" role="tablist" style="background-color: #eaf0f6; border-radius: 3px;">
                <li class="nav-item">
                  <a
                    class="nav-link mb-0 px-0 py-1 active fuente"
                    data-bs-toggle="tab"
                    style="cursor: pointer;"
                    @click="tab = 'sec3'"
                   :class="{ 'text-primary h6': tab === 'sec3' }"
                    role="tab"
                    aria-controls="preview"
                    aria-selected="true"
                  >
                    <i class="ni ni-badge text-sm me-2"></i>  Intensivo
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link mb-0 px-0 py-1  fuente"
                    data-bs-toggle="tab"
                    style="cursor: pointer;"
                     @click="tab = 'sec2'"
                  :class="{ 'text-primary h6': tab === 'sec2' }"
                    role="tab"
                    aria-controls="code"
                    aria-selected="false"
                  >
                    <i class="ni ni-laptop text-sm me-2"></i>&nbsp;&nbsp; Extraordinario
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link mb-0 px-0 py-1  fuente"
                    data-bs-toggle="tab"
                    style="cursor: pointer;"
                    @click="tab = 'sec1'"
                :class="{ 'text-primary h6': tab === 'sec1' }"
                    role="tab"
                    aria-controls="code"
                    aria-selected="false"
                  >
                    <i class="ni ni-laptop text-sm me-2"></i>&nbsp;&nbsp; Todo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Skeleton v-if="isTabla"></Skeleton>
        <div v-else class="card-body">
            <div  v-if="tab === 'sec3'" class=" h-100">
           
             <div  class="text-center  fuente">
                 <p class="parrafo">Seleccione el icono para descargar el consolidado intensivo</p>
                     <a href="javascript:;" @click="__consolodadoIntensivo()">
                      <div class="position-relative">
                        <div class="blur-shadow-image mt-5">
                          <img class="w-30 h-10 rounded-3 " src="../../../../assets/img/logs/add-on-reporting.svg">
                        </div>
                      </div>
                    </a>
             </div>
        </div>
        <div  v-if="tab === 'sec2'" class=" h-100">
               <div  class="text-center">
                    <p class="parrafo">Seleccione el icono para descargar el consolidado extraordinario</p>
                     <a href="javascript:;" @click="__consolidadoExtra()">
                      <div class="position-relative">
                        <div class="blur-shadow-image mt-5">
                          <img class="w-30 h-10 rounded-3 " src="../../../../assets/img/logs/add-on-reporting.svg">
                        </div>
                      </div>
                    </a>
             </div>
        </div>
        <div  v-if="tab === 'sec1'" class=" h-100">
              <div  class="text-center">
                  <p class="parrafo">Seleccione el icono para descargar el consolidado todo</p>
                     <a href="javascript:;" @click="__todo()">
                      <div class="position-relative">
                        <div class="blur-shadow-image mt-5">
                          <img class="w-30 h-10 rounded-3 " src="../../../../assets/img/logs/add-on-reporting.svg">
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
