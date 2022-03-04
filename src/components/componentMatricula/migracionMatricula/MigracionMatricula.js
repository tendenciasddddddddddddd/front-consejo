import Spinner from "../../../shared/Spinner.vue";

export default {
    name: 'MigracionMatricula',
    components : {
        Spinner
    },
    props: {
        idGet: {
          type: String,
          required: true
        },
    },
    data() {
        return {
            modals: true,
            ifview: '1',
            mod : this.idGet,
            ifLoad: false,
        }
    },
    methods: {
        cloneData() { 
            this.ifLoad = true;
            this.$proxies._migracionProxi
              .create(this.mod)
              .then(() => {
                this.ifview = '2';
                this.ifLoad = false;
                this.toast('La base de datos fue migrada')
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
        },
        removeData(){
            this.ifLoad = true;
            this.$proxies._migracionProxi
              .remove(this.mod)
              .then(() => {
                this.ifLoad = false;
                this.toast('La base de datos esta limpia en esta modalidad')
                this.$emit('myEventClosedModalMigracion1');
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
        },
        toast(message) {
            this.$toasted.info(message, {
              duration: 2300,
              position : 'bottom-center',
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
   
}