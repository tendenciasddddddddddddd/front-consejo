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
                        <a @click="salirBusqueda" type="button" class="fuente tamanio ">
                            <i class="fa fa-times me-2  iconos"></i>
                           <b class="links">Limpiar filtro </b>
                        </a>
                    </div>
                  </th>
                  <th class="text-uppercase  text-xxs font-weight-bolder">
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
          <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'dbG1xucfNHA'"/>
        </div>
   
      <div class="fixed-plugin">
    <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff; border-radius: 20px 20px 2px 20px;  box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
      Ver video explicativo
    </a>
  </div>
  </div>
</template>
<script src="./Estudiante.js"></script>