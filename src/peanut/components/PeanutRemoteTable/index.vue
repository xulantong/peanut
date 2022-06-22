<template>
    <div class="peanut-remote-table-container">
        <div class="tool-bar" v-if="showToolBar">
            <div class="left">
                <slot name="toolLeft"/>
            </div>
            <div class="right">
                <slot name="toolRight"/>
            </div>
        </div>
        <el-table
            class="peanut-remote-table-container-table"
            :data="tableData"
            tooltip-effect="light"
            height="100"
            :max-height="null"
            border
            @selection-change="handleSelectionChange"
        >
            <slot name="columns"/>
        </el-table>
    </div>
</template>
<script>
import remoteTable from "../../mixins/remote-table"

export default {
    name: "PeanutRemoteTable",
    mixins: [remoteTable],
    methods: {
        handleSelectionChange(selection) {
            this.$emit("selectionChange", selection)
        }
    }
}
</script>
<style scoped lang="scss">
.peanut-remote-table-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tool-bar {
        min-height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        .left {
            flex: 1;
            width: 0;
        }
    }

    &-table {
        flex: 1;
        height: 0;
    }
}

</style>

