<template>
  <div>
    <!-- <div><section id="vulnerability" style="background-color: #E4F7EB;padding: 20px;text-align: center;font-size: 16px;line-height: 19px;color:#1C7E41;"><div style="max-width:1350px;margin-left: auto;margin-right: auto;min-height: 30px;"><div style="float: left;text-align: left;max-width: 800px;"><strong>Oferta especial:</strong>Gracias por elegir Zoom para mantenerse conectado. Haga el cambio a Pro Annual hoy y ahorre un 25% en su primer año con CONNECT25. </div><div style=""> <a href="https://zoom.us/buy?cartid=fdUxP2Sgcn&amp;couponcode=CONNECT25&amp;zcid=3779&amp;utm_source=Pardot&amp;utm_medium=email&amp;utm_content=FreeToPro&amp;utm_campaign=CONNECT25">Cambiar a anual</a></div></div><button onclick="closeNotification();" aria-label="Close Account Info Modal Box" style="border: none;background: none;float: right;top: -40px;position: relative;">×</button></section></div> -->
    
    <div class="row ">
      <div class="col-lg-11 col-12 mx-auto " v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
      style="background-repeat: no-repeat;background-position: 100% 0;">
        <div class="row">
          <div class="col-md-5 col-12 mx-auto">
            <div class=" h-100">
              <div class=" text-center ">
                <h6 class="mb-1 h3 fuente mt-2">Cambiar contraseña</h6>
                 <img
                        class="w-40 mt-2"
                        src="../../../assets/img/icons/config.png"
                        alt="fondo"
                      />
                <div class="h4 text-danger">{{ MsmError }}</div>
              </div>
              <div class="card-body p-3" >
                <div v-if="isContrasenia">
                  <form @submit.prevent="authenticate">
                    <p class="parrafo">Contraseña actual</p>
                    <div class="form-group">
                      <input
                        v-model="contraseñaActual.password"
                        class="form-control buscador fuente"
                        type="password"
                        required
                        autocomplete="cualquier-cosa"
                      />
                    </div>
                    <div class="text-center" v-if="isLoading">
                      <button disabled class="btn mt-3 btnNaranjaClaro">
                        Enviando
                      </button>
                    </div>

                    <div class="text-center" v-else>
                      <button v-if="contraseñaActual.password" type="submit" class="btn w-100 btnNaranja mt-3">
                        Verificar Contraseña
                      </button>
                      <button
                        v-else
                        class="btn btnDisabled w-100 mt-3"
                       
                      >
                        Verificar Contraseña
                      </button>
                    </div>
                  </form>
                </div>
                <div v-else>
                  <form @submit.prevent="actualizar">
                  
                     <span class="parrafo">Nueva Contraseña</span>
                    <div class="form-group">
                      <input
                        :class="{
                          error: validation.hasError('newContraseña.password'),
                        }"
                        class="form-control buscador"
                        type="password"
                        v-model="newContraseña.password"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("newContraseña.password") }}
                      </p>
                    </div>
                  
                     <span class="parrafo">Confirmar contraseña</span>
                    <div class="form-group">
                      <input
                        :class="{ error: validation.hasError('confpass') }"
                        class="form-control buscador"
                        type="password"
                        v-model="confpass"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("confpass") }}
                      </p>
                    </div>
                    <div class="text-center mt-4">
                      <button
                        v-if="newContraseña.password == confpass"
                        type="submit"
                        class="btn  btnNaranja"
                      >
                        Guardar
                      </button>
                      <button
                        v-else
                        class="btn btnDisabled w-100"
                       
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
          
          <!-- <div class="col-md-7 mt-md-0 mt-4">
             <h6 class="mb-3 fuente">
                  Requisitos de contraseña
                </h6>
            <div class=" h-100">
               <div class="card-body p-3" style="background-color: #E4F7EB;">
                <ul class="text-muted ps-4 mb-0 fuente">
                  <li>
                    <span class="text-sm">Un caracter especial</span>
                  </li>
                  <li>
                    <span class="text-sm">Mínimo 6 carácteres</span>
                  </li>
                  <li>
                    <span class="text-sm">Un número (se recomiendan 2)</span>
                  </li>
                </ul>
              </div>
              <div class=" p-3 pb-0">
               
                <div class="row mt-1">
                  <div class="col-lg-9 col-12 mx-auto">
                    <div class="text-center">
                      <img
                        class="w-80"
                        src="../../../assets/img/jira/seguridad.png"
                        alt="fondo"
                      />
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </div> -->
          
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./cuenta.js"></script>

<style></style>
