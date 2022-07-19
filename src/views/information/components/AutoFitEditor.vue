<template>
    <div class="AutoFitEditor">
        <el-input v-model="modelValue"></el-input>
        <div class="value-wrapper">{{ showValue || '-' }}</div>
    </div>
</template>
<script>
export default {
    name: "AutoFitEditor",
    props: {
        value: {},
        showValue: {},
        type: {
            type: String,
            default: "string"
        },
        menu: {
            type: String,
            default: "string"
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
    mounted() {
    }

}

</script>
<style lang="scss" scoped>
.AutoFitEditor {
    display: flex;
    align-items: center;
    position: relative;
    word-break: break-all;

    .el-input,.el-textarea {
        position: absolute;
        top: -4px;
        right: 0;
        bottom: 0;
        left: 0;
        width: unset !important;
        height: fit-content;

        .el-input__inner, .el-textarea__inner {
            padding: 0 10px !important;
            height: 100%;
            width: fit-content;
            font-size: 14px;
            font-weight: 400;
        }
    }

    .value-wrapper {
        padding: 0 15px;
    }

}

</style>
