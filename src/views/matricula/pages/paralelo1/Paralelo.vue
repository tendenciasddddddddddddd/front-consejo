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
                <div class="col-lg-6 " style="height: calc(100vh - 235px);" >
                  <div class="input-group mb-3" style="margin-bottom: 7px;">
                    <span class="input-group-text negros buscador busca">
                      <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
                    </span>
                    <input class="form-control buscador buscaa me-3" type="text" v-on:input="onQuickFilterChanged()"
                      style="background: white;" id="quickFilter" placeholder="Buscar">
                      <button v-on:click="openModal()" role="button" class="btn btnNaranja2">
                   <b >Cambiar de curso </b> 
                  </button>
                  </div>
                  <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine" :defaultColDef="defaultColDef"
                    rowSelection="multiple" :rowDragMultiRow="true" :suppressRowClickSelection="true"
                    :getRowId="getRowId" :rowDragManaged="true" :suppressMoveWhenRowDragging="true" :animateRows="true"
                    :rowData="leftRowData" :columnDefs="leftColumns" @grid-ready="onGridReady($event, 0)">
                  </ag-grid-vue>
                </div>
               
                <div class="col-lg-6 "  style="height: calc(100vh - 235px);">
                  <div class="d-flex justify-content-start">
                    <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="ite.id" :id="ite.id" :value="ite.id"
                          @click="onChange(ite.nombre)" />
                        <span class="negros" for="ite._id">
                          {{ ite.nombre }}</span>
                      </div>
                    </div>
                    <button v-on:click="save()" role="button" class="btn btnNaranja  ms-3 me-2">
                    Guardar
                    </button>
                  <button v-on:click="onRemoveSelected2()" role="button" class="btn btnNaranja2 me-2">
                   <b >Eliminar paralelo asignado</b> 
                  </button>
                  
                    <div>
                    </div>
                  </div>
                  <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-alpine mt-2"
                    :defaultColDef="defaultColDef" rowSelection="multiple" :getRowId="getRowId" :rowDragManaged="true"
                    :animateRows="true" :rowDragMultiRow="true" :suppressRowClickSelection="true"
                    :groupDisplayType="groupDisplayType" :rowData="topRowData" :columnDefs="topColumns"
                    @grid-ready="onGridReady($event, 2)">
                  </ag-grid-vue>
                </div>
              </div>
              <section v-if="isCambio">
          <Modal @close="closeModal">
            <template v-slot:header> CAMBIAR ESTUDIANTES DE CURSO</template>
            <template v-slot:body>
              <div>
                <h6 class="negros mt-2" style=" font-weight: 600;">A que cursos</h6>
                <Dropdown v-model="modelCambios" :options="listniveles" />
                <h6 class="negros mt-3" style=" font-weight: 600;">A que paralelo</h6>
                      <div class="d-flex justify-content-start">
                    <div v-for="ite in paralelos" :key="ite.id">
                      <div class="form-check  me-2">
                        <input class="form-check-input" type="radio" name="ite.id" :id="ite.id" :value="ite.id"
                          @click="onChange2(ite.nombre)" />
                        <span class="negros" for="ite._id">
                          {{ ite.nombre }}</span>
                      </div>
                    </div>
                   
                  </div>
              </div> <br>
            </template>
            <template v-slot:acccion>
              <button @click="update" type="submit" class="btn btnNaranja mt-2">
                Realizar cambios
              </button>
            </template>
          </Modal>
        </section>
            </div>
            <section v-else>
              <NoFound />
            </section>
          </section>
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

<style>
  .ag-header-cell-label .ag-header-cell-text {
    writing-mode: horizontal-tb !important; transform: rotate(0deg) !important;
    line-height: 2em;
    margin-top: 10px;
    width: 280px !important;
  }</style>
<script src="./Paralelo.js"></script>
