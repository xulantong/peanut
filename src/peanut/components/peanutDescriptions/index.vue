<template>
    <el-descriptions
        :border="border"
        :column="column"
        :direction="direction"
        :size="size"
        :title="title"
        :extra="extra"
        :colon="colon"
    >
        <slot></slot>
    </el-descriptions>
</template>
<script>
import descriptions from "../../mixins/descriptions"

export default {
    name: "peanutDescriptions",
    mixins: [descriptions],
    data() {
        return {
            edit: false
        }
    },
    methods: {
        handleEdit() {
            this.edit = true
        },
        cancelEdit() {
            this.edit = false
        },
        handleSave() {
            this.edit = false
        }
    },
    mounted() {
        console.log(this.descriptionConfig)
    },
    computed: {
        originData: {
            get() {
                return this.descriptionData
            },
            set(val) {
                this.$emit('update:descriptionData', val)
            }
        }
    }

}

</script>
<style lang="scss" scoped>
/deep/ .el-descriptions-item__container, .el-descriptions-item__label {
    display: flex;
    align-items: center;
}
</style>
