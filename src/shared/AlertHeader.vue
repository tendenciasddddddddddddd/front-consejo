<template>
  <div class="s-header-notification ">
            <div>
             <span class=" s-title-page p-1" > <a @click="$router.go(-1)" v-if="initText" class="text-azul me-2 " style="font-weight: 400;" href="javascript:;"><i class="fas fa-arrow-left"></i>&nbsp; {{initText}}
                &nbsp;
               </a>{{firsttext}}
             <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 20 20" class="small svg-icon fill grey-500 s-mr-2 me-1 ms-1" id="" fill="currentColor" title=""><path d="M6.52776 18.4722C6.16165 18.1061 6.16165 17.5125 6.52776 17.1464L14.3375 9.33669C14.7036 8.97057 15.2972 8.97057 15.6633 9.33669C16.0294 9.70281 16.0294 10.2964 15.6633 10.6625L7.85359 18.4722C7.48747 18.8383 6.89388 18.8383 6.52776 18.4722Z"></path><path d="M6.52776 1.52459C6.16164 1.8907 6.16164 2.4843 6.52776 2.85041L14.3397 10.6624C14.7059 11.0285 15.2995 11.0285 15.6656 10.6624C16.0317 10.2963 16.0317 9.70269 15.6656 9.33657L7.85359 1.52459C7.48747 1.15847 6.89388 1.15847 6.52776 1.52459Z"></path></svg>
              {{lasttext}}
           </span>
            </div>
      </div>
</template>

<script>
export default {
    props: {
    firsttext: {
      type: String,
      required: true
    },
    lasttext: {
        type: String,
        required: true
    },
    initText: {
       type: String,
    }
  },
}
</script>
