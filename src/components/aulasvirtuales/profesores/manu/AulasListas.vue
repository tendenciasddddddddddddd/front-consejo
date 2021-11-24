<template>
   <div>
    <Analitic v-if="isData"></Analitic>
  <div v-else class="row ">
    <div class="col-lg-12 col-12 mx-auto">
      <div
        class="card " v-bind:style="{ backgroundImage: 'url(' + imagen + ')' }"
        style="background-color:null;min-height: 7vh; background-size: cover;border-radius: 3px;"
      >
        <div class="card-body text-center pt-4">
          
          <h3 class="text-white fuente">
            Aulas virtuales
          </h3>
          <p class="text-white fuente">
            Crear aula virtual para que sus alumnos se puedan matricular y enviar sus tareas.
          </p>
          <!-- <div class="input-group text-center" style="width: 360px;left: 36%;">
                <span class="input-group-text text-body buscador"
                  ><i class="fas fa-search colorhs" aria-hidden="true"></i
                ></span>
                <input
                  type="text"
                  class="form-control buscador"
                  placeholder="Buscar cursos"
                 style="background-color: #fff;"
                />
              </div> -->
        </div>
      </div>
     
    </div>
     
    <div class="col-lg-11 col-12 mx-auto mt-3">
     
      
     

        <div  class="row">
         
          <section class="flex-containes mt-3">
             <div class="" >
            <router-link to="/crear-aula" href="javascript:;">
              <div
                class="cajas targetas1 borde4 text-center"
                style="max-width: 200px;margin-right: 15px!important;min-height: 230px;"
              >
               <i style="font-size: 52px; color:#00a4bd" class="fa fa-plus mt-5" aria-hidden="true"></i>
                <div class="p-1 mt-4">
                     <a class="cardTitle fuente ">Nuevo curso</a><br>
               
                </div>
              </div>
            </router-link>
          </div>
          <div class="" v-for="item in info" :key="item.id">
            <router-link :to="`/aula-principal/${item._id}`" href="javascript:;">
              <div v-tooltip.bottom="'Curso: '+item.nombre +', Materia: '+item.materia"
                class="cajas targetas1 borde1 text-center"
                style="max-width: 200px;margin-right: 15px!important;min-height: 230px;"
              >
                <img
                  class="w-65"
                  src="../../../../assets/img/usados/profesores.png"
                  alt="fondo"
                />
                <div class="let" style="padding-left:8px; padding-right:8px;">
                     <a class="cardTitle fuente ">{{ item.icono }}</a>
                <p class="parrafo cardSubTitle" >
                   {{ item.nombre.slice(0, 24) }}, {{
                      item.materia.slice(0, 24)
                    }}
                </p>
                </div>
              </div>
            </router-link>
          </div>
        </section>

    
          
        </div>
       
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
                  ¿Eliminar a <br />
                  {{ curso }}?
                </p>

                <p class="parrafo">
                  Estás a punto de eliminar a {{ curso }} de esta cuenta. Esta
                  acción no se puede deshacer
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
   </div>
 
</template>

<script src="./AulasListas.js"></script>
<style>
.mole {
  background-color: white;
  transition: background-color 0.5s;
}

.mole:hover {
  background-color: #f5f5f5;
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.bd-example {
  position: relative;
  padding: 2rem;
  border: 3px solid #eee;
}
.let p:first-letter {
    text-transform: uppercase;
}

.let p:not(first-letter) {
    text-transform: lowercase;
}
</style>
