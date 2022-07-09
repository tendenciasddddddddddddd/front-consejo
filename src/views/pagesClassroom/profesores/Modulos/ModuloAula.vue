<template>
  <div>
     <vue-progress-bar  style="margin-top:-23px"></vue-progress-bar>
      <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="row">
      <div class="col-lg-2">
        <div class=" position-sticky top-1">
          <ul class="nav flex-column bg-white border-radius-lg p-1">
            <a href="javascript:;" @click="$router.go(-1)" class="s-regresar me-2 ms-2 mb-3">
             <svg class="me-2" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000;"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            Atrás</a>
            <li class="nav-item">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 0 }"
                data-scroll=""
                href="javascript:;"
                @click="vueInit(0)"
              >
                <span  :class="{ 's-active2': tabs == 0 }" class="text-sm s-text-versel2">Tareas</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 1 }"
                data-scroll=""
                href="javascript:;"
                @click="vueInit(1)"
              >
                <span :class="{ 's-active2': tabs == 1 }" class="text-sm s-text-versel2">Evaluaciones</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 2 }"
                data-scroll=""
                href="javascript:;"
                @click="vueInit(2)"
              >
                <span :class="{ 's-active2': tabs == 2 }" class="text-sm s-text-versel2">Foros</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link "
                :class="{ 's-active': tabs == 3 }"
                data-scroll=""
                href="javascript:;"
                @click="vueInit(3)"
              >
                <span :class="{ 's-active2': tabs == 3 }" class="text-sm s-text-versel2">Alumnos</span>
              </a>
            </li>
            <li class="nav-item pt-1">
              <a
                class="nav-link  "
                :class="{ 's-active': tabs == 4 }"
                data-scroll=""
                href="javascript:;"
                @click="vueInit(4)"
              >
                <span :class="{ 's-active2': tabs == 4 }" class="text-sm s-text-versel2">Configuración</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-10 " >
        <section v-if="tabs == 0">
          <ListTask :object="collectionTasks" :objectUser="collectionUser" @getDataTask="getData"/>
        </section>
        <section v-if="tabs == 1">
          <ListQuizz :object="collectionQuizz" @getDataTask="getData"/>
        </section>
        <section v-if="tabs == 2">
          3
        </section>
        <section v-if="tabs == 3">
          <ListUsers :objectUser="collectionUser" @getDataTask="getData"/>
        </section>
        <section v-if="tabs == 4">
          <RemoveCourse :idCourse="idCourse" :code="CourseClave"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script src="./ModuloAula.js"></script>
<style >
.s-active2{
  font-weight: 700;
  color: #000 !important;
}
.s-text-versel2{
  color:#444;
}
</style>