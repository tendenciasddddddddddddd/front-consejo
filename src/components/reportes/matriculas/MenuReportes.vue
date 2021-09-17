<template>
  <div class="row ">
    <div class="col-lg-9 col-12 mx-auto">
       <div class="row">
                 <div class="col-sm-12">
                     <h3 class="mt-1 fuente" style="font-weight: 400;"> Reportes </h3>
                 </div>
            </div>
          <div class="row "> <!-- justify-content-md-center -->
            
            <div class="mt-2">
          <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="text-sm text-dark fuente" style="margin:7px; ">
                <strong>Nota:</strong> Podra imprimir los reportes de los periodos vigentes.
              </p>
            </div>
          </div>
        </div>
            <div class="col-sm-4">
               <br>
              <div class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90">
                <div class="card card-plain card-blog">
                  <div class="position-relative">
                    <router-link to="/consolidado" href="javascript:;">
                      <div class="blur-shadow-image text-center">
                       <img height="130px"
                          class="img move-on-hover"
                          src="https://qdeskmexico.com/wp-content/uploads/2019/06/excel-logo.png"
                        />
                      </div>
                    </router-link>
                  </div>
                  <div class="card-body px-0 text-center" style="padding:2px;">
                    <h5>
                      <router-link to="/consolidado" href="javascript:;" class="text-dark fuente" style="font-weight: 400;"
                        >Consolidado </router-link
                      >
                    </h5>


                  </div>
                </div>
              </div>
            </div>
             <div class="col-sm-4">
               <br>
                   <div class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90">
                <div class="card card-plain card-blog">
                  <div class="position-relative">
                    <router-link to="/list-report" href="javascript:;">
                      <div class="blur-shadow-image text-center">
                       <img height="130px"
                          class="img move-on-hover"
                          src="http://politiks360.com/wp-content/uploads/2018/07/pdf.png"
                        />
                      </div>
                    </router-link>
                  </div>
                  <div class="card-body text-center px-0" style="padding:2px;">
                    <h5>
                      <router-link to="/list-report" href="javascript:;" class="text-dark fuente" style="font-weight: 400;"
                        >Matriculas</router-link
                      >
                    </h5>
 
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
               <br>
                   <div class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90">
                <div class="card card-plain card-blog">
                  <div class="cposition-relative">
                    <router-link to="#" href="javascript:;">
                      <div class="blur-shadow-image text-center">
                       <img height="130px"
                          class="img move-on-hover"
                          src="../../../assets/img/logs/tarea.svg"
                        />
                      </div>
                    </router-link>
                  </div>
                  <div class="card-body text-center px-0" style="padding:2px;">
                    <h5>
                      <router-link to="#" href="javascript:;" class="text-dark fuente" style="font-weight: 400;"
                        >Calificaciones </router-link
                      >
                    </h5>
 
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
               <br>
                   <div class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90">
                <div class="card card-plain card-blog">
                  <div class="position-relative">
                    <router-link to="#" href="javascript:;">
                      <div class="blur-shadow-image text-center">
                       <img height="130px"
                          class="img move-on-hover"
                          src="../../../assets/img/logs/documents.svg"
                        />
                      </div>
                    </router-link>
                  </div>
                  <div class="card-body text-center px-0" style="padding:2px;">
                    <h5>
                      <router-link to="#" href="javascript:;" class="text-dark fuente" style="font-weight: 400;"
                        >Permisos </router-link
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
