<template>
    <div class="disco-remote-table-container" v-peanut-loading="loading">
        <div class="tool-bar" v-if="showToolBar">
            <div class="left">
                <slot name="toolLeft"/>
            </div>
            <div class="right">
                <slot name="toolRight" v-bind="bindProps"/>
            </div>
        </div>
        <el-table
            ref="table"
            size="mini"
            tooltip-effect="light"
            :height="autoHeight ? null : 100"
            :max-height="autoHeight ? maxHeight : null"
            :highlight-current-row="selectionType === 'single'"
            :data="list"
            :show-header="showHeader"
            :row-key="rowKey"
            :border="border"
            :stripe="stripe"
            :size="size"
            :fit="fit"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :cell-class-name="cellClassName"
            :cell-style="cellStyle"
            :header-row-class-name="headerRowClassName"
            :header-row-style="headerRowStyle"
            :header-cell-class-name="headerCellClassName"
            :header-cell-style="headerCellStyle"
            @selection-change="handleSelectionChange"
            @select="select"
            @select-all="selectAll"
            @current-change="handleSelectionChange"
            @sort-change="handleSortChange"
            @cell-dblclick="handleCellDbClick"
            @row-click="handleRowClick"
            filter-mode="remote"
            @filter-change="handleFilterChange"
            class="disco-remote-table-container-table">
            <el-table-column :fixed="selectBoxFixed" type="selection" width="32" v-if="selectionType === 'multiple'"
                             :selectable="handleSelectable"/>
            <el-table-column :fixed="rowNumberFixed" type="index" :index="indexMethod" :label="rowNumberName||'序号'"
                             align="center" header-align="center" width="60" v-if="rowNumber"/>
            <slot name="columns" v-bind="bindProps"/>
            <peanut-empty slot="empty" class="table-empty"/>
        </el-table>
        <div
            v-if="showPager"
            v-show="list && list.length"
            class="disco-remote-table-container-bottom">
            <div/>
            <el-pagination
                style="float: right"
                :layout="total <= 10 ? 'total, prev, pager, next' : 'total, prev, pager, next, sizes, jumper'"
                background
                :page-size="size||pageSize"
                :current-page="currentPage"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handlePageChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import request from "../../utils/request";
import {isArray} from '../../utils/validate'
import dayjs from "dayjs";
import remoteTable from "../../mixins/remote-table-d"

