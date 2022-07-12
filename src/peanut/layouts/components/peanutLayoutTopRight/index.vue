<template>
    <div class="peanut-layoutTo-right">
        <div class="peanut-layoutTo-right-menu mr-32">
            <el-menu mode="horizontal" background-color="#2FD098" text-color="#303133" @select="handleSelect">
                <template v-for="item in topRoutes">
                    <el-menu-item :index="item.path"><span class="text-bold font-bold">{{ item.meta.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
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
import {mapState} from "vuex";

export default {
    name: "peanutLayoutTopRight",
    computed: {
        ...mapState('peanut-routes', ["routes"]),
        topRoutes() {
            return this.routes.filter(route => route.meta?.isTop == 'true')
        }
    },
    methods: {
        handleSelect(index) {
            let sideRoute = this.routes.filter(item => item.path === index)
            this.$baseEventBus.$emit("handleClickTopMenu", sideRoute)
        },
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
            this.$router.push("/changePassword").catch(() => {
            })
        },

        logout() {
            this.$confirm("确认退出系统？", '温馨提示', {
                cancelButtonText: "取消",
                confirmButtonText: '确定',
                type: "warning"
            }).then(() => {
                this.$router.replace("/login")
            }).catch(() => {
            })
        }
    }
}

</script>
<style lang="scss" scoped>
.peanut-layoutTo-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-menu {
    }

    .avatar {
        cursor: pointer;
        position: relative;
        top: 4px;
    }
}

</style>
