<template>
    <Modal>
        <template v-slot:header>Módulo de reportes</template>
        <template v-slot:body>
            <span class="negros text-sm">El módulo de reporte genéra file pdf de matricula, libretas, notas y promoción</span>
            <div class="text-center ">
                <img width="200" src="../assets/img/carpetas.webp" alt="">
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


