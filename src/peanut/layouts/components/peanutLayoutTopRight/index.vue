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
        handleCommand() {

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
