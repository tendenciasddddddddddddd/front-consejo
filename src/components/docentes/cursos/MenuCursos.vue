<template>
  <div class="row " >
     <Analitic v-if="isData"></Analitic>
     <div v-else class="col-lg-11 col-12 mx-auto">

           <img
              style="margin-top:-22px"
              class="product-core-blobs-desktop hsg-deferred hsg-deferred-loaded"
              data-src="https://f.hubspotusercontent00.net/hubfs/53/Service%20Hub%20-%20Desktop%20Header%20Element.svg"
              alt="Desktop Header Element"
              src="https://f.hubspotusercontent00.net/hubfs/53/Service%20Hub%20-%20Desktop%20Header%20Element.svg"
              data-was-processed="true"
            />
           <div v-if="!info.length">
          
          <div class="alertdanger mt-4">
              <span class="parrafo p-2">
                <strong>Nota: </strong>
              Sin cursos asignados, por favor comuníquese con
              secretaria..
              </span>
            </div>
          <div class="row mt-4">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-30"
                  src="../../../assets/img/logs/lupa.svg"
                  alt="fondo"
                />
                <div class=" mt-3 letra fuente mt-3">
                  No hay datos que mostrar
                </div>
              </div>
            </div>
          </div>
        </div>
           <div v-else style="background-image:url(https://static.hsappstatic.net/pricing-pages-unified-ui/static-1.10527/js/img/bottom-blob.svg);background-color:null;min-height: 60vh; background-size: cover;border-radius: 3px;">
                 <div class="text-start pt-4">
               
             
              <p class="h4 text-dark fuente" style="font-weight: 400;"> 
             <i class="ni ni-air-baloon"></i> &nbsp; Lista de cursos asignados  </p>
               <hr style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;"/>
               
            </div>
  
        <div   class="row">
        <section class="flex-containes mt-4">
          <div class="" v-for="item in info" :key="item.id">
            <router-link :to="`/lista-curso-m1/${item._id}/historia`" href="javascript:;">
              <div v-tooltip.bottom="'Curso: '+item.fnivel.nombres +', Materia: '+item.fmateria.nombre"
                class="cajas targetas1 borde1 text-center"
                style="max-width: 200px;margin-right: 15px!important;min-height: 225px;"
              >
                <img
                  class="w-50 mt-1"
                  src="https://static.hsappstatic.net/ui-images/static-2.322/optimized/success-quota-met.svg"
                  alt="fondo"
                />
                <div style="padding: 8px;">
                    <span class="cardTitle fuente ">{{ item.nombre }}</span>
                <p class="parrafo cardSubTitle mt-1" >
                  {{ item.fnivel.nombres.slice(0,20) }} ({{ item.paralelo }})  {{ item.fmateria.nombre.slice(0,22) }}
                </p>
                </div>

              </div>
            </router-link>
          </div>
         
       
        </section>
      </div>
     
           </div>
        
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
