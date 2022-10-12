<template>
  <div >
 <AlertHeader :firsttext="'Gestionar docentes'" :lasttext="'Crea, edita, elimina y filtrar'"></AlertHeader>
        <ActionsRow :longitude="userIds.length" @openModal="openChildDocente2" @remove="remove" @gets="openChildDocente" @desactiveState="desactiveState" @changeSearch="changeSearch" @openModalh="openAgGrid"/>
      
        <Spinner v-if="isLoading"></Spinner>
            <div v-else class="table-responsive ">
          <table class="dataTable-table table s-table-flush">
            <thead class="thead-light">
              <tr class="cabeza">
                 <th style="background-color: rgb(234, 240, 246); "
                  >
                   <div v-if="!isSearch" class="d-flex ms-3">
                      <div v-if="!allSelected " class="form-check " style="min-height: 0rem;margin-bottom: 0rem;">
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
                <th  class="text-uppercase text-center text-xxs font-weight-bolder" >
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info" :key="item.id" :class="{ 's-ifactive': userIds.includes(item._id) }">
                
                <td>
                    <div class="d-flex ms-3">
                      <div class="form-check my-auto supcheka">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                           v-model="userIds" :value="item._id"
                          @click="selectOne(item._id)"
                        />
                      </div>

                      <a class="mb-0 ms-3 text-xs colorestabla fuente">
                        {{ item.fullname }}
                      </a>
                    </div>
                  </td>
                <td class="text-sm colorestabla colorestabla fuente">{{ item.cedula }}</td>
                <td class="text-sm text-center colorestabla colorestabla fuente">{{ item.email }}</td>
                <td class="text-xs text-center colorestabla colorestabla fuente">{{ item.updatedAt.substring(0,10) }}</td>
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
      <div v-if="ifCreateUpdate">
      <DocenteCreateOrUpdate :idGet="idUser" @myEventClosedMOdalDocente="closedChildDocente" @clickDocente="refreshData"></DocenteCreateOrUpdate>
    </div>
    <div v-if="ifGrid">
      <GridUser :typo="'DOCS'" :role="'Docente'" @myEventClosedAgGrid="closeAgGrid" @clickAlumnos="refreshData"/>
    </div>
  </div>
</template>
<script src="./Docentes.js"></script>
