<template>
    <el-submenu
        ref="subMenu"
        :index="item.path"
        :popper-append-to-body="false">
        <template slot="title">
            <span>{{item.meta && item.meta.title}}</span>
        </template>
        <slot/>
    </el-submenu>
</template>
<script>

export default {
    name: 'Submenu',
    props: {
        item: {
            type: Object,
            default: () => null
        }
    }
}
</script>
