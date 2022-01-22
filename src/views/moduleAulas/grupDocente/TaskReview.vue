<template>
  <div>
    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'openIA' }">
      <a
        @click="tab = 'init1'"
        class="fixed-plugin-button text-dark position-fixed px-3 py-2"
        style="background-color: rgb(14, 114, 237);"
      >
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div
        class="card shadow-lg desplega"
        :class="{ 'w-100': tab === 'openIA' }"
        style="overflow-y: auto; z-index: 9999;"
      >
        <div
          class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
        >
          <div class="d-flex justify-content-between">
            <div class="h5 text-white">
              ...
            </div>
            <div>
              <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
               Lista de estudiantes de tareas entregadas
              </h5>
            </div>
            <div class="mt-2">
              <button
                @click="$emit('myEventTask')"
                class="btn btn-link text-dark p-0 fixed-plugin-close-button"
              >
               <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"
                  >
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#ffffff">
                        <path
                          d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                        ></path>
                      </g>
                    </g>
                  </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <Spinner v-if="isData"></Spinner>
          <div v-else class="row">
            <div v-if="panel == '1'" class="col-lg-10 col-12 mx-auto">
              <div class="d-flex justify-content-between">
                
                <div>
                  <div class="form-check form-switch mt-2">
                    <input
                     @click="_taskload"
                      v-model="meTask[0].estado"
                      class="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      value="1"
                      v-bind:true-value="1"
                      v-bind:false-value="0"
                      :disabled="meTask[0].estado == 1"
                    />
                    <label class="form-check-label" for="rememberMe" 
                      >{{ meTask[0].estado==1 ? "La tarea fue marcada como revisada" : "Marcar como revisada" }}</label
                    >
                  </div>
                </div>
                <div>
                   <div>
                     <a  @click="getData" class="btn btn-sm btnTrasparente">Actualizar lista</a>
                 
                </div>
                 
                </div>
              </div>

              <!-- <p class="parrafo" v-html="meTask[0].descripcion"></p> getData-->
             
              <p class="parrafo ">{{ meTask[0].nombre }}</p>
              <a href=""> </a>
              <div v-if="!meTask[0].entrega.length">
                <div class="text-center mt-6">
                  <img
                    class="w-15"
                    src="../../../assets/img/logs/descanso.svg"
                    alt="fondo"
                  />
                  <div class="letra fuente mt-4">
                    Sin tareas pendientes por revisar
                  </div>
                </div>
              </div>

              <div v-else class="table-responsive mt-3">
                <table
                  class="table table-flush"
                  id="datatable-basic"
                  style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
                >
                  <thead class="thead-light">
                    <tr class="cabeza">
                      <th
                        style="background-color: rgb(234, 240, 246); "
                        class="text-uppercase text-center text-xxs font-weight-bolder"
                      >
                        Estudiante
                      </th>
                      <th
                        class="text-uppercase text-center text-xxs font-weight-bolder"
                      >
                        Estado tarea
                      </th>
                      <th
                        class="text-uppercase text-center text-xxs font-weight-bolder"
                      >
                        Estado nota
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in documnetUser" :key="item.id">
                      <td>
                        <div class="d-flex ms-3">
                          <div class="form-check my-auto">
                            <input
                              class="form-check-input cheka"
                              type="checkbox"
                              @click="selectTask(item.idTask)"
                            />
                          </div>
                          <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->
                          <span class="mb-0 ms-3 text-sm colorestabla fuente">
                            <i class="fa fa-user me-2" style="color: rgb(124, 152, 182);" aria-hidden="true"></i>
                            {{ item.nombre }}
                          </span>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.tarea === ''" class="fuente  text-sm">
                          <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span
                          >Sin enviar
                        </div>
                        <div v-else class="fuente  text-sm">
                          <span
                            style="background-color: rgb(0, 189, 165);"
                            class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                          ></span>
                          Enviado
                        </div>
                      </td>
                      <td class="text-sm text-center colorestabla fuente">
                        <div v-if="item.nota">
                          <span
                            style="background-color: rgb(0, 189, 165);"
                            class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                          ></span>
                          {{ item.nota }}
                        </div>
                        <div v-else>
                          <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                          Sin calificación
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="panel == '2'" class="col-lg-9 col-12 mx-auto">
              <div class="d-flex justify-content-between">
                <div>
                  <button
                    href="javascript:;"
                    @click="_regresar()"
                    class="btn btn-sm"
                    style="box-shadow: none"
                  >
                    <img
                      height="20px"
                      src="../../../assets/img/usados/regresar.png"
                    />
                  </button>
                </div>
                <div>
                  <span class="fuente h5 mt-2" style="font-weight: 400;">{{ meTask[0].nombre }}</span>
                </div>
                <div>
                  <i
                    style="font-size: 18px;"
                    class="fa fa-filter text-dark"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div v-if="subpanel == '2'">
                <div class="text-center mt-6">
                  <img
                    class="w-20 mt-2"
                    src="../../../assets/img/logs/descanso.svg"
                    alt="fondo"
                  />
                  <div class="letra fuente mt-4">
                    Tarea sin entregar
                  </div>
                </div>
              </div>
              <div v-else class="p-3 ">
                <hr class="horizontal dark mb-0" />
                <p class="parrafo " v-html="meTask[0].descripcion"></p>
                <p class="parrafo">
                  Estudiante: <b>{{ detalleTask[0].nombre }}</b>
                </p>
                <p class="parrafo">
                  Link del trabajo:
                  <a
                    :href="detalleTask[0].tarea"
                    target="_blank"
                    class="ms-2 btn btn-sm btnNaranja"
                  >
                    <span >Click para revisar el trabajo</span>
                  </a>
                </p>
               
                <div class=" w-55" style="padding: 30px 60px;
    border: 2px dashed rgb(166, 182, 198);
    color: rgb(51, 71, 91);">
                  <form @submit.prevent="save" role="form" id="notas">
                    
                    <span class="parrafo">Ingrese la calificación</span>
                    
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        :class="{ error: validation.hasError('model.nota') }"
                        v-model="model.nota"
                        class="form-control buscador"
                        aria-label="Name"
                        aria-describedby="name-addon"
                      />
                    </div>

                    <p class="mb-0 text-xs fuente text-danger">
                      {{ validation.firstError("model.nota") }}
                    </p>
                     <span class="parrafo">Observaciones (Opcional)</span>
                    
                    <div class="input-group mb-3">
                      <textarea style="height: 87px;"
                        type="text"
                        :class="{ error: validation.hasError('model.observar') }"
                        v-model="model.observar"
                        class="form-control buscador"
                      ></textarea>
                    </div>

                    <p class="mb-0 text-sm text-danger">
                      {{ validation.firstError("model.observar") }}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modalFooter">
          <div class="text-end" v-if="panel == '1'">
            <a
              @click="$emit('myEventTask')"
              style="text-decoration: underline;"
              href="javascript:;"
              class="fuente tamanio"
             
            >
              <b>Cancelar</b>
            </a>

            <a
              v-if="isSelecTask.length == 1"
              type="submit"
              id="addRowButton"
              class="btn btnNaranja ms-4"
              @click="nextO"
            >
              Siguiente &nbsp; <i class="ni ni-bold-right"></i>
            </a>
            <a v-else type="submit" class="btn btnDisabled ms-4">
              Siguiente &nbsp; <i class="ni ni-bold-right"></i>
            </a>
          </div>
          <div class="text-end" v-if="panel == '2'">
            <a
              @click="_regresar"
              style="text-decoration: underline;"
              href="javascript:;"
              class="fuente tamanio"
              to="/aulas-lista"
            >
              <b>Regresar</b>
            </a>
             <a v-if="!model.nota" type="submit" class="btn btnDisabled ms-4">
              Guardar
            </a>
            <button v-else
              type="submit"
              id="addRowButton"
              class="btn btnNaranja ms-4"
              form="notas"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from "../../../shared/Spinner";
