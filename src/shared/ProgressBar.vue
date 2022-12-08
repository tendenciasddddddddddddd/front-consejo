
<template>
  <div>
    <div class="spinner-grow text-danger me-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning me-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
    <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
    
  </div>
  
</template>
<script>
export default {
  name: "ProgressBar",
};
</script>
<style>
.spinner-border {

    animation: .45s linear infinite b !important;
}
</style>