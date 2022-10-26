<template>
  <div >
    
    <div >
       
       <ActionsRow :longitude="userIds.length" @openModal="openChildUser2" @remove="remove" @gets="openChildUser" @desactiveState="desactiveState" @changeSearch="changeSearch"/>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else>
          <div class="table-responsive mt-1" v-if="viewtable === 1">
            <table class="dataTable-table table s-table-flush" >
              <thead class="thead-light">
                <tr class="cabeza">
                  <th
                    style="background-color: rgb(234, 240, 246); ">
                   <div v-if="!isSearch" class="d-flex ms-3">
                      <div v-if="!allSelected " class="form-check my-auto" style="min-height: 0rem;">
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
    <div v-if="ifCreateUpdate">
        <AddUser :idGet="idUser" @myEventClosedMOdalUser="closedChildUser" @clickUser="refreshUser"/>
    </div>
  </div>
</template>
<script src="./Users.js"></script>
