<template>
  <ScrimModal @close="close">
    <template v-slot:header>Reporte de matriculas y promociones</template>
    <template v-slot:body>
      <Spinner v-if="isLoading1"></Spinner>
      <div v-else>
        <div class="row">
          <div class="col-lg-3">
            <Dropdown v-model="curso" :options="listniveles" />
          </div>
          <div class="col-lg-9 text-end">
            <a href="javascript:;" class="btn-vercel-white me-2">
              <svg class="me-2" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: currentcolor;margin-top: -3px;">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"></path>
                <path d="M13 2v7h7"></path>
              </svg>
             
              Promoción
            </a>
            <a class="btn btn-vercel" @click="get('all')">
              <svg class="me-2" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: currentcolor;margin-top: -3px;">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
              Matriculas
            </a>
          </div>
        </div>

        <div v-if="isPrint" class="loadingg">
          <div class="inn ">
            <span class="text-white text-sm mb-3" style="font-size:20px">Trabajando en el reporte ...</span>
          </div>
        </div>
        <Spinner v-if="isTabla"></Spinner>
        <section v-else>
          <div v-if="infoMat.length" class="table-responsive mt-4">
            <table class="dataTable-table table s-table-flush">
              <thead class="thead-light">
                <tr class="cabeza">
                  <th style="background-color: rgb(234, 240, 246); "
                    class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                    # Nombres
                  </th>
                  <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                    Paralelo
                  </th>
                  <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                    Fecha
                  </th>
                  <th class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in displayedArticles" :key="item.id">
                  <td>
                    <div class="d-flex ms-3">
                      <a class="mb-0 text-sm colorestabla fuente">
                        {{ item.nombre }}
                      </a>
                    </div>
                  </td>
                  <td class="text-xs text-center text-dark fuente">
                    {{ item.curso }}
                  </td>
                  <td class="text-xs text-center text-dark fuente">
                    {{ item.fecha }}
                  </td>
                  <td class="text-sm text-center font-weight-normal">
                    <a @click="get(item._id)" href="javascript:;" class="px-3 text-dark mb-0">
                      <svg data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        viewBox="0 0 24 24" width="22" style="color:#000">
                        <path d="M6 9V2h12v7"></path>
                        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                        <path d="M6 14h12v8H6z"></path>
                      </svg>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <Paginate :numPages="numPages"  :page="page" :total="infoMat.length" @pagechanged="onPageChange"></Paginate>
          </div>
          <section v-else>
            <NoFound />
          </section>
        </section>
        <section v-if="ifmatricula">
          <FormatoMatricula :rowData="rowData" @changeStatus="changeStatus" />
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

  
