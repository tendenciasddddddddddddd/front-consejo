<template>
    <Modal>
        <template v-slot:header>Módulo nube</template>
        <template v-slot:body>
            <span class="negros text-sm">El módulo nube almacena sus archivos en carpetas en ES3 con el mejor performance</span>
            <div class="text-center mt-2">
                <img width="300" src="../assets/img/submit.svg" alt="">
            </div>
        </template>
        <template v-slot:acccion>
            <button  class="btn btnNaranja mt-2">
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Cargando...
            </button>
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