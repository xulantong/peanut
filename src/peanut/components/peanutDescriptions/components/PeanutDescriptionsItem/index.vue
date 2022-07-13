<template>
    <auto-fit-editor
        :value.sync="value"
        :type="type"
        :edit="edit"
    >
    </auto-fit-editor>
</template>
<script>
import AutoFitEditor from "../AutoFitEditor";

export default {
    name: "peanutDescriptionsItem",
    components: {AutoFitEditor},
    props: {
        descriptionData: {
            type: Object,
            default: {}
        },
        edit: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ""
        },
        dataIndex: {
            type: String,
            default: "name"
        },
        type: {
            type: String,
            default: ""
        },

    },
    data() {
        return {
            dataObj: this.descriptionData
        }
    },
    computed: {
        value: {
            get() {
                return this.descriptionData[this.dataIndex]
            },
            set(val) {
                this.$emit('update:descriptionData', Object.assign({}, this.descriptionData, {[this.dataIndex]: val}))
                console.log(Object.assign({}, this.descriptionData, {[this.dataIndex]: val}))
            }
        }
    },
    watch: {
        descriptionData() {
            console.log(this.descriptionData)
        }
    }

}

</script>
<style lang="scss" scoped>

</style>
