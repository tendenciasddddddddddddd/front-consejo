<template>
  <div class="row">
    <div class="col-lg-11 col-12 mx-auto">
      <div class="mt-2">
        <div
          class=""
          style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p style="margin:7px;font-weight:700; color: #33475b;">
              <i class="ni ni-air-baloon"></i> &nbsp; Solo puede tener un
              periodo activo por cada modalidad.
            </p>
          </div>
        </div>
      </div>

      <p class="parrafo mt-3">
        Crea nuevos periodos, uno por cada modalidad y elimina periodos del
        periodo.
      </p>
      <div class="">
        <!-- Card header -->
        <div class="mt-2">
          <div class="row ">
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-text text-body buscador"
                  ><i class="fas fa-search" aria-hidden="true"></i
                ></span>
                <input
                  type="text"
                  class="form-control buscador text-sm"
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
                <b class="me-4 fuente" :class="{ links: isSelecUsers.length != 0 }"
                  >Eliminar periodos</b
                >
              </a>
            </div>
            <div class="col-lg-3">
              <div class="d-flex justify-content-end mb-3">
                <button
                  class="btn btn-sm btnNaranja"
                  @click="__limpiarCampos()"
                
                >
                  Crear periodo
                </button>
                <!-- <div class="dropdown">
                  <a
                    href="#"
                    class="btn btn-sm btnNaranja"
                    data-bs-toggle="dropdown"
                    id="navbarDropdownMenuLink2"
                  >

                    Flags
                  </a>
                  <ul
                    class="dropdown-menu show"
                    aria-labelledby="navbarDropdownMenuLink2"
                    style=" z-index: 9999!important; width: 250px;    right: 0%;"
                  >
                 
                  </ul>
                </div> -->
              </div>
            </div>
          </div>
        </div>

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
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

          <ul class="pagination pagination-dark justify-content-center mt-4">
            <li class="page-item">
              <router-link
                class="fuente tamanio links paginates me-3"
                :class="{ inactivo: paginaActual == 1 }"
                :to="{ query: { pagina: paginaActual - 1 } }"
              >
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1.2em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                  <b class="ms-2">Anterior</b>
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
                <b class="me-2">Siguiente</b>
              <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1.2em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>

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
        </div>
      </div>
    </div>
    <div class="fixed-plugin" :class="{ show: tabbla === 'abre' }">
      <div class="card shadow-lg blur desplega" style="overflow-y: auto;">
        <div class="card-header pb-0 pt-3  bg-transparent ">
          <div class="float-start">
            <h5 class="mt-3 mb-0 fuente" style="font-weight: 400;">
              Periodos Escolar
            </h5>
          </div>
          <div class="float-end mt-4">
            <button
              @click="tabbla = 'cier'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 27px" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->

          <form @submit.prevent="save" role="form text-left">
            <h6 class="text-danger text-center">{{ MsmError }}</h6>
            <p class="parrafo">Periodo</p>
            <div class="input-group mb-3">
              <input
                type="text"
                :class="{ error: validation.hasError('model.nombre') }"
                v-model="model.nombre"
                class="form-control buscador fuente"
              />
            </div>
            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.nombre") }}
            </p>
            <p class="parrafo mt-3">Inicio de Periodo</p>
            <date-picker
              v-model="model.inicia"
              valueType="format"
              class="w-100 fuente"
              :class="{ error: validation.hasError('model.inicia') }"
            >
            </date-picker>
            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.inicia") }}
            </p>

            <p class="parrafo mt-3">Fin de Periodo</p>

            <date-picker
              :class="{ error: validation.hasError('model.finaliza') }"
              v-model="model.finaliza"
              valueType="format"
              class="w-100 fuente"
            ></date-picker>

            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.finaliza") }}
            </p>
            <div class="row mt-3">
              <p class="parrafo mt-1">Modalidad</p>
              <div class="col-6" v-for="ite in modalidad" :key="ite.id">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    v-model="checked"
                    type="radio"
                    name="ite.id"
                    :id="ite.id"
                    :value="ite.name"
                  />
                  <p class="parrafo" for="ite.id">
                    {{ ite.name }}
                  </p>
                </div>
              </div>
            </div>
            <div class="form-check form-check-info  mt-3">
              <span class="fuente">{{
                model.estado ? "Estado" : "Active Estado"
              }}</span>
              <input
                v-model="model.estado"
                class="form-check-input cheka"
                type="checkbox"
                id="checkbox"
                value="1"
                v-bind:true-value="1"
                v-bind:false-value="0"
              />
            </div>
            <br />
            <div class="text-start mt-3">
              <button
                v-if="ifLoad"
                class="btn  btnNaranja"
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
                class="btn  btnNaranja"
              >
                {{ model._id ? "Actualizar Registro " : "Guardar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- <a href="#" id="firstname" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-title="Enter your firstname" class="editable editable-click editable-empty" data-original-title="" title="">Empty</a> -->

    <!-- <div class="gJvEZE.tour-pulser--visible modal-backdrop"></div> -->
    <div
      class="modal fade "
      :class="{ 'show ': modals1 === 'opennn' }"
      :style="[modals1 === 'opennn' ? { display: 'block' } : {}]"
      style="overflow-y: auto;    z-index: 9999;"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content ">
          <div class="modal-body">
            <p class="h4 fuente">
              ¿Eliminar a <br />
              {{ name }}?
            </p>

            <p class="parrafo">
              Estás a punto de eliminar a {{ name }} de esta cuenta. Esta acción
              no se puede deshacer
            </p>
            <div class="mt-3">
              <a
                @click="modals1 = 'cier'"
                class="btn btn-sm "
                style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                name="button"
                >Cancelar</a
              >&nbsp; &nbsp;
              <button @click="__eliminar()" class="btn btn-sm btnNaranja">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      class="popover  fade show bs-popover-bottom "
      role="tooltip"
      id="my-popover"
     
      style="position: absolute;  margin: 0px; padding-right:0px;padding-left:0px;"
      data-popper-placement="bottom"
    >
      <div
        class="popover-arrow"
        style="position: absolute; left: 0px; transform: translate(80%, 0%);"
      ></div>
      <div class="popover-header" style=" background: rgb(106, 120, 209)">
        <div class="text-white" style="padding:10px;">
          Activa solo dos periodos
        </div>
      </div>
      <div class="popover-body">
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
      </div>
    </div> -->
  </div>
</template>

<script src="./Periodo.js"></script>

<style>
.gJvEZE.tour-pulser--visible {
  width: 1500px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100vh;
}
/* #my-popover {
  top: 60%!important;
  left: 80%!important;
   transform:translate(-50%,-50%) translate3d(0,0,0)!important;
} */




</style>
