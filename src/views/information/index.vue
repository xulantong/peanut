<template>
    <div class="information">
        <div class="information-header">
            <div class="information-header-left">
                <el-button size="mini" type="info" @click="printInfo">简历打印</el-button>
            </div>

            <div class="information-header-right">
                <el-button size="mini" v-if="!edit" type="primary" @click="handleEdit">编辑</el-button>
                <el-button size="mini" v-if="edit" plain @click="handleCancel">取消</el-button>
                <el-button size="mini" v-if="edit" type="primary" :loading="saveLoading" @click="handleSave">保存
                </el-button>
            </div>
        </div>
        <div class="information-container">
            <div class="information-container-left">
                <div class="information-container-left-header">
                    个人简历
                </div>
                <div class="information-container-left-top">
                    <el-radio-group v-model="mode" size="mini">
                        <el-radio-button :label="0">简洁模式</el-radio-button>
                        <el-radio-button :label="1">全部展开</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="information-container-left-content">
                    <content-resolver
                        id="content-resolver"
                        :edit="edit"
                        :mode="mode"/>
                    <el-backtop
                        target=".information-container-left-content"
                        :right="450"
                    >
                        <peanut-icon icon-name="backTop" style="margin-left: 10px" :size="50"></peanut-icon>
                    </el-backtop>
                </div>
            </div>
            <div class="information-container-right"></div>
        </div>
    </div>
</template>
<script>

import ContentResolver from "./components/ContentResolver";
import {mapState} from "vuex";

export default {
    name: "information",
    components: {ContentResolver},
    data() {
        return {
            dataInfoOrigin: {},
            edit: false,
            mode: 0,
            saveLoading: false,
        }
    },
    computed: {
        ...mapState('information', ['dataInfo']),
    },
    methods: {
        getData() {
            //axios
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
        printInfo() {
            this.getPdf("content-resolver", '个人简历')
        },
        handleEdit() {
            this.dataInfoOrigin = JSON.parse(JSON.stringify(this.dataInfo))
            this.edit = true
        },
        handleCancel() {
            this.edit = false
            this.$store.dispatch("information/setDataInfo", this.dataInfoOrigin)
        },
        handleSave() {
            this.edit = false
            //axios
            this.getData()
        }
    }

}

</script>
<style lang="scss" scoped>
.information {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;

    &-header {
        border-radius: 4px;
        padding: 8px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-container {
        display: flex;
        height: 0;
        flex: 1;
        background-color: #F5F5F5;

        &-left {
            padding: 20px;
            width: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;

            &-top {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 8px 0;
            }

            &-header {
                display: flex;
                justify-content: center;
                font-weight: 600;
                font-size: 25px;
            }

            &-content {
                height: 0;
                flex: 1;
                overflow-y: scroll;
                overflow-x: hidden;
                margin-right: -20px;

            }
        }

        &-right {
            border-top: 1px solid #F5F5F5;
            background-color: #FFFFFF;
            width: 400px;
            padding: 8px;
            overflow-x: hidden;
            overflow-y: scroll;
        }


    }

}
</style>
