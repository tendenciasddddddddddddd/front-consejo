<template>
    <div>
        <NoFound v-if="objectUser.length == 0" />
        <section v-else class="flex-containes2 ">
            <div v-for="(item, index) in objectUser" :key="item.id" class="text-center">
                <br />
                <div class="targetas1 cajas "
                    style="min-width:170px; width: 170px!important;margin-top: 0px!important;">
                    <div class="form-check my-auto">
                        <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                            style="float: right; right: 10px; top: 10px;"  />
                    </div>
                    <div class="avatar avatar-lg position-relative mt-2"
                        v-bind:style="{ 'background-color': colors[index] }" style="border-radius: 100%;">
                        <span class="text-white h4" style="font-weight: 600;">
                            {{ item.name.slice(0, 2).toUpperCase() }}
                        </span>
                    </div>
                    <p class="text-xs fuente mt-3">
                        {{ item.name }}
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
export default {
    name: 'ListUsers',
    props: {
        objectUser: Array,
    },
    components: {  NoFound },
    data() {
        return {
            colors: ["#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3"],
            isSelecUsers: [],

        }
    },
}
</script>

