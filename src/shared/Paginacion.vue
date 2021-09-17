<template>
  <div class="text-center">
    <ul class="pagination pagination-info">
      <li class="page-item">
        <a  v-if="page != 1"  @click="restar()" class="page-link" href="#link" aria-label="Previous">
          <span aria-hidden="true"
            ><i class="ni ni-bold-left" aria-hidden="true"></i
          ></span>
        </a>
      </li>
      <li v-for="index in pages" :key="index"  :class="{'active': index === page}" class="page-item">
        <a @click="go(index)"
          class="page-link" href="#link">
            {{index}}
        </a>
      </li>
    
      <li class="page-item">
        <a class="page-link" href="#link" aria-label="Next">
          <span aria-hidden="true"
            ><i class="ni ni-bold-right" aria-hidden="true"></i
          ></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Paginacion",
  data() {
      return {
          aux:0,
      }
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    paging: {
      type: Function,
      required: true
    }
  },

  methods: {
    go(page) {
      if (page === this.page) {
          this.aux=page;
        return;
      }

      this.paging(page);
    },
    restar(){
       
        this.go(this.aux-1)
        this.page--
        //this.paging(this.aux);
    }
  }
};
</script>
