<template>
  <div>
    <div class="row ">
      <div class="col-lg-11 col-12 mx-auto">
        <Analitic v-if="isData"></Analitic>
        <div v-else class="" >
          <img
            style="margin-top:-22px"
            class="product-core-blobs-desktop hsg-deferred hsg-deferred-loaded"
            data-src="https://f.hubspotusercontent00.net/hubfs/53/Desktop%20Header%20Element.svg"
            alt="Desktop Header Element"
            src="https://f.hubspotusercontent00.net/hubfs/53/Desktop%20Header%20Element.svg"
            data-was-processed="true"
          />
          <div style="background-image:url(https://static.hsappstatic.net/pricing-pages-unified-ui/static-1.10527/js/img/middle-blob.svg);background-color:null;min-height: 58vh; background-size: cover;border-radius: 3px;">
                  <div class="d-flex pt-4">
            <router-link
              to="/opciones-curso"
              class="btn btn-sm "
              style="box-shadow: none"
            >
              <img
                height="23px"
                src="../../../../assets/img/usados/regresar.png"
              />
            </router-link>

            <p class="h5 fuente links ms-3" style="font-weight: 400;">
              
                {{ info.fmateria.nombre }} &nbsp; -&nbsp;
                {{ info.fnivel.nombres }} ({{ info.paralelo }}) &nbsp;-&nbsp; {{ info.nombre }}
            </p>
            
          </div>
          
              <hr />
          <section class="flex-containes mt-5" >
            <div class="">
              <router-link
                :to="{
                  name: 'd4',
                  params: {
                    id: info.fnivel._id,
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                  props: {
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                }"
                href="javascript:;"
              >
                <div
                  class="cajas targetas1 borde1 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-45 "
                    src="../../../../assets/img/usados/playbooks.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                      <p class="cardTitle fuente ">Notas</p>
                  <p class="parrafo cardSubTitle">
                    Registre los aportes de cada unos de sus estudiantes asignados
                  </p>
                  </div>
                 
                </div>
              </router-link>
            </div>
            <div class="">
              <router-link
                :to="{
                  name: 'asistencia',
                  params: {
                    id: info.fnivel._id,
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                  props: {
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                }"
                href="javascript:;"
              >
                <div
                  class="cajas targetas1 borde2 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-40 mt-2"
                    src="../../../../assets/img/logs/events.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                     <p class="cardTitle fuente ">Asistencia</p>
                  <p class="parrafo cardSubTitle">
                    Registre la asistencia a de sus alumnos segun el calendario académico 
                  </p>
                  </div>
                  
                </div>
              </router-link>
            </div>
            <div class="">
              <router-link :to="`/507`" href="javascript:;">
                <div
                  class="cajas targetas1 borde3 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-45 mt-2"
                    src="../../../../assets/img/logs/integrations.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                      <p class="cardTitle fuente ">Supletorios</p>
                  <p class="parrafo cardSubTitle">
                    Registre las notas de supleorio cuando ya confirmo las calificaciones
                  </p>
                  </div>
                 
                </div>
              </router-link>
            </div>
            <div class="">
              <router-link :to="`/507`" href="javascript:;">
                <div
                  class="cajas targetas1 borde4 text-center"
                  style="max-width: 200px;margin-right: 15px!important;"
                >
                  <img
                    class="w-35 mt-1"
                    src="../../../../assets/img/logs/add-on-transactional-email.svg"
                    alt="fondo"
                  />
                  <div class="p-2">
                     <p class="cardTitle fuente ">Correos</p>
                  <p class="parrafo cardSubTitle">
                    Enviar notificaciones, msm o correos masivos a todos sus alumnos 
                  </p>
                  </div>
                  
                </div>
              </router-link>
            </div>
          </section>
          </div>
       
         
        </div>
      </div>
   <!-- ⮕ -->
    </div>
  </div>
</template>

<script src="./ListaCursos.js"></script>
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

.foco {
  border: 1px solid #7fd1de;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
}
.foco:hover {
  box-shadow: 0 0 0 1px #7fd1de, 0 0 12px 0 rgb(0 163 189 /30%);
}
.foco2 {
  box-shadow: 0 0 1rem rgb(0 0 0 / 10%);
  min-height: 165px;
  z-index: 2;
  padding: 26px 20px 7px;
  position: relative;
  transition-property: all;
  transition-duration: 170ms;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.foco2:hover {
  transform: scale(1.075) rotate(0.0001deg);
  background-color: #fff;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
}

.hsg-deferred.hsg-deferred-loaded,
.hsg-deferred[data-was-processed="true"] {
  opacity: 1;
}

.product-core-blobs-desktop {
  display: block;
}

.product-core-blobs-mobile,
.product-core-blobs-desktop {
  width: 100%;
  height: auto;
}
.hsg-deferred {
  transition: opacity 0.35s ease-out;
  opacity: 0;
  overflow: hidden;
}
img {
  max-width: 100%;
}

.borde1 {
  border-top: 5px solid #516f90;
}
.borde2 {
  border-top: 5px solid #f5c26b;
}
.borde3 {
  border-top: 5px solid #00bda5;
}
.borde4 {
  border-top: 5px solid #00a4bd;
}
</style>
