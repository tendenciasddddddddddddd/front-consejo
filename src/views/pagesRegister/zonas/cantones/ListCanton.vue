<template>
  <div class="row">
    <div class="col-lg-11 col-12 mx-auto">
      <div
        class="mt-1"
        style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <div>
          <div style="margin:3px;font-weight:700; color: #33475b;">
            <router-link to="/option-zonas" class="badge" style="box-shadow: none">
              <img
                height="23px"
                src="../../../../assets/img/usados/regresar.png"
              />
            </router-link>
            &nbsp;&nbsp; &nbsp; Los registros van en cascada y son complemento
            para el ingreso de los usuarios.
          </div>
        </div>
      </div>
       <p class="parrafo mt-3">Crea nuevos cantones, edita y elimina las cantones.</p>
      <div class="">
        <!-- Card header -->
        <div class="mt-1">
          <div class="row ">
            <div class="col-md-3">
               <div class="input-group">
            <span class="input-group-text text-body buscador"
              ><i class="fas fa-search" aria-hidden="true"></i
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
              >
                <i class="far fa-trash-alt me-2 iconos"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length != 0 }"
                  >Eliminar cantón</b
                >
              </a>
            </div>
            <div class="col-md-3">
              <div class="d-flex justify-content-end mb-3">
                <a class="btn btn-sm btnNaranja" @click="__limpiarCampos()">
                  Crear cantón
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
                  Canton
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Provincia
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Fecha modificado
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
                        type="checkbox"
                        @click="selectUser(item._id)"
                      />
                    </div>

                    <a class="mb-0 ms-3 text-sm colorestabla fuente">
                      {{ item.nombre }}
                    </a>
                  </div>
                </td>
                <td class="text-sm text-center colorestabla fuente">
                  {{ item.fkProvincia }}
                </td>
               
                <td class="text-xs text-center font-weight-normal fuente">
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
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

          <ul class="pagination pagination-dark justify-content-center mt-4">
            <li class="page-item">
              <router-link
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
                :class="{ inactivo: paginaActual == paginas }"
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
                  <p class="h5 fuente text-white mt-3 ms-3">
                    {{ model._id ? "Actualizar Registro" : "Crear Registro" }}
                  </p>
                  <button
                    @click="modals = 'cier'"
                    class="btn btn-link text-white "
                  >
                    <i style="font-size: 32px" class="fa fa-close"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <Spinner v-if="isCarga" />
                  <form v-else @submit.prevent="save" role="form text-left">
                    <h6 class="text-danger text-center">{{ MsmError }}</h6>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1"
                        >Elija una provincia</label
                      >
                      <IsSelect v-if="isProvincia"></IsSelect>
                    <v-select v-else :options="listprov" label="nombre" v-model="model.fkProvincia">
                      <template #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                    </div>
                    <p class="parrafo">Nombre de Cantón</p>
                    
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        :class="{ error: validation.hasError('model.nombre') }"
                        v-model="model.nombre"
                        class="form-control buscador"
                        aria-label="Name"
                        aria-describedby="name-addon"
                      />
                    </div>

                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.nombre") }}
                    </p>
                    
                  
                    <div class="form-check form-check-info text-left">
                       <span class="parrafo">{{
                        model.estado ? "Estado" : "Active Estado"
                      }}</span>
                      <input
                        v-model="model.estado"
                        class="form-check-input"
                        type="checkbox"
                        id="checkbox"
                        value="1"
                        v-bind:true-value="1"
                        v-bind:false-value="0"
                      />
                    </div>
                      <div v-if="model.fkProvincia == ''" class="text-center">
                    <button class="btn btn-sm btnNaranja w-50" disabled>
                      Seleccione una provincia
                    </button>
                  </div>
                    <div v-else class="text-center">
                      <button
                        v-if="ifLoad"
                        class="btn btnNaranja btn-sm mb-2"
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
                      <button
                        v-else
                        type="submit"
                        id="addRowButton"
                        class="btn btnNaranja btn-sm  mt-4 mb-0 "
                      >
                        {{ model._id ? "Actualizar Registro " : "Guardar registro" }}
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

<script src="./ListCanton.js"></script>
