<template>
  <div >
        <ActionsRow :longitude="userIds.length" @openModal="openChildDocente2" @remove="remove" @gets="openChildDocente" @desactiveState="desactiveState" @changeSearch="changeSearch" @openModalh="openAgGrid" :ifGrids="1"/>
      
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
                        <a @click="salirBusqueda" type="button" class=" tamanio ">
                            <i class="fa fa-times me-2  iconos"></i>
                           <b class="links2">Limpiar filtro </b>
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
                <th  class="text-uppercase text-center text-xxs font-weight-bolder" >
                  resetPw
                </th>
                <th class="text-uppercase text-center text-xxs font-weight-bolder">
                  (Doc)|(Vice)|(Admin)
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

                      <span class="mb-0 ms-3 mt-1 text-xs colorestabla fuente">
                        {{ item.fullname }}
                      </span>
                    </div>
                  </td>
                <td class="text-xs colorestabla fuente">{{ item.cedula }}</td>
                <td class="text-sm text-center colorestabla fuente"> {{ item.email?item.email:'No tiene email' }}</td>
                <td class="text-sm text-center "> 
                  <span class="resetpp" @click="resetPassword(item._id)" v-tooltip.top-center="'Resetear contraseña de ' + item.fullname">
                    <svg v-if="!ifPassword"  class="negros" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  </span>
                  </td>
                <td class="d-flex justify-content-center">
                  <div class="form-check my-auto supcheka me-3">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                           v-model="item.roles" :value="roldocente"
                          @click="selectOneRol(item._id,item.roles, roldocente)"
                        />
                      </div>
                      <div class="form-check my-auto supcheka me-3">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                           v-model="item.roles" :value="rolvicerrector"
                          @click="selectOneRol(item._id,item.roles, rolvicerrector)"
                        />
                      </div>
                      <div class="form-check my-auto supcheka">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                           v-model="item.roles" :value="roladmin"
                          @click="selectOneRol(item._id,item.roles, roladmin)"
                        />
                      </div>
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
    <div class="fixed-plugin">
    <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff; border-radius: 20px 20px 2px 20px;  box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
      Ver video explicativo
    </a>
  </div>
  </div>
</template>
<script src="./Docentes.js"></script>
