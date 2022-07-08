<template>
    <div class="peanut-layout-menu">
        <el-menu
            router
            mode="vertical"
            active-text-color="#409EFF"
            :default-active="defaultActive"
            collapse-transition
            unique-opened
        >
            <template v-for="route in routes">
                <route-item
                    :key="route.path"
                    :item="route"
                />
            </template>
        </el-menu>
    </div>
</template>
<script>
import {mapState} from "vuex";
import RouteItem from "./components/routeItem";

export default {
    name: "peanutLayoutMenu",
    components: {RouteItem},
    computed: {
        ...mapState('peanut-routes', ["routes"]),
        defaultActive() {
            return this.$route.path;
        }
    },
}

</script>
<style lang="scss" scoped>

</style>
