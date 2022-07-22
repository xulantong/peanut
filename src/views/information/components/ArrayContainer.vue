<template>
    <div class="array-container">
        <div class="text-bold mb-8 mt-16">{{ label }}</div>
        <div class="ml-32 mb-8" v-for="(item,index) in dataInfo[dataIndex]">
            <array-item
                :dataIndex="dataIndex"
                :item="item"
                :index="index"
                :iconName="iconName"
                :edit="edit"
            >
            </array-item>
        </div>
    </div>
</template>
<script>
import ArrayItem from "./ArrayItem";
import {mapState} from "vuex";

export default {
    name: "ArrayContainer",
    components: {ArrayItem},
    props: {
        dataIndex: {
            type: String,
            default: []
        },
        iconName: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState("information", ["dataInfo"]),
    }
}

</script>
<style lang="scss" scoped>
.array-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}

</style>
