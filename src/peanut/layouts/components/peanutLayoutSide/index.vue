<template>
    <div class="peanut-layout-side">
        <peanut-layout-menu :routes="sideRoutes"/>
    </div>

</template>
<script>
import {mapState} from "vuex";

export default {
    name: "peanutLayoutSide",
    computed:{
        ...mapState('peanut-routes', ["routes"]),
        sideRoutes() {
            return this.routes.filter(route => route.meta?.isTop == 'false')
        }

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
