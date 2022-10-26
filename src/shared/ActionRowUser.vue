<template>
    <div> 
        <div class="d-flex justify-content-start">
                <button  class="btn btnNaranja2 me-2"  @click="$emit('getDataAlls')">
                    Actualizar lista
                </button>
            </div>
    </div>
    
</template>
<script>
export default {
    name: 'ActionsTrask',
    props: {
        longitude: {
            type: Number,
        },
    },
    data() {
        return {
            search: '',
        }
    },
    watch: {
        search: function (value) {
            this.$emit("changeSearch", value);
        }
    }
}
</script>
<style>
.btnOption{
    width: 34px;
    height: 34px;
    border-radius: 5px;
    border: 1px solid #E8EAF0;
}
.center-icon{
        margin: 5px;
}
</style>