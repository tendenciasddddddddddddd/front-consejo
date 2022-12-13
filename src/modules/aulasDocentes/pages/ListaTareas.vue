<template>
    <div >
      <ActionRowDocente :allSelecteds="allSelected" :longitude="isSelecUsers.length" @changeSearch="changeSearchs" @getDataAlls="getDataAll" @deletedSelected="deletedSelect" @remove="remove" @gets="editTask" @openModal="openModal" @selectAll="selectAlls"/>
      <div class="row" v-if="displayedArticles.length">
          <div class="col-sm-6 liTask" v-for="(item, index) in displayedArticles" :key="item.id">
            <div class="d-flex cajasTask fadeIn1 animate__animated animate__fadeInUp " :class="[`animations-${index}`]">
              <div class="d-flex py-1">
                <div class="form-check my-auto">
                  <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                    @click="selectOne(item._id)" />
                </div>
  
                <div @click="openChildRewiewTrask(item)" class="d-flex flex-column justify-content-center ms-3 ">
                  <h6 class="mb-0 text-sm negros gordo" >
                   {{ item.nombre }}
                  </h6>
                  <div class="text-xs negros">
                    <div >
                      <span style="background-color: rgb(0, 189, 165);"
                                          class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                      {{ item.entrega.length }} entregas
                    </div>
                  </div>
                </div>
                <div class="mt-3" style="margin-left: 30px;"><span class="text-sm negros">
                  <TimeEgo :fecha="item.fechad" class="ms-6"/>
                </span></div>
              </div>
            <div   v-if="!$store.state.isAppMobile" class="dropstart ms-auto">
              <div class="d-flex ">
                <button @click="migrar(item)" class="btn btnNaranja2 ms-3">Migrar tarea</button>
              </div>
            </div>
          </div>
  
        </div>
         <Paginate :numPages="numPages"  :page="page" :total="object.length" @pagechanged="onPageChange"></Paginate>
       
      </div>
      <NoFound v-else />
      <div v-if="iftask">
        <CrearTarea :collects="collectionsEdit" @EventClose="closed" @getData="getDataAll" />
      </div>
      <div v-if="ifChildRevision">
        <RevisarTarea  :collects="checkTasks" :objectUser="objectUser" @myEventTask="closedChildRewiewTrask" @getData="getDataAll"/>
      </div> 
      <div v-if="ifMigrar">
        <MigrarTarea :detalleTask="detalleTask"  @myEventTask="closedMigrar" @getData="getDataAll"/>
      </div> 
    </div>
  </template>
  
  <script>
  import NoFound from "../../../shared/NoFound"
  import TimeEgo from "../../../shared/TimeEgo";
  import Paginate from "../../../shared/Paginate"
  import ActionRowDocente from "../../../shared/ActionRowDocente.vue";
  export default {
    name: 'ListTask',
    props: {
      object: Array,
      objectUser : Array,
    },
    components: {
      NoFound, TimeEgo,Paginate,ActionRowDocente,
      CrearTarea: () => import( /* webpackChunkName: "CrearTarea" */ "./CrearTarea.vue"),
      RevisarTarea: () => import( /* webpackChunkName: "RevisarTarea" */ "./RevisarTarea.vue"),
      MigrarTarea: () => import( /* webpackChunkName: "MigrarTarea" */ "./MigrarTarea.vue"),
    },
    data() {
      return {
        userIds: [],
        iftask: false,
        isSelecUsers: [],
        collectionsEdit: {
          _id: '',
          nombre: '',
          finicio: '',
          archivo: '',
          descripcion: '',
          entrega: '',
          estado: '',
        },
        checkTasks : [],
        checkUser: [],
        allSelected : false,
        searchQuery: '',
          //Pagina 
         page: 1,
         perPage: 10,
         pages: [],
         numPages:0,
         ifChildRevision: false,
         ifMigrar : false,
         detalleTask : ''
      }
    },
      computed: {
      displayedArticles: function () {
        if (this.searchQuery.length>1) {
          return this.object.filter((item) => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every((v) => item.nombre.toLowerCase().includes(v));
          });
        }else{
          return this.paginate(this.object);
        }
        
      }
    },
    methods: {
       paginate(articles) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        this.numPages = Math.ceil(articles.length/this.perPage);
        return articles.slice(from, to);
    },
    migrar(item){
      this.detalleTask = item;
      this.ifMigrar = true
    },
    onPageChange(page) {
        this.page = page;
      },
    remove() {
      if (this.isSelecUsers.length == 0) return;
        let message = {
          title: "¿Esta seguro que quiere eliminar?",
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
            this.numPages = 1;
            this.page = 1;
            setTimeout(() => {
              dialog.close();
  
            }, 1200);
          })
          .catch(function () {
          });
      },
      dialogDelete() {
        if (this.isSelecUsers.length > 0) {
          this.$proxies._aulaProxi
            .removeTask(this.$route.params.id, this.isSelecUsers)
            .then(() => {
              this.isSelecUsers = [];
              this.allSelected = false;
              this.getDataAll();
              this.toast('Se eliminó  tareas de este curso');
            })
            .catch((x) => {
              console.log("Error server not found", x);
            });
        }
      },
      changeSearchs(value){
        this.searchQuery = value;
      },
      openModal: function () {
        this.iftask = true;
        this.collectionsEdit = {}
      },
      closed: function () {
        this.iftask = false
      },
      closedMigrar: function(){
        this.ifMigrar = false
      },
      openChildRewiewTrask: function(obj){
        this.checkTasks = {
          descripcion: obj.descripcion,
          entrega: obj.entrega,
          estado: obj.estado,
          nombre: obj.nombre,
          archivo : obj.archivo,
          _id : obj._id
        }
        this.ifChildRevision = true;
      },
      closedChildRewiewTrask: function(){
        this.ifChildRevision = false;
      },
      getDataAll() {
        this.$emit('getDataTask');
      },
      selectOne(ids) {
        if (!this.isSelecUsers.includes(ids)) {
          this.isSelecUsers.push(ids);
        } else {
          this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
        }
      },
      selectAlls: function () {
        this.allSelected = true;
        this.isSelecUsers = [];
        if (this.allSelected) {
          for (let user in this.object) {
            this.isSelecUsers.push(this.object[user]._id);
          }
        }
      },
      deletedSelect: function () {
        this.allSelected = false;
        this.isSelecUsers = [];
      },
      editTask() {
        if (this.isSelecUsers.length == 1) {
          for (let index = 0; index < this.object.length; index++) {
            if (this.object[index]._id == this.isSelecUsers[0]) {
              this.collectionsEdit = this.object[index]
            }
          }
          this.iftask = true; //ABRIR MIDAL
        }
      },
      toast(message) {
        this.$toasted.info(message, {
          duration: 2100,
          position: 'top-center',
          icon: "check-circle",
          theme: "toasted-primary",
          action: {
            text: 'CERRAR',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      },
    }
  }
  </script>
  