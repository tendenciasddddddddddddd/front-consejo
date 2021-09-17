<template>
    <div class="row">
    <div class="col-lg-11 col-12 mx-auto">
             <Navss

            :actualText="'NACIONALIDAD'"
            :rutas="rutass"
          ></Navss>
          <div class="mt-2">
        <div
          class=""
          style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p class="text-sm text-dark" style="margin:7px; ">
              <strong>Nota:</strong> Los regitros van en cascada.
            </p>
          </div>
        </div>
      </div>
      <div class="card">
        <!-- Card header -->
        <div class="mt-4">
          <div class="row ">
            <div class="col-md-6">
                <h5 class="mb-0">Listas</h5>
              
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-end mb-3">
                <a
                  class="btn btn-sm bg-gradient-info mb-0 bott"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="__limpiarCampos()"
                >
                  Nueva Nacionalidad
                </a>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-if="isLoading"></Spinner>

        <div v-else class="table-responsive">
          <table class="table table-flush" id="datatable-basic">
            <thead class="thead-light">
              <tr class="cabeza">
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Nombre
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
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info" :key="item.id">
                <td class="text-sm text-center font-weight-normal">
                  {{ item.nombre }}
                </td>
                  <td class="text-xs text-center font-weight-normal">
                  {{ item.updatedAt.substring(0,10) }}
                </td>
                <td class="text-sm text-center font-weight-normal">
                     <span class="icon">
                <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                <i v-else class="fa fa-times"></i>
              </span>
                </td>

                <td class="text-sm text-center font-weight-normal">
                  <a  @click="gets(item._id, this)"  
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style="cursor: pointer;"
                      >
                    <i
                      class="fas fa-pencil-alt text-secondary me-4 "
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a
                    class="text-primary link text-gradient px-3 mb-0 "
                    style="cursor: pointer;"
                    @click="__eliminar(item._id)"
                    title="Eliminar"
                  >
                    <i class="far fa-trash-alt me-2" aria-hidden="true"> </i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

          <ul class="pagination pagination-info justify-content-center">
            &nbsp;&nbsp;
            <li class="page-item">
              <router-link
                class="page-link"
                v-if="paginaActual != 1"
                :to="{ query: { pagina: paginaActual - 1 } }"
              >
                <i class="ni ni-bold-left" aria-hidden="true"></i>
              </router-link>
            </li>

            <li class="page-item active">
              <a class="page-link">{{ paginaActual }}</a>
            </li>

            <li class="page-item">
              <router-link
                v-if="paginaActual != paginas"
                class="page-link"
                :to="{ query: { pagina: paginaActual + 1 } }"
              >
                <i class="ni ni-bold-right" aria-hidden="true"></i>
              </router-link>
            </li>
            <li>
              <strong class="text-dark">
                &nbsp;&nbsp;&nbsp; Total: {{ totalNotas }} - Páginas:
                {{ paginas }}
              </strong>
            </li>
          </ul>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {{ model._id ? "Actualizar Registro" : "Crear Registro" }}
                  </h5>
                  <button
                    type="button"
                    class="btn-close text-dark"
                    id="myModalClose"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span style="font-size: 30px" aria-hidden="true"
                      >&times;</span
                    >
                  </button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="save" role="form text-left">
                     <h6 class="text-danger text-center">{{MsmError}}</h6>
                    <label>Nacionalidad</label>
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
                      <label>{{ model.estado ? "Estado" : "Active Estado" }}</label>
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
                    <div class="text-center">
                      <button v-if="ifLoad"
                      class="btn btn-primary btn-sm mb-2"
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
                      class="btn bg-gradient-info btn-sm  mt-4 mb-0 "
                      style="border-radius: 10px;"
                    >
                      {{
                        model._id ? "Actualizar Registro " : "Guardar"
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

<script src="./Nacionalidad.js"></script>

