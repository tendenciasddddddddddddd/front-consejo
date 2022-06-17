<template>
    <div >
      <AlertHeader
      :firsttext="'Matricula'"
      :lasttext="'Registre periodos académicos'"
    ></AlertHeader>
      <p class="parrafo mt-3"> Crea nuevos periodos, uno por cada modalidad y elimina periodos del periodo.
      </p>
        <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets" @desactiveState="desactiveState" />
       
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="table-responsive mt-1">
          <table
            class="table table-flush"
            style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
          >
            <thead class="thead-light">
              <tr class="cabeza">
                <th
                  style="background-color: rgb(234, 240, 246); "
                  class=" text-center text-xxs font-weight-bolder"
                >
                  Periodo
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Modalidad
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Fecha modicado
                </th>

                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info" :key="item.id">
                <td>
                  <div class="d-flex ms-3">
                    <div class="form-check supcheka my-auto">
                      <input
                        class="form-check-input cheka"
                        type="checkbox"
                        v-model="isSelecUsers" :value="item._id"
                        @click="selectUser(item._id)"
                      />
                    </div>
                    <a class="mb-0 ms-3 text-sm colorestabla fuente">
                      {{ item.nombre }}
                    </a>
                  </div>
                </td>
                <td class="text-sm text-center text-dark fuente">
                  {{ item.typo }}
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
             <Paginate2 :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange"></Paginate2>
        </div>
        <Modal v-show="visible" @close="close">
          <template v-slot:header> Periodo Escolar</template>
          <template v-slot:body>
             <Spinner v-if="isCarga"></Spinner>
                <form @submit.prevent="save" role="form">
                  <span class="parrafo">Nombre de Periodo</span>
                  <CustomInput v-model="model.nombre" />
                  <p class="mb-2 text-xs fuente text-danger">
                    {{ validation.firstError("model.nombre") }}
                  </p>
                   <span class="parrafo ">Inicio de Periodo</span>
                   <date-picker
                      v-model="model.inicia"
                      valueType="format"
                     class="w-100 fuente"
                  ></date-picker>
                   <p class="mb-2 text-xs fuente text-danger">{{ validation.firstError("model.inicia") }}</p>
                   <span class="parrafo mt-2">Fin de Periodo</span>
                  <date-picker
                    v-model="model.finaliza"
                    valueType="format"
                   class="w-100 fuente"
                  ></date-picker>
                   <p class="mb-2 text-xs fuente text-danger">{{ validation.firstError("model.finaliza") }}</p>
                  <span class="parrafo mt-2">Modalidad</span>
                  <div class="" v-for="ite in modalidad" :key="ite.id">
                    <div class="form-check mb-1">
                      <input
                        class="form-check-input"
                        v-model="checked"
                        type="radio"
                        name="ite.id"
                        :id="ite.id"
                        :value="ite.name"
                      />
                      <a class="parrafo" :for="ite.name"> {{ ite.name }}</a>
                    </div>
                  </div>
                   <hr class="horizontal dark mb-1 d-xl-block d-none">
                  <div class="text-center">
                    <ButtonLoading v-if="ifLoad"/>
                    <button
                      v-else
                      type="submit"
                      class="btn btnNaranja  mt-1 mb-0 "
                    >
                      {{ model._id ? "Actualizar" : "Guardar" }}
                    </button>
                  </div>
                </form>
          </template>
        </Modal>
    </div>
</template>

<script src="./Periodo.js"></script>

