<template>
    <div class="change-password">
        <div class="change-password-container">
            <el-steps :active="active" style="width: 100%;margin-bottom: 24px" finish-status="success">
                <el-step title="验证当前密码"></el-step>
                <el-step title="设置新密码"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <template v-if="active===0">
                <el-form :model="formData" hide-required-asterisk :rules="oldRules" ref="oldForm" label-width="100px"
                         class="mt-8">
                    <el-form-item label="原始密码" prop="oldPassword">
                        <el-input show-password v-model="formData.oldPassword"></el-input>
                    </el-form-item>
                </el-form>
                <div class="operation">
                    <el-button type="primary" :loading="nextLoading" @click="handleNext">下一步</el-button>
                </div>
            </template>
            <template v-if="active===1">
                <el-form :model="formData" hide-required-asterisk ref="newForm" :rules="newRules" label-width="100px"
                         class="mt-8">
                    <template v-if="active===1">
                        <el-form-item label="密码" prop="newPassword">
                            <el-input show-password v-model="formData.newPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码" prop="rePassword">
                            <el-input show-password v-model="formData.rePassword"></el-input>
                        </el-form-item>
                    </template>
                </el-form>
                <div class="operation">
                    <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">确定</el-button>
                </div>
            </template>
            <template v-if="active===2">
                <div class="p-flex align-items-center font-bolder text-bolder">{{ second }}秒后自动返回登录页
                    <el-button class="ml-8" type="text" @click="$router.replace('/login')">
                        <span class="font-bolder">快速返回</span>
                    </el-button>
                </div>
            </template>
        </div>

    </div>

</template>
<script>
import {changePassword, checkPassword} from "../../../api/sys";

let timer = null
export default {
    name: "changePassword",
    data() {
        return {
            active: 2,
            nextLoading: false,
            confirmLoading: false,
            second: 5,
            formData: {
                oldPassword: '',
                newPassword: '',
                rePassword: ''
            },
            oldRules: {
                oldPassword: [
                    {required: true, message: '请输入原始密码', trigger: ['input', 'blur']}
                ]
            },
            newRules: {
                newPassword: [
                    {required: true, message: '请输入新密码', trigger: ['input', 'blur']}
                ],
                rePassword: [
                    {required: true, message: '请再次输入新密码', trigger: ['input', 'blur']},
                    {
                        validator: (rule, value, callback) => {
                            if (this.formData.newPassword !== value) {
                                callback(new Error('两次密码不一致'))
                            }
                            callback();
                        },
                        trigger: ['input', 'blur']
                    }]
            }
        }
    },
    methods: {
        handleNext() {
            this.$refs.oldForm.validate(valid => {
                if (valid) {
                    this.nextLoading = true
                    checkPassword({oldPassword: this.formData.oldPassword}).then(res => {
                        this.active++
                    }).catch(e => {
                        this.$message.warning(e.result.msg || '密码错误')
                    }).finally(() => {
                        this.nextLoading = false
                    })
                } else {
                    return false
                }
            })

        },
        handleConfirm() {
            this.$refs.newForm.validate(valid => {
                if (valid) {
                    this.confirmLoading = true
                    changePassword({newPassword: this.formData.newPassword}).then(res => {
                        this.active++
                        timer = setInterval(() => {
                            this.second--
                        }, 1000)
                    }).catch(e => {
                        this.$message.warning(e.result.msg || '修改失败')
                    }).finally(() => {
                        this.confirmLoading = false
                    })
                } else {
                    return false
                }
            })
        }
    },
    watch: {
        second(val) {
            if (val <= 0) {
                this.$router.replace('/login')
            }
        }
    },
    beforeDestroy() {
        clearInterval(timer)
    }
}

</script>
<style lang="scss" scoped>
.change-password {
    height: 100%;
    background-color: #eff3fe;
    display: flex;
    justify-content: center;

    &-container {
        border-radius: 8px;
        margin-top: 100px;
        padding: 32px 24px;
        width: 800px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFFFFF;

        .operation {
            width: 100%;
            text-align: right;
        }

    }
}
</style>
