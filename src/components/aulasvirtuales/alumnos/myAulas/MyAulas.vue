<template>
  <div class="row " >
    <Analitic v-if="isData"></Analitic>
    <div v-else class="col-lg-12 col-12 mx-auto">
     
    
     <div
        class="card " v-if="info.length"
        style="background-image:url(https://community.hubspot.com/html/assets/grouphubpage-banner.jpg);background-color:null;min-height: 7vh; background-size: cover;border-radius: 3px;"
      >
        <div class="card-body text-center pt-4">
          
          <h3 class="text-white fuente">
            Aulas virtuales
          </h3>
          <p class="text-white fuente">
            Crear aula virtual para que sus alumnos se puedan matricular y enviar sus tareas.
          </p>
        </div>
      </div>
      
      <div >
        <div v-if="!info.length">
           <div  class="mt-2 alertdanger" >
         
        <p class="text-dark fuente" style="margin:7px;font-weight: 400; font-size: 16px ">
             Aun no te has matriculado en ningun curso, 😢😢😢
          </p>
        </div>
          <div class="row mt-5">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-20"
                  src="../../../../assets/img/usados/undraw_search.svg"
                  alt="fondo"
                />
                <div class=" mt-4 letra fuente">
                  Hemos buscado en todas partes, pero no tenemos <br>
                  nada que mostrarte. Prueba registrandote<br>
                 en un curso
                </div>
              </div>
            </div>
          </div>
        </div>
        
            <section v-else  class="flex-containes mt-4">
             
          <div class="" v-for="item in info" :key="item.id">
            <router-link :to="`/home-aula/${item._id}`" href="javascript:;">
              <div v-tooltip.bottom="'Docente: '+item.doc +', Materia: '+item.materia"
                class="cajas targetas1 borde1 text-center"
                style="max-width: 200px;margin-right: 15px!important;min-height: 230px;"
              >
                <img
                  class="w-65"
                  src="../../../../assets/img/usados/docente.png"
                  alt="fondo"
                />
                <div class="let" style="padding-left:8px; padding-right:8px;">
                     <a class="fuente " style="font-size: 16px;">{{ item.materia.slice(0, 12) }}</a><br>
                <p class="parrafo cardSubTitle">
                   {{ item.materia.slice(12, -1) }}, {{
                      item.doc.slice(0, 32)
                    }}
                </p>
                </div>
              </div>
            </router-link>
          </div>
        </section>
      </div>

      <!-- <div class="row">
  
  <div class="col-md-4">
    <a href="javascript:;">
      <div class="card card-background move-on-hover bg-cover">
        <div class="full-background " style="background-image: url('https://image.freepik.com/vector-gratis/entrenador-negocios-que-muestra-grafico-crecimiento-empresaria-computadora-portatil-entrenamiento-estadisticas-ilustracion-plana-concepto-analisis-gestion-banner-diseno-sitios-web-o-pagina-web-destino_74855-14298.jpg')"></div>
        <div class="card-body pt-6">
          <h4 class="text-white">Intensivo</h4>
          <p class="text-sm">Primero de bachillerato.</p>
        </div>
      </div>
    </a>
  </div>
</div> -->
    </div>
  </div>
</template>

<script src="./MyAulas.js"></script>
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

.targetas1 {
  border-radius: 3px;
  min-height: 180px;
  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.targetas1:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
</style>
