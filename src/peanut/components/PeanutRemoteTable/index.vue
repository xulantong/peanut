<template>
    <div class="peanut-remote-table-container" v-loading="loading">
        <div class="tool-bar" v-if="showToolBar">
            <div class="left">
                <slot name="toolLeft"/>
            </div>
            <div class="right">
                <slot name="toolRight"/>
            </div>
        </div>
        <el-table
            ref="table"
            class="peanut-remote-table-container-table"
            :data="tableData"
            tooltip-effect="light"
            :stripe="stripe"
            :border="border"
            :size="size"
            :fit="fit"
            :show-header="showHeader"
            :highlight-current-row="highlightCurrentRow"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :cell-class-name="cellClassName"
            :cell-style="cellStyle"
            :header-row-class-name="headerRowClassName"
            :header-row-style="headerRowStyle"
            :header-cell-class-name="headerCellClassName"
            :header-cell-style="headerCellStyle"
            @selection-change="handleSelectionChange"
        >
            <slot name="columns"/>
            <div slot="empty">
                <peanut-empty :description="description" :imgSize="imgSize"/>
            </div>
        </el-table>
        <div v-if="showPage&&total" class=" peanut-remote-table-container-footer ">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :background="showPageBackground"
                :page-sizes="[10, 20, 60, 80,100]"
                :page-size="pageSize"
                :layout="total <= 10 ? 'total' : 'total, prev, pager, next, sizes, jumper'"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import remoteTable from "../../mixins/remote-table"
import request from "../../utils/request";

export default {
    name: "PeanutRemoteTable",
    mixins: [remoteTable],
    data() {
        return {
            loading: false,
            tableData: [],
            tableParams: [],
            total: 0,
            currentPageSize: null,
            sort: []
        }
    },
    computed: {},
    beforeMount() {
        if (this.autoLoadGridData) {
            this.loadData();
        }
    },
    mounted() {
        this.table = this.$refs['table'];
    },
    methods: {
        loadData() {
            if (!this.listFunc) {
                return;
            }
            this.max = {};
            this.loading = true
            let params = Object.assign({}, {
                currentPage: this.currentPage,
                pageSize: this.currentPageSize || this.pageSize,
                sort: [...this.sort, ...this.defaultSort]
            }, this.queryParams);
            if (this.tableParams?.length) {
                params.table = this.tableParams.map(item => Object.assign({}, item))
            }
            let promise;
            if (typeof this.listFunc === 'function') {
                promise = this.listFunc(params);
            } else {
                promise = request({
                    url: this.listFunc,
                    method: "post",
                    data: params
                })
            }
            promise.then(res => {
                let {result, rowCount} = res;
                this.tableData = result;
                this.total = rowCount
                if (this.maxFields?.length) {
                    let maxObj = {};
                    result.forEach(row => {
                        this.maxFields.forEach(field => {
                            let fieldValue = row[field] + "";
                            if (maxObj[field] === undefined || maxObj[field] === null) {
                                maxObj[field] = fieldValue;
                            }
                            if (fieldValue.length > maxObj[field].length) {
                                maxObj[field] = fieldValue;
                            }
                        })
                    })
                    this.max = maxObj;
                }
            }).catch(err => {
                console.error(err)
            }).finally(() => {
                this.loading = false;
            });
        },
        reload(options = {clearFilter: true}) {
            this.currentPage = 1;
            if (options?.clearFilter) {
                this.clearFilter();
            }
            this.loadData();
        },
        clearFilter(columnKeys) {
            if (typeof columnKeys === "string") {
                columnKeys = [columnKeys]
            }
            if (Array.isArray(columnKeys)) {
                this.tableParams = this.tableParams?.filter(item => !columnKeys.includes(item.name))
            } else {
                this.tableParams = [];
            }
            this.$refs["table"].clearFilter(columnKeys);
        },

        handleSelectionChange(selection) {
            this.$emit("selectionChange", selection)
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.loadData()
        }
    }
}
</script>
<style scoped lang="scss">
.peanut-remote-table-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: white;

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

    &-footer {
        text-align: right;
        height: 48px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}

</style>

