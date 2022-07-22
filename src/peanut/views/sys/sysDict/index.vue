<template>
    <div class="sys-dict">
        <div class="sys-dict-left">
            <div class="sys-dict-left-search">
                <peanut-search-form
                    :show-button="true"
                    @handleSearch="handleSearch"
                    @handleReset="handleReset"
                >
                    <div>筛选条件：
                        <el-input style="width: 150px"></el-input>
                    </div>
                </peanut-search-form>
            </div>
            <div class="sys-dict-left-table">
                <peanut-remote-table
                    ref="leftTable"
                    class="h-100"
                    show-tool-bar
                    :list-func="getListLeft"
                    @selectionChange="selectionChange"
                    @row-click="handleRowClick"
                >
                    <div slot="toolLeft" class="mark-title">字典列表</div>
                    <div slot="toolRight" class="pr-8">
                        <el-button type="primary" @click="handleAppend('left')">新增</el-button>
                        <el-button type="danger" @click="handleDelete('left')">删除</el-button>
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
                >
                    <div slot="toolLeft" class="mark-title">字典数据</div>
                    <div slot="toolRight" class="pr-8">
                        <el-button type="primary" @click="handleAppend('right')">新增</el-button>
                        <el-button type="danger" @click="handleDelete('left')">删除</el-button>
                    </div>

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
                    <el-input v-model="leftModel.key"></el-input>
                </el-form-item>
                <el-form-item label="值：" prop="value"
                              :rules="[{required:true,message:'value不能为空',trigger:['input','change']}]">
                    <el-input v-model="leftModel.value"></el-input>
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
import {getDict} from "../../../api/sysDict";

export default {
    name: "sysDict",
    data() {
        return {
            visibleLeft: false,
            visibleRight: false,
            title: "",
            leftModel: {},
            rightModel: {},
            selection: [],
            submitCallback: () => {
            }
        }
    },
    mounted() {
        this.$refs.leftTable.reload()
    },
    methods: {
        getListLeft(params) {
            return getDict(params)
        },
        getListRight(params) {
        },
        handleSearch() {

        },
        handleReset() {

        },
        //获得选中项
        selectionChange(selection) {
            this.selection = selection
        },
        handleRowClick(val) {
            console.log(val)
        },
        handleAppend(type) {
            this.title = "新增"
            if (type === 'left') {
                this.visibleLeft = true
                this.submitCallback = () => {
                    this.$refs.leftModel.validate(valid => {
                        if (valid) {
                            console.log(this.leftModel)
                            this.$message.success("成功")
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
                            console.log(this.rightModel)
                            this.$message.success("成功")
                        } else {
                            return false
                        }
                    })
                }
            }
        },
        handleDelete(type) {

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
