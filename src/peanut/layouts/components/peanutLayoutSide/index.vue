<template>
    <div class="peanut-layout-side">
        <peanut-layout-menu :routes="sideRoutes"/>
    </div>

</template>
<script>
import {mapState} from "vuex";

export default {
    name: "peanutLayoutSide",
    data() {
        return {
            originRoutes: []
        }
    },
    computed: {
        ...mapState('peanut-routes', ["routes"]),
        sideRoutes() {
            if (this.originRoutes?.length) {
                console.log('????')
                return this.originRoutes
            }
            return this.routes.filter(route => route.meta?.isTop == 'false')
        }

    },
    mounted() {
        this.$baseEventBus.$on("handleClickTopMenu", (routes) => {
            this.originRoutes = routes
        })
    }
}

</script>
<style lang="scss" scoped>
.peanut-layout-side {
    height: 99%;
    width: 200px;
    min-width: 10%;
    border: 1px #2FD098 solid;
}

</style>
