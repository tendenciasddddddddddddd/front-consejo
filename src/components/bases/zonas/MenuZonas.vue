<template>
  <div class="row ">
    <div class="col-lg-9 col-12 mx-auto">
      <div class="row">
        <div class="col-sm-12">
          <h3 class="mt-1 fuente" style="font-weight: 400;">Gestión de cursos</h3>
          <hr>
        </div>
      </div>
       <div class="row  ">
                   <div >
          <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark fuente" style="margin:7px; ">
                <strong>Nota:</strong> Puede registrar cursos y sus
                asignaturas..
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 ">
          <br />
          <div
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="position-relative">
                <router-link to="/List-Provincias" href="javascript:;">
                  <div class="blur-shadow-image text-center">
                    <img
                      height="140px"
                      class="img  move-on-hover"
                      src="../../../assets/img/logs/map.svg"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body px-0 text-center" style="padding:2px;">
                <h5>
                  <router-link
                    to="/List-Provincias"
                    href="javascript:;"
                    class="text-dark fuente" style="font-weight: 400;"
                    > Provincias</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
            <div class="col-sm-4 ">
          <br />
          <div
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="position-relative">
                <router-link to="/List-Canton" href="javascript:;">
                  <div class="blur-shadow-image text-center">
                    <img
                      height="140px"
                      class="img  move-on-hover"
                      src="../../../assets/img/logs/map.svg"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body px-0 text-center" style="padding:2px;">
                <h5>
                  <router-link
                    to="/List-Canton"
                    href="javascript:;"
                    class="text-dark fuente" style="font-weight: 400;"
                    > Cantónes</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
              <div class="col-sm-4 ">
          <br />
          <div
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="position-relative">
                <router-link to="/List-Parroquia" href="javascript:;">
                  <div class="blur-shadow-image text-center">
                    <img
                      height="140px"
                      class="img  move-on-hover"
                      src="../../../assets/img/logs/map.svg"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body px-0 text-center" style="padding:2px;">
                <h5>
                  <router-link
                    to="/List-Parroquia"
                    href="javascript:;"
                    class="text-dark fuente" style="font-weight: 400;"
                    > Parroquia</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
                <div class="col-sm-4 ">
          <br />
          <div
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="position-relative">
                <router-link to="/List-Nacionalidad" href="javascript:;">
                  <div class="blur-shadow-image text-center">
                    <img
                      height="140px"
                      class="img  move-on-hover"
                      src="../../../assets/img/logs/bot-avatar.webp"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body px-0 text-center" style="padding:2px;">
                <h5>
                  <router-link
                    to="/List-Nacionalidad"
                    href="javascript:;"
                    class="text-dark fuente" style="font-weight: 400;"
                    > Nacionalidad</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
                  <div class="col-sm-4 ">
          <br />
          <div
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="position-relative">
                <router-link to="/List-Etnias" href="javascript:;">
                  <div class="blur-shadow-image text-center">
                    <img
                      height="140px"
                      class="img  move-on-hover"
                      src="../../../assets/img/logs/grupo.svg"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body px-0 text-center" style="padding:2px;">
                <h5>
                  <router-link
                    to="/List-Etnias"
                    href="javascript:;"
                    class="text-dark fuente" style="font-weight: 400;"
                    > Etnia</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
          
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuZonas",
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
