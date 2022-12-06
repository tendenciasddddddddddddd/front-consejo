<template>
  <div >
     <!-- <AlertHeader :firsttext="'Administración de estudiantes en la plataforma'" ></AlertHeader> -->
        <ActionsRow :longitude="userIds.length" @openModal="openChildUser2" @remove="remove" @gets="openChildAlumno" @desactiveState="desactiveState" @changeSearch="changeSearch" @openModalh="openAgGrid" :ifGrids="1"/>
        <Spinner v-if="isLoading"></Spinner>
          <div v-else class="dataTable-container ">
            <table  class="dataTable-table table s-table-flush"  >
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
                       <svg @click="deletedSelected" style="cursor: pointer;color: #8b3dff;" v-else  data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" ><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>
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
                  <td class="text-xs text-center colorestabla fuente">
                    {{ item.email?item.email:'No tiene email' }}
                  </td>
                  <td class="text-xs text-center colorestabla fuente">
                    {{ item.updatedAt.substring(0, 10) }}
                  </td>
                  <td class="text-sm text-center font-weight-normal fuente">
                    <span class="icon">
                      <svg v-if="item.status.includes('1')" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="#000;"><path d="M20 6L9 17l-5-5"></path></svg>
                      <svg v-else data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="#000;"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                     
                    </span>
                  </td>
                  <td class="text-sm text-center ">
                    
                    <span style="cursor:pointer"  @click="resetPassword(item._id)" v-tooltip.top-center="'Resetear contraseña de ' + item.fullname">
                    <svg v-if="!ifPassword"  class="negros" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  </span>
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
   
      <div class="fixed-plugin ">
    <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff; border-radius: 20px 20px 2px 20px;  box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
      Ver video explicativo
    </a>
  </div>
  </div>
</template>
<script src="./Estudiante.js"></script>