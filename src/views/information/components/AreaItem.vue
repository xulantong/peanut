<template>
    <div class="area-item">
        <div class="area-item-label text-bold mr-16">{{ label }}:</div>
        <auto-fit-editor
            v-if="editable&&edit"
            :type="type"
            :menu="menu"
            :value.sync="value"
            :show-value="showValue">
        </auto-fit-editor>
        <div class="area-item-value" v-else>{{ showValue || '-' }}</div>
    </div>

</template>
<script>
import AutoFitEditor from "./AutoFitEditor";
import {mapState} from "vuex";

export default {
    name: "AreaItem",
    components: {AutoFitEditor},
    props: {
        type: {
            type: String,
            default: "string"
        },
        menu: {
            type: String,
            default: "string"
        },
        item: {
            type: Object,
            default: {}
        },
        index: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ""
        },
        queryIndex: {
            type: String,
            default: ""
        },
        dataIndex: {
            type: String,
            default: ""
        },
        editable: {
            type: Boolean,
            default: true
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState('information', ['dataInfo']),
        value: {
            get() {
                return this.item[this.queryIndex]
            },
            set(val) {
                let arr = JSON.parse(JSON.stringify(this.dataInfo[this.dataIndex]))
                arr[this.index][this.queryIndex] = val
                let obj = Object.assign({}, this.dataInfo, {[this.dataIndex]: arr})
                this.$store.dispatch("information/setDataInfo", obj)
            }
        },
        showValue() {
            return this.value
        }
    }

}

</script>
<style lang="scss" scoped>
.area-item {
    display: flex;
    white-space: nowrap;
    margin-right: 24px;

    &-value {
        white-space: normal;
    }

}

</style>
