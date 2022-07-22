<template>
    <div class="AutoFitEditor">
        <el-input v-if="type === 'string'" v-model="modelValue"></el-input>
        <el-select v-else-if="type === 'enum'" clearable v-model="modelValue">
            <template v-for="item in dictOptions">
                <el-option :value="item.key" :label="item.value"></el-option>
            </template>
        </el-select>
        <el-cascader v-else-if="type === 'cascader'"
                     :options="dictOptions"
                     v-model="modelValue"
                     :show-all-levels="false"
                     :props="{
                      checkStrictly:true,
                      emitPath:false
                     }"
        ></el-cascader>
        <div class="value-wrapper">{{ showValue || '-' }}</div>
    </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: "AutoFitEditor",
    props: {
        value: {},
        showValue: {},
        type: {
            type: String,
            default: "string"
        },
        enumKey: {
            type: String,
            default: "string"
        },
    },
    computed: {
        ...mapState("information", ["dicts"]),
        dictOptions() {
            return this.dicts[this.enumKey]
        },
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

    .el-cascader,
    .el-select,
    .el-date-editor,
    .el-input-number,
    .el-autocomplete,
    .el-input,
    .el-textarea {
        position: absolute;
        top: -4px;
        right: 0;
        bottom: 0;
        left: 0;
        width: unset !important;
        height: fit-content;

        .el-select__input {
            margin-left: 4px;
        }

        .el-input__inner, .el-textarea__inner {
            padding: 0 10px !important;
            height: 100%;
            width: fit-content;
            font-size: 14px;
            font-weight: 400;
        }
    }

    .value-wrapper {
        padding: 0 25px;
    }

}

</style>
