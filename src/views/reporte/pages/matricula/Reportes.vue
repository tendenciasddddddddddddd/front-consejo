<template>
  <ScrimModal @close="close">
    <template v-slot:header>Reporte de matriculas, promociones y libretas</template>
    <template v-slot:body>
      <Spinner v-if="isLoading1"></Spinner>
      <div v-else>
        <Dropdown v-model="curso" :options="listniveles" />
        <Astronauta v-if="isPrint" />
        <Emergente @closeEmergente="(ifEmergente=false)" v-if="ifEmergente" />
        <Spinner v-if="isTabla"></Spinner>
        <section v-else>
          <div v-if="infoMat.length" class="mt-3 ">
            <div class="row mb-2">
              <div class="col-lg-6">
                    <div class="d-flex justify-content-start">
                      <div class="d-flex justify-content-start">
                        <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="id"  :value="ite"
                          @click="onChange(ite)" v-model="searchQuery"/>
                        <span class="negros gordo" for="ite">
                          {{ ite}}</span>
                      </div>
                    </div>
                      </div>
                    <div class="ms-3">
                      <div class="input-group" style="min-width: 280px;">
        <span class="input-group-text text-body buscador busca"><i class="fas fa-search" aria-hidden="true"></i></span>
        <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
    </div>
                    </div>
                    
                  </div>
                </div>
              <div class="col-lg-6 text-start">
                <button :disabled="!isSelecMatricula.length" @click="conducta_pdf()" class="btn btnNaranja2 me-2"> 
                  <svg class="me-2" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                    <path d="M6 9V2h12v7"></path>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                    <path d="M6 14h12v8H6z"></path>
                  </svg>
                  <b>Comportamiento</b> </button>
                  <button :disabled="!isSelecMatricula.length" @click="get2()" class="btn btnNaranja2 me-2"> 
                  <svg class="me-2" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                    <path d="M6 9V2h12v7"></path>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                    <path d="M6 14h12v8H6z"></path>
                  </svg>
                  <b>Promociones</b> </button>

                  <button :disabled="!isSelecMatricula.length" @click="get()" class="btn btnNaranja2 me-2"> 
                  <svg class="me-2" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                    <path d="M6 9V2h12v7"></path>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                    <path d="M6 14h12v8H6z"></path>
                  </svg>
                  <b>Reporte matricula</b> </button>
                
              
              </div>
            </div>
            <div class="table-responsive ">
              <table class="dataTable-table table s-table-flush">
                <thead class="thead-light">
                  <tr class="cabeza">
                    <th style="background-color: rgb(234, 240, 246); ">
                      <div class="d-flex ms-3">
                        <div v-if="!allSelected" class="form-check my-auto" style="min-height: 0rem;">
                          <input class="form-check-input cheka" type="checkbox" @click="selectAll" />
                        </div>
                        <i @click="deletedSelected" v-else class="fa fa-minus s-icon-all" aria-hidden="true"></i>
                        <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                          Nombres
                        </span>
                      </div>
                    </th>
                    <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                      Paralelo
                    </th>
                    <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                      Fecha
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in displayedArticles" :key="item.id"
                    :class="{ 's-ifactive': isSelecMatricula.includes(item._id) }">
                    <td>
                      <div class="d-flex ms-3">
                        <div class="form-check my-auto supcheka">
                          <input class="form-check-input cheka" type="checkbox" v-model="isSelecMatricula"
                            :value="item._id" @click="selectcursos(item._id)" />
                        </div>
                        &nbsp;&nbsp;
                        <span class="mb-0 mt-1 text-xs negros fuente">
                          {{ item.nombre }}
                        </span>
                      </div>
                    </td>
                    <td class="text-xs text-center text-dark fuente">
                      {{ item.curso }}
                    </td>
                    <td class="text-xs text-center text-dark fuente">
                      {{ item.fecha }}
                    </td>

                  </tr>
                </tbody>
              </table>
             
            </div>
          </div>
          <section v-else>
            <NoFound />
          </section>
        </section>
        <section v-if="ifmatricula" style="display: none">
          <FormatoMatricula :rowData="rowData" @changeStatus="changeStatus" :settings="settings" />
        </section>

        <section v-if="ifpromocion" style="display: none">
          <FormatoPromocion :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :settings="settings" />
        </section>

        <section v-if="ifPromocionInicial" style="display: none">
          <InicialesPromocion :numActual="numActual" :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :settings="settings" />
        </section>

      

        <section v-if="ifconducta" style="display: none">
          <LibretasConducta :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :settings="settings" :numQuimestre="numQuimestre" />
        </section>
       
      </div>
    </template>
    <template v-slot:footer>
      <button @click="close"  class="btn btnNaranja2 me-3">
        <b>Salir de aqui</b>
      </button>
    </template>
  </ScrimModal>
</template>

<script src="./Reportes.js"></script>

  
