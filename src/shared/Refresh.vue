<template>
   <div class="text-center">
        <i class="fa fa-refresh refresh-start" style="font-size: 50px" aria-hidden="true"></i>
   </div>
</template>

<script>
export default {
 name : 'Refresh'
}
</script>

<style>
@keyframes rotate {

from {transform: rotate(0deg)}
to {transform: rotate(360deg)}

}

.refresh-start {
animation-name: rotate;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-timing-function: linear;
animation-play-state: running;

}
</style>