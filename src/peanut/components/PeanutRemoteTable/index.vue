<template>
    <div class="peanut-remote-table-container">
        <div class="tool-bar" v-if="showToolBar">
            <div class="left">
                <slot name="toolLeft"/>
            </div>
        </div>
        <el-table
            class="peanut-remote-table-container-table"
            :data="tableData"
            :max-height="300"
            border
        >
            <slot name="columns"/>
        </el-table>
    </div>
</template>
<script>
import remoteTable from "../../mixins/remote-table"

export default {
    name: "PeanutRemoteTable",
    mixins: [remoteTable]
}
</script>
<style scoped lang="scss">
.peanut-remote-table-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tool-bar {
        min-height: 24px;
        padding: 8px 0;
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

