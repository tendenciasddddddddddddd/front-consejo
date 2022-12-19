<template>
  <div>
    <ScrimModal @close="$router.go(-1)">
      <template v-slot:header>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" >
            <a class="nav-link " style="cursor:pointer" aria-current="page" @click="tabs=0"  :class="{ 'active': tabs == 0 }" >
              Tareas</a>
          </li>
          <li class="nav-item" >
            <a class="nav-link " style="cursor:pointer" :class="{ 'active': tabs == 1 }" aria-current="page" @click="tabs=1" >Evaluaciones</a>
          </li>
          <li class="nav-item" >
            <a class="nav-link " style="cursor:pointer" :class="{ 'active': tabs == 2 }" aria-current="page" @click="tabs=2" >Foros</a>
          </li>
          <li class="nav-item"  >
            <a @click="tabs=3" style="cursor:pointer" :class="{ 'active': tabs == 3 }" class="nav-link" >Estudiantes</a>
          </li>
         
          <li class="nav-item d-none d-lg-block"  >
            <span class="nav-link text-white ms-5">  </span>
          </li>
         
        </ul>
       
      </template>
      <template v-slot:body>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else >
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
      </template>
      <template v-slot:footer>
      <button @click="$router.go(-1)"  class="btn btnNaranja2 me-3">
        Salir de aqui
      </button>
    </template>
    </ScrimModal> 
    
  </div>
</template>

<script src="./ModuleAulas.js"></script>

