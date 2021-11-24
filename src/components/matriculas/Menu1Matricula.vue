<template>
  <div class="row ">
    <div class="col-lg-9 col-12 mx-auto">
      <div class="row">
           <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark fuente" style="margin:7px; ">
               <i class="ni ni-bell-55"></i> &nbsp; <strong>Nota:</strong> Ingrese matricula por cada modalidad que
                ofrece la institución... 👌
              </p>
            </div>
          </div>
        <div class="col-sm-12">
          <h3 class="mt-4 fuente" style="font-weight: 400;">
            Opciones de Matricula
          </h3>
          <hr>
        </div>
      </div>
     
      <div class="row  ">

        <div class="col-md-3 col-12">
          <br />
          <div class="card card-plain text-center ">
            <div class="card-body foco2">
              <router-link to="/Matricula-1">
                <img
                  class="w-70"
                  src="../../assets/img/usados/nombre.png"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Intensivo</p>
                <p class="parrafo">
                  Ingrese la matricula de este periodo académico 👆
                </p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12">
          <br />
          <div class="card card-plain text-center ">
            <div class="card-body foco2">
              <router-link to="/Matricula-2">
                <img
                  class="w-70"
                  src="../../assets/img/usados/nombre.png"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Extraordinaria</p>
                <p class="parrafo">
                  Ingrese la matricula de este periodo académico 👆
                </p>
              </router-link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import RestResource from '../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "Menu1Matricula",
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
