<template>
 <div>


<!--  @input="checkExist($event)" -->

   <div class="fixed-plugin"  :class="{ 'show w-100': tab === 'inicio' }">

      <div  class="card shadow-lg blur desplega"  :class="{ 'w-100': tab === 'inicio' }" 
                 style="overflow-y: auto;  z-index: 9999; top:35px;">
        <div class="card-header pb-0 pt-3" style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;">
          <div class="float-start">
            <h5 style="font-weight: 400; fuente" class="mt-3 mb-0">Todos los cursos de esta modalidad 😍 </h5>
            
          </div>
          <div class="float-end mt-4">
            <router-link
              to="/Matricula-2"
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
            <div class="col-lg-8 col-12 mx-auto">
              
               <div  class="row " v-if="isVisible==='panel1'">
          <!--  style="background-color:rgb(245, 248, 250);" -->
            <Spinner v-if="isLoading1"></Spinner>
          <div v-else v-for="item in listniveles" :key="item.id" class="col-sm-3">
            <br />

            <div
              class=" border-radius-md  mole"
              style="  border: 1px solid #7fd1de; "
            > 
              <a href="javascript:;"  @click="__verLista(item._id)">
                <div class="text-center ">

                    <div class="">
                      <img
                       style="height:150px"
                        class="img w-80  move-on-hover"
                        src="../../../../assets/img/shapes/diagrama.svg"
                      />
                    </div>
                 
                </div>
                <div >
                  <p class="text-xs text-center mt-2 fuente" style="text-transform: none;">
                  {{ item.nombres.slice(0,30) }}</p
                  >
                
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="row" v-if="isVisible==='panel2'">
          <div class="mt-4">
                      <a @click="isVisible='panel1'" type="button" class="btn w-20" style="background-color: #ff7a59;
                      border-color: #ff7a59; color: #fff; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;">
                      Regresar
                      </a>
                  </div>
          <Espera v-if="isTabla"></Espera>
        <div v-else class="table-responsive mt-4">
            
          
          <table class="elevation-2 table table-flush " >
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
                 <th style="background-color: rgb(234, 240, 246); "
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                # Nombres
                </th>
                <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Curso
                </th>
              <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in infoMat" :key="item.id">
                <td class="text-sm text-center font-weight-normal">
                    <h6 class="mb-0 text-sm fuente"> {{ item.fkestudiante.fullname }} </h6>
                </td>
                <td class="text-sm text-center font-weight-normal fuente">
                  
                    <p class="mb-0 text-xs"> {{ item.fknivel.nombres }} ({{item.curso}})</p>
                 
                </td>
                <td class="text-sm text-center font-weight-normal">
                <!--   <router-link :to="`/Reporte-matricula-v1/${item._id}/report`" class="px-3 text-dark mb-0">
                    <i class="fas fa-file-pdf text-lg me-1" aria-hidden="true"></i>
                  </router-link> -->
                    <a class="text-primary link text-gradient px-3 mb-0 " style="cursor: pointer;" @click="remove(item._id)" title="Eliminar"  >
                   <i class="far fa-trash-alt me-2" aria-hidden="true"> </i>
                    </a>
       
                </td>
              </tr>
            </tbody>
          </table>
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->
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

<script src= "./ActualMatricula2.js">
</script>

<style>
div.dataTables_wrapper  div.dataTables_filter {
  width: 100%;
  padding-left: 20px;
    
}
    
div.dataTables_wrapper div.dataTables_filter input {
     width: 100%;
    padding: .5rem .75rem;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    appearance: none;
    border-radius: .5rem;
    
}
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
  background: none;
  color: black!important;
  border-radius: 4px;
  border: 1px solid #828282;
}
 
.dataTables_wrapper .dataTables_paginate .paginate_button {
  z-index: 3;
  
    
    
    color: #8392ab;
    padding: 0;
    margin: 0 3px;
    border-radius: 50%!important;
    width: 36px;
    height: 36px;
    font-size: .875rem;
}


</style>