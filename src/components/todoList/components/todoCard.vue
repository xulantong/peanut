<template>
    <div class="todo-card p-4 p-flex flex-column" :style="cardStyle">
        <div class="text-bold font-bold">{{workTitle}}</div>
        <div class="flex-1 p-flex justify-content-center align-items-center">
            <el-progress
                type="circle"
                :percentage="25"
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
            default: "ÔÝ¶¨ÊÂÏî"
        },
        workCode: {
            type: String,
            default: "undefined"
        },
        workCount: {
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
                color:this.cradColor,
                backgroundColor: "rgba(47, 208, 152, 0.3)",
                border: "2px solid",
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.todo-card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
</style>
