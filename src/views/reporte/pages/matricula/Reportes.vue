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
                  <span class="input-group-text text-body buscador"><i class="fas fa-search links"
                      aria-hidden="true"></i></span>
                  <input class="form-control buscador" type="text" v-model="searchQuery" style="background: white;"
                    placeholder="Buscar">
                </div>
              </div>
              <div class="col-lg-8 text-end">
                <div class="btn-group dropup">
                  <a class="fuente tamanio  negros me-3" role="button" @click="conducta_pdf">
                    <svg class=" me-1" data-testid="geist-icon" fill="none" height="20"
                      shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20"
                      style="color:#000;margin-top: -3px;">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
                    </svg>
                    Libretas conducta
                  </a>
                </div>
                <div class="btn-group dropup">
                  <a class="fuente tamanio  negros me-3" role="button" @click="activar">
                    <svg class=" me-1" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      viewBox="0 0 24 24" width="20" style="color:#000;margin-top: -3px;">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                    Libretas notas
                  </a>
                  <ul
                    style="min-width: 7rem;transform: perspective(999px) rotateX(-10deg) translateZ(0) translate3d(0,120px,0)!important;"
                    :class="{ 'show': isActive === true }" class="dropdown-menu">
                    <li>
                      <a @click="libretas_pdf(0)" class="dropdown-item text-sm " href="javascript:;">Quimestre 1</a>
                    </li>
                    <li>
                      <a @click="libretas_pdf(1)" class="dropdown-item text-sm " href="javascript:;">Quimestre 2</a>
                    </li>

                  </ul>
                </div>

                <a class="fuente tamanio negros me-3" role="button" @click="get2()">
                  <svg class=" me-1" data-testid="geist-icon" fill="none" height="20"
                    shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20"
                    style="color:#000;margin-top: -3px;">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"></path>
                  </svg>
                  Promoción
                </a>
                <a class="fuente tamanio negros" role="button" @click="get()">
                  <svg class=" me-1" data-testid="geist-icon" fill="none" height="20"
                    shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20"
                    style="color:#000;margin-top: -3px;">
                    <path d="M6 9V2h12v7"></path>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                    <path d="M6 14h12v8H6z"></path>
                  </svg>
                  Matriculas
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
        <section v-if="ifmatricula">
          <FormatoMatricula :rowData="rowData" @changeStatus="changeStatus" />
        </section>
        <section v-if="ifpromocion">
          <FormatoPromocion :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse" />
        </section>
        <section v-if="iflibretas">
          <FormatoLibretas :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :numQuimestre="numQuimestre" />
        </section>
        <section v-if="ifconducta">
          <LibretasConducta :rowData="rowData" @changeStatus="changeStatus" :nextCourse="nextCourse"
            :numQuimestre="numQuimestre" />
        </section>
      </div>
    </template>
    <template v-slot:footer>
      <a @click="close" style="text-decoration: underline;" href="javascript:;" class="fuente tamanio links me-3">
        <b>Salir de aqui</b>
      </a>
    </template>
  </ScrimModal>
</template>

<script src="./Reportes.js"></script>

  
