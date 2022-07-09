<template>
 <div>
     <vue-progress-bar  style="margin-top:-23px"></vue-progress-bar>
      <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row">
      <div class="col-lg-2">
        <div class=" position-sticky top-1">
          <ul class="nav flex-column bg-white border-radius-lg p-1">
            <a href="javascript:;" @click="$router.go(-1)" class="s-regresar me-2 ms-2 mb-3">
           <svg data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000;"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            Atrás</a>
            <li class="nav-item">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 'tarea' }"
                data-scroll=""
                href="javascript:;"
                @click="tabs = 'tarea'"
              >
                <span  :class="{ 's-active2': tabs == 'tarea' }" class="text-sm s-text-versel2">Tareas</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 'eva' }"
                data-scroll=""
                href="javascript:;"
                @click="tabs = 'eva'"
              >
                <span :class="{ 's-active2': tabs == 'eva' }" class="text-sm s-text-versel2">Evaluaciones</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 'foro' }"
                data-scroll=""
                href="javascript:;"
                @click="tabs = 'foro'"
              >
                <span :class="{ 's-active2': tabs == 'foro' }" class="text-sm s-text-versel2">Foros</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 'list' }"
                data-scroll=""
                href="javascript:;"
                @click="tabs = 'list'"
              >
                <span :class="{ 's-active2': tabs == 'list' }" class="text-sm s-text-versel2">Participantes</span>
              </a>
            </li>
           
          </ul>
        </div>
      </div>
      <div class="col-lg-10 " >
        <section v-if="tabs == 'tarea'">
           <ListComp :object="fullTask"  @getDataTask="getData"/>
        </section>
        <section v-if="tabs == 'eva'">
          <ListExamen :object="collectionQuizz" @getDataTask="getData"/>
        </section>
        <section v-if="tabs == 'foro'">
          3
        </section>
        <section v-if="tabs == 'list'">
           <ListUser :objectUser="collectionUser" />
        </section>
       
      </div>
    </div>
  </div>
</template>

<script src="./ModuleAulas.js"></script>
<style >
.s-active2{
  font-weight: 700;
  color: #000 !important;
}
.s-text-versel2{
  color:#444;
}
</style>
