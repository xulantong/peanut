<template>
    <el-menu-item :index="item.fullPath">
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
