<template>
  <div>
    <div id="page-navbar">
      <nav role="navigation" aria-label="Barra de navegación">
        <ul class="breadcrumb1">
          <div v-for="items in rutas" :key="items.id">
               <li class="breadcrumb-item">
                 <router-link class="asett fuente" :to="items.url">{{ items.nombre }} &nbsp; / &nbsp;</router-link>
             </li>
          </div>
         
          <li class="breadcrumb-item"><h6 class="font-weight-bolder mb-0 fuente">{{ actualText }}</h6></li>
  
        </ul>
           
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navs",
  props: {
    actualText: {
      type: String,
      required: true,
    },
    rutas: {
      type: Array,
    },
  },
};
</script>
<style>
.breadcrumb1 {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  background-color: #ffffff;
  border-radius: 0.5rem;
}

.asett{
   color: #1177d1;
    text-decoration: none;
    background-color: transparent;
}
.asett:hover {
    color: #0b4579;
    text-decoration: underline;
}
</style>
