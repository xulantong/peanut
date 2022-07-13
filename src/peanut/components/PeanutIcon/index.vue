<template>
    <img :src="url" :style="style">
</template>
<script>
const icons = require.context("@/peanut/icons", false, /.*\.svg/)
const otherIcons = require.context("@/icons", false, /.*\.svg/)
export default {
    name: "peanutIcon",
    props: {
        iconName: {
            type: String,
            default: ""
        },
        size: {
            type: Number,
            default: 20
        }
    },
    computed: {
        url() {
            let url = `./${this.iconName}.svg`
            return icons.keys().includes(url) ? icons(url) : otherIcons(url)
        },
        style() {
            return {
                width: this.size + 'px',
                height: this.size + 'px',
                marginRight: '8px'
            }
        }
    }
}

</script>
<style lang="scss" scoped>

</style>
