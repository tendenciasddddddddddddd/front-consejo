<template>
  <div>
    <main class="main-content main-content-bg mt-0">
      <section>
        <div class="page-header ">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-5 col-md-6  mx-auto">
                <div class="">
                  <div
                    v-if="isVisible == 'logins'"
                    class="card card-plain  mt-5"
                  >
                    <div class="card-header pb-0 text-center">
                      <h2 class=" fuente">
                        Leonidas Proaño
                        <i style="color: #ff7a59" class="ni ni-app"></i>
                      </h2>
                      <p class="parrafo">
                        Ingrese su email y contraseña para iniciar sesión
                      </p>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="authenticate" class="text-start">
                        <span class="parrafo ">Dirección de correo</span>
                        <div class="mb-3 mt-1">
                          <input
                            v-model="login.email"
                            id="username"
                            type="email"
                            class="form-control buscador fuente"
                            placeholder="Email"
                            aria-label="Email"
                            required
                            autocomplete="off"
                          />
                        </div>

                        <span class="parrafo mt-2">Contraseña</span>
                        <div class="mb-3 mt-1">
                          <input
                            v-model="login.password"
                            id="password"
                            type="password"
                            class="form-control buscador fuente"
                            placeholder="Password"
                            aria-label="Password"
                            required
                          />
                        </div>
                        <a
                          @click="isVisible = 'passw'"
                          href="javascript:;"
                          class="fuente tamanio links "
                        >
                          <b>Olvidé mi contraseña</b>
                        </a>
                        <div class="form-check form-switch mt-2">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            
                          />
                          <label class="form-check-label" for="rememberMe"
                            >Recordarme</label
                          >
                        </div>
                        <div class="text-center">
                          <button
                            v-if="isLoading"
                            class="btn btnNaranja w-100 mt-4 mb-0"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Cargando...
                          </button>
                          <button
                            v-else
                            class="btn btnNaranja w-100 mt-2 mb-0 fuente"
                            style="font-size: 18px;"
                          >
                            Iniciar sesión
                          </button>
                          <br>
                          <br>
                          <hr class="mt-2"/>
                          
                          <div v-if="!isAuthGoogle" class="google-btn mt-5" @click="loginGoogleAuth()">
                        <div class="google-icon-wrapper">
                          <img
                            class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          />
                          
                        </div>
                        <p class="btn-text fuente text-center">
                          Iniciar sesión con Google
                        </p>
                      </div>
                      <div v-else class="google-btn mt-5">
                        <div class="google-icon-wrapper">
                          <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                        </div>
                        <p class="btn-text fuente text-center">
                          Trabajando...
                        </p>
                      </div>
                        </div>
                      </form>
                    </div>
                   
                  </div>

                  <!--  REXUPERAR CONTRASEÑA  -->

                  <div v-if="isVisible == 'passw'" class="card card-plain mt-4">
                    <div class="card-header pb-0 text-center">
                      <h2 class=" fuente ">
                        Leonidas Proaño
                        <i style="color: #ff7a59" class="ni ni-app"></i>
                      </h2>
                      <p class="h5 fuente">
                        Restablece tu contraseña
                      </p>
                      <p class="parrafo">
                        Introduce la dirección de correo electrónico en la que
                        deseas recibir la información para restablecer la
                        contraseña.
                      </p>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="ResetPassword" class="text-start">
                        <p class="parrafo">Dirección de correo</p>
                        <div class="mb-3">
                          <input
                            v-model="recordingPassword.email"
                            type="email"
                            class="form-control buscador fuente"
                            placeholder="Email"
                            aria-label="Email"
                            required
                            autocomplete="off"
                          />
                        </div>

                        <div class="text-center">
                          <button
                            v-if="isPasswd"
                            class="btn btnNaranja w-100 mt-4 mb-0"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Cargando...
                          </button>
                          <button v-else class="btn btnNaranja w-100 mt-4 mb-0">
                            Restablece tu contraseña
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="">
                      <a
                        @click="rediricLogin()"
                        href="javascript:;"
                        class="fuente tamanio ms-4"
                        >Volver a <b class="links ms-2">Inicio de sesión</b>
                      </a>
                    </div>
                  </div>

                  <!--  VEFIFICAR CODE  -->

                  <div
                    v-if="isVisible == 'forgot'"
                    class="card card-plain mt-3"
                  >
                    <div class="card-header pb-0 text-center">
                      <h2 class=" fuente ">
                        Leonidas Proaño
                        <i style="color: #ff7a59" class="ni ni-app"></i>
                      </h2>
                      <img
                        class="w-30"
                        src="../../assets/img/logs/successful-send.svg"
                        alt=""
                      />
                    </div>

                    <div class="card-body">
                      <div class="h4 fuente text-center">
                        La ayuda está en camino
                      </div>

                      <p class="parrafo text-center">
                        Recibirás un correo electrónico en un momento con un
                        codigo, verifica que hayas escrito el correo electrónico
                        correcto y revisa tu carpeta de spam.
                      </p>
                      <p class="parrafo">Código</p>
                      <div class="mb-3">
                        <input
                          v-model="isCode"
                          maxlength="6"
                          autocomplete="off"
                          autocapitalize="off"
                          class="form-control buscador fuente"
                          required
                        />
                      </div>
                      <span class="text-sm fuente text-danger">{{
                        isErrorCode
                      }}</span>
                      <div class="text-center">
                        <button
                          v-if="isCode != ''"
                          class="btn btnNaranja w-100 mt-2 mb-0"
                          type="button"
                          @click="verificarCode()"
                        >
                          Verificar Code
                        </button>
                        <button v-else class="btn btnDisabled w-100 mt-2 mb-0">
                          Verificar Code
                        </button>
                      </div>
                    </div>
                    <div class="">
                      <a
                        @click="rediricLogin()"
                        href="javascript:;"
                        class="fuente tamanio ms-4"
                        >Volver a <b class="links ms-2">Inicio de sesión</b>
                      </a>
                    </div>
                  </div>

                  <!--  RESET PASS  -->

                  <div
                    v-if="isVisible == 'resett'"
                    class="card card-plain mt-3"
                  >
                    <div class="card-header pb-0 text-center">
                      <h2 class=" fuente ">
                        Leonidas Proaño
                        <i style="color: #ff7a59" class="ni ni-app"></i>
                      </h2>
                      <p class="h5 fuente" style="font-weight: 400;">
                        Es un placer conocerte.
                      </p>
                      <p class="parrafo">
                        Antes de empezar, pongamos en orden todos los detalles
                        de tu cuenta.
                      </p>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="ResetCount" class="text-start">
                        <p class="parrafo">Nueva Contraseña</p>
                        <div class="mb-3">
                          <input
                            v-model="resetPasswords.password"
                            id="password"
                            type="password"
                            class="form-control buscador fuente"
                            placeholder="Password"
                            aria-label="Password"
                            required
                            minlength="5"
                            autocapitalize="off"
                          />
                        </div>

                        <div class="text-center">
                          <button
                            v-if="isResert"
                            class="btn btnNaranja w-100 mt-4 mb-0"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Trabajando...
                          </button>
                          <button v-else class="btn btnNaranja w-100 mt-4 mb-0">
                            Restablece tu contraseña
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="">
                      <a
                        @click="rediricLogin()"
                        href="javascript:;"
                        class="fuente tamanio ms-4"
                        >Volver a <b class="links ms-2">Inicio de sesión</b>
                      </a>
                    </div>
                  </div>

                  <!--  ERROR DE CUENTA  -->

                  <div v-if="isVisible == 'error'" class="card card-plain mt-3">
                    <div class="card-header pb-0 text-center">
                      <h2 class=" fuente ">
                        Leonidas Proaño
                        <i style="color: #ff7a59" class="ni ni-app"></i>
                      </h2>
                      <img
                        class="w-30"
                        src="../../assets/img/usados/account-security.svg"
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <div class="alerRed">
                        <p
                          style="font-size: 16px;    font-weight: 700;color: black;"
                        >
                          <b>Esto no se ve bien.</b>
                        </p>
                        <p class="parrafo">
                          Escribiste una dirección de correo no válida. Para
                          obtener más detalles sobre por qué podría estar
                          pasando esto, inicia el chat y pregunta por
                          inconveniete.
                        </p>
                      </div>
                    </div>
                    <div class="">
                      <a
                        @click="rediricLogin()"
                        href="javascript:;"
                        class="fuente tamanio ms-4"
                        >Volver a <b class="links ms-2">Inicio de sesión</b>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6">
                <div
                  class="
                  oblique
                  position-absolute
                  top-0
                  h-100
                  d-md-block d-none
                  me-n8
                "
                >
                  <div
                    class="
                    oblique-image
                   
                    position-absolute
                   
                    ms-auto
                    h-100
                    z-index-0
                    ms-n6
                    alligator-show-box
                  "
                   
                  ></div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
    <footer class="footer py-5">
      <div class="container">
        <div class="row">
          <div class="col-8 mx-auto text-center mt-1">
            <p class="mb-0 text-secondary">
              Copyright © 2021
            </p>
          </div>
        </div>
      </div>
    </footer>
    <!-- -------- END FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  </div>
</template>
<script src="./Login.js"></script>

