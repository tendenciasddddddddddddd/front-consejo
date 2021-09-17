<template>
  <div>
    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicio' }">
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': tab === 'inicio' }"
        style="overflow-y: auto;  z-index: 9999; top:35px;"
      >
        <div
          class="card-header pb-0 pt-3"
          style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-3 mb-0 fuente">Asignar Paralelos</h5>
          </div>
          <div class="float-end mt-4">
            <router-link
              to="/Matricula-1"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button "
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
          <div class="row">
             <div class="col-lg-3 
                 
                  d-md-block d-none
                  me-n8" style="position:absolute;bottom:0;left:0;">
                   <div class="top-10" style="">
                            <img
                class=""
                src="../../../../assets/img/logos/fondoDerecho.svg"
                alt="fondo"
              />
                  </div>
            </div>
            <div class="col-lg-7 col-12 mx-auto">
              <div class="row " v-if="isVisible === 'panel1'">
                <!--  style="background-color:rgb(245, 248, 250);" -->
                <Skeleton v-if="isLoading1"></Skeleton>
                <div
                  v-else
                  v-for="item in listniveles"
                  :key="item.id"
                  class="col-sm-3"
                >
                  <br />

                  <div
                    class=" border-radius-md p-3 mole"
                    style="  border: 1px solid #7fd1de; "
                  >
                    <a @click="__verLista(item._id)" href="javascript:;">
                      <div class="text-center position-relative">
                       
                          <div class="blur-shadow-image">
                            <img
                              
                              class="img  move-on-hover w-100"
                              src="../../../../assets/img/shapes/respaldo.svg"
                            />
                          </div>
                      </div>
                      <div>
                        <p class="text-xs text-center mt-2 fuente">
                          <b>{{ item.nombres }}</b>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="mt-4">
                  <div class="d-flex justify-content-start">
                    
                    <a  @click="isVisible = 'panel1'" class="btn btn-sm btnNaranja" href="javascript:;">
                     Regresar
                    </a>   &nbsp; &nbsp; &nbsp;
                    <a
                      type="button"
                      style="color: #0091ae;"
                      class="fuente"
                      @click="__mostrarConf()"
                      v-if="check=='B'||check=='G'"
                    >
                     <i class="ni ni-ungroup"></i> Ver lista Asignados
                    </a>
                    &nbsp; &nbsp;&nbsp;
                    <div v-if="!isClick">
                      <a
                      @click="remove()"
                      v-if="isSelecCurosos.length&&(check=='B'||check=='G') "
                      type="button"
                      class="fuente"
                      style="color: #0091ae;"
                    >
                     <i class="ni ni-archive-2"></i> Guardar Asignación
                    </a>
                    </div>
                    
                    &nbsp; &nbsp; &nbsp;
                     <select
                      v-model="check"
                      class="form-control form-control-sm fuente w-15"
                      
                    >
                      <option value="N">Ninguno</option>
                      <option value="B">B</option>
                      <option value="G">G</option>
                    </select> &nbsp; &nbsp; &nbsp;
                     <div v-if="isError!=''">
                       <p class="parrafo text-danger">{{isError}}</p>
                     </div>
                  </div>
                </div>
                <Espera v-if="isTabla"></Espera>
                <div v-else class="table-responsive mt-3">
                  <table class="elevation-2 table table-flush ">
                    <div v-if="!infoMat.length" class="row mt-3">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-30"
                            src="../../../../assets/img/logs/lupa.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente">
                            No hay datos que mostrar
                          </div>
                        </div>
                      </div>
                    </div>
                    <thead v-else class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-secondary text-xxs "
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs "
                        >
                          Curso
                        </th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in infoMat" :key="item.id">
                        <td>
                          <div class="d-flex">
                          <div class="form-check my-auto">
                             <input class="form-check-input" type="checkbox" @click="selectcursos(item._id)">
                          </div> &nbsp;&nbsp;
                           <a class="mb-0 text-sm text-dark fuente">
                            {{ item.fkestudiante.fullname }}
                           
                          </a>
                        </div>
                        </td>
                         
                        <td class="text-sm text-center fuente">
                          <p class="mb-0 text-xs">
                            {{ item.fknivel.nombres }} ({{ item.curso }})
                          </p>
                        </td>
                       
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row" v-if="isVisible === 'panel3'">
                <div class="mt-4">
                  <a
                    @click="__volverAsignacion()"
                    type="button"
                    class="btn btn-sm btnNaranja"
                    
                  >
                    Regresar
                  </a>
                   &nbsp; &nbsp;&nbsp;
                    <div v-if="!isClick2">
                      <a
                      @click="remove2()"
                      v-if="isRemoveSelecC.length"
                      type="button"
                      class="fuente"
                      style="color: #0091ae;"
                    >
                     <i class="ni ni-archive-2"></i> Remover Paralelos
                    </a>
                    </div>
                </div>
                <Espera v-if="isTabla"></Espera>
                <div v-else class="table-responsive mt-4">
                  <table class="elevation-2 table table-flush ">
                    <div v-if="!infoMat2.length" class="row mt-3">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-30"
                            src="../../../../assets/img/logs/lupa.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente">
                            No hay datos que mostrar
                          </div>
                        </div>
                      </div>
                    </div>
                    <thead v-else class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-secondary text-xxs"
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs"
                        >
                          Curso
                        </th>
                       
                      </tr>
                    </thead>
                    <Skeleton v-if="isConfig"></Skeleton>
                    <tbody v-else>
                      <tr v-for="item in infoMat2" :key="item.id">
                        <td class="text-sm ">
                         <div class="d-flex">
                          <div class="form-check my-auto">
                             <input class="form-check-input" checked="" type="checkbox" @click="removeSelectCursos(item._id)">
                          </div> &nbsp;&nbsp;
                           <a class="mb-0 text-sm text-dark fuente">
                            {{ item.fkestudiante.fullname }}
                           
                          </a>
                        </div>
                        </td>
                        <td class="text-sm text-center">
                          <p class="mb-0 text-xs">
                            {{ item.fknivel.nombres }} ({{ item.curso }})
                          </p>
                        </td>
                        
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
             <div class="col-lg-3 d-md-block d-none
                  
                 "  style="position:absolute;bottom:0;right:0;">
                   <div class="" style="">
                            <img
                class=""
                src="../../../../assets/img/logos/fondoIzquierdo.svg"
                alt="fondo"
              />
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./EnlistarParalelo.js"></script>

<style>
div.dataTables_wrapper div.dataTables_filter {
  width: 100%;
  padding-left: 20px;
}
.botonimagen {
  background-image: url(../../../../assets/img/logos/logoE.png);
  background-repeat: no-repeat;
  height: 50px;
  width: 50px;
  background-position: center;
}
div.dataTables_wrapper div.dataTables_filter input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: #495057;
  background-clip: padding-box;
  border: none;
  appearance: none;
  border-radius: 0.5rem;
}
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
  background: none;
  color: black !important;
  border-radius: 4px;
  border: 1px solid #828282;
}

.dataTables_wrapper .dataTables_paginate .paginate_button {
  z-index: 3;

  color: #8392ab;
  padding: 0;
  margin: 0 3px;
  border-radius: 50% !important;
  width: 36px;
  height: 36px;
  font-size: 0.875rem;
}
.fondos {
  border-radius: 0;
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
  padding: 15px;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}
</style>
