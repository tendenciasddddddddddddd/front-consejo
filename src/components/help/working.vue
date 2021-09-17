<template>
  <div class="row mt-lg-0 mt-4">
            <div class="col-lg-5 my-auto">
              <h1 class="display-1 text-bolder text-gradient text-warning fadeIn1 fadeInBottom mt-5">Nooo..</h1>
              <h2 class="fadeIn3 fadeInBottom opacity-8">Este modulo está en mantenimiento</h2>
               <a class="btn bg-gradient-warning mt-4 fadeIn2 fadeInBottom" style="cursor: pointer;" @click="$router.go(-1)">Regresar</a>
              
            </div>
            <div class="col-lg-7 my-auto">
              <img class="w-80 fadeIn1 fadeInBottom" src="https://demos.creative-tim.com/soft-ui-dashboard-pro/assets/img/illustrations/error-500.png" alt="500-error">
            </div>
          </div>
</template>

<script>
export default {

}
</script>

<style>

</style>