<template>
    <div class="AutoFitEditor">
        <div class="input-item" v-if="edit">
            <el-input v-if="type === 'string'" size="mini" v-model="modelValue"></el-input>
        </div>
        <div v-else>{{ modelValue || "-" }}</div>
    </div>
</template>
<script>
export default {
    name: "AutoFitEditor",
    props: {
        value: {},
        type: {
            type: String,
            default: 'string'
        },
        edit: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        modelValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            }
        }
    },

}

</script>
<style lang="scss" scoped>
.AutoFitEditor {
    line-height: 28px;
}

</style>
