<template>
    <div class="sys-dict">
        <div class="sys-dict-left">
            <div class="sys-dict-left-search">
                <peanut-search-form
                    :show-button="true"
                    @handleSearch="handleSearch"
                    @handleReset="handleReset"
                >
                    <div>字典名称：
                        <el-select
                            v-model="codes"
                            clearable
                            filterable
                            collapse-tags
                            multiple
                        >
                            <template v-for="item in codeOptions">
                                <el-option
                                    :label="item.name"
                                    :value="item.code"
                                ></el-option>
                            </template>
                        </el-select>
                    </div>
                </peanut-search-form>
            </div>
            <div class="sys-dict-left-table">
                <peanut-remote-table
                    ref="leftTable"
                    class="h-100"
                    show-tool-bar
                    :list-func="getListLeft"
                    @selectionChange="selectionLeftChange"
                    @row-click="handleRowClick"
                >
                    <div slot="toolLeft" class="mark-title">字典列表（点击每行查看字典键值信息）</div>
                    <div slot="toolRight" class="pr-8">
                        <el-button type="primary" @click="handleAppend('left')">新增</el-button>
                        <el-button type="danger" :disabled="!selectionLeft.length" @click="handleDelete('left')">删除
                        </el-button>
                    </div>
                    <template slot="columns">
                        <el-table-column type="selection" width="40" fixed/>
                        <el-table-column
                            prop="code"
                            label="字典编码"
                        ></el-table-column>
                        <el-table-column
                            prop="name"
                            label="字典名称"
                        ></el-table-column>
                        <el-table-column
                            prop="info"
                            label="描述"
                        ></el-table-column>
                    </template>

                </peanut-remote-table>
            </div>
        </div>
        <div class="sys-dict-right">
            <div class="sys-dict-right-table">
                <peanut-remote-table
                    ref="rightTable"
                    class="h-100"
                    show-tool-bar
                    :list-func="getListRight"
                    @selectionChange="selectionRightChange"
                >
                    <div slot="toolLeft" class="mark-title">字典数据</div>
                    <div slot="toolRight" class="pr-8">
                        <el-button type="primary" @click="handleAppend('right')">新增</el-button>
                        <el-button type="danger" :disabled="!selectionRight.length" @click="handleDelete('right')">删除
                        </el-button>
                    </div>
                    <template slot="columns">
                        <el-table-column type="selection" width="40" fixed/>
                        <el-table-column
                            prop="key"
                            label="键"
                        ></el-table-column>
                        <el-table-column
                            prop="value"
                            label="值"
                        ></el-table-column>
                    </template>
                </peanut-remote-table>
            </div>
        </div>
        <el-dialog
            :title="title"
            width="30%"
            @close="leftModel = {}"
            :visible.sync="visibleLeft"
        >
            <el-form :model="leftModel" ref="leftModel" label-width="100px">
                <el-form-item label="字典编码：" prop="code"
                              :rules="[{required:true,message:'字典编码不能为空',trigger:['input','change']}]">
                    <el-input v-model="leftModel.code"></el-input>
                </el-form-item>
                <el-form-item label="字典名称：" prop="name"
                              :rules="[{required:true,message:'字典名称不能为空',trigger:['input','change']}]">
                    <el-input v-model="leftModel.name"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="code">
                    <el-input type="textarea" autosize v-model="leftModel.info"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button plain @click="visibleLeft = false">取 消</el-button>
                <el-button type="primary" @click="submitCallback">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="title"
            width="30%"
            @close="rightModel = {}"
            :visible.sync="visibleRight"
        >
            <el-form :model="rightModel" ref="rightModel" label-width="80px">
                <el-form-item label="键：" prop="key"
                              :rules="[{required:true,message:'key不能为空',trigger:['input','change']}]">
                    <el-input v-model="rightModel.key"></el-input>
                </el-form-item>
                <el-form-item label="值：" prop="value"
                              :rules="[{required:true,message:'value不能为空',trigger:['input','change']}]">
                    <el-input v-model="rightModel.value"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button plain @click="visibleRight = false">取 消</el-button>
                <el-button type="primary" @click="submitCallback">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    appendDict,
    appendValue,
    deleteDict,
    deleteValue,
    getAllDict,
    getDict,
    getDictValue
} from "../../../api/sysDict";

