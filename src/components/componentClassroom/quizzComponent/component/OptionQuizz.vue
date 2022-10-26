<template>
    <div class="row mt-2">
        <span class="h5 fuente s-font text-center mb-5">Seleccionar el tipo de pregunta</span>
        <div class="col-sm-3 ms-auto text-center ">
            <input  type="checkbox" checked class="btn-check" id="btncheck1">
            <label @click="$emit('clickOption',1)" class="btn btn-lg btn-outline-secondary border-2 px-4 py-3" for="btncheck1">
                <svg class="text-white" data-testid="geist-icon" fill="none" height="32" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="32" ><path d="M20 6L9 17l-5-5"></path></svg>
              
            </label>
            <h6 class="fuente s-font">Verdad / Falso</h6>
        </div>
        <div class="col-sm-3 text-center">
            <input type="checkbox" checked class="btn-check" id="btncheck2">
            <label @click="$emit('clickOption',2)" class="btn btn-lg btn-outline-secondary border-2 px-4 py-3" for="btncheck2">
                <svg class="text-white" data-testid="geist-icon" fill="none" height="32" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="32" ><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><path d="M22 4L12 14.01l-3-3"></path></svg>
            </label>
            <h6 class="fuente s-font">Seleccione uno</h6>
        </div>
        <div class="col-sm-3 me-auto text-center">
            <input type="checkbox" checked class="btn-check" id="btncheck3">
            <label @click="$emit('clickOption',3)" class="btn btn-lg btn-outline-secondary border-2 px-4 py-3" for="btncheck3">
                <svg class="text-white" data-testid="geist-icon" fill="none" height="32" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="32" ><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>
            </label>
            <h6 class="fuente s-font">Seleccione muchos</h6>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
