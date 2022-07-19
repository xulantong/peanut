<template>
    <div class="array-item">
        <peanut-icon :icon-name="iconName" class="doubleRight" :size="25"></peanut-icon>
        <auto-fit-editor
            v-if="editable&&edit"
            :value.sync="value"
            :showValue="showValue"
        >
        </auto-fit-editor>
        <div class="array-item-value" v-else>{{ showValue || '-' }}</div>
    </div>
</template>
<script>
import AutoFitEditor from "./AutoFitEditor";
import {mapState} from "vuex";

export default {
    name: "ArrayItem",
    components: {AutoFitEditor},
    props: {
        dataIndex: {
            type: String,
            default: ""
        },
        iconName: {
            type: String,
            default: "doubleRight"
        },
        item: {
            type: String,
            default: ""
        },
        index: {
            type: Number,
            default: 0
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
        ...mapState("information", ["dataInfo"]),
        value: {
            get() {
                return this.item
            },
            set(val) {
                console.log(val)
                let obj = JSON.parse(JSON.stringify(this.dataInfo))
                obj[this.dataIndex][this.index] = val
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
.array-item {
    margin-right: 32px;
    display: flex;
    align-items: flex-start;

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
    .doubleRight{
        border-radius: 4px;
        padding: 4px;
    }
}

</style>
