<template>
  <div class="row">
    <div class="col-12">
         <Navss

            :actualText="'Crea-Edita-Usuarios' "
            :rutas="rutass"
          ></Navss>
      <div class="multisteps-form mb-5">
        <!--progress bar-->
        <div class="row">
          <div class="col-12 col-lg-8 mx-auto my-5">
            <div class="multisteps-form__progress">
              <button
                @click="tab = 'init'"
                :class="{ 'js-active': tab === 'init' }"
                class="multisteps-form__progress-btn "
                type="button"
                title="User Info"
              >
                <span>Informacion Usuario</span>
              </button>
              <button
                @click="tab = 'sec'"
                :class="{ 'js-active': tab === 'sec' }"
                class="multisteps-form__progress-btn "
                type="button"
                title="Address"
              >
                Roles
              </button>
            </div>
          </div>
        </div>
        <!--form panels-->
        <div class="row">
          <div class="col-12 col-lg-8 m-auto mol">
            <Skeleton v-if="isedit"></Skeleton>
            <form v-else @submit.prevent="save" class="multisteps-form__form ">
              <!--single form panel-->
              <div
                v-if="tab === 'init'"
                class="p-3 border-radius-xl bg-white js-active"
                data-animation="FadeIn"
              >
                <h5 class="font-weight-bolder mb-0">
                  {{ model._id ? "Actualizar Registro" : "Crear Registro" }}
                </h5>
                <p class="mb-0 text-sm">Mandatory informations</p>
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>Cedula</label>
                      <input
                        :class="{ error: validation.hasError('model.cedula') }"
                        v-model="model.cedula"
                        class="multisteps-form__input form-control buscador"
                        type="text"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.cedula") }}
                      </p>
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <label>Email</label>
                      <input
                        :class="{ error: validation.hasError('model.email') }"
                        v-model="model.email"
                        class="multisteps-form__input form-control buscador"
                        type="email"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.email") }}
                      </p>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>Nombres</label>
                      <input
                        :class="{ error: validation.hasError('model.nombres') }"
                        v-model="model.nombres"
                        class="multisteps-form__input form-control buscador"
                        type="text"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.nombres") }}
                      </p>
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <label>Apellidos</label>
                      <input
                        :class="{
                          error: validation.hasError('model.apellidos'),
                        }"
                        v-model="model.apellidos"
                        class="multisteps-form__input form-control buscador"
                        type="text"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.apellidos") }}
                      </p>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>Numero</label>
                      <input
                        :class="{
                          error: validation.hasError('model.telefono'),
                        }"
                        v-model="model.telefono"
                        class="multisteps-form__input form-control buscador"
                        type="text"
                        placeholder="0993322554"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.telefono") }}
                      </p>
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <label>Estado</label>
                      <div class="form-check">
                        <input
                          v-model="model.status"
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox"
                          value="1"
                          v-bind:true-value="1"
                          v-bind:false-value="0"
                        />
                        <label class="custom-control-label" for="customCheck1"
                          >Activo</label
                        >
                      </div>
                    </div>
                  </div>

                  <div @click="tab = 'sec'" class="button-row d-flex mt-4">
                    <button
                      class="btn bg-gradient-light ms-auto mb-0 js-btn-next"
                      type="button"
                      title="Next"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
              <!--single form panel-->

              <!--single form panel-->
              <div
                v-if="tab === 'sec'"
                class=" p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <h5 class="font-weight-bolder">Lista Roles de sistema</h5>
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col-12" v-for="ite in listRol" :key="ite._id">
                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          v-model="checked"
                          type="radio"
                          name="ite._id"
                          :id="ite._id"
                          :value="ite._id"
                        />
                        <label class="custom-control-label" for="ite._id">
                          {{ ite.name }}</label
                        >
                      </div>
                    </div>
                  </div>
                  <br />
                  <div v-if="checked == ''" class="text-center">
                    <button class="btn btn-sm btn-dark " disabled>
                      Esperando que elija un rol
                    </button>
                  </div>
                  <div v-else class="text-center">
                    <button v-if="ifLoad"
                      class="btn btn-primary btn-sm mb-2"
                      type="button"
                      disabled
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Enviando...
                    </button>
                    <button v-else
                      type="submit"
                      id="addRowButton"
                      class="btn btn-sm btn-dark "
                      style="border-radius: 10px;"
                    >
                      {{
                        model._id ? "Actualizar Registro " : "Guardar Registro"
                      }}
                    </button>
                  </div>

                  <div class="row">
                    <div class="button-row d-flex mt-4 col-12">
                      <button
                        @click="tab = 'init'"
                        class="btn bg-gradient-light mb-0 js-btn-prev"
                        type="button"
                        title="Prev"
                      >
                        Regresar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--single form panel-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./CreaUsuario.js"></script>
