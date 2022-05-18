<template>
   
      <div >
        <div class="text-start">
        <span class="ms-3 s-title-page" 
          >Matricula
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 20 20" class="small svg-icon fill grey-500 s-mr-2 me-1 ms-1" id="" fill="currentColor" title=""><path d="M6.52776 18.4722C6.16165 18.1061 6.16165 17.5125 6.52776 17.1464L14.3375 9.33669C14.7036 8.97057 15.2972 8.97057 15.6633 9.33669C16.0294 9.70281 16.0294 10.2964 15.6633 10.6625L7.85359 18.4722C7.48747 18.8383 6.89388 18.8383 6.52776 18.4722Z"></path><path d="M6.52776 1.52459C6.16164 1.8907 6.16164 2.4843 6.52776 2.85041L14.3397 10.6624C14.7059 11.0285 15.2995 11.0285 15.6656 10.6624C16.0317 10.2963 16.0317 9.70269 15.6656 9.33657L7.85359 1.52459C7.48747 1.15847 6.89388 1.15847 6.52776 1.52459Z"></path></svg>
            Modalidad Extraordinaria
           </span
        >
         <p class="parrafo mt-2 ms-3">
           (Cómo entender el servicio de matricula)
            <a
              type="button"
              class="fuente tamanio ms-2"
              v-tooltip.bottom="
                'Mirar la demostración de el proceso de matriculas y generar los paralelos'
              "
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
              <b class="links ms-1 me-2">Ver demostración</b>
            </a>
           
          </p>
      </div>
        <section class="intro_cards mt-3">
          <div class="intro_cards_container">
            <div  v-for="(item, i) in arrays_of_options" :key="item.id" class="intro_card_container"  >
              <CardsOptions :index="i"  :img="item.img" :nombre="item.nombre" :description="item.description" @optionsFuntions="optionsView"></CardsOptions>
            </div>
            <div class="intro_card_container" >
               <div class="carmen align_center animate__animated animate__fadeInUp animations-5">
                  <i class='bx bx-folder-plus p-5' style="font-size:60px;color:black;"></i>
              </div>
            </div>
           
          </div>
        </section>
         
            <div v-if="ifCreateUpdate">
             <CreateMatricula2 :modalidad="mod"  @myEventClosedModalMatricula="closedChildMatricula" ></CreateMatricula2>
         </div>
          <div v-if="ifRemoveMatricula">
             <ListRemoveMatricula2 :modalidad="mod"  @myEventClosedModalRemove="closedChildRemoveMa2" ></ListRemoveMatricula2>
         </div>
         <div v-if="ifParalelo2">
             <ParaleloMatricula2  @myEventClosedModalParalelo2="closedChildParalelo2" ></ParaleloMatricula2>
         </div>
          <div v-if="ifMigracion">
          <MigracionMatricula @myEventClosedModalMigracion1="closedChildMigracion" :idGet="mod"></MigracionMatricula>
        </div>
        <div v-if="ifMigracion2">
          <MigrationnList
            @myEventClosedModalMigracion2="closedChildMigracionList"
          ></MigrationnList>
        </div>
      </div>
    
</template>

<script src="./Matriculas2.js"></script>
