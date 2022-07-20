<template>
    <div class="FiledItem">
        <div class="FiledItem-label text-bold">{{ label }}:</div>
        <auto-fit-editor
            v-if="editable&&edit"
            :value.sync="value"
            :type="type"
            :enumKey="enumKey"
            :showValue="showValue"
        >
        </auto-fit-editor>
        <div class="FiledItem-value" v-else>{{ showValue || '-' }}</div>
    </div>
</template>
<script>
import AutoFitEditor from "./AutoFitEditor";
import {mapState} from "vuex";

export default {
    name: "FiledItem",
    components: {AutoFitEditor},
    props: {
        dataIndex: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        showMode: {
            type: Number,
            default: 0
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
        edit: {
            type: Boolean,
            default: false
        }
    },
    inject: ["contentResolver"],

    created() {
        this.contentResolver.fieldItems[this.dataIndex] = this;
    },
    computed: {
        ...mapState('information', ['dataInfo', 'dicts']),
        value: {
            get() {
                return this.dataInfo[this.dataIndex]
            },
            set(val) {
                let obj = Object.assign({}, this.dataInfo, {[this.dataIndex]: val})
                this.$store.dispatch("information/setDataInfo", obj)
            }
        },
        showValue() {
            if (this.type === 'cascader') {
                if(this.dicts[this.enumKey]){
                    return  this.$filterTree(this.dicts[this.enumKey], (obj) => obj.value === this.value)[0]?.label
                }

            }
            return this.value
        }
    },
}

</script>
<style lang="scss" scoped>
.FiledItem {
    height: 32px;
    margin-right: 24px;
    display: flex;
    align-items: center;

    &-label {
        white-space: nowrap;
        margin-right: 16px;
    }

    &-value {
        display: flex;
        align-items: center;
        padding: 0 4px;
        border-bottom: 2px #BFBFBF solid;
    }

}

</style>
