<template>
    <div>
        <h5 class=" negros" v-html="survey.question" style="font-weight: 400;">  
        </h5>
        <div>
            <ul>
                <li v-for="(option) in survey.options" :key="option.id" >
                    <span v-if="survey.reqq[0].toString().includes(option.id)" class="gordo links2 text-sm ">
                        {{ option.text }}
                    </span>
                    <span v-else class="negros text-sm ">
                        {{ option.text }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="text-center">
            <button @click="editQuizz(survey.id)" class="btn btnNaranja2 me-2">
                <svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" ><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button @click="removeQuizz(survey.id)" class="btn btnNaranja2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"></path></svg>
            </button>
            
        </div>
        
        <hr />
    </div>
</template>

<script>
export default {
    props: ["survey"],

    methods: {
        removeQuizz(id) {
            this.$emit("removeQuiz", id)
        },
        editQuizz(id) {
            this.$emit("editQuizz", id)
        }
    }
};
</script>
<style>
.s-remove-array {
    position: relative;
    top: 10px;
    float: right;
    right: 10px;
}
.s-oly-btn{
    width: 1.675rem !important;
    height: 1.675rem !important;
    padding: 0.3rem ;
}
</style>