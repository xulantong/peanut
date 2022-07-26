<template>
    <el-submenu
        ref="subMenu"
        :index="item.path"
        :popper-append-to-body="false">
        <template slot="title">
            <peanut-icon v-if="item.meta.icon" :icon-name="item.meta.icon"></peanut-icon>
            <span>{{ item.text || item.meta.title }}</span>
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
