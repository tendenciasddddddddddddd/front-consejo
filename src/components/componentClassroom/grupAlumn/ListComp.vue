<template>
  <div>

    <ActionsTrask :isRoles="0" :allSelecteds="allSelected" :longitude="isSelecUsers.length" @changeSearch="changeSearchs" @getDataAlls="getDataAll" @deletedSelected="deletedSelect"  @gets="editTask" @openModal="openModal" @selectAll="selectAlls"/>
    <div v-if="displayedArticles.length">
      <div class=" liTask mt-1" v-for="(item, index) in displayedArticles" :key="item.id">
        <div class="d-flex cajasTask fadeIn1 animate__animated animate__fadeInUp " :class="[`animations-${index}`]">
          
            <div class="d-flex py-1">
              <div class="form-check my-auto">
                <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                  @click="selectOne(item._id)" />
              </div>

              <div @click="openModal(item)" class="d-flex flex-column justify-content-center ms-3">
                <h6 class="mb-0 text-sm negros" style="color: #007dbc;">
                  {{ item.nombre }}
                </h6>
                <div class="text-sm colorestabla fuente">
                  <div v-if="item.estado">
                    <span style="background-color: rgb(0, 189, 165);" class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                    Tarea Entregada
                  </div>
                  <div v-else>
                    <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                    Pendiente Entrega
                  </div>
                </div>
              </div>
              <div class="mt-3 ms-5">
                <span v-if="item.nota!=''" class="text-xs "> Nota {{item.nota}}</span>
                <span v-else class="text-xs "><del>Sin calificar</del></span>
              </div>
            </div>
          <div class="dropstart ms-auto">
            <div class="d-flex  mt-2">
              <TimeEgo :fecha="item.fechad" />
              <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->
            </div>
          </div>
        </div>
      </div>
       <Paginate :numPages="numPages"  :page="page" :total="object.length" @pagechanged="onPageChange"></Paginate>
     
    </div>
    <NoFound v-else />
    <div v-if="iftask">
      <UpTrask :collects="collectionsEdit" @EventClose="closed" @getData="getDataAll" />
    </div>
  </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
import ActionsTrask from "../../../shared/ActionsTrask.vue";
import TimeEgo from "../../../shared/TimeEgo";
import Paginate from "../../../shared/Paginate"
export default {
  name: 'ListComp',
  props: {
    object: Array
  },
  components: {
    NoFound, ActionsTrask, TimeEgo,Paginate,
    UpTrask: () => import( /* webpackChunkName: "UpTrask" */ "./UpTrask.vue"),
  },
  data() {
    return {
      userIds: [],
      iftask: false,
      isSelecUsers: [],
      collectionsEdit: {},
      allSelected : false,
      searchQuery: '',
        //Pagina 
       page: 1,
       perPage: 4,
       pages: [],
       numPages:null,
       tarea_atrazada: false,
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
  onPageChange(page) {
      this.page = page;
    },
    changeSearchs(value){
      this.searchQuery = value;
    },
    openModal: function (obj) {
       if (obj.nota!='') {
        this.$dialog.alert('Esta tarea ya se encuentra calificada')
      } else {
        this.collectionsEdit = {
          id: obj._id,
          title : obj.nombre,
          descrition : obj.descripcion,
          recursos : obj.archivo,
          datetimes : obj.finicio,
          link : obj.link,
          id2 : obj.id2,
        }
        this.iftask = true;
      }
    },
    closed: function () {
      this.iftask = false
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
            this.collectionsEdit = {
             id: this.object[index]._id,
             title : this.object[index].nombre,
             descrition : this.object[index].descripcion,
             recursos : this.object[index].archivo,
             datetimes : this.object[index].finicio,
             link : this.object[index].link,
           }
          }
        }
        this.iftask = true; //ABRIR MIDAL
      }
    },
  }
}
</script>