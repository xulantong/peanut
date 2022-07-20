<template>
    <el-menu-item :index="item.fullPath">
        <peanut-icon v-if="item.meta.icon" :icon-name="item.meta.icon"></peanut-icon>
        <span slot="title">{{ item.meta && item.meta.title }}</span>
    </el-menu-item>
</template>
<script>
export default {
    name: 'MenuItem',
    props: {
        item: {
            type: Object,
            default: () => null
        }
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
</style>
