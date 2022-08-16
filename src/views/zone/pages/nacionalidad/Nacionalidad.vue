<template>
    <div >
       <AlertHeader :initText="'R'" :firsttext="'Gestionar nacionalidad'" :lasttext="'edita y elimina las nacionalidades'" ></AlertHeader>
         <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets" @desactiveState="desactiveState"/>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="table-responsive mt-1">
          <table class="table table-flush"  style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
            <thead class="thead-light">
              <tr class="cabeza">
                 <th style="background-color: rgb(234, 240, 246); ">
                   <div class="d-flex ">
                      <div v-if="!allSelected " class="form-check my-auto" style="min-height: 0rem;">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectAll"
                        />
                      </div>
                       <i @click="deletedSelected" v-else style="border: 2px solid; color: rgb(0, 164, 189); height: 19px; width: 19px; border-radius: 3px; cursor: pointer;" class="fa fa-minus" aria-hidden="true"></i>
                      <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                       Nacionalidad
                      </span>
                    </div>
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
                    <div class="form-check my-auto">
                      <input
                        class="form-check-input cheka"
                        type="checkbox"  v-model="isSelecUsers" :value="item._id"
                        @click="selectUser(item._id)"
                      />
                    </div>

                    <a class="mb-0 ms-3 text-sm colorestabla fuente">
                      {{ item.nombre }}
                    </a>
                  </div>
                </td>
                  <td class="text-xs text-center fuente">
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
            <Paginate2 :numPages="paginas"  :page="pagina" :total="info.length" :subtitulo="subtitulo" @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
        </div>
        <Modal v-if="visible" @close="close">
          <template v-slot:header> {{ model._id ? "Actualizar cantón" : "Añadir cantón" }}</template>
          <template v-slot:body>
                <Spinner v-if="isCarga" />
                  <form v-else @submit.prevent="save" role="form text-left">
                    <h6 v-if="MsmError!=''" class="text-danger text-center fuente">{{ MsmError }}</h6>
                    <span class="parrafo mt-2">Nombre de nacionalidad</span>
                    <CustomInput v-model="model.nombre" />
                    <p class="mb-2 text-sm text-danger">
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

<script src="./Nacionalidad.js"></script>

