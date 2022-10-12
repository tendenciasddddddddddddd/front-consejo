<template>
  <ScrimModal @close="close">
    <template v-slot:header> Asignar paralelos </template>
    <template v-slot:body>
      <div >
        <Spinner v-if="isLoading1"></Spinner>
        <section v-else>
          <div class="text-center">
            <Dropdown v-model="curso" :options="listniveles" />
          </div>
          <Spinner v-if="isTabla"></Spinner>
          <section v-else >
            <div v-if="filtros.length" >
              <div class="row mt-3" >
                <div class="col-lg-6 " style="height: calc(100vh - 210px);" >
                  <div class="input-group" style="margin-bottom: 7px;">
                    <span class="input-group-text text-body buscador"><i class="fas fa-search links"
                        aria-hidden="true"></i></span>
                    <input class="form-control buscador" type="text" v-on:input="onQuickFilterChanged()"
                      style="background: white;" id="quickFilter" placeholder="Buscar">
                  </div>
                  <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :defaultColDef="defaultColDef"
                    rowSelection="multiple" :rowDragMultiRow="true" :suppressRowClickSelection="true"
                    :getRowId="getRowId" :rowDragManaged="true" :suppressMoveWhenRowDragging="true" :animateRows="true"
                    :rowData="leftRowData" :columnDefs="leftColumns" @grid-ready="onGridReady($event, 0)">
                  </ag-grid-vue>
                </div>
               
                <div class="col-lg-6 "  style="height: calc(100vh - 210px);">
                  <div class="d-flex justify-content-start">
                    <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="ite.id" :id="ite.id" :value="ite.id"
                          @click="onChange(ite.nombre)" />
                        <span class="negros" for="ite._id">
                          {{ ite.nombre }}</span>
                      </div>
                    </div>
                    <a v-on:click="save()" role="button" class="fuente tamanio negros ms-3 me-2">
                    <svg style=" margin-top: -3px;color: #000;" class="center-icon"  data-testid="geist-icon" fill="none" height="20"
                      shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
                      <path d="M17 21v-8H7v8"></path>
                      <path d="M7 3v5h8"></path>
                    </svg>
                    Guardar 
                  </a>
                  <a v-on:click="onRemoveSelected2()" role="button" class="fuente tamanio "
                    v-tooltip.top-center="'Elimine paralelos selecionados'"> &nbsp;&nbsp; 
                    <svg style=" margin-top: -3px;color: #000;" class="center-icon" data-testid="geist-icon" fill="none" height="20"
                      shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                    </svg>
                   Eliminar asignados
                  </a>
                    <div>
                    </div>
                  </div>
                  <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine mt-3"
                    :defaultColDef="defaultColDef" rowSelection="multiple" :getRowId="getRowId" :rowDragManaged="true"
                    :animateRows="true" :rowDragMultiRow="true" :suppressRowClickSelection="true"
                    :groupDisplayType="groupDisplayType" :rowData="topRowData" :columnDefs="topColumns"
                    @grid-ready="onGridReady($event, 2)">
                  </ag-grid-vue>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                 
                </div>
                <div class="col-lg-2 mt-2"><br>
                 
                </div>
              </div>

            </div>
            <section v-else>
              <NoFound />
            </section>
          </section>
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


<script src="./Paralelo.js"></script>
