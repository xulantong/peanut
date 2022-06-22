<template>
    <div class="todo-list p-8 p-flex flex-column">
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
                            @click.native="handleCardClick(item.workCode)"
                        ></todo-card>
                    </el-col>
                </el-row>
            </div>
            <div class="todo-list-content-table mt-8">
                <peanut-remote-table
                    show-tool-bar
                    class="h-100"
                    :tableData="tableData"
                    @selectionChange="selectionChange"
                >
                    <div slot="toolLeft" class="mark-title">事项列表</div>
                    <div slot="toolRight" class="mr-8 p-flex justify-content-center align-items-center">
                        <el-button size="small" type="danger" @click="handleDelete">删 除</el-button>
                        <el-button size="small" type="primary" @click="handleECheck">新 增</el-button>
                        <el-button size="small" type="success" v-if="activateCard !== 'complete'"
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
                事项总数：{{ tableMockData.length }}，
                未完成事项：{{ tableMockData.length - cardData[3].workCount }}，
                已完成事项：{{ cardData[3].workCount }}
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

let timer = null
export default {
    name: "todoList",
    components: {AppendAndEdit, TodoCard},
    computed: {
        tableData() {
            return this.tableMockData.filter(item => {
                return item.workCode === this.activateCard
            })
        },
        cardData() {
            return this.cardConfigData.map(item => {
                ['urgent', 'common', 'suspend', 'complete'].forEach(item1 => {
                    if (item.workCode === item1) {
                        item.workCount = this.tableMockData.filter(item => {
                            return item.workCode === item1
                        }).length || 0
                        item.percent = this.tableMockData.length ? ((item.workCount / this.tableMockData.length) * 100).toFixed(2) * 1 : 0
                    }
                })
                return item
            })
        },
    },
    data() {
        return {
            cardConfigData: [
                {
                    cradColor: "#ff4e0e",
                    workTitle: "紧急事项",
                    workCode: "urgent",
                    workCount: 99,
                    percent: 25
                },
                {
                    cradColor: "#ff9612",
                    workTitle: "一般事项",
                    workCode: "common",
                    workCount: 99,
                    percent: 25
                },
                {
                    cradColor: "#D0CE55",
                    workTitle: "暂缓事项",
                    workCode: "suspend",
                    workCount: 99,
                    percent: 25
                },
                {
                    cradColor: "#52c41b",
                    workTitle: "已完成事项",
                    workCode: "complete",
                    workCount: 99,
                    percent: 25
                },
            ],
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
            ],
            activateCard: "urgent",
            selectedRow: {},
            dialogTitle: "",
            currentTime: "",
            selection: [],
            tableMockData: [
                {
                    id: "001",
                    workName: "紧急事项",
                    workCode: "urgent",
                    content: "带年华卡萨计划的会计师大环境大环境肯定是",
                    updataTime: 1655879114000
                },
                {
                    id: "002",
                    workName: "一般事项",
                    workCode: "common",
                    content: "带年华卡萨计划的会计师大环境大环境肯定是",
                    updataTime: 1655792714000
                },
                {
                    id: "003",
                    workName: "紧急事项",
                    workCode: "urgent",
                    content: "带年华卡萨计划的会计师大环境大环境肯定是",
                    updataTime: 1653114314000
                },
                {
                    id: "004",
                    workName: "暂缓事项",
                    workCode: "suspend",
                    content: "带年华卡萨计划的会计师大环境大环境肯定是",
                    updataTime: 1621578314000
                },
                {
                    id: "005",
                    workName: "已完成事项",
                    workCode: "complete",
                    content: "带年华卡萨计划的会计师大环境大环境肯定是",
                    updataTime: 1653078314000
                },
            ]
        }
    },
    mounted() {
        timer = setInterval(() => {
            this.currentTime = dayjs().format("YYYY年MM月DD日 HH:mm:ss")
        }, 100)
    },
    methods: {
        dayjs,
        //点击卡片回调
        handleCardClick(val) {
            this.activateCard = val
        },
        //获得选中项
        selectionChange(selection) {
            this.selection = selection
        },
        //表格删除
        handleDelete() {
            this.selection.forEach(item => {
                this.tableMockData.splice(this.tableMockData.findIndex(find => find.id === item.id), 1)
            })
        },
        handleComplete() {
            this.tableMockData.forEach(item => {
                this.selection.forEach(sel => {
                    if (item.id === sel.id) {
                        item.workCode = "complete"
                        item.workName = this.workTypeList.find(type => type.value === item.workCode)?.title
                        item.updataTime = dayjs().valueOf()
                    }
                })
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
                this.tableMockData.forEach(item => {
                    if (item.id === row.id) {
                        item.workCode = row.workCode
                        item.content = row.content
                        item.workName = row.workName
                        item.updataTime = row.updataTime
                    }
                })
            } else {
                this.tableMockData.push({
                    ...row,
                    id: Math.random()
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
    height: 650px;
    background-color: aliceblue;
    border: 1px #2FD098 solid;
    border-radius: 4px;
    //overflow: hidden;

    &-content {
        flex: 0.9;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        background-color: rgba(135, 206, 235, 0.5);

        &-card {
        }

        &-table {
            flex: 1;
            border: 1px #2FD098 solid;
        }
    }

    &-footer {
        background-color: wheat;
        flex: 0.1;
    }
}
</style>
