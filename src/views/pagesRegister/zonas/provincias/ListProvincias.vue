<template>
    <div >
        <AlertHeader :initText="'Regresar'" :firsttext="'Zonas'" :lasttext="'Registro provincias'" ></AlertHeader>
      <p class="parrafo mt-3">
        Crea nuevas provincias, edita y elimina las provincias.
      </p>
      <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets" @desactiveState="desactiveState" @changeSearch="changeSearch"/>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="table-responsive mt-1">
          <table class="dataTable-table table s-table-flush">
            <thead class="thead-light">
              <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); ">
                   <div v-if="!isSearch" class="d-flex ms-3">
                      <div v-if="!allSelected " class="form-check " style="min-height: 0rem;margin-bottom: 0rem;">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectAll"
                        />
                      </div>
                       <i @click="deletedSelected" v-else  class="fa fa-minus s-icon-all" aria-hidden="true"></i>
                      <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                        Nombres
                      </span>
                    </div>
                     <div v-else>
                        <a @click="salirBusqueda" type="button" class="fuente tamanio ">
                            <i class="fa fa-times me-2  iconos"></i>
                           <b class="links">Limpiar filtro </b>
                        </a>
                    </div>
                  </th>
                <th class="text-uppercase text-center text-xxs font-weight-bolder">
                  Fecha modificado
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
                <td class="text-sm text-center colorestabla fuente">
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
          <Paginate2 :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
        </div>
        <Modal v-show="visible" @close="close">
          <template v-slot:header> {{ model._id ? "Actualizar provincia" : "Añadir provincia" }}</template>
          <template v-slot:body>
                <Spinner v-if="isCarga" />
                  <form v-else @submit.prevent="save" role="form text-left">
                    <h6 class="text-danger text-center fuente">{{ MsmError }}</h6>
                    <span class="parrafo">Nombre de Provincia</span>
                    <CustomInput v-model="model.nombre" />
                    <p class=" text-sm text-danger">
                      {{ validation.firstError("model.nombre") }}
                    </p>
                    <hr class="horizontal dark mb-1 d-xl-block d-none">
                    <div class="text-center ">
                       <ButtonLoading v-if="ifLoad"/>
                      <button v-else type="submit" class="btn btnNaranja  mt-1 ">
                        {{ model._id ? "Actualizar" : "Guardar" }}
                      </button>
                    </div>
                  </form>
          </template>
        </Modal>
    </div>
</template>
<script src="./ListProvincias.js"></script>
