<template>
  <div>
    <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets"
      @desactiveState="desactiveState" />
    <Spinner v-if="isLoading"></Spinner>
    <div v-else class="dataTable-container">
      <table class="dataTable-table table s-table-flush">
        <thead class="thead-light">
          <tr class="cabeza">
            <th style="background-color: rgb(234, 240, 246); ">
              <div class="d-flex ms-3">
                <div v-if="!allSelected " class="form-check my-auto" style="min-height: 0rem;">
                  <input class="form-check-input cheka" type="checkbox" @click="selectAll" />
                </div>
                <svg @click="deletedSelected" style="cursor: pointer;color: #8b3dff;" v-else  data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" ><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>
                <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                  Área
                </span>
              </div>
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Materia
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Fecha modicado
            </th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info" :key="item.id">
            <td>
              <div class="d-flex ms-3">
                <div class="form-check my-auto supcheka">
                  <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                    @click="selectUser(item._id)" />
                </div>
                <a class="mb-0 ms-3 text-xs negros mt-1 fuente">
                  {{ item.area }}
                </a>
              </div>
            </td>
            <td class="mb-0 ms-3 text-xs colorestabla fuente text-center">
              {{ item.nombre }}
            </td>
            <td class="mb-0 ms-3 text-xs colorestabla fuente text-center">
              {{ item.updatedAt.substring(0,10) }}
            </td>
            
          </tr>
        </tbody>
      </table>
      <Paginate2 :numPages="paginas" :page="pagina" :total="totalNotas" :subtitulo="subtitulo"
        @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
      <Modal v-show="visible" @close="close">
        <template v-slot:header> {{model._id ? "Editar materia" : "Añadir nueva materia"}}</template>
        <template v-slot:body>
          <Spinner v-if="isCarga"></Spinner>
          <form @submit.prevent="save" id="prov">
            <div v-if="MsmError!=''" class="is-error">
              <span class="text-sm negros gordo">{{ MsmError }}</span>
            </div>
            <span class="parrafo">Area</span>
            <CustomInput v-model="model.area" />
            <p class=" text-xs fuente text-danger">
              {{ validation.firstError("model.nombre") }}
            </p>
            <span class="parrafo">Materia</span>
            <CustomInput v-model="model.nombre" />
            <p class=" text-xs fuente text-danger">
              {{ validation.firstError("model.nombre") }}
            </p>
            <br>
          </form>
        </template>
        <template v-slot:acccion>
          <ButtonLoading v-if="ifLoad" />
          <button form="prov" v-else type="submit" class="btn btnNaranja mt-2">
            {{ model._id ? "Actualizar materia" : "Guardar materia" }}
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>
<script src="./Materias.js"></script>
