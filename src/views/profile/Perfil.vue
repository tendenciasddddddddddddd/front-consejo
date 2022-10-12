<template>
  <div>
    <div class="contenidotabs">
          <a class="tabss fuente" @click="istabs=1" :class="{ 'tabsActive links': istabs=='1' }">Perfil</a>
          <a class="tabss fuente" @click="istabs=2" :class="{ 'tabsActive links': istabs=='2' }">Información 
          </a>
          <a class="tabss fuente" @click="open">Imagen de perfil</a>
        </div>
        <hr style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;" />

      <div class="mt-2 row" v-if="istabs=='1'">
          <Spinner v-if="ifcarga"></Spinner>
          <div v-else class="col-lg-5">
            <span class="h5 fuente">Global</span><br />
            <span class="parrafo">Esto se aplica en toda la plataforma administrativa.</span>
            <p class="parrafo mt-2"><b>Imagen de perfil</b></p>
            <div class=" mt-3">
              <div class=" position-relative">
                <div @click="open" class="maperr avatar avatar-xl">
                  <img :src="img1 ? img1 : foto" class=" " alt="abc" style="border-radius: 50%;" />
                </div>
              </div>
            </div>

            <form @submit.prevent="save" id="pefilD">
                  <span class="parrafo">Nombres</span>
                  <CustomInput v-model="model.nombres" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.nombres") }}
                  </p>
                  <span class="parrafo ">Apellidos</span>
                  <CustomInput v-model="model.apellidos" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.apellidos") }}
                  </p>
                  <span class="parrafo">Email</span>
                  <CustomInput v-model="model.email" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.email") }}
                  </p>
              <div class="row mt-2">
                <div class="col-sm-6 ">
                  <span class="parrafo">Parroquia</span>
                  <CustomInput v-model="model.fkparroquia" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.fkparroquia") }}
                  </p>
                </div>
                <div class="col-sm-6 ">
                  <span class="parrafo">Etnia</span>
                  <CustomInput v-model="model.fketnia" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.fketnia") }}
                  </p>
                </div>
              </div>
                  <span class="parrafo">Teléfono</span>
                  <CustomInput v-model="model.telefono" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.telefono") }}
                  </p>
                  <span class="parrafo">Género</span>
                  <CustomInput v-model="model.sexo" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.sexo") }}
                  </p>
            </form>
            <ButtonLoading v-if="ifLoad" />
            <button v-else type="submit" class=" btn btnNaranja" form="pefilD"  style="background-color: #0c2ccc !important;">
              Actualizar Información
            </button>
            <br> <br> <br>
          </div>
      </div>
      <div v-if="isAvatar">
          <Avatar  @myEventClosed="close" @changeAvatar="changeAvatar"/>
        </div>
  </div>
</template>

<script src="./Perfil.js"></script>


