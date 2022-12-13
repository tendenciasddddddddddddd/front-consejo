<template>
    <Modal>
        <template v-slot:header>Módulo nube</template>
        <template v-slot:body>
            <span class="negros text-sm">Sus archivos se almacenan Amazon web service ES3 EC2 de manera segura...</span>
            <div class="text-center mt-2">
                <img width="300" src="../assets/img/submit.svg" alt="">
            </div>
        </template>
        <template v-slot:acccion>
            <button  class="btn btnNaranja mt-2" disabled>
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