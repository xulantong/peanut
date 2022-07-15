<template>
    <div class="DataTableCell">
        <auto-fit-editor
            v-if="editable&&edit"
            :value.sync="value"
            :show-value="showValue">
        </auto-fit-editor>
        <div class="FiledItem-value" v-else>{{ showValue || '-' }}</div>
    </div>
</template>
<script>
import AutoFitEditor from "./AutoFitEditor";
import {mapState} from "vuex";

export default {
    name: "DataTableCell",
    components: {AutoFitEditor},
    props: {
        dataIndex: {
            type: String,
            default: ""
        },
        row: {
            type: Object,
            default: () => {
            }
        },
        edit: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        column: {},
        index: {
            type: Number,
            default: 0
        },
    },
    computed: {
        ...mapState("information", ['dataInfo']),
        value: {
            get() {
                return this.row[this.column.property]
            },
            set(val) {
                let arr = JSON.parse(JSON.stringify(this.dataInfo[this.dataIndex]))
                arr[this.index][this.column.property] = val
                let obj = Object.assign({}, this.dataInfo, {[this.dataIndex]: arr})
                this.$store.commit("information/setDataInfo",obj)
            }
        },
        showValue() {
            return this.value
        }
    }
}

</script>
<style lang="scss" scoped>

</style>