export default {
    name: "DiscoRemoteTable",
    mixins: [remoteTable],
    data() {
        return {
            list: [],
            currentPage: 1,
            currentPageSize: null,
            total: 0,
            loading: false,
            sort: [],
            tableParams: [],
            selection: [],
            max: {}
        };
    },
    watch: {
        pageSize: {
            handler(val) {
                this.currentPageSize = val;
            },
            immediate: true
        }
    },
    computed: {
        bindProps() {
            return {
                container: this,
                table: this.table,
                selection: this.selection,
                data: this.list,
                max: this.max
            };
        }
    },
    methods: {
        indexMethod(index) {
            return this.isRecordNumber ? index + 1 + this.currentPageSize * (this.currentPage - 1) : index + 1;
        },
        loadData() {
            if (!this.listFunc) {
                return;
            }
            this.max = {};
            this.loading = true;
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
                this.list = result;
                this.total = rowCount;
                this.$emit("data-loaded", result);
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
                this.$nextTick(()=>{
                    this.$refs.table.doLayout()
                })
            });
        },
        reload(options = {clearFilter: true}) {
            this.currentPage = 1;
            if (options?.clearFilter) {
                this.clearFilter();
            }
            this.loadData();
        },
        handleSelectionChange(selection) {
            if (this.selectionType) {
                let selected = null;
                if (isArray(selection)) {
                    selected = selection;
                } else if (this.selectionType === 'single') {
                    selected = selection ? [selection] : [];
                }
                if (selected) {
                    this.$emit("selection-change", selected);
                    this.selection = selected;
                }
            }
        },
        handleRowClick(val) {
            if (val) this.$emit("row-click", val);
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.loadData();
        },
        handleSizeChange(pageSize) {
            this.currentPageSize = pageSize;
            this.$emit("size-change", pageSize);
            this.$emit("update:pageSize", pageSize)
            this.currentPage = 1;
            this.loadData();
        },
        handleSortChange({prop, order}) {
            if (order) {
                this.sort = [{
                    name: prop,
                    order: order === "ascending" ? "asc" : "desc"
                }];
            } else {
                this.sort = [];
            }
            this.loadData()
        },
        handleFilterChange(filters) {
            this.tableParams = filters.filter(item => item.values.length).map(item => {
                return {
                    name: item.key,
                    value: item.values,
                    expression: item.type === "select" ? "eq" : "like"
                };
            })
            this.currentPage = 1;
            this.loadData();
        },
        showLoading() {
            this.loading = true;
        },
        hideLoading() {
            this.loading = false;
        },
        select(selection, row) {
            this.$emit("select", selection, row);
        },
        selectAll(selection) {
            this.$emit("select-all", selection);
        },
        clearSelection() {
            this.$refs['table'].clearSelection();
        },
        toggleRowSelection(row, selected) {
            this.$refs["table"].toggleRowSelection(row, selected);
        },
        toggleRowSelectionAt(index, selected) {
            this.$refs["table"].toggleRowSelection(this.list[index], selected);
        },
        setCurrentRow(row) {
            this.$refs["table"].setCurrentRow(row);
        },
        handleSelectable(row, index) {
            if (this.selectable) {
                return this.selectable(row, index)
            }
            return true;
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
        exportFile(exportAll = true, fileName) {
            if (!fileName) {
                if (typeof this.exportFileName === "string") {
                    fileName = this.exportFileName;
                } else if (typeof this.exportFileName === "function") {
                    fileName = this.exportFileName();
                } else {
                    fileName = dayjs().format("YYYY-MM-DD HH_mm_ss");
                }
            }
            if (!/\.xlsx$/.test(fileName)) {
                fileName += ".xlsx";
            }
            let params = Object.assign({}, {
                currentPage: this.currentPage,
                pageSize: this.size || this.pageSize,
                sort: [...this.sort, ...this.defaultSort],
                hasExport: true,
                hasExportCurrentPage: !exportAll,
                isDownload: true,
                isDownloadAll: exportAll
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
            promise.then(result => {
                let blob = new Blob([result]);
                if ('download' in document.createElement('a')) { // 非IE下载
                    let elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName);
                }
            });
        },
        getTableParamsAsObject(...arr) {
            let keys;
            if (arr?.length) {
                keys = arr;
            } else {
                keys = this.tableParams.map(item => item.name)
            }
            let mapKeys = keys.map(key => key.replace("[]", ""))
            let result = {};
            this.tableParams.forEach(item => {
                let index = mapKeys.indexOf(item.name);
                if (index !== -1) {
                    result[item.name] = /^.*\[]/.test(keys[index]) ? item.value : item.value[0]
                }
            })
            return result
        },
        handleCellDbClick(row, column, cell) {
            this.$emit("cell-dblclick", row, column, cell);
        }
    },
    beforeMount() {
        if (this.autoLoadGridData) {
            this.loadData();
        }
    },
    mounted() {
        this.table = this.$refs['table'];
    },
}
</script>
<style scoped lang="scss">
.disco-remote-table-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tool-bar {
        min-height: 48px;
        padding: 8px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        .left {
            flex: 1;
            width: 0;
        }

        .right {
            flex-shrink: 0;
        }
    }

    &-table {
        flex: 1;
        height: 0;
        position: relative !important;

        ::v-deep {

            .el-table__empty-block {
                position: relative;
                background-color: #FFFFFF;
                z-index: 1;
                border-bottom: 1px solid #ebeef5;

                .el-table__empty-text {
                    width: 200px;
                    position: sticky;
                    left: calc(50% - 100px);
                    right: calc(50% - 100px);
                    height: 100%;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
            }
        }
    }

    &-bottom {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;

        &::v-deep {

            .el-pagination {
                margin: 0;
                padding: 8px 0 0 0;
                font-size: 14px;

                .el-pagination__total {
                    margin-right: 8px;
                }

                .btn-prev,
                .btn-next {
                    width: 30px;
                    height: 30px;
                    margin: 0;
                }

                .btn-prev {
                    margin-right: 8px;
                }

                .el-pager {
                    display: inline-block;
                    overflow: hidden;

                    .btn-quickprev,
                    .btn-quicknext,
                    .number {
                        display: block;
                        float: left;
                        width: 30px;
                        height: 30px;
                        margin: 0 8px 0 0;
                        line-height: 30px;
                    }
                }

                .el-pagination__sizes {
                    margin-right: 0;
                    margin-left: 8px;

                    .el-input {
                        margin: 0;
                    }
                }

                .el-pagination__jump {
                    margin-left: 8px;
                }
            }
        }
    }
}

</style>
