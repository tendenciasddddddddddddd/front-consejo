<template>
  <ScrimModal @close="close">
    <template v-slot:header>Reporte de matriculas, promociones y libretas</template>
    <template v-slot:body>
      <Spinner v-if="isLoading1"></Spinner>
      <div v-else>
        <Dropdown v-model="curso" :options="listniveles" />
        <Astronauta v-if="isPrint" />
        <Spinner v-if="isTabla"></Spinner>
        <section v-else>
          <div v-if="infoMat.length" class="mt-3 ">
            <div class="row mb-2">
              <div class="col-lg-4">
                <div class="input-group" style="margin-bottom: 7px;">
                  <span class="input-group-text text-body buscador busca">
                    <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
                  </span>
                  <input class="form-control buscador buscaa" type="text" v-model="searchQuery" style="background: white;"
                    placeholder="Buscar por paralelo">
                </div>
              </div>
              <div class="col-lg-8 text-start">
                
                <div class="btn-group dropup">
                  <a v-on="isSelecMatricula.length ? { click: () => conducta_pdf() } : {}" class="tamanio me-3" role="button"  :class="{ disabled: isSelecMatricula.length === 0 }">
                    <svg class="me-1" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
                    </svg>
                   <b class="gordo" :class="{ links2: isSelecMatricula.length != 0}"> Conducta</b>
                  </a>
                </div>
                <div class="btn-group dropup">
                  <a v-on="isSelecMatricula.length ? { click: () => activar() } : {}" class="tamanio  me-3" role="button" :class="{ disabled: isSelecMatricula.length === 0 }">
                    <svg class="me-1" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                      <path d="M16 13H8"></path>
                      <path d="M16 17H8"></path>
                      <path d="M10 9H8"></path>
                    </svg>
                    <b class="gordo" :class="{ links2: isSelecMatricula.length != 0}"> Libretas</b>
                  </a>

                </div>

                <a v-on="isSelecMatricula.length ? { click: () => get2() } : {}" class="tamanio me-3" role="button" :class="{ disabled: isSelecMatricula.length === 0 }">
                  <svg class="me-1" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"></path>
                    <path d="M13 2v7h7"></path>
                  </svg>
                   <b class="gordo" :class="{ links2: isSelecMatricula.length != 0}">Promoción</b>
                </a>
                <a  v-on="isSelecMatricula.length ? { click: () => get() } : {}" class="tamanio" role="button" :class="{ disabled: isSelecMatricula.length === 0 }">
                  <svg class="me-1" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="18" style="margin-top: -3px;">
                    <path d="M6 9V2h12v7"></path>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                    <path d="M6 14h12v8H6z"></path>
                  </svg>
                   <b class="gordo " :class="{ links2: isSelecMatricula.length != 0}">Reporte matricula</b>
                </a>
              
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
              <Paginate :numPages="numPages" :page="page" :total="infoMat.length" @pagechanged="onPageChange">
              </Paginate>
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

        <section v-if="iflibretas" style="display: none">
          <FormatoLibretas :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" :settings="settings"
            :numQuimestre="numQuimestre" :parcial="parcial" :parcial2="parcial2" />
        </section>

        <section v-if="ifconducta" style="display: none">
          <LibretasConducta :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :settings="settings" :numQuimestre="numQuimestre" />
        </section>
        <section v-if="isActive">
          <Modal @close="closeModal">
            <template v-slot:header> Libretas escolares</template>
            <template v-slot:body>
              <div>
                <p class="h6 fuente negros" style="font-weight:400;">
                  Seleccionar uno de los dos quimestres
                </p>
                <div>
                  <section>
                    <div class="">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" name="ite.id" :id="0"
                          :value="0" />
                        <span class="parrafo"> Primer quimestre</span>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-check mb-1">
                        <input class="form-check-input" v-model="checked" type="radio" name="ite.id" :id="1"
                          :value="1" />
                        <span class="parrafo"> Segundo quimestre</span>
                      </div>
                    </div>
                  </section>
                  <section class="mt-3 ">
                    <p class="h6 fuente negros" style="font-weight:400;">
                      Seleccionar uno o varios parciales para generar el reporte
                    </p>
                    <div>
                      <div class="form-check my-auto supcheka">
                        <input class="form-check-input cheka" type="checkbox" value="1" v-model="parcial" />
                      </div> <span class="ms-4 parrafo negros">Primer parcial</span>
                    </div>
                    <div class="mt-3">
                      <div class="form-check my-auto supcheka">
                        <input class="form-check-input cheka" type="checkbox" value="2" v-model="parcial2" />
                      </div><span class="ms-4 parrafo negros">Segundo parcial</span>
                    </div>
                  </section>
                </div>
              </div>
            </template>
            <template v-slot:acccion>
              <button @click="libretas_pdf" type="submit" class="btn btnNaranja mt-2">
                Generar Reporte
              </button>
            </template>
          </Modal>
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

  
