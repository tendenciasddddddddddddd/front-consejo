<template>
  <div>
    <ActionRowUser :longitude="isSelecUsers.length" @changeSearch="changeSearchs" @examDetail="examDetail"
      @gets="editTask" @openModal="openModal" @getDataAlls="getDataAll" />
    <div v-if="displayedArticles.length">
      <Items v-for="(item, index) in displayedArticles" :key="item.id" :item="item" :index="index" @nextPage="openModal"
        @selectOne="selectOne"  />
      <Paginate :numPages="numPages" :page="page" :total="object.length" @pagechanged="onPageChange"></Paginate>
    </div>
    <NoFound v-else />
    <div v-if="isAnswer">
      <AnswerQuizz :isSelecUser="isSelecUsers" :itemQuizz="itemQuizz" @EventClose="closed" @getData="getDataAll" :idQuizzSend="idQuizzSend"/>
    </div>
  </div>
</template>

<script lang="js">
import NoFound from "../../../shared/NoFound"
import ActionRowUser from "../../../shared/ActionRowUser.vue";
import Paginate from "../../../shared/Paginate"
import Items from "../../../shared/Items"
import serviceTask from '../grupDocente/ServiceTASK'
const ResultServiceTask = new serviceTask()
export default {
  name: 'ListQuizz',
  props: {
    object: Array,
  },
  components: {
    NoFound, ActionRowUser, Paginate, Items,
    AnswerQuizz: () => import( /* webpackChunkName: "AnswerQuizz" */ "./AnswerQuizz.vue"),

  },
  data() {
    return {
      usuario: this.$store.state.user.id,
      userIds: [],
      isAnswer: false,
      isSelecUsers: [],
      allSelected: false,
      collections: [],
      collestQuizz: [],
      myAnswer: [],
      //Pagina 
      page: 1,
      perPage: 4,
      pages: [],
      numPages: 0,
      searchQuery: '',
      idQuizz: '',
      itemQuizz: {},
      idQuizzSend : ''
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
    openModal: function (item) {
      let array = this.object.filter((x) => x._id == item)
      if (array.length > 0) {
        if (array[0].security=='') {
          this.clickComnitnue(array[0]);
        } else {
          this.$dialog
        .prompt(
          {
            title: "Llenar cuestionario",
            body: `Esta evaluación tiene [${array[0].intenAllowed} intentos] permitidos,
             [${array[0].time} minutos] para completar y se encuentra activa desde ${ResultServiceTask.resolveDate(array[0].startDate)}
            hasta ${ResultServiceTask.resolveDate(array[0].endDate)}`,
          },
          {
            promptHelp: 'Ingrese la clave',
            loader: true,
            okText: "Continuar",
            cancelText: "Cancelar",
          }
        )
        .then((dialog) => {
          let confirmations = this.verificarCalve(array[0].security, dialog.data);
          let confirmationsDate = this.validateIntervalTime(array[0].startDate, array[0].endDate)
          if (confirmations&& confirmationsDate ) {
            this.clickComnitnue(array[0]);
            setTimeout(() => {
              dialog.close();
            }, 200);
          }else{
            this.$dialog.alert('::: La clave no es correcta o el examen no se encuetra en el intervalo de tiempo:::')
            dialog.close();
          }
        })
        .catch(() => {
        });
        }
      }
    },
    clickComnitnue(objects){
     let contador = 0;
     this.idQuizzSend = ''
        if (objects.answers.length > 0) {
          for (let i = 0; i < objects.answers.length; i++) {
            if (objects.answers[i].idUser == this.usuario) {
              contador++
              this.idQuizzSend = objects.answers[i]._id
            }
          }
        }
        if (contador < objects.intenAllowed) {
          this.itemQuizz = objects
          this.isAnswer = true;
        } else {
          this.$dialog.alert(`Esta evaluación tiene [${objects.intenAllowed}] intentos permitidos`);
        }
    },
    validateIntervalTime(dateStart, dateEnd) {
      let fechaActual = new Date().toISOString();
      if ((fechaActual>= dateStart) && (fechaActual <= dateEnd)) {
         return true;
      } else {
        return false;
      }
    },
    verificarCalve(clave1, clave2){
     if (clave1 == clave2) {
       return true
     }else {
       return false
     }
    },
    closed: function () {
      this.isAnswer = false
    },
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
    remove() {
      console.log("remove called2");
    },

    changeSearchs(value) {
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
    deletedSelect: function () {
      this.allSelected = false;
      this.isSelecUsers = [];
    },
    editTask() {
      this.$dialog.alert("No puede editar este examen");
    },
    examDetail() {
      if (this.isSelecUsers.length > 0) {
        let contador = 0;
        for (let i = 0; i < this.object.length; i++) {
          if (this.object[i]._id == this.isSelecUsers[0]) {
            let answer = this.object[i].answers
            for (let j = 0; j < answer.length; j++) {
              if (answer[j].idUser == this.usuario) {
                this.myAnswer.push(answer[j]);
                contador++;
              }
            }
            break;
          }
        }
        if (contador == 0) {
          this.$dialog.alert("Examen sin llenar");
        }
        console.log(this.myAnswer);
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
    vueInit() {
      this.collections = [];
      for (let i = 0; i < this.object.length; i++) {
        let nota = ''; let estado = false;
        let array = this.object[i].answers;
        let longitudArray = this.object[i].surveys.length
        for (let j = 0; j < array.length; j++) {
          if (array[j].idUser == this.usuario) {
            estado = true;
            let calcule = parseFloat(array[j].puntage)
            nota = ((calcule*10)/longitudArray).toFixed(2)
          }
        }
        this.collections.push({
          _id: this.object[i]._id,
          nombre: this.object[i].nombre,
          fecha: this.object[i].createQuizz,
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
