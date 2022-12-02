<template>
    <Modal @close="$emit('closeEmergente')">
        <template v-slot:header>REALIZAR LOS SIGUIENTES PASOS POR FAVOR Y GENERAR NUEVAMENTE EN REPORTE</template>
        <template v-slot:body>
            <div class="text-center ">
                <img width="300" src="../assets/img/emergente.png" alt="">
            </div>
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