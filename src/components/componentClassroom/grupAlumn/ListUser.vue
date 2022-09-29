<template>
    <div>
        <NoFound v-if="objectUser.length == 0" />
        <section v-else>
            <div v-for="(item, index) in displayedArticles" :key="item.id" class="liTask">
                <div class="d-flex cajasTask fadeIn1 animate__animated animate__fadeInUp "
                    :class="[`animations-${index}`]">
                    <div class="d-flex py-1">
                        <div class="d-flex flex-column justify-content-center ms-3">
                            <h6 class="mb-0 text-sm negros">
                                {{ item.name }}
                            </h6>
                            <div class="text-sm colorestabla fuente">
                                <div>
                                    <span style="background-color: rgb(0, 189, 165);"
                                        class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                                    Usuario activo
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dropstart ms-auto">
                        <div class="d-flex  mt-2 text-sm">
                            {{ item.name.slice(0, 2).toUpperCase() }}
                        </div>
                    </div>
                </div>
            </div>
            <Paginate :numPages="numPages" :page="page" :total="objectUser.length" @pagechanged="onPageChange">
            </Paginate>
        </section>
    </div>
</template>

<script>
import NoFound from "../../../shared/NoFound"
import Paginate from "../../../shared/Paginate"
export default {
    name: 'ListUsers',
    props: {
        objectUser: Array,
    },
    components: { NoFound, Paginate },
    data() {
        return {
            colors: ["#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3,#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3"],
            isSelecUsers: [],
            page: 1,
            perPage: 5,
            pages: [],
            numPages: 0,
        }
    },
    computed: {
        displayedArticles: function () {
            return this.paginate(this.objectUser);
        }
    },
    methods: {
        paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            this.numPages = Math.ceil(articles.length / this.perPage);
            return articles.slice(from, to);
        },
        onPageChange(page) {
            this.page = page;
        },
    }
}
</script>

