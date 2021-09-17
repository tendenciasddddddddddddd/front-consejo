<template>
  <div class="row "> 
    <div class="col-lg-11 col-12 mx-auto">
      
          <Navss

            :actualText="'USUARIOS DE SISTEMA'"
            :rutas="rutass"
          ></Navss>
         
               <div class="mt-2">
          <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark fuente" style="margin:7px; font-weight: 700;">
                  Todos los usuarios que forman parte del sistema. 
              </p>
            </div>
          </div>
        </div>
        <p class="parrafo mt-3">Crea nuevos usuarios, modifica y elimina usuarios de tu cuenta.</p>
      <div class="card ">
        <!-- Card header -->
        <div class="mt-2">
          <div class="row ">
            <div class="col-lg-4">
               <div class="input-group">
            <span class="input-group-text text-body buscador"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input
              type="text"
              class="form-control buscador"
              placeholder="Buscar"
            />
          </div>
            </div>
            <div class="col-lg-8">
               <div class="d-flex justify-content-end mb-3">
                    <router-link class="btn btn-sm btnNaranja" to="/usuarios/creausuario">
                  Crear Usuario
                </router-link>
               </div>
             
            </div>
          </div>
        </div>
        <Spinner v-if="isLoading"></Spinner>

        <div v-else class="table-responsive ">
          <table class="table table-flush" id="datatable-basic" >
            <thead class="thead-light">
              <tr style="background-color: rgb(245, 248, 250); border-color: rgb(223, 227, 235);border-style: solid;border-width: 1px 0px 0px;">
                <th style="background-color: rgb(234, 240, 246); "
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
                  Fecha 
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
                
                <td class="text-sm text-center font-weight-normal fuente">{{ item.fullname }}</td>
                <td class="text-sm text-center font-weight-normal fuente">{{ item.cedula }}</td>
                <td class="text-xs text-center font-weight-normal fuente">{{ item.email }}</td>
                <td class="text-sm text-center font-weight-normal fuente">{{ item.updatedAt.substring(0,10) }}</td>
                <td class="text-sm text-center font-weight-normal fuente">
                  <router-link :to="`/usuarios/${item._id}/edit`">
                     <i class="fas fa-pencil-alt text-dark me-4 " aria-hidden="true"></i>
                  </router-link>
                 <a class="text-danger link text-gradient px-3 mb-0 " style="cursor: pointer;" @click="__eliminar(item._id)" title="Eliminar"  >
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
              <router-link class="page-link"
                v-if="paginaActual != 1"
                :to="{ query: { pagina: paginaActual - 1 } }">
                <i class="ni ni-bold-left" aria-hidden="true"></i>
                </router-link>
            </li>

            <li class="page-item active">
              <a class="page-link" >{{ paginaActual }}</a>
            </li>

            <li class="page-item">
              <router-link  v-if="paginaActual != paginas"
                class="page-link"
                :to="{ query: { pagina: paginaActual + 1 } }">
                <i class="ni ni-bold-right" aria-hidden="true"></i>
              </router-link>

            </li>
           <li>
             <strong class="text-dark">
                &nbsp;&nbsp;&nbsp; Total: {{ totalNotas }} - Páginas: {{ paginas }}
               </strong>
             </li> 
          </ul>


         
        </div>
      </div>
    </div>
      

  </div>
</template>
<script src="./indexUsiario.js"></script>