export default {
    name: "sysDict",
    data() {
        return {
            codes: [],
            codeOptions: [],
            visibleLeft: false,
            visibleRight: false,
            title: "",
            leftModel: {},
            rightModel: {},
            selectionLeft: [],
            selectionRight: [],
            currentRow: {},
            submitCallback: () => {
            }
        }
    },
    mounted() {
        this.getDuctOptions()
        this.$refs.leftTable.reload()
    },
    methods: {
        getDuctOptions() {
            getAllDict().then(res => {
                this.codeOptions = res.result || []
            })
        },
        getListLeft(params) {
            return getDict({...params, codes: this.codes}).then(res => {
                this.currentRow = res?.result[0]
                this.$refs.rightTable.reload()
                this.getDuctOptions()
                return res
            })
        },
        getListRight(params) {
            return getDictValue({...params, code: this.currentRow.code})
        },
        handleSearch() {
            this.$refs.leftTable.reload()
        },
        handleReset() {
            this.codes = []
        },
        //获得选中项
        selectionLeftChange(selection) {
            this.selectionLeft = selection
        },
        selectionRightChange(selection) {
            this.selectionRight = selection
        },
        handleRowClick(val) {
            this.currentRow = val
            this.$refs.rightTable.reload()
        },
        handleAppend(type) {
            this.title = "新增"
            if (type === 'left') {
                this.visibleLeft = true
                this.submitCallback = () => {
                    this.$refs.leftModel.validate(valid => {
                        if (valid) {
                            console.log(this.leftModel)
                            appendDict(this.leftModel).then(res => {
                                this.$message.success(res.msg)
                            }).catch(e => {
                                this.$message.error(e)
                            }).finally(() => {
                                this.visibleLeft = false
                                this.$refs.leftTable.reload()
                            })
                        } else {
                            return false
                        }
                    })
                }
            } else {
                this.visibleRight = true
                this.submitCallback = () => {
                    this.$refs.rightModel.validate(valid => {
                        if (valid) {
                            appendValue({code: this.currentRow.code, ...this.rightModel}).then(res => {
                                this.$message.success(res.msg)
                            }).catch(e => {
                                this.$message.error(e)
                            }).finally(() => {
                                this.visibleRight = false
                                this.$refs.rightTable.reload()
                            })
                        } else {
                            return false
                        }
                    })
                }
            }
        },
        handleDelete(type) {
            if (type === 'left') {
                let params = {
                    codes: this.selectionLeft.map(item => item.code)
                }
                deleteDict(params).then(res => {
                    this.$message.success(res.msg)
                }).catch(e => {
                    this.$message.error(e)
                }).finally(() => {
                    this.$refs.leftTable.reload()
                })
            } else {
                let params = {
                    keys: this.selectionRight.map(item => item.key),
                    code: this.currentRow.code
                }
                deleteValue(params).then(res => {
                    this.$message.success(res.msg)
                }).catch(e => {
                    this.$message.error(e)
                }).finally(() => {
                    this.$refs.rightTable.reload()
                })

            }
        }
    }
}

</script>
<style lang="scss" scoped>
.sys-dict {
    height: 100%;
    display: flex;

    &-left {
        width: 0;
        flex: 0.6;
        display: flex;
        margin-right: 8px;
        flex-direction: column;

        &-table {
            margin-top: 8px;
            height: 0;
            flex: 1;
        }
    }

    &-right {
        width: 0;
        flex: 0.4;
        display: flex;
        flex-direction: column;

        &-table {
            height: 0;
            flex: 1;
        }
    }

}

::v-deep {
    .el-dialog__header {
        border-bottom: 1px solid #f0f0f0;
    }
}

</style>
