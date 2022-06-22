<template>
    <div class="todo-list p-8 p-flex flex-column">
        <div class="p-flex justify-content-center align-items-center text-bolder p-16 font-bolder">
            待办事项
        </div>
        <div class="todo-list-content px-8 pt-16 pb-8 ">
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
                >
                    <div slot="toolLeft" class="mark-title">事项列表</div>
                    <template slot="columns">
                        <el-table-column type="selection" width="40" fixed>
                        </el-table-column>
                        <el-table-column
                            label="序号"
                            show-overflow-tooltip
                            min-width="50"
                            prop="id"
                            fixed
                        />
                        <el-table-column
                            label="姓名"
                            show-overflow-tooltip
                            min-width="190"
                            prop="name"
                        />
                        <el-table-column
                            label="年龄"
                            show-overflow-tooltip
                            min-width="190"
                            prop="age"
                        />
                    </template>
                </peanut-remote-table>
            </div>
        </div>
        <div class="todo-list-footer mt-8"></div>

    </div>
</template>

<script>
import TodoCard from "./components/todoCard";

export default {
    name: "todoList",
    components: {TodoCard},
    computed: {
        tableData() {
            return this.table1Data.filter(item => {
                return item.workCode === this.activateCard
            })
        },
        cardData() {
            return this.cardConfigData.map(item => {
                ['urgent', 'common', 'suspend', 'complete'].forEach(item1 => {
                    if (item.workCode === item1) {
                        item.workCount = this.table1Data.filter(item => {
                            return item.workCode === item1
                        }).length * 100 || 0
                        item.percent = this.table1Data.length ? item.workCount / this.table1Data.length : 0
                    }
                })
                return item
            })
        }
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
            activateCard: "urgent",
            table1Data: [
                {
                    id: "001",
                    name: "张三",
                    workCode: "urgent",
                    age: 14
                },
                {
                    id: "002",
                    name: "张三",
                    workCode: "common",
                    age: 14
                },
                {
                    id: "003",
                    name: "张三",
                    workCode: "urgent",
                    age: 14
                },
                {
                    id: "004",
                    name: "张三",
                    workCode: "suspend",
                    age: 14
                },
                {
                    id: "005",
                    name: "张三",
                    workCode: "complete",
                    age: 14
                },
            ]
        }
    },
    methods: {
        handleCardClick(val) {
            console.log(val)
            this.activateCard = val
        }
    }
};
</script>
<style lang="scss" scoped>
.todo-list {
    height: 600px;
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
