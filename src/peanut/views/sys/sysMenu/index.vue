<template>
    <div class="sys-menu">
        <div class="sys-menu-left">
            <div class="sys-menu-left-header">菜单树</div>
            <div class="sys-menu-left-tree">
                <el-tree :data="menuTree" accordion node-key="id" :default-expanded-keys="['-1']"
                         :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
        <div class="sys-menu-right">
            <div class="sys-menu-right-header">
                <el-button type="success" :disabled="selection.length !== 1" @click="handleClickEdit('edit')">编辑
                </el-button>
                <el-button type="primary" @click="handleClickEdit('add')">新增</el-button>
                <el-button type="danger" :disabled="!selection.length" @click="handleClickDelete">删除</el-button>
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
            @close="formData = {meta: {}}"
            width="48%"
        >
            <el-form :model="formData" ref="form" :rules="rules" class="form" label-width="180px"
                     hide-required-asterisk>
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
                <el-form-item label="菜单图标(icon)" prop="['meta']['icon']" style="width: fit-content">
                    <el-input v-model="formData['meta']['icon']"></el-input>
                </el-form-item>
                <el-form-item label="是否顶部" prop="['meta']['isTop']" style="width: fit-content">
<!--                    <el-input v-model="formData['meta']['isTop']"></el-input>-->
                    <el-switch
                        v-model="formData['meta']['isTop']"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="text-right">
                <el-button plain @click="visible = false">取消</el-button>
                <el-button type="primary" @click="saveCallBack">保存</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import {changeMenuTree, getMenuTree} from "../../../api/sys";

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
            currentId: "-1",
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
            },
            saveCallBack: () => {

            }
        }
    },
    computed: {
        menuTree() {
            let obj = {
                text: '全部菜单',
                name: "all",
                id: "-1",
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
            this.currentId = val.id
            this.menuTable = val.children
        },
        handleSelectionChange(val) {
            this.selection = val
        },
        handleClickEdit(type) {
            this.visible = true
            if (type === 'add') {
                this.title = "新增菜单"
                this.formData = {
                    meta: {}
                }
                this.saveCallBack = () => {
                    let tree = this.changeTree(this.menuTree, (item) => item.id === this.currentId, (item) => item.children && item.children.push(this.formData));
                    changeMenuTree(tree[0].children).then(res => {
                        this.$message.success(res.msg)
                        this.getMenu()
                    }).catch(e => {
                        this.$message.error(e || e.msg)
                    })
                    this.visible = false
                }
            } else {
                this.title = "编辑菜单"
                this.formData = this.$deepCloneWithJson(this.selection[0])
                this.saveCallBack = () => {
                    let tree = this.changeTree(this.menuTree, (item) => item.id === this.formData.id, (item) => Object.assign(item, this.formData));
                    changeMenuTree(tree[0].children).then(res => {
                        this.$message.success(res.msg)
                        this.getMenu()
                    }).catch(e => {
                        this.$message.error(e || e.msg)
                    })
                    this.visible = false
                }
            }
        },
        handleClickDelete() {
            this.$confirm("确认删除路由吗？", "温馨提示").then(() => {
                let tree = this.$deepCloneWithJson(this.menuTree)
                this.selection.map(item => item.id).forEach(select => {
                    tree = this.changeTree(tree, item => item.id === select, item => item.splice(item.findIndex(item1 => item1.id === select), 1), "children", "parent")
                })
                changeMenuTree(tree[0].children).then(res => {
                    this.$message.success(res.msg)
                    this.getMenu()
                }).catch(e => {
                    this.$message.error(e || e.msg)
                }).finally(() => {
                    this.visible = false
                })
            }).catch(() => {

            })
        },
        changeTree(targetTree, filter, callBack, children = 'children', type = "children") {
            if (!targetTree) {
                return null
            }
            let tree = this.$deepCloneWithJson(targetTree)
            tree.forEach(item => {
                if (filter(item)) {
                    if (type === "children") {
                        callBack(item)
                    } else {
                        callBack(tree)
                    }
                } else {
                    item[children] = item[children] && this.changeTree(item[children], filter, callBack, children, type)
                }
            })
            return tree
        },
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
        //justify-content: space-between;
        flex-wrap: wrap;
    }
}

</style>
