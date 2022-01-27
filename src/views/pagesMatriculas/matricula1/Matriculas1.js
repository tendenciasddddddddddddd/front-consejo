import Spinner from "../../../shared/Spinner";
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();

export default {
  name: "Matriculas1",
  components: {
    Spinner,
    CreateMatricula1: () =>
      import(
        /* webpackChunkName: "CreateMatricula1" */ "../../../components/matriculasComp/matricula1/CreateMatricula1.vue"
      ),
    ListRemoveMatricula1: () =>
      import(
        /* webpackChunkName: "ListRemoveMatricula1" */ "../../../components/matriculasComp/matricula1/ListRemoveMatricula1.vue"
      ),
      ParaleloMatricula1: () =>
      import(
        /* webpackChunkName: "EnlistarParalelo" */ "../../../components/matriculasComp/paralelo/paralelov1/EnlistarParalelo.vue"
      ),
  },
  data() {
    return {
      tab: "init",
      roles: this.$store.state.user.roles,
      //CHILD COMPONENT
      ifCreateUpdate: false,
      ifRemoveMatricula: false,
      ifParalelo1: false,
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },

    openChildMatricula: function() {
      this.ifCreateUpdate = true;
    },
    closedChildMatricula: function() {
      this.ifCreateUpdate = false;
    },
    openChildRemoveMa1: function() {
      this.ifRemoveMatricula = true;
    },
    closedChildRemoveMa1: function() {
      this.ifRemoveMatricula = false;
    },
    openChildParalelo1: function() {
      this.ifParalelo1 = true;
    },
    closedChildParalelo1: function() {
      this.ifParalelo1 = false;
    },
  },

  created() {
    this.verificarUsuario();
  },
};
