<template>
  <div class="row ">
    <div class="col-lg-11 col-12 mx-auto">
     
           <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="parrafo" style="margin:7px; ">
               <i class="ni ni-bell-55"></i> &nbsp; <strong>Nota:</strong> Asignar cursos y  paralelos con docentes y materias para las dos modalidades..👌
              </p>
            </div>
          </div>
         <div class="text-center mt-6">
        <span class="fuente h3 " style="font-weight: 400;"
          >Distributivo de las dos modalidades</span
        >
      </div>
       <Analitic v-if="isPeriodo"></Analitic>
       <div v-else class="row">
        <section class="flex-containes mt-4">
          <div class="">
            <router-link :to="`/Distributivo-v1/${idperiodoActualIntensivo}`" href="javascript:;">
              <div
                class="cajas foco2 borde1 text-center"
                style="max-width: 200px;margin-right: 23px!important;"
              >
                <img
                  class="w-70"
                  src="../../assets/img/logs/crm.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Intensivo</p>
                <p class="parrafo">
                  Vincular a los docentes con sus materias 👆
                </p>
                
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link :to="`/Distributivo-v2/${idperiodoActualExtra}`" href="javascript:;">
              <div
                class="cajas foco2 borde2 text-center"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-40"
                  src="../../assets/img/logs/segmented-lists.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Extraordinaria</p>
                <p class="parrafo">
                 Vincular a los docentes con sus materias 👆
                </p>
               
              </div>
            </router-link>
          </div>
         
          
        </section>
      </div>
      
    </div>
  </div>
</template>

<script>
import Analitic from "../../shared/Analitic";
import RestResource from '../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "MenuZonas",
  components: {
    Analitic,
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      info: null,
      isPeriodo: false,
      idperiodoActualIntensivo: null,
      idperiodoActualExtra: null,
    };
  },
  methods: {
    __getperiodo() {
      this.isPeriodo = true;
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          const filtro = x.data.niveles;
          if (!filtro.length) {
            alert("ANTES DE ENTRAR AQUI HAY QUE CREAR UN PERIODO ACADEMICO PARA CADA MODALIDAD !!");
          }
          else{
              let listPeriodoIntensivo = filtro.filter(
            (x) => x.typo == "Intensivo" && x.estado == "1"
          );
          this.idperiodoActualIntensivo = listPeriodoIntensivo[0]._id;

          let listPeriodoExtra = filtro.filter(
            (x) => x.typo == "Extraordinaria" && x.estado == "1"
          );
          this.idperiodoActualExtra = listPeriodoExtra[0]._id;
         
          this.isPeriodo = false;
          }
        
        })
        .catch((err) => {
          console.log("Error", err);
          this.isPeriodo = false;
        });
    },
    verificarUsuario(){
       if(!restResourceService.admin(this.roles)){
         this.$router.push("/");
       }
     }
  },
  mounted() {
    this.verificarUsuario();
    this.__getperiodo();
  },
};
</script>
<style>
.mole {
  background-color: white;
  transition: background-color 0.5s;
}

.mole:hover {
  background-color: #f5f5f5;
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.bd-example {
  position: relative;
  padding: 2rem;
  border: 3px solid #eee;
}
</style>
