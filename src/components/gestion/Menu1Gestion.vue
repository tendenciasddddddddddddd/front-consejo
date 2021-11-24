<template>
  <div class="row ">
    <div class="col-lg-11 col-12 mx-auto">
     
           <div class="">
          <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark fuente" style="margin:7px; ">
               <i class="ni ni-bell-55"></i> &nbsp; <strong>Nota:</strong> Puede registrar cursos y sus
                asignaturas para los intensivos y los extraordinarios.. 👌
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-6">
        <span class="fuente h3 " style="font-weight: 400;"
          >Gestión de cursos</span
        >
      </div>
      <div class="row">
        <section class="flex-containes mt-4">
          <div class="">
            <router-link to="/Nivel" href="javascript:;">
              <div
                class="cajas foco2 borde1 text-center"
                style="max-width: 200px;margin-right: 23px!important;"
              >
                <img
                  class="w-55"
                  src="../../assets/img/logs/general.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Cursos</p>
                <p class="parrafo cardSubTitle">
                  Crear cursos para las dos modalidades I y M 👆
                </p>
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link to="/materias" href="javascript:;">
              <div
                class="cajas foco2 borde2 text-center"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-70"
                  src="../../assets/img/logs/training-crm.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Materias</p>
                <p class="parrafo cardSubTitle">
                 Crear materias para las dos modalidades I y M 👆
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
import RestResource from '../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "MenuZonas",
   data() {
    return {
      roles: this.$store.state.user.roles,
    }
  },
  methods: {
     verificarUsuario(){
       if(!restResourceService.admin(this.roles)){
         this.$router.push("/");
       }
     }
  },
  created() {
    this.verificarUsuario();
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
