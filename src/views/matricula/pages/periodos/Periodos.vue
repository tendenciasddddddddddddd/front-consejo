<template>
  <section>
    <ScrimModal @close="close">
      <template v-slot:header> Automatización de matrículas</template>
      <template v-slot:body>
        <div>
      <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets"
        @desactiveState="desactiveState" />
      <Spinner v-if="isLoading"></Spinner>
      <div v-else class="table-responsive mt-1">
        <table class="dataTable-table table s-table-flush">
          <thead class="thead-light">
            <tr class="cabeza">
              <th style="background-color: rgb(234, 240, 246); ">
                <div class="d-flex ms-3">
                  <div v-if="!allSelected " class="form-check " style="min-height: 0rem;">
                    <input class="form-check-input cheka" type="checkbox" @click="selectAll" />
                  </div>
                  <i @click="deletedSelected" v-else class="fa fa-minus s-icon-all" aria-hidden="true"></i>
                  <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                    Periodo
                  </span>
                </div>
  
              </th>
              <th class="text-uppercase text-center text-xxs font-weight-bolder">
                Fecha modicado
              </th>
  
              <th class="text-uppercase text-center text-xxs font-weight-bolder">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in info" :key="item.id">
              <td>
                <div class="d-flex ms-3">
                  <div class="form-check supcheka my-auto">
                    <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                      @click="selectUser(item._id)" />
                  </div>
                  <a class="mb-0 ms-3 text-sm colorestabla fuente">
                    {{ item.nombre }}
                  </a>
                </div>
              </td>
              <td class="text-sm text-center text-dark fuente">
                {{ item.updatedAt }}
              </td>
              <td class="text-sm text-center font-weight-normal">
                <span class="icon">
                   <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                  <i v-else class="fa fa-times"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <Paginate2 :numPages="paginas" :page="pagina" :total="totalNotas" :subtitulo="subtitulo"
          @pagechanged="onPageChange"></Paginate2>
      </div>
      <Modal v-show="visible" @close="closet">
        <template v-slot:header> Periodo escolar</template>
        <template v-slot:body>
          <Spinner v-if="isCarga"></Spinner>
          <form @submit.prevent="save" role="form" id="prov">
            <div v-if="MsmError!=''" class="is-error">
              <span class="text-sm negros gordo">{{ MsmError }}</span>
            </div>
            <span class="parrafo mb-2">Nombre de Periodo</span>
            <CustomInput v-model="model.nombre" />
            <p class="mb-2 text-xs fuente text-danger">
              {{ validation.firstError("model.nombre") }}
            </p>
          </form>
        </template>
        <template v-slot:acccion>
          <ButtonLoading v-if="ifLoad" />
          <button form="prov" v-else type="submit" class="btn btnNaranja mt-2">
            {{ model._id ? "Actualizar periodo" : "Guardar periodo" }}
          </button>
        </template>
      </Modal>
    </div>
      </template>
    </ScrimModal>
  </section>

