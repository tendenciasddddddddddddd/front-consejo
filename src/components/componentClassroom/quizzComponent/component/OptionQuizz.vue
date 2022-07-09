<template>
    <div class="row mt-2">
        <span class="h5 fuente s-font text-center mb-5">Seleccionar el tipo de pregunta</span>
        <div class="col-sm-3 ms-auto text-center ">
            <input  type="checkbox" checked class="btn-check" id="btncheck1">
            <label @click="$emit('clickOption',1)" class="btn btn-lg btn-outline-secondary border-2 px-4 py-3" for="btncheck1">
                <i class='bx bx-check-circle s-icon'></i>
            </label>
            <h6 class="fuente s-font">Verdad / Falso</h6>
        </div>
        <div class="col-sm-3 text-center">
            <input type="checkbox" checked class="btn-check" id="btncheck2">
            <label @click="$emit('clickOption',2)" class="btn btn-lg btn-outline-secondary border-2 px-4 py-3" for="btncheck2">
                <i class='bx bx-radio-circle-marked s-icon'></i>
            </label>
            <h6 class="fuente s-font">Seleccione uno</h6>
        </div>
        <div class="col-sm-3 me-auto text-center">
            <input type="checkbox" checked class="btn-check" id="btncheck3">
            <label @click="$emit('clickOption',3)" class="btn btn-lg btn-outline-secondary border-2 px-4 py-3" for="btncheck3">
                <i class='bx bx-check-square s-icon'></i>
            </label>
            <h6 class="fuente s-font">Seleccione muchos</h6>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
