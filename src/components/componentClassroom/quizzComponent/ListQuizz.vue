<template>
  <div>
    <ActionRowDocente :allSelecteds="allSelected" :longitude="isSelecUsers.length" @changeSearch="changeSearchs" @deletedSelected="deletedSelect" @remove="remove" @gets="editTask" @openModal="openModal" @selectAll="selectAlls"/>
     <div v-if="displayedArticles.length">
      <div class=" liTask" v-for="(item, index) in displayedArticles" :key="item.id">
        <div class="d-flex cajasTask fadeIn1 animate__animated animate__fadeInUp " :class="[`animations-${index}`]">
            <div class="d-flex py-1">
              <div class="form-check my-auto">
                <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                  @click="selectOne(item._id)" />
              </div>

              <div @click="openChildRewiewTrask(item)" class="d-flex flex-column justify-content-center ms-3">
                <h6 class="mb-0 text-sm negros" style="color: #007dbc;">
                  {{ item.nombre }}
                </h6>
                <div class="text-sm colorestabla fuente">
                  <div >
                    <span style="background-color: rgb(0, 189, 165);" class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                    Tarea Revisada
                  </div>
                 
                </div>
              </div>
              <div class="mt-3 ms-5"><span class="text-xs ">{{ item.surveys.length }} entregas</span></div>
            </div>
          <div class="dropstart ms-auto">
            <div class="d-flex  mt-2">
              <TimeEgo :fecha="item.createQuizz" />
              <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->
            </div>
          </div>
        </div>
      </div>
       <Paginate :numPages="numPages"  :page="page" :total="object.length" @pagechanged="onPageChange"></Paginate>
    </div>
    <NoFound v-else/>
     <div v-if="isQuestion">
      <CreateQuestion :collects="collestQuizz" @EventClose="closed" @getData="getDataAll" />
    </div>
     <div v-if="isQuizz">
      <CreateQuizz :id="idQuizz"  @EventClose="closed"  @getData="getDataAll"/>
    </div>
  </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
import TimeEgo from "../../../shared/TimeEgo";
import Paginate from "../../../shared/Paginate"
import ActionRowDocente from "../../../shared/ActionRowDocente.vue";
export default {
  name: 'ListQuizz',
  props: {
    object: Array,
    objectUser : Array,
  },
  components: {
    NoFound, ActionRowDocente, TimeEgo,Paginate,
    CreateQuizz: () => import( /* webpackChunkName: "CreateQuizz" */ "./CreateQuizz.vue"),
    CreateQuestion: () => import( /* webpackChunkName: "CreateQuestion" */ "./CreateQuestion.vue"),
  },
  data() {
    return {
      userIds: [],
      isQuizz: false,
      isQuestion: false,
      isSelecUsers: [],
      allSelected : false,
      collestQuizz: [],
       //Pagina 
       page: 1,
       perPage: 4,
       pages: [],
       numPages:0,
       searchQuery: '',
       idQuizz: '',
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
    vueInit(){
      if (this.object.length > 0) {
        for (var i = 0; i < this.object.length; i++) {
           console.log('es',this.object[i])
           if (this.object[i].surveys.length === 0) {
            this.idQuizz = this.object[i]._id;
            console.log(this.idQuizz)
            this.openCuestions()
           }
        }
        
      }
    },
    openModal: function () {
      this.collestQuizz = {}
      this.isQuestion= true;
    },
    closed: function () {
      this.isQuestion = false
    },
    openCuestions: function (){
      this.isQuizz= true;
    },
    closeCuestions: function (){
       this.isQuizz= false;
    },
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length/this.perPage);
      return articles.slice(from, to);
  },
  onPageChange(page) {
      this.page = page;
    },
    remove() {
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
          .removeQuizz(this.$route.params.id, this.isSelecUsers)
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
            this.collestQuizz = this.object[index]
          }
        }
        this.isQuestion = true; 
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
  },
  created (){
    this.vueInit();
  }
}
</script>
