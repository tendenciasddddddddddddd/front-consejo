<template>
  <div class="row fondoazul">
    <div class="col-lg-11 col-12 mx-auto">
     
          <div>
          <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark fuente" style="margin:7px; ">
               <i class="ni ni-bell-55"></i> &nbsp; <strong>Nota:</strong> Puede registrar zonas, nacionalidades y etnias
              </p>
            </div>
          </div>
        </div>
       
        <div class="text-center mt-5">
        <span class="fuente h3 " style="font-weight: 400;"
          >Zonas para complementar el registro de usuarios</span
        >
      </div>
       <div class="row">
        <section class="flex-containes mt-4">
          <div class="">
            <router-link to="/List-Provincias" href="javascript:;">
              <div
                class="cajas foco2 borde1 text-center"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-60"
                  src="../../../assets/img/logs/map.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Provincias</p>
                <p class="parrafo cardSubTitle">
                 Registrar los datos segun requiera 👆
                </p>
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link to="/List-Canton" href="javascript:;">
              <div
                class="cajas foco2 borde2 text-center"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-60"
                  src="../../../assets/img/logs/map.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Cantónes</p>
                <p class="parrafo cardSubTitle">
                 Registrar los datos segun requiera 👆
                </p>
              </div>
            </router-link>
          </div>
          <div class="">
            <div
              class="cajas foco2 borde3 text-center"
              style="max-width: 200px;"
            >
              <router-link to="/List-Parroquia">
                <img
                  class="w-65"
                  src="../../../assets/img/usados/zonas.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Parroquia</p>
                <p class="parrafo cardSubTitle">
                  Registrar los datos segun requiera 👆
                </p>
              </router-link>
            </div>
          </div>
          <div>
            <div
              class="cajas foco2 borde4 text-center"
              style="max-width: 200px;"
            >
              <router-link to="/List-Nacionalidad">
                <img
                  class="w-50"
                  src="../../../assets/img/logs/bot-avatar.webp"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Nacionalidad</p>
                <p class="parrafo cardSubTitle">
                  Registrar los datos segun requiera 👆
                </p>
              </router-link>
            </div>
          </div>
          <div>
            <div
              class="cajas foco2 borde1 text-center"
              style="max-width: 200px;"
            >
              <router-link to="/List-Etnias">
                <img
                  class="w-55"
                  src="../../../assets/img/logs/grupo.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Etnia</p>
                <p class="parrafo cardSubTitle">
                  Registrar los datos segun requiera 👆
                </p>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    
    </div>
  </div>
</template>

<script>
import RestResource from '../../../service/isAdmin'
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

