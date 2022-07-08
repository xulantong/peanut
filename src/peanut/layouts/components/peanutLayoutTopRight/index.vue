<template>
    <div class="peanut-layoutTo-right">
        <el-dropdown trigger="click" @command="handleCommand">
            <el-avatar class="avatar" :src="require('../../../assets/avatar.png')"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    name: "peanutLayoutTopRight",
    methods: {
        handleCommand(val) {
            switch (val) {
                case 'changePassword' :
                    this.changePassword();
                    break;
                case 'logout' :
                    this.logout();
                    break;
            }
        },
        changePassword() {
            this.$router.push("/changePassword").catch(() => {})
        },
        logout() {
            this.$confirm("确认退出系统？", '温馨提示', {
                cancelButtonText: "取消",
                confirmButtonText: '确定',
                type:"warning"
            }).then(() => {
                this.$router.replace("/login")
            }).catch(()=>{})
        }
    }
}

</script>
<style lang="scss" scoped>
.peanut-layoutTo-right {
    display: flex;
    align-items: center;

    .avatar {
        cursor: pointer;
        position: relative;
        top: 4px;
    }
}

</style>
