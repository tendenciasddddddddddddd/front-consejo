<template>
  <div>
     <AlertHeader :firsttext="'Gestionar cursos'" :lasttext="'Crea, edita, elimina y filtra'"></AlertHeader>
        <div class="row mt-3">
          <div class="col-lg-3">
            <div class="input-group">
              <span class="input-group-text text-body buscador"
                ><i class="fas fa-search colorhs" aria-hidden="true"></i
              ></span>
              <input
                type="text"
                class="form-control buscador"
                placeholder="Buscar"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <a
              @click="gets()"
              role="button"
              class="fuente tamanio"
              :class="{ disabled: isSelecUsers.length != 1 }"
              v-tooltip.top-center="
                isSelecUsers.length
                  ? ''
                  : 'Seleccionar un fila para poder editar'
              "
            >
              <i class="fas fa-pencil-alt me-2 ms-3 iconos"></i>
              <b class="me-4 " :class="{ links: isSelecUsers.length === 1 }"
                >Editar</b
              >
            </a>
            <a
              v-on="isSelecUsers.length ? { click: () => remove() } : {}"
              role="button"
              class="fuente tamanio"
              :class="{ disabled: isSelecUsers.length === 0 }"
              v-if="!iseliminaddo"
              v-tooltip.top-center="
                isSelecUsers.length
                  ? ''
                  : 'Seleccionar una o muchas filas para eliminar'
              "
            >
              <i class="far fa-trash-alt me-2 iconos"></i>
              <b class="me-1" :class="{ links: isSelecUsers.length != 0 }"
                >Eliminar curso</b
              >
            </a>
               <a
              @click="desactiveState"
              role="button"
              class="fuente tamanio"
              :class="{ disabled: isSelecUsers.length != 1 }"
              v-tooltip.top-center="
                isSelecUsers.length
                  ? ''
                  : 'Seleccionar un fila para poder desactivar'
              "
            >
              <i class="fas fa-sync me-2 ms-3 iconos"></i>
             
              <b :class="{ links: isSelecUsers.length === 1 }"
                >Cambiar estado</b
              >
            </a>
          </div>
          <div class="col-lg-3">
            <div class="d-flex justify-content-end mb-3">
              <a class="btn btn-sm btnNaranja" @click="openModal">
                Crear curso
              </a>
            </div>
          </div>
        </div>
      <Spinner v-if="isLoading"></Spinner>
      <div v-else class="table-responsive mt-1">
        <table class="dataTable-table table s-table-flush">
          <thead class="thead-light">
            <tr class="cabeza">
              <th
                style="background-color: rgb(234, 240, 246); "
                class="text-uppercase text-center text-xxs font-weight-bolder"
              >
                Curso
              </th>
              <th
                class="text-uppercase text-center text-xxs font-weight-bolder"
              >
                Modalidad
              </th>
              <th
                class="text-uppercase text-center text-xxs font-weight-bolder"
              >
                Fecha M
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
                  <div class="form-check my-auto supcheka">
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
                {{ item.modalidad }}
              </td>
              <td class="text-xs text-center font-weight-normal fuente">
                {{ item.updatedAt.substring(0, 10) }}
              </td>
              <td class="text-sm text-center font-weight-normal fuente">
                <span  class="icon">
                  <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                  <i v-else class="fa fa-times"></i>
                </span>
                 
              </td>
            </tr>
          </tbody>
        </table>
          <Paginate2 :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange"></Paginate2>
        <!-- Modal -->
        <Modal v-show="visible" @close="close">
          <template v-slot:header> {{model._id ? "Editar ente curso" : "Añadir nuevo curso"}}</template>
          <template v-slot:body>
             <Spinner v-if="isCarga"></Spinner>
                <form @submit.prevent="save" role="form">
                  <h6 class="text-danger text-center" v-if="MsmError!=''">{{ MsmError }}</h6>
                  <span class="parrafo">Nombre de Curso</span>
                  <CustomInput v-model="model.nombre" />
                  <p class="mb-0 text-xs fuente text-danger">
                    {{ validation.firstError("model.nombre") }}
                  </p>
                  <br>
                  <span class="parrafo ">Modalidad</span>
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
  </div>
</template>
<script src="./Cursos.js"></script>
