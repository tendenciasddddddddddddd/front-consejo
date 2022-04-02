<template>
  <div >
    <div >
       <AlertHeader :firsttext="'Administración'" :lasttext="'Ingresar usuarios de sistema'"></AlertHeader>
      <p class="parrafo mt-3 ms-1">
        Crea nuevos usuarios, modifica y elimina usuarios de tu cuenta..
      </p>
       <ActionsRow :longitude="userIds.length" @openModal="openChildUser2" @remove="remove" @gets="openChildUser" @desactiveState="desactiveState" @changeSearch="changeSearch" @openModalh="openModal"/>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else>
          <div class="table-responsive mt-1" v-if="viewtable === 1">
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
                    style="background-color: rgb(234, 240, 246); ">
                   <div v-if="!isSearch" class="d-flex ">
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
                    <div v-else>
                        <a @click="salirBusqueda" type="button" class="fuente tamanio ">
                            <i class="fa fa-times me-2  iconos"></i>
                           <b class="links">Limpiar filtro </b>
                        </a>
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
        <Paginate2 :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
          </div>
        </div>
    </div>
    <!-- Modal -->
    <Modal v-show="visible" @close="close">
          <template v-slot:header> Exportar lista</template>
          <template v-slot:body>
               <div class="p-3">
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
          </template>
        </Modal>
    <!-- End of HubSpot Embed Code -->
    <div v-if="ifCreateUpdate">
        <CreateOrUpdate :idGet="idUser" @myEventClosedMOdalUser="closedChildUser" @clickUser="refreshUser"></CreateOrUpdate>
    </div>
  </div>
</template>
<script src="./Users.js"></script>
