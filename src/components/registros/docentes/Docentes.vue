<template>
  <div class="row ">
    <div class="col-lg-11 col-12 mx-auto">

          <div class="mt-2">
        <div
          class=""
          style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p  style="margin:7px;font-weight:700; color: #33475b;">
             <i class="ni ni-air-baloon"></i> &nbsp;  Las credenciales de los docentes son su email y cédula.
            </p>
          </div>
        </div>
      </div>
       <p class="parrafo mt-3">Crea nuevos estudiantes, edita y elimina Docentes.</p>
      <div class="">
        <!-- Card header -->
        <div class="mt-2">
          <div class="row ">
            <div class="col-lg-3">
                <div class="input-group">
            <span class="input-group-text text-body buscador"
              ><i class="fas fa-search colorhs" aria-hidden="true"></i
            ></span>
            <input 
               type="text"
                  v-model="searchQuery"
                  class="form-control buscador"
                  placeholder="Buscar"
                  @click="buscar"
            />
          </div>
            </div>
            <div class="col-lg-6">
              <a
                @click="editar()"
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
                  >Eliminar docentes</b
                >
              </a>
              <a
                @click="modals = 'openn'"
                type="button"
                class="fuente tamanio " v-tooltip.top-center="{content: 'Puedes exportar la lista de usuarios'}"
              >
                <i class="fa fa-cloud-download me-2 iconos"></i>
                <b class="links">Exportar docentes</b>
              </a>
            </div>
            <div class="col-lg-3">
               <div class="d-flex justify-content-end mb-3">
                    <router-link class="btn btn-sm btnNaranja" to="/Add-Docente">
                  Crear docente
                </router-link>
               </div>
             
            </div>
          </div>
        </div>
        <Spinner v-if="isLoading"></Spinner>
         <div v-else>
            <div class="table-responsive mt-2" v-if="viewtable === 1">
          <table class="table table-flush" id="datatable-basic" style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
            <thead class="thead-light">
              <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); "
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Nombres
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Cedula
                </th>

                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Email
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Fecha mod
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
                        {{ item.fullname }}
                      </a>
                    </div>
                  </td>
                <td class="text-sm colorestabla colorestabla fuente">{{ item.cedula }}</td>
                <td class="text-sm text-center colorestabla colorestabla fuente">{{ item.email }}</td>
                <td class="text-sm text-center colorestabla colorestabla fuente">{{ item.updatedAt.substring(0,10) }}</td>
                 <td class="text-sm text-center font-weight-normal fuente">
                    <span class="icon">
                      <i
                        v-if="item.status.includes('1')"
                        class="fa fa-check"
                      ></i>
                      <i v-else class="fa fa-times"></i>
                    </span>
                  </td>
              </tr>
            </tbody>
          </table>
       
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
                        @click="cambiar_pagina(6)"
                        class="dropdown-item border-radius-md fuente"
                        href="javascript:;"
                        >6 filas por página</a
                      >
                    </li>
                    <li>
                      <a
                        @click="cambiar_pagina(25)"
                        class="dropdown-item border-radius-md fuente"
                        href="javascript:;"
                        >25 filas por página</a
                      >
                    </li>
                    <li>
                      <a
                        @click="cambiar_pagina(50)"
                        class="dropdown-item border-radius-md fuente"
                        href="javascript:;"
                        >50 filas por página</a
                      >
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <strong class="fuente text-sm">
                  Total: {{ totalNotas }}
                </strong>
              </li>
            </ul>


         
        </div>
         <div v-if="viewtable === 2">
            <a @click="salirBusqueda()" type="button" class="fuente tamanio">
              <i class="fa fa-times me-2 mt-2 iconos"></i>
              <b class="me-4 links">Limpiar filtro</b>
            </a>
            <div class="table-responsive mt-3" v-if="resultQuery">
              <table
                class="table table-flush"
                id="datatable-basic"
                style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
              >
                <thead class="thead-light">
                  <tr
                    style="background-color: rgb(245, 248, 250); border-color: rgb(223, 227, 235);border-style: solid;border-width: 1px 0px 0px;"
                  >
                    <th
                      style="background-color: rgb(234, 240, 246); "
                      class="text-uppercase text-center  text-xxs font-weight-bolder "
                    >
                      Nombres
                    </th>

                    <th
                      class="text-uppercase text-center text-xxs font-weight-bolder"
                    >
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultQuery.slice(0, 6)" :key="item.id">
                    <td>
                      <div class="d-flex ms-3">
                        <div class="form-check my-auto">
                          <input
                            class="form-check-input cheka"
                            type="checkbox"
                            @click="selectUser(item._id)"
                          />
                        </div>
                        <div class="d-flex px-2 py-1 ms-4">
                          <div>
                            <img
                              :src="item.foto"
                              class="avatar avatar-sm me-3"
                              alt="avatar image"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <b
                              class="mb-0 text-sm  fuente"
                              style="color: #0091ae;"
                              >{{ item.fullname }}</b
                            >
                            <div>
                              <span
                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                              ></span>
                              <span
                                class="text-xs text-center font-weight-normal fuente"
                                >{{ item.email }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="text-sm text-center font-weight-normal fuente">
                      <span class="icon">
                        <i
                          v-if="item.status.includes('1')"
                          class="fa fa-check"
                        ></i>
                        <i v-else class="fa fa-times"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-else>
              <div class="row mt-3">
                <div class="col-lg-12">
                  <div class="text-center">
                    <img
                      class="w-20"
                      src="../../../assets/img/usados/vacio.svg"
                      alt="fondo"
                    />
                    <div class="letra fuente">
                      Buscar por el nombre o apellido
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
        
      </div>
    </div>
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
        <div class="modal-content ">
          <div class="modalheader">
            <p class="h5 fuente text-white mt-3 ms-3">Exportar</p>
            <button @click="modals = 'cier'" class="btn btn-link text-white ">
              <i style="font-size: 32px" class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" style="padding:10px;">
              <p class="fuente">
                El archivo exportado se mostrara en una hoja de calculo
              </p>
              <div class="form-group">
                <p class="parrafo mt-2" for="exampleFormControlSelect1">
                  Formato de archivo
                </p>
                <select class="form-control selector">
                  <option>CSV</option>
                  <option>XLS</option>
                  <option>XLSX</option>
                </select>
                <button class="btn btnNaranja mt-4">Exportar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script src="./Docentes.js"></script>