</template>
<script >
import ScrimModal from "../../../../shared/ScrimModal.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
import Spinner from "../../../../shared/Spinner";
import CustomInput from "../../../../shared/CustomInput.vue";
import Paginate2 from "../../../../shared/Paginate2.vue";
import ActionsRow from "../../../../shared/ActionsRow.vue";
export default {
  name: 'MigracionMatricula',
  components: {
    ScrimModal, 
    Spinner,
    CustomInput,
    ButtonLoading,
    Paginate2,ActionsRow,
    Modal: () =>
      import(/* webpackChunkName: "Modal" */ "../../../../shared/Modal.vue"),
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      totalNotas: 0,
      paginaActual: 1,
      info: null,
      ifLoad: false,
      checked: "",
      pagg: null,
      pagina: 0,
      paginas: 0,
      isLoading: false,
      model: {
        _id: null,
        nombre: null,
      },
      isSelecUsers: [],
      subtitulo: "none",
      iseliminaddo: false,
      isCarga: false,
      visible: false,
      allSelected : false,
      MsmError : "",
    }
  },
  watch: {
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.getAll(pagina, 10);
        this.isSelecUsers = [];
        this.paginaActual = pagina;
      },
    },
  },
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    "model.nombre"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(3)
        .maxLength(40);
    },
  },
  methods: {
    close() {
      this.$emit('myEventClosedModalMigracion1')
    },
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = lim + " filas por página";
      this.$proxies._matriculaProxi
        .getAll(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.info = x.data.niveles;
          this.pagg = x.data;
          this.pagina = this.pagg.pagina;
          this.paginas = this.pagg.paginas;
          this.totalNotas = this.pagg.total;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  
    save() {
      this.isSelecUsers = [];
      this.$validate().then((success) => {
        if (!success) {
          this.toast("Por favor llena correctamente los campos solicitados");
          return;
        }
        if (this.model._id) {
          this.ifLoad = true;
          this.model.nombre = this.model.nombre.trim();
          this.$proxies._matriculaProxi
            .update(this.model._id, this.model)
            .then(() => {
              this.closet();
              this.ifLoad = false;
              this.getAll(this.pagina, 10);
              this.MsmError ="";
            })
            .catch((error) => {
              this.ifLoad = false;
              if(error.response){
                if(error.response.status==500){
                  this.MsmError = "Error ese registro ya existe"
                }
              }
            });
        } else {
          this.ifLoad = true;
          this.model.nombre = this.model.nombre.trim();
          this.$proxies._matriculaProxi
            .create(this.model) 
            .then(() => {
              this.ifLoad = false;
              this.closet();
              this.getAll(this.pagina, 10);
            })
            .catch((error) => {
              this.ifLoad = false;
              if(error.response){
                if(error.response.status==500){
                  this.MsmError = "Error ese registro ya existe"
                }
              }
            });
        }
      });
    },
    gets() {
      let isArray = this.isSelecUsers.length;
      if (isArray === 1) {
        this.isCarga = true;
        this.openModal();
        this.$proxies._matriculaProxi
          .get(this.isSelecUsers[0])
          .then((x) => {
            this.model = x.data;
            this.isCarga = false;
          })
          .catch(() => {
            this.isCarga = false;
          });
      }
    },

    selectUser(ids) {
      if (!this.isSelecUsers.includes(ids)) {
        this.isSelecUsers.push(ids);
      } else {
        this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
      }
    },
    selectAll: function() {
      this.allSelected= true;
      this.isSelecUsers = [];
      if (this.allSelected) {
        for (let user in this.info) {
          this.isSelecUsers.push(this.info[user]._id);
        }
      } 
    },
    deletedSelected: function() {
      this.allSelected= false;
      this.isSelecUsers = [];
    },
    changedQuery(num) {
      this.getAll(1, num);
    },
    onPageChange(page) {
      this.getAll(page, 10);
    },
    remove() {
      let message = {
        title: "¿Destruir registro?",
        body: " Esta acción no se puede deshacer",
      };
      let options = {
        loader: true,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.dialogDelete();
          setTimeout(() => {
            dialog.close();
            this.toast("Se elimino registro de sistema con su cuenta");
          }, 600);
        })
        .catch(function() {});
    },
    dialogDelete() {
      this.iseliminaddo = true;
      if (this.isSelecUsers.length > 0) {
        this.$proxies._matriculaProxi
          .remove(this.isSelecUsers)
          .then(() => {
            this.iseliminaddo = false;
            this.isSelecUsers = [];
            this.getAll(this.pagina, 6);
          })
          .catch(() => {
            this.iseliminaddo = false;
          });
      }
    },
    desactiveState(){//activateNivel
      let message = {
        title: "¿Cambiar el estado?",
        body: " Esta acción cambiara el estado de los registros",
      };
      let options = {
        loader: true,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.dialogState();
          setTimeout(() => {
            dialog.close();
            this.toast("Se cambio el estado del registro");
          }, 600);
        })
        .catch(function() {});
    },
    dialogState() {
      if (this.isSelecUsers.length > 0) {
        let reg = this.info.filter((x)=> x._id == this.isSelecUsers[0]);
        let state = reg[0].estado == 1 ? 0 : 1;
        this.$proxies._matriculaProxi
         .activatePeriodo(this.isSelecUsers, state)
          .then(() => {
            this.iseliminaddo = false;
           this.isSelecUsers = [];
            this.getAll(this.pagina, 6);
          })
           .catch(() => {
            this.iseliminaddo = false;
           });
      }
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
        position: "top-center",
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: "CERRAR",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
    openModal() {
      this.visible = true;
      this.model._id = "";
      this.model.nombre = "";
      this.MsmError = "";
      this.checked = "";
    },
    closet() {
      this.visible = false;
    },
   
  },

}
</script>
