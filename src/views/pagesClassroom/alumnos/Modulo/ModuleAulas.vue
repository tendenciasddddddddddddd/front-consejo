<template>
  <div>
    <ScrimModal @close="$router.go(-1)">
      <template v-slot:header>
        <div v-if="!$store.state.isAppMobile" class="fjrDCGRR_tab">
                 <div @click="tabs=0" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 0 }">
                  <span style="color:#fff">  Tareas</span>
                 </div>
                 <div @click="tabs=1" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 1 }"><span style="color:#fff">Evaluaciones</span>
                   </div>
                   <div @click="tabs=2" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 2 }"><span style="color:#fff"> Foros</span>
                   </div>
                   <div @click="tabs=3" class=" inn_tab s-text-versel3" :class="{ 'canvaActive': tabs == 3 }"><span style="color:#fff">Estudiantes</span>
                   </div>
              </div>
      </template>
      <template v-slot:body>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row">
      <div class="col-lg-2" v-if="$store.state.isAppMobile">
        <div class=" position-sticky top-1">
          <ul class="nav flex-column bg-white border-radius-lg p-1">
            <a href="javascript:;" @click="$router.go(-1)" class="s-regresar me-2 ms-2 mb-3">
              <svg class="me-2" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="22" style="color: #000;">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Atrás</a>
            <li class="nav-item">
              <a class="nav-link " :class="{ 's-active': tabs == 0 }" data-scroll="" href="javascript:;"
              @click="vueInit(0)">
                <span :class="{ 's-active2': tabs == 0 }" class="text-sm s-text-versel2">Tareas</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 1 }" data-scroll="" href="javascript:;"
              @click="vueInit(1)">
                <span :class="{ 's-active2': tabs == 1 }" class="text-sm s-text-versel2">Evaluaciones</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 2 }" data-scroll="" href="javascript:;"
              @click="vueInit(2)">
                <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2">Foros</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a class="nav-link " :class="{ 's-active': tabs == 3 }" data-scroll="" href="javascript:;"
              @click="vueInit(3)">
                <span :class="{ 's-active2': tabs == 3 }" class="text-sm s-text-versel2">Participantes</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
      <div  class=" " :class="[$store.state.isAppMobile ? 'col-lg-10': 'col-lg-12']">
        <section v-if="tabs == 0">
          <ListComp :object="fullTask" @getDataTask="getData" />
        </section>
        <section v-if="tabs == 1">
          <ListExamen :object="collectionQuizz" @getDataTask="getData" />
        </section>
        <section v-if="tabs == 2">
          <h4 class="negros">En desarrollo</h4>
        </section>
        <section v-if="tabs == 3">
          <ListUser :objectUser="collectionUser" />
        </section>

      </div>
    </div>
      </template>
      
    </ScrimModal> 
    
  </div>
</template>

<script src="./ModuleAulas.js"></script>

