<template>
  <div class="row ">
    <div class="col-lg-9 col-12 mx-auto">
      <div class="row">
        <div class="col-sm-12">
          <h3 class="fuente" style="font-weight: 400;">Aulas Virtuales</h3>
          <hr>
        </div>
      </div>

      <Skeleton v-if="isData"></Skeleton>
      <div v-else>
        <div v-if="!info.length">
          <div class="row">
            <div class="table-responsive p-0 mt-5">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr class="cabeza">
                    <th
                      style="background-color: rgb(234, 240, 246);"
                      class="text-center "
                    >
                      <p class="parrafo">
                        Lista Aulas Virtuales
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      class="text-center"
                      style="height: 72px; padding: 16px 24px;    "
                    >
                      <p class="h5 fuente">No has creado ningún curso</p>
                      <p class="parrafo">
                        Crea nuevas instancias o cursos para que tus estudiantes
                        se <br />
                        puedan matricular
                      </p>
                      <router-link
                        to="/crear-aula"
                        class="btn btnNaranja btn-sm mt-4 w-40"
                      >
                        Crear un curso
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div class="text-end ">
            <router-link to="/crear-aula" class="btn btn-sm btnNaranja ">
              Crear un curso
            </router-link>
          </div>
          <div class="table-responsive p-0 mt-3">
            <table class="table align-items-center mb-0">
              <thead>
                <tr class="cabeza">
                  <th
                    style="background-color: rgb(234, 240, 246);"
                    class="text-start "
                  >
                    <p class="parrafo">
                      Nombre
                    </p>
                  </th>
                  <th
                    style="background-color: rgb(234, 240, 246);"
                    class="text-end"
                  >
                    <p class="parrafo">
                      Estado
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in info" :key="item.id" :vars="(aux = 0)">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="w-9">
                        <img
                          src="../../../../assets/img/logs/bot-avatar.webp"
                          class=""
                          style="border-radius: 100%;max-width: 100%; "
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <p class="parrafo">
                          &nbsp;&nbsp; {{ item.materia }} <br>
                           &nbsp;&nbsp; {{ item.nombre }} /  {{ item.icono }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="align-middle text-end">
            
                 <!--    <button
                      @click="__eliminar(item._id)"
                      class="btn btn-sm fuente"
                      style="height:30px; background-color: #eaf0f6; border-color: #cbd6e2; color: black; 
      font-weight: 500; 
      border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                    >
                      Eliminar
                    </button> -->
                     <router-link :to="`/aula-principal/${item._id}`" class="badge  aula text-dark" style="color: black">
                         &nbsp;Entrar
                     </router-link>&nbsp;&nbsp;&nbsp;
                       <p @click="mostrar(item._id,item.materia)" class="badge  aula text-dark" style="color: black">
                         &nbsp;Eliminar
                      </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Start of HubSpot Embed Code -->
        <!-- Button trigger modal -->


<!-- Modal -->
 <div
          class="modal fade "
          :class="{ 'show ': modals1 === 'opennn' }"
          :style="[modals1 === 'opennn' ? { display: 'block' } : {}]"
          style="overflow-y: auto;    z-index: 9999;"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content ">

              <div class="modal-body">
                <p class="h4 fuente">¿Eliminar a <br>
                {{curso}}?</p>
                
                <p class="parrafo">Estás a punto de eliminar a {{curso}} de esta cuenta. Esta acción no se puede deshacer</p>
                <div class="mt-3">
                  <a @click="modals1 = 'cier'" class="btn btn-sm " style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;" name="button">Cancelar</a>&nbsp; &nbsp;
                   <button @click="__eliminar()" class="btn btn-sm btnNaranja">
                           Continuar
                   </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
<!-- End of HubSpot Embed Code -->
      </div>
    </div>
  </div>
</template>

<script src="./AulasListas.js"></script>
<style>
.mole {
  background-color: white;
  transition: background-color 0.5s;
}

.mole:hover {
  background-color: #f5f5f5;
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.bd-example {
  position: relative;
  padding: 2rem;
  border: 3px solid #eee;
}
</style>
