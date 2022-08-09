<template>
    <div class="peanut-layout-side">
        <peanut-layout-menu :routes="sideRoutes" :collapse="collapse"/>
        <div class="collapse" @click="handleClickCollapse">
            <peanut-icon :icon-name="iconName"></peanut-icon>
        </div>
    </div>

</template>
<script>
import {mapState} from "vuex";

export default {
    name: "peanutLayoutSide",
    data() {
        return {
            originRoutes: [],
            iconName: "collapse-left",
            collapse: false
        }
    },
    computed: {
        ...mapState('peanut-routes', ["routes"]),
        sideRoutes() {
            if (this.originRoutes?.length) {
                this.$router.push(this.originRoutes[0].children[0].fullPath)
                return this.originRoutes[0].children
            }
            this.$router.push(this.routes.filter(route => !route.meta?.isTop)[0].children[0].fullPath)
            return this.routes.filter(route => !route.meta?.isTop)
        }

    },
    mounted() {
        this.$baseEventBus.$on("handleClickTopMenu", (routes) => {
            this.originRoutes = routes
        })
    },
    methods: {
        handleClickCollapse() {
            this.collapse = !this.collapse
            this.iconName = this.iconName === "collapse-left" ? "collapse-right" : "collapse-left"
        }
    }
}

</script>
<style lang="scss" scoped>
.peanut-layout-side {
    height: 99%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #FFFFFF;

    .collapse {
        padding: 16px 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px #f0f0f0 solid;

        &:hover {
            background-color: #f0f0f0;
        }
    }
}

</style>
