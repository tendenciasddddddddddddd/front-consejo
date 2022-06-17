<template>
    <div  class="text-center">
            <div class="s-spinner-border" style="color: black;" role="status">
              <span class="sr-only"></span>
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
