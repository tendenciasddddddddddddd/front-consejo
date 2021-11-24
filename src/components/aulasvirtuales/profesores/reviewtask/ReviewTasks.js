import Spinner from "../../../../shared/Spinner";
export default {
  name: "AulaCreate",
  components: {
    Spinner,
  },
  data() {
    return {
      tab: "openIA",
      user: this.$store.state.user,
      info: [],
      isData: false,
      idAula : '',
      idtask : '',
      meTask : [],
      isSelecTask : [],
    };
  },
  methods: {
    getData() {
      this.isData = true;
      if (this.$route.params.id) {
        let params = this.$route.params.id;
        const arrayId = params.split(",");
        this.idAula = arrayId['0'];
        this.idtask = arrayId['1'];
        this.$proxies._aulaProxi
          .get(this.idAula)
          .then((x) => {
            this.info = x.data;
            let task = this.info.task.filter((x) => x._id == this.idtask);
            if (task) {
                this.meTask = task
            }
            this.isData = false;
            console.log(this.meTask);
          })
          .catch(() => {
            alert("Error de documento");
            this.isData = false;
          });
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
  },
  created() {
      this.getData();
  },
};
