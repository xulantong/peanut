<template>
    <div class="todo-list p-8 p-flex flex-column">
        <div class="p-flex justify-content-center align-content-center text-bolder p-16 font-bolder">
            待办事项
        </div>
        <div class="todo-list-content px-8 pt-16 p-flex justify-content-between align-content-center">
            <div class="todo-list-content-card mr-16" v-for="item in cardData" :key="item.workCode">
                <todo-card
                    v-bind="item"
                ></todo-card>
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
    overflow: hidden;

    &-content {
        flex: 0.9;
        background-color: rgba(135, 206, 235, 0.5);

        &-card {
            width: 100%;
            height: 150px;
            cursor: pointer;

            &:active {
            }
        }
    }

    &-footer {
        background-color: wheat;
        flex: 0.1;
    }
}
</style>
