<template>
    <Modal>
        <template v-slot:header>Módulo nube</template>
        <template v-slot:body>
            <span class="negros text-sm">El módulo nube almacena sus archivos en carpetas en ES3 con el mejor performance</span>
            <div class="text-center mt-2">
                <img width="300" src="../assets/img/notas_espera.svg" alt="">
            </div>
        </template>
        <template v-slot:acccion>
            <a  class="btn btnNaranja mt-2" style="background-color: #0c2ccc !important;">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Uploading
            </a>
        </template>
    </Modal>
</template>
<script>
import Modal from "./Modal";
export default {
    components: {
        Modal
    }
};
</script> 