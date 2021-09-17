import Navss from '../../../shared/Navss'
import Skeleton from '../../../shared/Skeleton'
export default {
  name: "CreaUsuario",
  components: {
    Navss,Skeleton
  },
  data() {
    return {
      tab: "init",
      info: null,
      listRol:null,
      isLoading: false,  ifLoad:false,
      checked:"",
      isRol:"",
      model: {//-----------VARIABLES DEL MODELO A GUARDAR
        _id: null, username: null,  email: null,
        password: null, nombres: null, apellidos: null,
        cedula: null, foto: 'profile.jpg', typo: 'ADMS',
        status: null, telefono: null,
        updatedAt:null, role:null,fullname : null,
     },
     isedit : false,
     rutass: [
      {
        id: "0",
        nombre: "Home",
        url:"/",
      },
      {
        id: "1",
        nombre: "Lista Usuarios",
        url:"/usuarios/Usuario",
      },
    ],
    };
  },
  methods: {
    get (){//-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
          if(this.$route.params.id){
            this.isedit = true;
            this.$proxies._usuarioProxi.get(this.$route.params.id)
            .then((x) => {
                this.model = x.data;
                this.isRol = x.data.roles[0]
                this.checked= this.isRol
                this.isedit= false;
            }).catch(() => {
                console.log("Error")
                this.isedit= false;
            });
          }
    },
    save() {//-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
        this.$validate().then(success => { //METODO PARA GUARDAR 
          if (!success){ 
            this.$notify({
                group: "global",
                text: "Por favor llena correctamente los campos solicitados",
              });
              return
            }
          if (this.model._id) { //-----------SI EL ID TIENE VALOR ENTONCES ES EDITAR
            this.ifLoad = true;
            this.model.role = this.checked;
            this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
            this.$proxies._usuarioProxi.update(this.model._id, this.model)//-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                //this.router.go('/usuarios/Usuario')
                this.$router.push('/usuarios/Usuario')
              })
              .catch((err) => {
                console.log("Error",err)
                this.ifLoad = false;
              });
          } else {  //-----------DE LO CONTRARIO ENTRA A SER UN DOCUMENTO NUEVO
            this.ifLoad = true;
            this.model.username = this.model.cedula;
            this.model.password =this.__getPasswods(this.model.apellidos,this.model.cedula);
            this.model.role = this.checked;
            this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
            if(this.model.status==true){
              this.model.status=1
            }else{
              this.model.status =0
            }
            this.$proxies._usuarioProxi.create(this.model) //-----------GUARDAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.$router.push('/usuarios/Usuario')
              })
              .catch((error) => {//-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
                this.ifLoad = false;
                if(error.response){
                  if(error.response.status==400){
                    this.$notify({
                      group: "global",
                      text: error.response.data.message,
                    });
                  }
                }
                else if(error.request){
                  alert("duplicado 2")
                }else{
                  console.log('Error', error.message); 
                }
              }); 
          }
        });
      },
      __listRol(){//-----------TRAE LA LISTA DE LOS ROLES 
        this.$proxies._usuarioProxi.getRoles()
        .then((x) => {
          this.listRol = x.data;
        })
        .catch((err) => {
          console.log("Error", err)
        });
      },
      __getPasswods(apell, ced){//-----------CREA LA CONTRASEÑAS PARA LOS USUARIOS EJMPLO {M1004095632}
         let l = apell.toLowerCase().charAt(0);
         let result = l+ced;
         return result;
      }
  },
  mounted() {
    this.get ();
    this.__listRol();
  },
  validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    'model.cedula'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(9)
        .maxLength(50);
    },
    'model.email'(value) {
      return this.$validator
        .value(value)
        .required()
        .email();
    },
    'model.nombres'(value) {
        return this.$validator
          .value(value)
          .required()
          .minLength(5)
          .maxLength(50);
    },
    'model.apellidos'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
  },
  'model.telefono'(value) {
    return this.$validator
      .value(value)
      .required()
      .minLength(9)
      .maxLength(12);
},

  },
};
