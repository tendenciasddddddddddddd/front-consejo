<template>
  <div
    class="carmen align_center animate__animated animate__fadeInUp "
    :class="[` animations-${index} `]"
  >
    <router-link :to="ruta" href="javascript:;"
      ><img alt="" role="presentation" class="card_image" :src="img" />
      <p class="cardTitle " style="font-size: 20px;">
        {{ nombre }}
      </p>
      <a class="img__description ">
        <button class="btn btnNaranja" style="margin-top:31%;"  href="javascript:;"
          ><i class="bx bxs-low-vision"></i> Entrar</button
        ></a
      >
      <span class="parrafo cardSubTitle">
        <i class="bx bx-info-circle iconColor me-2"></i>
        {{ description }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    ruta: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    nombre: { 
      type: String, 
      required: true
    },
    description: { 
      type: String, 
      required: true
    }
  },
};
</script>
