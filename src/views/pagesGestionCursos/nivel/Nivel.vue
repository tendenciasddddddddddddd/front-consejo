<template>
  <div class="row">
    <div class="col-lg-11 col-12 mx-auto">
      <div
        class="mt-1"
        style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <div>
          <div style="margin:3px;font-weight:700; color: black;">
            Los regitros van en cascada y son complemento
            para el proceso de matricula.
          </div>
        </div>
      </div>
         
       <p class="parrafo mt-3">Crea nuevos cursos, edita y elimina los curoso.</p>
      <div class="">
        <!-- Card header/MenuGestion -->
        <div class="">
          <div class="row ">
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
                 v-tooltip.top-center="isSelecUsers.length ? '' : 'Seleccionar un fila para poder editar'"
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
                v-tooltip.top-center="isSelecUsers.length ? '' : 'Seleccionar una o muchas filas para eliminar'"
              >
                <i class="far fa-trash-alt me-2 iconos"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length != 0 }"
                  >Eliminar curso</b
                >
              </a>
            </div>
            <div class="col-lg-3">
              <div class="d-flex justify-content-end mb-3">
                <a class="btn btn-sm btnNaranja" @click="__limpiarCampos()">
                  Crear curso
                </a>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-if="isLoading"></Spinner>

        <div v-else class="table-responsive">
          <table class="table table-flush" id="datatable-basic"
          style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
            <thead class="thead-light">
              <tr class="cabeza">
                  <th style="background-color: rgb(234, 240, 246); "
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
                        @click="selectUser(item._id)"
                      />
                    </div>

                    <a class="mb-0 ms-3 text-sm colorestabla fuente">
                      {{ item.nombres }}
                    </a>
                  </div>
                </td>
                 
                <td class="text-sm text-center text-dark fuente">
                  {{ item.modalidad }}
                </td>
                  <td class="text-xs text-center font-weight-normal fuente">
                  {{ item.updatedAt.substring(0,10) }}
                </td>
                <td class="text-sm text-center font-weight-normal fuente">
                     <span class="icon">
                <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                <i v-else class="fa fa-times"></i>
              </span>
                </td>

                
              </tr>
            </tbody>
          </table>
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

          <ul class="pagination pagination-dark justify-content-center mt-2">
            <li class="page-item">
              <router-link role="button"
                class="fuente tamanio links paginates me-3"
                :class="{ inactivo: paginaActual == 1 }"
                :to="{ query: { pagina: paginaActual - 1 } }"
              >
                <i class="fa fa-angle-left me-2" aria-hidden="true"></i>
                <b>Anterior</b>
              </router-link>
            </li>

            <li class="page-item active">
              <a class="paginaA">
                <b> {{ paginaActual }}</b></a
              >
            </li>

            <li class="page-item">
              <router-link
                :class="{ inactivo: paginaActual == paginas || totalNotas ==0}"
                class="fuente tamanio links paginates ms-3"
                :to="{ query: { pagina: paginaActual + 1 } }"
              >
                <b>Siguiente</b>
                <i class="fa fa-angle-right ms-2" aria-hidden="true"></i>
              </router-link>
            </li>
            <li>
              <div class="btn-group dropup me-3 ms-3">
                <a
                  type="button"
                  class="fuente tamanio links paginates dropdown-toggle "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>{{ subtitulo }}</b>
                </a>
                <ul
                  class="dropdown-menu px-2 py-3"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a
                      @click="getAll(1, 6)"
                      class="dropdown-item border-radius-md fuente"
                      href="javascript:;"
                      >6 filas por página</a
                    >
                  </li>
                  <li>
                    <a
                      @click="getAll(1, 25)"
                      class="dropdown-item border-radius-md fuente"
                      href="javascript:;"
                      >25 filas por página</a
                    >
                  </li>
                  <li>
                    <a
                      @click="getAll(1, 50)"
                      class="dropdown-item border-radius-md fuente"
                      href="javascript:;"
                      >50 filas por página</a
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <strong class="fuente text-sm"> Total: {{ totalNotas }} </strong>
            </li>
          </ul>

          <!-- Modal -->
          <div
            class="modal fade "
            :class="{ 'show ': modals === 'openn' }"
            :style="[modals === 'openn' ? { display: 'block' } : {}]"
            style="overflow-y: auto;  top:35px;  z-index: 9999;"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modalheader">
                   <p class="h5 fuente text-white mt-3 ms-3" style="font-weight:400;">
                    {{ model._id ? "Actualizar nuevo registro en provincia" : "Añadir nuevo registro en provincia" }}
                  </p>
                  <button
                    @click="modals = 'cier'"
                    class="btn btn-link text-white fuente"
                    style="margin-top: -100px; margin-right: -20px;"
                  >
                 
                   CERRAR &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
                  </button>
                </div>
                <div class="modal-body" style="padding:25px;">
                  <Spinner v-if="isCarga"></Spinner>
                  <form @submit.prevent="save" role="form">
                     <h6 class="text-danger text-center">{{MsmError}}</h6>
                    <span class="parrafo">Nombre de Curso</span>
                      <input
                        type="text"
                        :class="{ error: validation.hasError('model.nombres') }"
                        v-model="model.nombres"
                        class="form-control buscador"

                      />
                       <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.nombres") }}
                      </p>
                        <span class="parrafo mt-4">Modalidad</span>
                       <div class="" v-for="ite in modalidad" :key="ite.id">
                      <div class="form-check mb-3">
                        <input
                        
                          class="form-check-input"
                          v-model="checked"
                          type="radio"
                          name="ite.id"
                          :id="ite.id"
                          :value="ite.name"
                        />
                        <a class="parrafo" :for="ite.name">
                          {{ ite.name }}</a
                        >
                       
                      </div>
                    </div>
                       <span class="parrafo">{{
                        model.estado ? "Estado" : "Active Estado"
                      }}</span>
        
                    <div class="form-check form-check-info ">
                      
                      <input
                          v-model="model.estado"
                          class="form-check-input cheka"
                          style="font-size:17px;"
                          type="checkbox"
                          id="checkbox"
                          value="1"
                          v-bind:true-value="1"
                          v-bind:false-value="0"
                        />
                        
                    </div>
                    <div class="text-center">
                      <button v-if="ifLoad"
                      class="btn btnNaranja  mb-2"
                      type="button"
                      disabled
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Enviando...
                    </button>
                    <button v-else
                      type="submit"
                      id="addRowButton"
                      class="btn btnNaranja  mt-4 mb-0 "
                      
                    >
                      {{
                        model._id ? "Actualizar" : "Guardar"
                      }}
                    </button>
                     
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Nivel.js"></script>
