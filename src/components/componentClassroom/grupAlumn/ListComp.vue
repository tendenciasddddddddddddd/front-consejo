<template>
  <div>
    <ActionRowUser :longitude="isSelecUsers.length" @changeSearch="changeSearchs" @examDetail="examDetail"
      @gets="editTask" @openModal="openModal" @getDataAlls="getDataAll" /> 
    <div class="mt-2" v-if="displayedArticles.length">
      <Items v-for="(item, index) in displayedArticles" :key="item.id" :item="item" :index="index" @nextPage="openModal"
        @selectOne="selectOne" />
      <Paginate :numPages="numPages" :page="page" :total="object.length" @pagechanged="onPageChange"></Paginate>

    </div>
    <NoFound v-else />

    <div v-if="iftask">
      <UpTrask :collects="collectionsEdit" @EventClose="closed" @getData="getDataAll" />
    </div>
  </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
import ActionRowUser from "../../../shared/ActionRowUser.vue";
import Paginate from "../../../shared/Paginate"
import Items from "../../../shared/Items"
export default {
  name: 'ListComp',
  props: {
    object: Array
  },
  components: {
    NoFound, ActionRowUser, Paginate, Items,
    UpTrask: () => import( /* webpackChunkName: "UpTrask" */ "./UpTrask.vue"),
  },
  data() {
    return {
      usuario: this.$store.state.user.id,
      collections: [],
      userIds: [],
      iftask: false,
      isSelecUsers: [],
      collectionsEdit: {},
      allSelected: false,
      searchQuery: '',
      //Pagina 
      page: 1,
      perPage: 4,
      pages: [],
      numPages: null,
      tarea_atrazada: false,
    }
  },
  computed: {
    displayedArticles: function () {
      if (this.searchQuery.length > 1) {
        return this.collections.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.nombre.toLowerCase().includes(v));
        });
      } else {
        return this.paginate(this.collections);
      }

    }
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length / this.perPage);
      return articles.slice(from, to);
    },
    onPageChange(page) {
      this.page = page;
    },
    changeSearchs(value) {
      this.searchQuery = value;
    },
    openModal: function (obj) {
      let array = this.object.filter((x) => x._id == obj)
      this.collectionsEdit = array[0]
      this.iftask = true
    },
    closed: function () {
      this.iftask = false
    },
    examDetail() { },
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
        let array = this.object.filter((x) => x._id == this.isSelecUsers[0])
        this.collectionsEdit = array[0]
        this.iftask = true
      }
    },
    vueInit() {
      this.collections = [];
      
      for (let i = 0; i < this.object.length; i++) {
        let nota = ''; let estado = false;
        let array = this.object[i].entrega;
        for (let j = 0; j < array.length; j++) {
          if (array[j].idUser == this.usuario) {
            estado = true;
            nota = array[j].nota;
            break;
          }
        }
        this.collections.push({
          _id: this.object[i]._id,
          nombre: this.object[i].nombre,
          fecha: this.object[i].fechad,
          nota: nota,
          estado: estado
        })
      } 
    }
  },
  created() {
    this.vueInit()
  }
}
</script>