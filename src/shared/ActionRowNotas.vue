<template>
    <div class="row mt-1">
        <div class="col-lg-9">
            <div class="d-flex justify-content-start">
                <a @click="$emit('save')" role="button" class="fuente tamanio me-2 btnOption"
                    v-tooltip.top-center="'Guardar Calificaciónes'">

                    <svg class="center-icon" style="color: #000" data-testid="geist-icon" fill="none" height="22"
                        shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
                        <path d="M17 21v-8H7v8"></path>
                        <path d="M7 3v5h8"></path>
                    </svg>
                </a>

                <a @click="$emit('remove')" role="button" class="fuente tamanio me-2 btnOption"
                    :class="{ disabled: longitude === 0 }"
                    v-tooltip.top-center="longitude ? '' : 'Elimine las notas de este curso'">
                    <svg class="center-icon" style="color: #000" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        viewBox="0 0 24 24" width="22" >
                        <path d="M1 4v6h6"></path>
                        <path d="M23 20v-6h-6"></path>
                        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"></path>
                    </svg>
                   
                </a>
                <a @click="$emit('open')" role="button" class="fuente tamanio me-2 btnOption"
                    :class="{ disabled: longitude === 0 }" v-tooltip.top-center="'Imprimir reporte de notas'">
                    <svg class="center-icon" style="color: #000" data-testid="geist-icon" fill="none" height="22"
                        shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22">
                        <path d="M6 9V2h12v7"></path>
                        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
                        <path d="M6 14h12v8H6z"></path>
                    </svg>
                </a>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="d-flex justify-content-end mb-3">
                <a class="btn btn btn-vercel" @click="$emit('openModal')">
                    <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        viewBox="0 0 24 24" width="20" style="color: currentcolor;margin-top: -3px;">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                        <path d="M7 10l5 5 5-5"></path>
                        <path d="M12 15V3"></path>
                    </svg> &nbsp;
                    Descargar
                </a>
            </div>
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
        allSelecteds: Boolean,
    },
    data() {
        return {
            search: '',
            quimestre: 'p1',
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
.btnOption {
    width: 34px;
    height: 34px;
    border-radius: 5px;
    border: 1px solid #E8EAF0;
}

.center-icon {
    margin: 5px;
}
</style>