<template>
    <Modal>
        <template v-slot:header>Módulo de reportes</template>
        <template v-slot:body>
            <span class="negros text-sm">El módulo de reporte genéra file pdf de matricula, libretas, notas y promoción</span>
            <div class="text-center mt-2">
                <img width="300" src="../assets/img/notas_espera.svg" alt="">
            </div>
        </template>
        <template v-slot:acccion>
            <button  class="btn btnNaranja mt-2" >
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Procesando
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


