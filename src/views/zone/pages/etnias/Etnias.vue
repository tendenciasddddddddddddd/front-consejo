<template>
  <div>
    <AlertHeader />
    <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets"
      @desactiveState="desactiveState" />
    <Spinner v-if="isLoading"></Spinner>
    <div v-else class="table-responsive mt-1">
      <table class="dataTable-table table s-table-flush">
        <thead class="thead-light">
          <tr class="cabeza">
            <th style="background-color: rgb(234, 240, 246); ">
              <div class="d-flex ms-3">
                <div v-if="!allSelected " class="form-check " style="min-height: 0rem;">
                  <input class="form-check-input cheka" type="checkbox" @click="selectAll" />
                </div>
                <i @click="deletedSelected" v-else class="fa fa-minus s-icon-all" aria-hidden="true"></i>
                <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                  Nombres
                </span>
              </div>
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Fecha modicado
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info" :key="item.id">
            <td>
              <div class="d-flex ms-3">
                <div class="form-check my-auto">
                  <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                    @click="selectUser(item._id)" />
                </div>
                <a class="mb-0 ms-3 text-xs negros mt-1 fuente"> {{ item.nombre }} </a>
              </div>
            </td>
            <td class="text-sm text-center fuente">
              {{ item.updatedAt.substring(0,10) }}
            </td>
            <td class="text-sm text-center font-weight-normal">
              <span class="icon">
                <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                <i v-else class="fa fa-times"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginate2 :numPages="paginas" :page="pagina" :total="info.length" :subtitulo="subtitulo"
        @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
    </div>
    <Modal v-if="visible" @close="close">
      <template v-slot:header> {{ model._id ? "Actualizar etnia" : "Añadir etnia" }}</template>
      <template v-slot:body>
        <Spinner v-if="isCarga" />
        <form v-else @submit.prevent="save" id="prov">
          <div v-if="MsmError!=''" class="is-error">
            <span class="text-sm negros gordo">{{ MsmError }}</span>
          </div>
          <p class="parrafo mt-2">Etnia</p>
          <CustomInput v-model="model.nombre" />
          <p class="mb-2 text-xs text-danger">
            {{ validation.firstError("model.nombre") }}
          </p>
        </form>
      </template>
      <template v-slot:acccion>
        <ButtonLoading v-if="ifLoad" />
        <button form="prov" v-else type="submit" class="btn btnNaranja mt-2">
          {{ model._id ? "Actualizar etnia" : "Guardar etnia" }}
        </button>
      </template>
    </Modal>
  </div>
</template>
<script src="./Etnias.js"></script>