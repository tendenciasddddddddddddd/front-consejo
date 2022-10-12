<template>
  <div>
    <AlertHeader :firsttext="'Gestionar matricula'" :lasttext="'Crea, edita, elimina y filtra'"></AlertHeader>
    <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets"
      @desactiveState="desactiveState" />

    <Spinner v-if="isLoading"></Spinner>
    <div v-else class="table-responsive mt-1">
      <table class="dataTable-table table s-table-flush">
        <thead class="thead-light">
          <tr class="cabeza">
            <th style="background-color: rgb(234, 240, 246); " class=" text-center text-xxs font-weight-bolder">
              Periodo
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
                <div class="form-check supcheka my-auto">
                  <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                    @click="selectUser(item._id)" />
                </div>
                <a class="mb-0 ms-3 text-sm colorestabla fuente">
                  {{ item.nombre }}
                </a>
              </div>
            </td>
            <td class="text-sm text-center text-dark fuente">
              {{ item.updatedAt.substring(0, 10) }}
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
      <Paginate2 :numPages="paginas" :page="pagina" :total="totalNotas" :subtitulo="subtitulo"
        @pagechanged="onPageChange"></Paginate2>
    </div>
    <Modal v-show="visible" @close="close">
      <template v-slot:header> Periodo Escolar</template>
      <template v-slot:body>
        <Spinner v-if="isCarga"></Spinner>
        <form @submit.prevent="save" role="form" id="prov">
          <span class="parrafo">Nombre de Periodo</span>
          <CustomInput v-model="model.nombre" />
          <p class="mb-2 text-xs fuente text-danger">
            {{ validation.firstError("model.nombre") }}
          </p>
          <span class="parrafo ">Inicio de Periodo</span>
          <date-picker v-model="model.inicia" valueType="format" class="w-100 fuente"></date-picker>
          <p class="mb-2 text-xs fuente text-danger">{{ validation.firstError("model.inicia") }}</p>
          <span class="parrafo mt-2">Fin de Periodo</span>
          <date-picker v-model="model.finaliza" valueType="format" class="w-100 fuente"></date-picker>
          <p class="mb-2 text-xs fuente text-danger">{{ validation.firstError("model.finaliza") }}</p>
        </form>
      </template>
      <template v-slot:acccion>
            <ButtonLoading v-if="ifLoad"/>
                      <button form="prov" v-else type="submit" class="btn btnNaranja mt-2" style="background-color: #0c2ccc !important;">
                        {{ model._id ? "Actualizar" : "Guardar" }}
                      </button>
         </template>
    </Modal>
  </div>
</template>

<script src="./Periodo.js"></script>

