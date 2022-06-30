<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        destroy-on-close
        @closed="dataForm={}"
        width="50%">
        <el-form :model="dataForm" :rules="rules" ref="form" label-position="right" label-width="100px"
                 @submit.native.prevent>
            <el-form-item label="事项类型：" prop="workCode">
                <el-select
                    v-model="dataForm.workCode"
                    placeholder="请选择事项类型"
                >
                    <el-option
                        v-for="item in workTypeList"
                        :label="item.title"
                        :value="item.value"
                        :key="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事项内容：" prop="content">
                <el-input type="textarea" :rows="10" maxlength="250" show-word-limit placeholder="请输入事项内容"
                          v-model="dataForm.content"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button plain @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
    </el-dialog>

</template>
<script>
import dayjs from "dayjs";

export default {
    name: "appendAndEdit",
    props: {
        dialogTitle: {
            type: String,
            default: ""
        },
        selectedRow: {
            default: null
        },
    },
    data() {
        return {
            dialogVisible: false,
            dataForm: {
                workCode: "",
                content: ""
            },
            rules: {
                workCode: [
                    {required: true, message: '请选择事项类型', trigger: 'change'}
                ],
                content: [
                    {required: true, message: '请输入事项内容', trigger: ['blur']}
                ],
            },
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
        }
    },
    methods: {
        init() {
            this.dialogVisible = true
            this.dataForm = this.selectedRow ? JSON.parse(JSON.stringify(this.selectedRow)) : {}
            // if(this.dataForm.workCode === "complete"){
            //     this.dataForm.workCode = ""
            // }
        },
        handleSave() {
            let {content, workCode, id} = this.dataForm
            let obj = {
                content,
                workCode,
                workName: this.workTypeList.find(item => item.value === workCode)?.title,
                updataTime: dayjs().valueOf(),
                id: id || null,
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$emit("handleSave", obj)
                    this.dialogVisible = false
                } else {
                    return false
                }
            })

        }
    },

}
</script>
<style lang="scss" scoped>
::v-deep {
    .el-dialog__header {
        border-bottom: 1px solid #f0f0f0;
    }
}

</style>
