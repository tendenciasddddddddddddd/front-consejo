<template>
  <div class="row ">
    <Analitic v-if="isData"></Analitic>
    <div v-else class="col-lg-11 col-12 mx-auto">
      <div class="row">
        <div class="col-sm-12">
          <h3 class="fuente" style="font-weight: 400;">Aulas Virtuales</h3>
          <hr class="horizontal dark mb-1" />
        </div>
      </div>

     
      <div >
        <div v-if="!info.length">
          <div class="row mt-5">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-30"
                  src="../../../../assets/img/jira/search-error.svg"
                  alt="fondo"
                />
                <div class=" mt-4 letra fuente">
                  Hemos buscado en todas partes, pero no tenemos <br />
                  nada que mostrarte. Espera a que <br />
                  sus docentes agregen cursos
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div class="table-responsive p-0 mt-3">
            <table class="table align-items-center mb-0">
              <thead>
                <tr class="cabeza text-sm">
                  <th
                    style="background-color: rgb(234, 240, 246);"
                    class="text-start "
                  >
                   
                      Curso
                   
                  </th>
                  <th
                    
                    class="text-end"
                  >
                   
                      Opción
                   
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in displayedArticles"
                  :key="item.id"
                  :vars="(aux = 0)"
                >
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="w-5">
                        <img
                          src="../../../../assets/img/usados/nombre.png"
                          class=""
                          style="border-radius: 100%;max-width: 100%; "
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <span class="parrafo">
                          &nbsp;&nbsp; {{ item.materia }} <br />
                          &nbsp;&nbsp; {{ item.nombre }} / {{ item.doc }}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td class="align-middle text-end">
                    <p
                      @click="verificarCalve(item)"
                      class="badge  aula text-dark"
                      style="color: black"
                    >
                      &nbsp;Matricularme
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <ul class="pagination pagination-dark justify-content-center">
              &nbsp;&nbsp;
              <li class="page-item">
                <a class="page-link" v-if="page != 1" @click="page--">
                  <i class="ni ni-bold-left" aria-hidden="true"></i>
                </a>
              </li>

              <li class="page-item active">
                <a class="page-link">{{ page }}</a>
              </li>

              <li class="page-item">
                <a class="page-link" v-if="page != numPages" @click="page++">
                  <i class="ni ni-bold-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- Start of HubSpot Embed Code -->
        <!-- Button trigger modal -->

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
              <div class="modal-header">
                <div class="text-end">
                  <p class="h6 fuente">{{ nomMateria }}</p>
                </div>
                <button
                  @click="modals = 'cier'"
                  class="btn btn-link text-dark p-0 "
                >
                  <i style="font-size: 27px" class="fa fa-close"></i>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-6">
                    <img
                      src="../../../../assets/img/shapes/intro-view.76f051ad8e0b01d4178163918dd46079.8.svg"
                      class=""
                    />
                  </div>
                  <div class="col-lg-6">
                    <form @submit.prevent="save">
                      <p class="h6 fuente">Ingrese el ping de acceso</p>
                      <input
                        v-model="llave"
                        class="form-control buscador fuente mt-4"
                        type="password"
                      />
                      <div v-if="llave == keys">
                        <button
                          v-if="ifLoad"
                          class="btn btn-sm btnNaranja mt-4 w-100"
                          type="button"
                          disabled
                        >
                          <span
                            class="spinner-border spinner-border-sm "
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Enviando...
                        </button>
                        <button
                          v-else
                          type="submit"
                          class="btn btn-sm btnNaranja mt-4 w-100"
                        >
                          matricular
                        </button>
                      </div>

                      <button
                        v-else
                        type="submit"
                        class="btn btn-sm btnNaranja disabled mt-4 w-100"
                      >
                        matricular
                      </button>
                    </form>
                    <p class="text-danger parrafo">{{ isError }}</p>
                  </div>
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

<script src="./AllAulas.js"></script>
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
.activate {
  display: block;
}
</style>
