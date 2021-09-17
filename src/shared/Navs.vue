<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5" >
       <li class="breadcrumb-item  text-sm" >
        <router-link to="/" class="opacity-10 " style="color:#509bdd" href="javascript:;">Home</router-link>
      </li>
      <li class="breadcrumb-item  text-sm" >
        <router-link :to="anteriorUrl" class="opacity-10 " style="color:#509bdd" href="javascript:;">{{anteriorText}}</router-link>
      </li>
      <li class="breadcrumb-item text-sm text-dark active" aria-current="page">
        {{actualText}}
      </li>
    </ol>
    <h6 class="font-weight-bolder mb-0">{{actualText}}</h6>
  </nav>
</template>

<script>
export default {
  name: "Navs",
  props: {
    anteriorUrl: {
      type: String,
      required: true,
    },
    actualText: {
      type: String,
      required: true,
    },
     anteriorText: {
      type: String,
      required: true,
    },
  },
};
</script>
