
<template>
   <div class="spinner-border mt-3" style="color: black; font-size: 10px;" role="status">
             <span class="sr-only"></span>
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