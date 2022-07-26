<template>
    <div class="sys-menu">
        <div class="sys-menu-left">
            <div class="sys-menu-left-header">菜单树</div>
            <div class="sys-menu-left-tree">
                <el-tree :data="menuTree" accordion :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
        <div class="sys-menu-right">
            <div class="sys-menu-right-header">
                <el-button type="success" :disabled="selection.length !== 1" @click="handleClickEdit">编辑</el-button>
                <el-button type="primary">新增</el-button>
                <el-button type="danger" :disabled="!selection.length">删除</el-button>
            </div>
            <div class="sys-menu-right-table">
                <el-table
                    class="h-100"
                    border
                    :data="menuTable"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="60"
                    >
                    </el-table-column>
                    <el-table-column
                        label="编码"
                        prop="name"
                    >
                    </el-table-column>
                    <el-table-column
                        label="路由路径"
                        prop="path"
                    >
                    </el-table-column>
                    <el-table-column
                        label="菜单名称"
                        prop="text"
                    >
                    </el-table-column>

                </el-table>
            </div>
        </div>
        <el-dialog
            :visible.sync="visible"
            :title="title"
            width="48%"
        >
            <el-form :model="formData" ref="form" :rules="rules" class="form" label-width="auto" hide-required-asterisk>
                <el-form-item label="编码(name)" prop="name" style="width: fit-content">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="路由路径(path)" prop="path" style="width: fit-content">
                    <el-input v-model="formData.path"></el-input>
                </el-form-item>
                <el-form-item label="组件路径(componentPath)" prop="componentPath" style="width: fit-content">
                    <el-input v-model="formData.componentPath"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称(text)" prop="text" style="width: fit-content">
                    <el-input v-model="formData.text"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标(icon)" prop="icon" style="width: fit-content">
                    <el-input v-model="formData['meta']['icon']"></el-input>
                </el-form-item>
                <el-form-item label="是否顶部" prop="isTop" style="width: fit-content">
                    <el-input v-model="formData['meta']['isTop']"></el-input>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>

</template>
<script>
import {getMenuTree} from "../../../api/sys";

export default {
    name: "sysMenu",
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'text'
            },
            routes: [],
            menuTable: [],
            selection: [],
            visible: false,
            title: "",
            formData: {
                meta: {}
            },
            rules: {
                name: [
                    {
                        required: true, message: "请输入编码", trigger: ["input", "change"]
                    }
                ],
                path: [
                    {
                        required: true, message: "请输入菜单路径", trigger: ["input", "change"]
                    }
                ],
                componentPath: [
                    {
                        required: true, message: "请输入组件路径", trigger: ["input", "change"]
                    }
                ],
                text: [
                    {
                        required: true, message: "请输入菜单图标", trigger: ["input", "change"]
                    }
                ]
            }
        }
    },
    computed: {
        menuTree() {
            let obj = {
                text: '全部菜单',
                children: this.routes
            }
            this.menuTable = this.routes
            return [obj]
        },
    },
    mounted() {
        this.getMenu()
    },
    methods: {
        getMenu() {
            getMenuTree().then(res => {
                this.routes = res.result
            })
        },
        handleNodeClick(val) {
            this.menuTable = val.children || []
        },
        handleSelectionChange(val) {
            this.selection = val
        },
        handleClickEdit() {
            this.visible = true
            this.title = "编辑菜单"
            this.formData = this.$deepCloneWithJson(this.selection[0])
            console.log(this.formData)
        }
    }
}

</script>
<style lang="scss" scoped>
.sys-menu {
    display: flex;

    &-left {
        width: 0;
        flex: 0.2;
        border-radius: 4px;
        background-color: #FFFFFF;
        margin-right: 8px;

        &-header {
            height: 32px;
            padding: 8px;
            background-color: #5EADFF;
            display: flex;
            align-items: center;
        }
    }

    &-right {
        width: 0;
        flex: 0.8;
        border-radius: 4px;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;

        &-header {
            height: 48px;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-bottom: 1px #f0f0f0 solid;
        }

        &-table {
            height: 0;
            flex: 1;
            padding: 8px;
        }

    }
}

::v-deep {
    .el-dialog__header {
        border-bottom: 1px solid #f0f0f0;
    }

    .form {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
}

</style>
