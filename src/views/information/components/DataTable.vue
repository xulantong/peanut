<template>
    <div class="DataTable">
        <el-table
            class="table"
            :data="tableData"
            border
            tooltip-effect="light"
        >
            <template v-for="({prop,label,width,minWidth}) in columns">
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
                            :edit="edit"
                            :column="column"
                            :index="$index"
                        >
                        </data-table-cell>
                    </template>
                </el-table-column>
            </template>
            <el-table-column
                v-if="edit"
                label="操作"
                min-width="80"
                fixed="right"
            >
                <template v-slot="{row,column,$index}">
                    <el-button type="text" size="mini" @click="appendRow">
                        <peanut-icon icon-name="appendRow(row,column,$index)"></peanut-icon>
                    </el-button>
                    <el-button type="text" size="mini" @click="deleteRow">
                        <peanut-icon icon-name="deleteRow(row,column,$index)"></peanut-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

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
        }
    },
    computed: {
        ...mapState('information', ['dataInfo']),
        tableData() {
            return this.dataInfo[this.dataIndex]
        }
    },
    methods: {
        appendRow(row,column,index) {
            console.log(row,column,index)
        },
        deleteRow(row,column,index) {
            console.log(row,column,index)
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

</style>
