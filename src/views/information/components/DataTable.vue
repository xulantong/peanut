<template>
    <div class="DataTable">
        <el-table
            class="table"
            :data="tableData"
            border
            tooltip-effect="light"
        >
            <template v-for="({prop,label,width,minWidth,editable,type,enumKey}) in columns">
                <el-table-column
                    :prop="prop"
                    :width="width"
                    :min-width="minWidth"
                    :label="label"
                    show-overflow-tooltip
                >
                    <template v-slot="{row,column,$index}">
                        <data-table-cell
                            :data-index="dataIndex"
                            :row="row"
                            :type="type"
                            :enumKey="enumKey"
                            :edit="edit"
                            :column="column"
                            :index="$index"
                            :editable="editable"
                        >
                        </data-table-cell>
                    </template>
                </el-table-column>
            </template>
            <el-table-column
                v-if="edit"
                label="操作"
                width="180"
                fixed="right"
            >
                <template v-slot="{row,column,$index}">
                    <el-button type="text" size="mini" @click="appendRow(row,column,$index)">
                        <peanut-icon icon-name="appendRow"></peanut-icon>
                    </el-button>
                    <el-button type="text" size="mini" @click="deleteRow(row,column,$index)">
                        <peanut-icon icon-name="deleteRow"></peanut-icon>
                    </el-button>
                    <el-button type="text" size="mini" @click="clearRow(row,column,$index)">
                        <peanut-icon icon-name="clearRow"></peanut-icon>
                    </el-button>
                    <el-button type="text" size="mini" @click="showDetail(row,column,$index)">
                        <peanut-icon icon-name="showDetail"></peanut-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="详细信息"
            :visible.sync="dialogVisible"
            width="40%">
            <div class="detail-container">
                <div
                    class="item"
                    v-for="item in columns"
                    :key="item.dataIndex"
                >
                    <div class="left text-bold">{{item.label}}</div>
                    <div class="right">{{row[item.queryIndex]}}</div>
                </div>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import {mapState} from "vuex";
import DataTableCell from "./DataTableCell";

export default {
    name: "DataTable",
    components: {DataTableCell},
    props: {
        columns: {
            type: Array,
            default: []
        },
        dataIndex: {
            type: String,
            default: ""
        },
        edit: {
            type: Boolean,
            default: false
        },

    },
    data() {
        return {
            row: {},
            dialogVisible: false,
        }
    },
    computed: {
        ...mapState('information', ['dataInfo']),
        tableData() {
            return this.dataInfo[this.dataIndex]
        }
    },
    methods: {
        appendRow(row, column, index) {
            this.dataInfo[this.dataIndex]?.splice(index + 1, 0, {})
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
        deleteRow(row, column, index) {
            this.dataInfo[this.dataIndex]?.splice(index, 1)
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
        clearRow(row, column, index){
            this.dataInfo[this.dataIndex]?.splice(index, 1, {})
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
        showDetail(row, column, index) {
            this.dialogVisible = true
            this.row = JSON.parse(JSON.stringify(row))
        }
    }
}

</script>
<style lang="scss" scoped>
.DataTable {
    width: 100%;
    display: flex;

    .table {
        width: 0;
        flex: 1;

    }
}

.detail-container {
    .item{
        display: flex;
        .left{
            width: 100px;
        }
        .right{
            width: 0;
            flex: 1;
        }
        &+.item{
            margin-top: 12px;
        }
    }
}

</style>
