<template>
    <div class="DataTableCell">
        <auto-fit-editor
            v-if="editable&&edit"
            :value.sync="value"
            :type="type"
            :dataIndex="dataIndex"
            :index="index"
            :enumKey="enumKey"
            :options="options"
            :show-value="showValue">
        </auto-fit-editor>
        <div class="FiledItem-value" v-else>{{ showValue || '-' }}</div>
    </div>
</template>
<script>
import AutoFitEditor from "./AutoFitEditor";
import {mapState} from "vuex";
import dayjs from "dayjs";

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
        type: {
            type: String,
            default: "string"
        },
        enumKey: {
            type: String,
            default: "string"
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
        options:{}
    },
    computed: {
        ...mapState("information", ['dataInfo','dicts']),
        value: {
            get() {
                return this.row[this.column.property]
            },
            set(val) {
                let arr = JSON.parse(JSON.stringify(this.dataInfo[this.dataIndex]))
                arr[this.index][this.column.property] = val
                let obj = Object.assign({}, this.dataInfo, {[this.dataIndex]: arr})
                this.$store.dispatch("information/setDataInfo",obj)
            }
        },
        showValue() {
            if (this.type === 'cascader') {
                if (this.dicts[this.enumKey]) {
                    return this.$filterTree(this.dicts[this.enumKey], (obj) => obj.value === this.value)[0]?.label
                }

            } else if (this.type === 'enum') {
                return this.dicts[this.enumKey]?.find(item => item.key === this.value)?.value
            } else if (this.type === 'date') {
                return dayjs(parseInt(this.value)).format("YYYY-MM-DD")
            }
            return this.value
        }
    }
}

</script>
<style lang="scss" scoped>

</style>