export default {
  name: "AulaCreate",
  components: {
    Spinner,
  },
  props: {
    idGetAula: {
      type: String,
    },
     idGetTask: {
      type: String,
    },
  },
  data() {
    return {
      tab: "openIA",
      panel: '1',
      subpanel: '1',
      user: this.$store.state.user,
      info: [],
      isData: false,
      idAula : this.idGetAula,
      idtask : this.idGetTask,
      meTask : [],
      isSelecTask : [],
      documnetUser : [],
      detalleTask : [],
      model: {//-----------VARIABLES DEL MODELO A GUARDAR
        nota: '',  
        observar: ''
     },
     ifLoad : false,
     isView : false,
    };
  },
  methods: {
    getData() {
      this.isData = true;
      if (this.idAula) {
       // let params = this.$route.params.id;
       // const arrayId = params.split(",");
        //this.idAula = arrayId['0']; //OPTENEMOS EL ID 1 DE LA PAGE ANTERIOR
       // this.idtask = arrayId['1']; //OPTENEMOS EL ID 2 DE LA PAGE ANTERIOR
        this.$proxies._aulaProxi
          .get(this.idAula)
          .then((x) => {
            this.info = x.data;
            let task = this.info.task.filter((x) => x._id == this.idtask);
            if (task) {
                this.meTask = task;
                this._joinDocumentUserTask(this.info, task)
            }
            this.isData = false;
          })
          .catch((e) => {
            console.log("Error de documento", e);
            this.isData = false;
          });
      } 
    },
    _joinDocumentUserTask(documento, task){
      this.documnetUser = [];
      var contador = documento.estudiantes.length;
      if (contador>0) {
        let id = ''; 
        let idTask = ''; 
        let nombre = ''; 
        let tarea = ''; 
        let nota = '';
        let objEstudiante = documento.estudiantes;
        for (let i = 0; i < objEstudiante.length; i++) {
          id = objEstudiante[i].usuario;
          idTask = '0';
          nombre = objEstudiante[i].name;
          tarea = ''; 
          nota = '';
          let tareas = task[0].entrega;
          for (let j = 0; j < tareas.length; j++) {
            if (tareas[j].idUser == id) {
              idTask = tareas[j]._id
              tarea = tareas[j].link;
              nota = tareas[j].nota;
              break;
            }
          }
          this.documnetUser.push({id : id, tarea : tarea, idTask : idTask, nombre : nombre, nota: nota})
        }
       // console.log(this.documnetUser)
      }
    },
    selectTask(key){
        let longitud = this.isSelecTask.length;
        let isExiste = 0;
        if (longitud > 0) {
          for (let i = 0; i < this.isSelecTask.length; i++) {
            if (this.isSelecTask[i] == key) {
              this.isSelecTask.splice(i, 1);
              isExiste = 1;
              break;
            }
          }
          if (isExiste === 0) {
            this.isSelecTask.push(key);
          }
        } else {
          this.isSelecTask.push(key);
        }
    },
    nextO(){
      let longitud = this.isSelecTask.length;
      if (longitud ==1) {
        if (this.isSelecTask[0]=='0') {
           this.panel = '2';
           this.subpanel = '2'
        }else{
          this.panel = '2';
          this.subpanel = '1'
          this.detalleTask = this.documnetUser.filter(x => x.idTask==this.isSelecTask[0]);
           
        }
 
      }
    },
    _regresar() {
      this.isSelecTask = [];
      this.panel = '1';
      this.model.nota = '';
      this.model.observar = '';
    },
    save(){
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.$notify({
            group: "global",
            text: "Por favor llena correctamente los campos solicitados",
          });
          return;
        }
        if (this.idAula) { //editTask
          this.ifLoad = true;
          let keys = this.idAula+','+this.idtask+','+ this.detalleTask[0].idTask;
          //let keys = this.$route.params.id +','+ this.idtask
          this.$proxies._aulaProxi
              .calificarTask(keys, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this._regresar();
                this.getData();
                this.toast('Tarea calificada exitosamente')
              })
              .catch(() => {
                this.$notify({
                  group: "global",
                  text: "Error de servidor por favor notificar le problema",
                });
                this.ifLoad = false;
              });
        }
      }); 
  
    },
    _taskload(){
      let keys = this.idAula+','+this.idtask;
      if (keys) {
        this.isView = true;
        this.$proxies._aulaProxi
        .reviewTasks(keys, '1') //-----------EDITAR CON AXIOS
        .then(() => {
          this.isView = false;
          this.toast('Esta tarea esta marcada como revisada')
        })
        .catch(() => {
          this.$notify({
            group: "global",
            text: "Error en el servidor por favor notificar le problema",
          });
          this.isView = false;
        });
      }
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 1300,
        position : 'top-center',
        icon: "check-circle",
        theme: "toasted-primary",
        action : {
          text : 'CERRAR',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
        }
      });
    },
  },
  created() {
      this.getData();
  },
  validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    'model.nota'(value) {
      return this.$validator
        .value(value)
        .required()
        .between(1,10)
        .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
    },
    
},
};

</script>