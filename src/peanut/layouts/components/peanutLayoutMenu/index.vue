<template>
    <div class="peanut-layout-menu">
        <el-menu
            router
            :mode="mode"
            active-text-color="#409EFF"
            :default-active="defaultActive"
            unique-opened
            :collapse="collapse"
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
import RouteItem from "./components/routeItem";

export default {
    name: "peanutLayoutMenu",
    components: {RouteItem},
    props: {
        mode: {
            type: String,
            default: "vertical"
        },
        collapse: {
            type: Boolean,
            default: false
        },
        routes: {
            type: Array,
            default: () => {
            }
        },
    },
    computed: {
        defaultActive() {
            return this.$route.path;
        },

    },
}

</script>
<style lang="scss" scoped>

</style>
