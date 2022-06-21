<template>
    <div class="todo-card p-4 p-flex flex-column" @click="handleCardClick" :style="cardStyle">
        <div class="text-bold font-bold p-flex justify-content-between">
            <el-tag
                effect="dark"
                :hit="true"
                :color="cradColor">
                {{ workTitle }}
            </el-tag>
            <div>{{workCount}}</div>
        </div>
        <div class="flex-1 p-flex justify-content-center align-items-center">
            <el-progress
                type="circle"
                :percentage="percent"
                :stroke-width="15"
                :color="cradColor"
            ></el-progress>
        </div>
    </div>
</template>

<script>
export default {
    name: "todoCard",
    props: {
        cradColor: {
            type: String,
            default: "#2FD098"
        },
        workTitle: {
            type: String,
            default: "暂定事项"
        },
        workCode: {
            type: String,
            default: "undefined"
        },
        workCount: {
            type: Number,
            default: 0
        },
        percent: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {}
    },
    computed: {
        cardStyle() {
            return {
                color: this.cradColor,
                backgroundColor: "rgba(47, 208, 152, 0.3)",
                border: "2px solid",
            }
        }
    },
    methods:{
        handleCardClick(){
            console.log(this.workCode,"触发自定义事件，更新列表")
        }
    }
};
</script>
<style lang="scss" scoped>
.todo-card {
    cursor: pointer;
    border-radius: 4px;
}
</style>
