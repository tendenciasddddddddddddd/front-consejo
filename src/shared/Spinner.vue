<template>
    <div  class="text-center">
      <div class="spinner-border " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
          
        </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>
<style>
.s-spinner-border {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: -0.125em;
    border: 0.12em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: .75s linear infinite b;
    animation: .75s linear infinite b;
}
</style>
