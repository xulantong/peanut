<template>
    <div class="peanut-login">
        <div class="peanut-login-header">
            <img src="../../../assets/peanut.svg" style="width: 30px;height: 30px"></img>
            <span class="text-bolder font-bolder">PEANUT</span>
        </div>
        <div class="peanut-login-container">
            <div class="peanut-login-container-left">
                <img src="../../../assets/peanut.svg" style="width: 300px;height: 300px"></img>
            </div>
            <div class="peanut-login-container-right">
                <div class="text-bolder font-bolder">账号登录</div>
                <el-form :model="loginForm" :rules="rules" ref="form" hide-required-asterisk label-width="80px"
                         @submit.native.prevent="handleSubmit">
                    <el-form-item label="账 号：" prop="loginId">
                        <el-input v-model="loginForm.loginId" clearable placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input v-model="loginForm.password" clearable show-password placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-button type="text" class="forget" @click="forgetPassword">忘记密码</el-button>
                    <el-form-item>
                        <el-button type="primary" :loading="loading" native-type="submit" style="width: 100%">登 录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="peanut-login-footer">Copyright @2022 花生(徐兰通)·版权所有</div>
    </div>
</template>
<script>
import {login} from "../../../api/sys";

export default {
    name: "peanutLogin",
    data() {
        return {
            loginForm: {
                loginId: "",
                password: ""
            },
            rules: {
                loginId: [{
                    required: true, message: "账号不能为空", trigger: ['input', 'blur']
                }],
                password: [{
                    required: true, message: "密码不能为空", trigger: ['input', 'blur']
                }],
            },
            loading: false
        }
    },
    methods: {
        forgetPassword() {
            this.$message.info("请联系管理员")
        },
        handleSubmit() {
            if (this.loading) {
                return;
            }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true
                    login(this.loginForm).then(res => {
                        this.$notify.success({
                            title: '登录状态',
                            message: res?.result?.msg,
                            showClose: false,
                            duration: 500
                        })
                        this.$router.replace("/test/todolist").catch(()=>{})
                    }).catch(e => {
                        this.$message.warning("登陆失败")
                    }).catch(()=>{
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}

</script>
<style lang="scss" scoped>
.peanut-login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("../../../assets/background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-header, &-footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 24px;
        height: 48px;
        color: #FFFFFF;
    }

    &-container, {
        width: 75%;
        height: 0;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-left: 24px;
        height: 48px;
        color: #FFFFFF;

        &-right {
            height: 400px;
            padding: 0 32px;
            border-radius: 4px;
            border: 1px #5EADFF solid;
            background-color: #FFFFFF;
            color: black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            .forget {
                float: right;
                padding: 0;
                position: relative;
                top: -18px;
            }
        }
    }

    &-footer {
        justify-content: center;
    }

}
</style>
