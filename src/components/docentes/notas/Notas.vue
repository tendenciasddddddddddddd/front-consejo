<template>
  <div>
    <div class="row" >
      <div class="col-lg-11 col-12 mx-auto">
        <div class="" style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;">
            <a @click="$router.go(-1)" class="badge" style="box-shadow: none">
              <img
                height="23px"
                src="../../../assets/img/usados/regresar.png"
              />
            </a>
             <span class="ms-3 h6" style="font-weight: 700;color: black;"> Despues de registrar los dos semestres
              confirme la notas. </span>
           
        </div>
        
        <p class="h6 fuente mt-4 ms-1" style="font-weight: 400;">
        {{ mate }}
        </p>


     
      <Spinner v-if="isData"></Spinner>
      <div v-else class="mt-3">
        <div class="mt-2">
          <div class="row ">
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-text text-body buscador"
                  ><i class="fas fa-search colorhs" aria-hidden="true"></i
                ></span>
                <input
                  type="text"
                  class="form-control buscador"
                  placeholder="Buscar"
                />
              </div>
            </div>
            <div class="col-lg-6">
              <a
              @click="editar()"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: isSelecUsers.length != 1 }"
               
              >
                <i class="fas fa-pencil-alt me-2 ms-3 iconos"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length === 1 }"
                  >Registrar calificación</b
                >
              </a>
                 <a
                role="button"
                class="fuente tamanio"
                :class="{ disabled: isSelecUsers.length != 1 }"
               
              >
                <i class="fa fa-info-circle me-2 iconos" aria-hidden="true"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length === 1 }"
                  >Detalles</b
                >
              </a>
             
            </div>
           <div class="col-md-3">
              <div class="text-end">
                <a class="btn btnNaranja">
                 Exportar lista
                </a>
              </div>
            </div>
          </div>
        </div>

       
          
          <div  class=" px-0 pt-0 pb-2">
            <div v-if="!isVerific.length">

              <div class="alertdanger mt-4">
              <p class="parrafo">
                <strong>Nota: </strong>
               Aún no existen estudiantes en este curso 😢, O intente regresando he ingresando otra vez 😍
              </p>
            </div>
              <div class="row mt-3">
                <div class="col-lg-9 col-12 mx-auto">
                  <div class="text-center">
                    <img
                      class="w-35"
                      src="../../../assets/img/logs/lupa.svg"
                      alt="fondo"
                    />
                    <div class="letra fuente mt-3">
                      No hay datos que mostrar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="table-responsive p-0 mt-4">
              <Spinner v-if="!displayedArticles.length"></Spinner>
              <table v-else class="table align-items-center mb-0" style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                <thead>
                  <tr class="cabeza">
                    <th
                      style="background-color: rgb(234, 240, 246); "
                      class="text-uppercase text-secondary text-xxs "
                    >
                      Estudiante
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs ">
                      Quim 1
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Quim 2
                    </th>
                      <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Promedio
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in displayedArticles" :key="item.id" :vars="(aux = 0)">
                   <td>
                    <div class="d-flex ms-3">
                      <div class="form-check my-auto supcheka">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectUser(item)"
                        />
                      </div>

                      <a class="mb-0 ms-3 text-sm colorestabla fuente">
                        {{ item.name }}
                      </a>
                    </div>
                  </td>
                    <td class="align-middle text-center fuente">
                       <span v-if="item.par1!=0" class="links text-sm"> <b>{{ item.par1 }}</b> </span> 
                       <span v-else class="text-sm"> {{ item.par1 }} </span> 
                    </td>
                    <td class="align-middle text-center text-sm">
                       <span v-if="item.par2!=0" class="links text-sm"> <b>{{ item.par2 }}</b> </span> 
                       <span v-else class="text-sm"> {{ item.par2 }} </span> 
                    </td>
                     <td class="align-middle text-center text-sm fuente">
                       <div v-if="!ifLoad2">
                            <div v-if="item.par1!=0&&item.par2!=0&&item.promed==0">
                           <a
                        v-if="aux < 2"
                        @click="ConfirmarNota(item)"
                        role="button" v-tooltip.top-center="{content: 'Confirmar nota cuando el alumno ya tenga todos sus aportes'}"
                        class="fuente tamanio"
                        ><i class="fa fa-check" aria-hidden="true"></i> <b class="links ms-2">Confirmar</b> </a
                      >
                       </div>

                       <a v-else href="">{{ item.promed }}</a>
                       </div>
                      <a v-else class="fuente text-sm text-danger">Trabajando</a>
                       
                    </td>
                    <!-- <td class="align-middle text-center text-end">
                      <a
                        v-if="item.par1==0||item.par2==0"
                        @click="OptenerMatricula(item)"
                        style="cursor: pointer;"
                        
                        class="badge badge-sm bg-gradient-dark"
                        >Subir Nota</a
                      >
                       <a v-else class="fuente">Ok</a>
                    </td> -->
                  </tr>
                </tbody>
              </table>
              
             <ul class="pagination pagination-dark justify-content-center mt-4">
              <li class="page-item">
                <a
                  class="fuente tamanio links paginates me-3"
                  :class="{ inactivo: page == 1 }"
                  @click="page--"
                >
                  <i class="fa fa-angle-left me-2" aria-hidden="true"></i>
                  <b>Anterior</b>
                </a>
              </li>

              <li class="page-item active">
                <a class="paginaA">
                  <b> {{ page }}</b></a
                >
              </li>

              <li class="page-item">
                <a
                  :class="{ inactivo: page == numPages }"
                  class="fuente tamanio links paginates ms-3"
                   @click="page++"
                >
                  <b>Siguiente</b>
                  <i class="fa fa-angle-right ms-2" aria-hidden="true"></i>
                </a>
              </li>
             
              <li>
                <strong class="fuente text-sm ms-3">
                  Total: {{ numPages }}
                </strong>
              </li>
            </ul>
            </div>
          </div>
       
      </div>
   
      </div>
    </div>

    

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
                <p class="h4 fuente">Ingresar calificaciónes ?<br>
                </p>
                
                <p class="parrafo">Asegurate que todos tus estudiantes ya esten inscritos en este curso, si es asi continuar, de lo contrario regresar</p>
                <div class="mt-3">
                  <a @click="$router.go(-1)" class="btn btnNaranjaClaro me-3"> Regresar</a>
                    <button v-if="isSaveArbol"  class="btn btn-sm btnNaranja disable">
                           Trabajando
                   </button>
                   <button v-else @click="__gravarArbol1()" class="btn btn-sm btnNegro">
                           Continuar
                   </button>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
    <!-- Modal -->
      <div v-if="tab === 'inicios'" class=" altural" >
              
      </div>

    <div class="fixed-plugin " :class="{ 'show repon ': tab === 'inicios' }">
   
      <div
        class="card shadow-lg  desplega"
        :class="{ 'repon': tab === 'inicios' }"
        style="overflow-y: auto; z-index: 9999;"
      >
        <div
          class="cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-2 mb-0 text-white fuente">
             {{isAlumno }} 😊
               
            </h5>
           
          </div>
          <div class="float-end mt-2">
            <button
              @click="tab = 'init'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close text-white"></i>
            </button>
            
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
          <!-- Sidebar Backgrounds -->
             <div class="row">
          <div class="col-12 col-lg-12 mx-auto my-5">
            <div class="multisteps-form__progress">
              <button
               
                :class="{ 'js-active ': isVisible === 'pane1' ||isVisible === 'pane2'||isVisible === 'pane3'||isVisible === 'pane4'}"
                class="multisteps-form__progress-btn "
                type="button"
                title="User Info"
              >
                <a class="parrafo text-dark">Parcial 1</a>
              </button>
              <button
                
                :class="{ 'js-active ': isVisible === 'pane2' ||isVisible === 'pane3'||isVisible === 'pane4' }"
                class="multisteps-form__progress-btn "
                type="button"
                title="Address"
              >
                <a class="parrafo text-dark">Parcial 2</a>
              </button>
              <button
                
                :class="{ 'js-active': isVisible === 'pane3'||isVisible === 'pane4' }"
                class="multisteps-form__progress-btn "
                type="button"
                title="Address"
              >
               <a class="parrafo text-dark">Parcial 3</a>
              </button>
              <button
                
                :class="{ 'js-active': isVisible === 'pane4' }"
                class="multisteps-form__progress-btn "
                type="button"
                title="Address"
              >
               <a class="parrafo text-dark">Examen</a>
              </button>
            </div>
          </div>
        </div>
          <div class="row">
        
            <div class="col-lg-9 col-12 mx-auto">

              <form @submit.prevent="save" id="notas">
                   
                <div class="row " v-if="isVisible === 'pane1'">
                 
                  <span class="parrafo ">Primer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap11'),
                      }"
                      v-model="notasx.ap11"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap11") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Segundo aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap12'),
                      }"
                      v-model="notasx.ap12"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap12") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Tercer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap13'),
                      }"
                      v-model="notasx.ap13"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap13") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Cuarto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap14'),
                      }"
                      v-model="notasx.ap14"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap14") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Quinto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap15'),
                      }"
                      v-model="notasx.ap15"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap15") }}
                    </p>
                  </div>
                 
                </div>
                <div class="row " v-if="isVisible === 'pane2'">
                 
                  <span class="parrafo ">Primer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap21'),
                      }"
                      v-model="notasx.ap21"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap21") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Segundo aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap22'),
                      }"
                      v-model="notasx.ap22"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap22") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Tercer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap23'),
                      }"
                      v-model="notasx.ap23"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap23") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Cuarto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap24'),
                      }"
                      v-model="notasx.ap24"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap24") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Quinto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap25'),
                      }"
                      v-model="notasx.ap25"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap25") }}
                    </p>
                  </div>
                  
                </div>
                <div class="row " v-if="isVisible === 'pane3'">
                 
                  <span class="parrafo ">Primer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap31'),
                      }"
                      v-model="notasx.ap31"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap31") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Segundo aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap32'),
                      }"
                      v-model="notasx.ap32"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap32") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Tercer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap33'),
                      }"
                      v-model="notasx.ap33"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap33") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Cuarto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap34'),
                      }"
                      v-model="notasx.ap34"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap34") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Quinto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap35'),
                      }"
                      v-model="notasx.ap35"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap35") }}
                    </p>
                  </div>
                  
                </div>
                <div class="row " v-if="isVisible === 'pane4'">
                 
                  <span class="parrafo mt-2">Nota examen</span>
                  <div class="col-12">
                    <input
                      :class="{
                        error: validation.hasError('model.calificaciones.notas.examen'),
                      }"
                      v-model="model.calificaciones.notas.examen"
                      class="form-control buscador"
                      type="text"
                      required
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("model.calificaciones.notas.examen") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">A que Quimestre Pertenece?</span>
                  <div class="col-12 ">
                    <select
                      :class="{
                        error: validation.hasError('model.notas.calificaciones.quimestre'),
                      }"
                      v-model="model.calificaciones.notas.quimestre"
                      class="form-control buscador"
                      required
                    >
                      <option value="p1">Primer Quimestre</option>
                      <option value="p2">Segundo Quimestre</option>
                    </select>
                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.calificaciones.notas.quimestre") }}
                    </p>
                  </div>


                  <div v-if="isDoble" class="mt-4">
                    <div class="freemeeting-tip">
                <p class="text-sm text-dark fuente">
                  Creo que perdiste el rumbo, revisa nuevamente las notas ya que dichas notas no las puedo procesar tal vez te falto
                  un campo o ingresaste mal una nota con decimal. 😉😉
                </p>
              </div>
                  </div>
                   <div v-if="isDuplicado" class="mt-4">
                    <div class="freemeeting-tip">
                <p class="text-sm text-dark fuente">
                  Tal parece que este estudiante ya tiene registrado una nota en este quimestre, 
                  intenta con otro. 😉😉
                </p>
              </div>
                  </div>
                </div>
              </form>

            </div>
            
          </div>
        </div>
        <div
          class="cord-footer modalFooter"
         
        >
          <div class="text-end">
            <div v-if="isVisible === 'pane1'">
              <a class="btn btnNaranja " @click="isVisible = 'pane2'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible === 'pane2'">
                <a
                class="btn btnNaranjaClaro"
              
                @click="isVisible = 'pane1'"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
              <a class="btn btnNaranja " @click="isVisible = 'pane3'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
              <div v-if="isVisible === 'pane3'">
                <a
                class="btn btnNaranjaClaro"
                
                @click="isVisible = 'pane2'"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
              <a class="btn btnNaranja " @click="isVisible = 'pane4'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible === 'pane4'">
              <a
                class="btn btnNaranjaClaro"
                
                @click="isVisible = 'pane3'"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
              <button
                v-if="ifLoad"
                class="btn btn-sm btnNaranja"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Trabajando...
              </button>
             
                <button v-else
                type="submit"
                id="addRowButton"
                class="btn btnNaranja"
                form="notas"
              >
                Guardar
              </button>

            </div>
            <div v-if="isVisible === 'pane5'">
              <a class="btn btnNaranja " @click="tab = 'salir'">
                Salir de Aqui &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Notas.js"></script>
<style>
.freemeeting-tip {
  border-radius: 3px;
  background-color: rgba(254, 116, 37, 0.1);
  border: solid 1px #fe7425;
  padding: 15px;
  margin-top: -8px;
}
.cabesa{
        background-color: #00bda5;
    background-image: linear-gradient(
-303deg,#00a4bd,#00afb2 56%,#00bda5);
    color: #fff;

}

</style>
