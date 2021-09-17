<template>
     <div class="fixed-plugin" :class="{ 'show w-100': panelAsistencias === 'open' }">
   
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': panelAsistencias === 'open' }"
        style="overflow-y: auto; z-index: 9999; top:35px;"
      >
        <div
          class="card-header pb-0 pt-3 "
          style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-3 mb-0  fuente">
              Crear Una nueva instancia 😊
            </h5>
          </div>
          <div class="float-end mt-4">
            <button
             @click="$router.go(-1)"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" style="background-color:white">
          <!-- Sidebar Backgrounds -->

          <div class="row">
            <Spinner v-if="isData"></Spinner>
            <div v-else class="col-lg-6 col-12 mx-auto">
              
                <div class="row mt-4" v-if="ispanel === 'open1'">
                  <p class="h6 text-center fuente">Asistencias</p>
                          
      <div  class="mt-4">
        

        <div class=" mb-4">
          
          <div  class="card-body px-0 pt-0 pb-2">
            <div v-if="!info.length">
              <div class="freemeeting-tip mt-3">
                <p class="text-sm text-dark">
                  <strong>Nota: </strong>
                  Aún no existen estudiantes en este curso 😢, Puedes preguntar al asistente virtual 😍
                </p>
              </div>
              <div class="row mt-3">
                <div class="col-lg-9 col-12 mx-auto">
                  <div class="text-center">
                    <img
                      class="w-35"
                      src="../../../assets/img/logs/lupa.svg"
                      alt="fondo"
                    />
                    <div class="letra fuente mt-3">
                      No hay datos que mostrar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="table-responsive p-0 mt-3">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr class="cabeza">
                    <th
                      style="background-color: rgb(234, 240, 246); "
                      class="text-uppercase text-secondary text-xxs "
                    >
                      Estudiante
                    </th>
                   
                      <th class="text-uppercase text-secondary text-xxs ">
                          Estudiante
                      </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in info" :key="item.id" :vars="(aux = 0)">
                      <td>
                          <div class="avatar me-3">
                           <img :src="item.fkestudiante.foto" alt="kal" class="" style="border-radius: 50%;height: 32px;">
                        </div>
                      </td>
                    <td>
                      <p class="mb-0 text-dark text-sm fuente">
                            {{ item.fkestudiante.apellidos }}
                            {{ item.fkestudiante.nombres }}
                          </p>
                    </td>
                  
                    <td class="align-middle text-end">
                      <a
                       
                       
                        style="cursor: pointer;"
                        
                        class="text-primary fuente"
                        >Asiste</a
                      > &nbsp;&nbsp;
                         <a
                       
                       
                        style="cursor: pointer;"
                        
                        class="text-primary fuente"
                        >Falta</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
                  <div class="text-end mt-2">
                    
                    &nbsp;
                    <a
                      class="btn btn-sm btnNaranja"
                      @click="$router.go(-1)"
                    >
                      Salir de aqui
                    </a>
                  </div>
                </div>
              
            
            </div>
           <!--  <div class="col-lg-1">
              

                    <img
                        :src="isFoto"
                        alt="profile_image"
                        class="w-100 border-radius-xl shadow-sm"
                      />
                 <img
                      class="w-100 mt-5"
                      src="../../../assets/img/logs/tarea.svg"
                      alt="fondo"
                    />
            </div> -->
          </div>
        </div>
      </div>
    </div>
</template>
<script src="./Asiste.js">

</script>