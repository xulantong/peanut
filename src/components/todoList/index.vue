<template>
    <div class="todo-list p-8 p-flex flex-column">
        <div class="p-flex justify-content-center align-items-center text-bolder p-16 font-bolder">
            待办事项
        </div>
        <div class="todo-list-content px-8 pt-16 pb-8 ">
            <div class="todo-list-content-card">
                <el-row :gutter="8">
                    <el-col :span="6" v-for="item in cardData" :key="item.workCode">
                        <todo-card
                            v-bind="item"
                        ></todo-card>
                    </el-col>
                </el-row>
            </div>
            <div class="todo-list-content-table mt-8 px-8">
                <peanut-remote-table>
                    <div slot="toolLeft" class="mark-title">事项列表</div>
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
    data() {
        return {
            cardData: [
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
            ]
        }
    },
};
</script>
<style lang="scss" scoped>
.todo-list {
    height: 600px;
    background-color: aliceblue;
    border: 1px #2FD098 solid;
    border-radius: 4px;
    overflow: hidden;

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
            border-radius: 4px;
            border: 1px #2FD098 solid;
            //background-color: red;
        }
    }

    &-footer {
        background-color: wheat;
        flex: 0.1;
    }
}
</style>
