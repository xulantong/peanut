<template>
    <div class="todo-list p-flex flex-column">

        <div class="p-flex justify-content-center align-items-center text-bolder p-16 font-bolder"
             style="background-color: rgba(0,135,255,0.15);border-radius: 4px">
            待办事项
        </div>
        <div class="todo-list-content px-8 pt-16 pb-8 mt-8">
            <div class="todo-list-content-card">
                <el-row :gutter="8">
                    <el-col :span="6" v-for="item in cardData"
                            :key="item.workCode">
                        <todo-card
                            v-bind="item"
                            :class="{'active':activateCard === item.workCode}"
                            @click.native="handleCardClick(item.workCode)"
                        ></todo-card>
                    </el-col>
                </el-row>
            </div>
            <div class="todo-list-content-table mt-8">
                <peanut-remote-table
                    show-tool-bar
                    ref="table"
                    class="h-100"
                    :list-func="getList"
                    @selectionChange="selectionChange"
                >
                    <div slot="toolLeft" class="mark-title">事项列表</div>
                    <div slot="toolRight" class="mr-8 p-flex justify-content-center align-items-center">
                        <el-button size="small" type="danger" v-show="activateCard==='complete'"
                                   :disabled="cardData[3]&&cardData[3].workCount===0"
                                   @click="handleDeleteAll">全部删除
                        </el-button>
                        <el-button size="small" type="danger" :disabled="!selection.length" @click="handleDelete">删
                            除
                        </el-button>
                        <el-button size="small" type="primary" @click="handleECheck">新 增</el-button>
                        <el-button size="small" type="success" :disabled="!selection.length"
                                   v-if="activateCard !== 'complete'"
                                   @click="handleComplete">完 成
                        </el-button>
                    </div>
                    <template slot="columns">
                        <el-table-column type="selection" width="40" fixed>
                        </el-table-column>
                        <el-table-column type="index" width="60" label="序号" fixed></el-table-column>
                        <el-table-column
                            label="事项类型"
                            show-overflow-tooltip
                            width="150"
                            prop="workName"
                        />
                        <el-table-column
                            label="事项内容"
                            show-overflow-tooltip
                            min-width="190"
                            prop="content"
                        />
                        <el-table-column
                            label="更新时间"
                            sortable
                            show-overflow-tooltip
                            min-width="100"
                            prop="updataTime"
                        >
                            <template v-slot="{row}">
                                {{ dayjs(row.updataTime).format("YYYY-MM-DD HH:mm:ss") }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="80"
                        >
                            <template v-slot="{row}">
                                <el-button @click="handleECheck(row)" type="text">查看</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </peanut-remote-table>
            </div>
        </div>
        <div class="todo-list-footer mt-8 px-8 text-bold p-flex align-items-center justify-content-between">
            <div>
                事项总数：{{ workTotal }}
            </div>
            <div>{{ currentTime }}</div>
        </div>

        <append-and-edit
            ref="diaglog"
            :dialog-title="dialogTitle"
            :selected-row="selectedRow"
            @handleSave="handleSave"
        />
    </div>
</template>

<script>
import TodoCard from "./components/todoCard";
import AppendAndEdit from "./components/appendAndEdit";
import dayjs from "dayjs";
import request from "../../peanut/utils/request";

let timer = null
export default {
    name: "todoList",
    components: {AppendAndEdit, TodoCard},
    data() {
        return {
            cardData: [],
            workTotal: 0,
            workTypeList: [
                {
                    title: "紧急事项",
                    value: "urgent",
                },
                {
                    title: "一般事项",
                    value: "common",
                },
                {
                    title: "暂缓事项",
                    value: "suspend",

                },
                {
                    title: "已完成事项",
                    value: "complete",

                },
            ],
            activateCard: "urgent",
            selectedRow: {},
            dialogTitle: "",
            currentTime: "",
            selection: [],
        }
    },
    mounted() {
        timer = setInterval(() => {
            this.currentTime = dayjs().format("YYYY年MM月DD日 HH:mm:ss")
        }, 100)
        this.$refs.table.reload()
        this.getCard()
    },
    methods: {
        dayjs,
        getCard() {
            request.get(`/todoList/getCard`).then(res => {
                this.cardData = res.result
                this.workTotal = res.total
            })

        },
        getList(param) {
            let params = {
                ...param,
                activateCard: this.activateCard
            }
            return request.post("/todoList/getList", params)
        },
        //点击卡片回调
        handleCardClick(val) {
            this.activateCard = val
            this.$refs.table?.reload()
        },
        //获得选中项
        selectionChange(selection) {
            this.selection = selection
        },
        //表格删除
        handleDelete() {
            request.post("/todoList/delete", {ids: this.selection.map(item => item.id)}).then(res => {
                this.$message.success(res.result)
                this.$refs.table.reload()
                this.getCard()
            })
        },
        //删除所有已完成
        handleDeleteAll() {
            this.$confirm("确认删除所有完成事项吗？", "确认删除").then(() => {
                request.get(`/todoList/deleteAll`).then(res => {
                    this.$message.success(res.result)
                    this.$refs.table.reload()
                    this.getCard()
                })
            })

        },
        handleComplete() {
            request.post("/todoList/complete", {ids: this.selection.map(item => item.id)}).then(res => {
                this.$message.success(res.result)
                this.$refs.table.reload()
                this.getCard()
            })
        },
        //新增或者查看
        handleECheck(row = {}) {
            this.selectedRow = row
            this.dialogTitle = Object.keys(row).length > 1 ? "编辑" : "新增"
            this.$nextTick(() => {
                this.$refs.diaglog.init()
            })
        },
        //保存的自定义函数
        handleSave(row) {
            if (row.id) {
                request.post("/todoList/change", row).then((res) => {
                    this.$message.success(res.result)
                    this.$refs.table.reload()
                })
            } else {
                request.post("/todoList/append", {...row, id: dayjs().valueOf().toString()}).then((res) => {
                    this.$message.success(res.result)
                    this.$refs.table.reload()
                    this.getCard()
                })
            }
        }
    },
    beforeDestroy() {
        clearInterval(timer)
    }

};
</script>
<style lang="scss" scoped>
.todo-list {
    height: 100%;
    background-color: aliceblue;
    border: 1px #5EADFF solid;
    border-radius: 4px;

    &-content {
        flex: 1;
        height: 0;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        background-color: rgba(135, 206, 235, 0.5);

        &-card {
            .active {
                color: pink !important;
                box-shadow: pink 0px 0px 10px 4px !important;

            }
        }

        &-table {
            flex: 1;
            height: 0;
            border: 1px #5EADFF solid;
        }
    }

    &-footer {
        background-color: white;
        height: 48px;
    }
}
</style>
