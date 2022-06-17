<template>
  <div>
     <Modal v-show="visible" @close="close">
          <template v-slot:header> Cambiar contraseña</template>
          <template v-slot:body>
             <p class="parrafo">Cambia tu contraseña cuando lo necesites. Por seguridad, te recomendamos que esté compuesta de letras y números.</p>
              <div class="h6 text-danger fuente">{{ MsmError }}</div>
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
                        placeholder="Ingresa tu contraseña actual"
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

                        class="form-control buscador"
                        type="password"
                        v-model="newContraseña.password"
                        placeholder="Ingresa tu nueva contraseña"
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
                        placeholder="Confirma tu nueva contraseña"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("confpass") }}
                      </p>
                    </div>
                    <div class="text-center mt-4">
                      <button
                        v-if="(newContraseña.password == confpass)&&newContraseña.password"
                        type="submit"
                        class="btn  btnNaranja w-100"
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
          </template>
        </Modal>
  </div>
</template>
<script src="./Cuenta.js"></script>

