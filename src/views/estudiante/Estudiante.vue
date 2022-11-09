<template>
  <div >
     <!-- <AlertHeader :firsttext="'Administración de estudiantes en la plataforma'" ></AlertHeader> -->
        <ActionsRow :longitude="userIds.length" @openModal="openChildUser2" @remove="remove" @gets="openChildAlumno" @desactiveState="desactiveState" @changeSearch="changeSearch" @openModalh="openAgGrid" :ifGrids="1"/>
        <Spinner v-if="isLoading"></Spinner>
          <div v-else class="table-responsive " >
            <table  class=" dataTable-table table s-table-flush"  >
              <thead class="thead-light">
                <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); ">
                   <div v-if="!isSearch" class="d-flex ms-3" >
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
                     <div  v-else>
                        <a @click="salirBusqueda" type="button" class=" tamanio ">
                            <i class="fa fa-times me-2  iconos"></i>
                           <b class="links2">Limpiar filtro </b>
                        </a>
                    </div>
                  </th>
                  <th class="text-uppercase  text-xxs font-weight-bolder">
                    Cedula
                  </th>
                  <th class="text-uppercase text-center text-xxs font-weight-bolder">
                    Email
                  </th>
                  <th class="text-uppercase text-center text-xxs font-weight-bolder">
                    Fecha
                  </th>
                  <th class="text-uppercase text-center text-xxs font-weight-bolder">
                    Estado
                  </th>
                  <th class="text-uppercase text-center text-xxs font-weight-bolder">
                    res
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
                          v-model="userIds" :value="item._id"
                          @click="selectOne(item._id)"
                        />
                      </div>
                      <span class="mb-0 ms-3 text-xs negros fuente">
                        {{ item.fullname }}
                      </span>
                    </div>
                  </td>
                  <td class="text-xs colorestabla  fuente">
                    {{ item.cedula }}
                  </td>
                  <td class="text-sm text-center colorestabla fuente">
                    {{ item.email?item.email:'No tiene email' }}
                  </td>
                  <td class="text-xs text-center colorestabla fuente">
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
                  <td class="text-sm text-center ">
                    <svg v-if="!ifPassword" @click="resetPassword(item._id)" style="cursor:pointer" class="negros" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12.75 14.33v3.03a.75.75 0 0 1-1.5 0v-3.03c-.6-.3-1.03-.94-1.03-1.69 0-1.02.8-1.85 1.78-1.85s1.78.83 1.78 1.85c0 .75-.42 1.4-1.03 1.69zM6 8h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2zm0 1.5a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h12a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H6zM7.5 8H6a6 6 0 1 1 12 0h-1.5a4.5 4.5 0 1 0-9 0z"></path></svg>
                  </td>
                </tr>
              </tbody>
            </table>
           <Paginate2 :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
          </div>
    <div v-if="ifCreateUpdate">
      <AlumnoCreateOrUpdate :idGet="idUser" @myEventClosedMOdalAlumno="closedChildAlumno" @clickAlumnos="refreshData"/>
    </div>
    <div v-if="ifGrid">
      <GridUser :typo="'ESTS'" :role="'Estudiante'" @myEventClosedAgGrid="closeAgGrid" @clickAlumnos="refreshData"/>
    </div>
    <div v-if="ifyoutuve">
          <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'768843570'"/>
        </div>
   
      <div class="fixed-plugin">
    <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff; border-radius: 20px 20px 2px 20px;  box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
      Ver video explicativo
    </a>
  </div>
  </div>
</template>
<script src="./Estudiante.js"></script>