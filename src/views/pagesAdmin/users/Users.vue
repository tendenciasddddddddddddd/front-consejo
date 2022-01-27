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
            <p  style="margin:7px; font-weight: 700;color: #33475b;">
              <i class="ni ni-air-baloon"></i> &nbsp; Todos los usuarios que
              forman parte del sistema.
            </p>
          </div>
        </div>
      </div>
      <p class="parrafo mt-3">
        Crea nuevos usuarios, modifica y elimina usuarios de tu cuenta..
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
                  v-model="searchQuery"
                  class="form-control buscador"
                  placeholder="Buscar"
                  @click="buscar"
                />
              </div>
            </div>
            <div class="col-lg-6">
              <a
                @click="openChildUser"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: userIds.length != 1 }"
                 v-tooltip.top-center="userIds.length ? '' : 'Seleccionar un fila para editar'"
              >
                <i class="fas fa-pencil-alt me-2 ms-3 iconos"></i>
                <b class="me-4 " :class="{ links: userIds.length === 1 }"
                  >Editar</b
                >
              </a>
              <a
                v-on="userIds.length ? { click: () => remove() } : {}"
               role="button"
                class="fuente tamanio"
                :class="{ disabled: userIds.length === 0 }"
                v-if="!iseliminaddo"
                 v-tooltip.top-center="userIds.length ? '' : 'Seleccionar una o muchas filas para eliminar'"
              >
                <i class="far fa-trash-alt me-2 iconos"></i>
                <b class="me-4 " :class="{ links: userIds.length != 0 }"
                  >Eliminar usuario</b
                >
              </a>
              <a
                @click="modals = 'openn'"
                type="button"
                class="fuente tamanio "
              >
                <i class="fa fa-cloud-download me-2 iconos"></i>
                <b class="links">Exportar usuarios</b>
              </a>
            </div>
            <div class="col-lg-3">
              <div class="text-end">
                <a
                  class="btn btn-sm btnNaranja"
                 @click="openChildUser2"
                >
                  Crear usuario
                </a>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else>
          <div class="table-responsive mt-3" v-if="viewtable === 1">
            <table
              class="table table-flush "
              id="datatable-basic"
              style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
            >
              <thead class="thead-light">
                <tr
                  style="background-color: rgb(245, 248, 250); border-color: rgb(223, 227, 235);border-style: solid;border-width: 1px 0px 0px;"
                >
                  <th
                    style="background-color: rgb(234, 240, 246); "
                    class=""
                  >
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
                        Nombres
                      </span>
                    </div>
                  </th>
                  <th
                    class="text-uppercase text-center text-xxs font-weight-bolder "
                  >
                    Cedula
                  </th>

                  <th
                    class="text-uppercase text-center text-xxs font-weight-bolder "
                  >
                    Email
                  </th>
                  <th
                    class="text-uppercase text-center text-xxs font-weight-bolder"
                  >
                    Fecha
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
                          v-model="userIds" :value="item._id"
                          @click="selectOne(item._id)"
                        />
                      </div>

                      <a class="mb-0 ms-3 text-sm colorestabla fuente">
                        {{ item.fullname }}
                      </a>
                    </div>
                  </td>
                  <td class="text-sm text-center colorestabla fuente">
                    {{ item.cedula }}
                  </td>
                  <td class="text-xs text-center font-weight-normal fuente">
                    {{ item.email }}
                  </td>
                  <td class="text-sm text-center colorestabla fuente">
                    {{ item.updatedAt.substring(0, 10) }}
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

            <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

            <ul class="pagination pagination-dark justify-content-center mt-4">
             
              
              <li class="page-item">
                <router-link
                  class="fuente tamanio links me-3"
                 
                  :class="{ inactivo: paginaActual == 1 }"
                  :to="{ query: { pagina: paginaActual - 1 } }"
                >
                   <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1.2em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                  <b class="ms-2">Anterior</b>
                </router-link>
              </li>

              <li class="page-item active" >
                <a class="paginaA" > <b> {{ paginaActual }}</b></a>
              </li>

              <li class="page-item">
                <router-link
                 :class="{ inactivo: paginaActual == paginas || totalNotas ==0}"
                  
                  class="fuente tamanio links ms-3"
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
                    class="fuente tamanio links dropdown-toggle "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <b>{{subtitulo}}</b> 
                  </a>
                  <ul
                    class="dropdown-menu px-2 py-3"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a @click="getAll(1,6)"
                        class="dropdown-item border-radius-md fuente"
                        href="javascript:;"
                        >6 filas por página</a
                      >
                    </li>
                    <li>
                      <a @click="getAll(1,25)"
                        class="dropdown-item border-radius-md fuente"
                        href="javascript:;"
                        >25 filas por página</a
                      >
                    </li>
                    <li>
                      <a @click="getAll(1,50)"
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
            <a @click="salirBusqueda()" type="button" class=" tamanio mt-2">
              
              <b class="me-2 links">Salir del filtro</b>
              <i class="fa fa-times  mt-2 iconos"></i>
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
                      class="text-uppercase text-center text-xxs font-weight-bolder "
                    >
                      Cedula
                    </th>

                    <th
                      class="text-uppercase text-center text-xxs font-weight-bolder "
                    >
                      Email
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
                             v-model="userIds" :value="item._id"
                          @click="selectOne(item._id)"
                          />
                        </div>

                        <a class="mb-0 ms-3 text-sm text-dark fuente">
                          {{ item.fullname }}
                        </a>
                      </div>
                    </td>
                    <td class="text-sm text-center font-weight-normal fuente">
                      {{ item.cedula }}
                    </td>
                    <td class="text-xs text-center font-weight-normal fuente">
                      {{ item.email }}
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
              <div class="row mt-5">
                <div class="col-lg-12">
                  <div class="text-center">
                    <img
                      class="w-10"
                      src="../../../assets/img/usados/vacio.svg"
                      alt="fondo"
                    />
                    <div class="letra fuente mt-3">
                      Buscar usuario por los nombres o apellidos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <!-- End of HubSpot Embed Code -->
    <div v-if="ifCreateUpdate">
        <CreateOrUpdate :idGet="idUser" @myEventClosedMOdalUser="closedChildUser" @clickUser="refreshUser"></CreateOrUpdate>
    </div>
  </div>
</template>
<script src="./Users.js"></script>
