<template>
    <div class="AutoFitEditor">
        <template v-if="edit">
            <el-input v-if="type === 'string'" size="mini" v-model="modelValue"></el-input>
        </template>
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
    position: relative;
    line-height: 28px;

    .el-cascader,
    .el-select,
    .el-date-editor,
    .el-input-number,
    .el-autocomplete,
    .el-input {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: unset !important;
        line-height: 28px;

        .el-select__input {
            margin-left: 4px;
        }

        .el-input__inner {
            padding: 0 10px !important;
            height: 100%;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
        }
    }


}

</style>
