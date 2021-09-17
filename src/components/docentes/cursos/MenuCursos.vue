<template>
  <div class="row " >
    
    <div class="col-lg-9 col-12 mx-auto">
     
    
      <div class="row">
        <div class="col-sm-12">
          <h3 class="fuente" style="font-weight: 400;">Cursos Asignados</h3>
           <hr>
          <div v-if="info.length" class="mt-2" style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;">
         
        <p class="text-dark fuente" style="margin:7px;font-weight: 700; font-size: 16px ">
         Esta es la lista de cursos asignados.
          </p>
        </div>
          
        </div>
      </div>
      <Skeleton v-if="isData"></Skeleton>
      <div v-else>
        <div v-if="!info.length">
          <div class="freemeeting-tip mt-3">
            <p class="text-sm text-dark fuente">
              <strong>Nota: </strong>
               Aun no se le ha registrado ningún curso, por favor comuníquese con secretaria..
            </p>
          </div>
          <div class="row mt-3">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-40"
                  src="../../../assets/img/logs/lupa.svg"
                  alt="fondo"
                />
                <div class=" mt-3 letra fuente">
                  No hay datos que mostrar
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row mt-1" >
          <!--  style="background-color:rgb(245, 248, 250);" -->

          <div v-for="item in info" :key="item.id" class="col-sm-4">
            <br />

            <div
              class=" border-secondary border-radius-md p-3 mole w-95"
              style="  border-style: dashed; border-width: 1px;"
            >
              <div class="card card-plain card-blog">
                <div class="text-center position-relative">
                  <router-link
                    :to="`/lista-curso-m1/${item._id}/historia`"
                    href="javascript:;"
                  >
                    <div class="blur-shadow-image">
                      <img
                        height="130px"
                        class="img  move-on-hover"
                        src="../../../assets/img/shapes/project-config.svg"
                      />
                    </div>
                  </router-link>
                </div>
                <div class="card-body px-0" style="padding:2px;">
                  <a class="mb-0">
                    <div
                      class="icon icon-shape icon-xs rounded-circle bg-gradient-success shadow text-center"
                    >
                      <i class="fas fa-check opacity-10" aria-hidden="true"></i>
                    </div>
                    &nbsp; <b class="fuente">{{ item.nombre }}</b> </a
                  ><br />
                  <label class="form-check-label text-xs fuente text-truncate w-90 mb-0">{{ item.fnivel.nombres }} / <b>{{ item.paralelo }} </b></label>
                  
                  <p class="text-xs mb-0 fuente"> {{ item.fmateria.nombre }}</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
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

<script src="./MenuCursos.js"></script>
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
</style>
