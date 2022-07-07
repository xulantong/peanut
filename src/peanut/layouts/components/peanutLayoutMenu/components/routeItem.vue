<template>
    <component
        :is="menuComponent"
        v-if="!item.hidden"
        :item="routeData">
        <template v-if="routeData.children && routeData.children.length">
            <route-item
                v-for="route in routeData.children"
                :key="route.path"
                :item="route"
            >
            </route-item>
        </template>
    </component>
</template>
<script>
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";

export default {
    name: 'RouteItem',
    components: {SubMenu, MenuItem},
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            routeData: {}
        }
    },
    computed: {
        menuComponent() {
            if (this.handleItem()) {
                return 'MenuItem'
            } else {
                return 'SubMenu'
            }
        },
    },
    methods: {
        handleItem() {
            const getItem = function (route) {
                let children = route.children?.filter(item => !item.hidden);
                if (children?.length && children.length === 1 && !route.alwaysShow) {
                    return getItem(children[0]);
                }
                return {
                    ...route,
                    children
                };
            }
            //·Çhidden
            this.routeData = getItem(this.item);
            return !this.routeData.children?.length;
        }
    }
}
</script>
