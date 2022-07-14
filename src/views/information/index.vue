<template>
    <div class="information">
        <div class="information-header">
            <div class="information-header-left">
                <el-button size="mini" plain @click="printInfo">清单打印</el-button>
            </div>
            <div class="information-header-middle">
                个人简历
            </div>
            <div class="information-header-right">
                <el-button size="mini" v-if="!edit" plain @click="handleEdit">编辑</el-button>
                <el-button size="mini" v-if="edit" plain @click="handleCancel">取消</el-button>
                <el-button size="mini" v-if="edit" type="primary" :loading="saveLoading" @click="handleSave">保存
                </el-button>
            </div>
        </div>
        <div class="information-container">
            <div class="information-container-left">
                <div class="information-container-left-top">
                    <el-radio-group v-model="mode" size="mini">
                        <el-radio-button :label="0">简洁模式</el-radio-button>
                        <el-radio-button :label="1">全部打开</el-radio-button>
                    </el-radio-group>
                </div>
                <content-resolver
                :edit="edit"/>
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
            dataInfoOrigin:{},
            edit: false,
            mode:0,
            saveLoading: false,
        }
    },
    computed:{
        ...mapState('information', ['dataInfo']),
    },
    methods: {
        printInfo() {

        },
        handleEdit() {
            this.dataInfoOrigin = JSON.parse(JSON.stringify(this.dataInfo))
            this.edit = true
        },
        handleCancel() {
            this.edit = false
            this.$store.commit("information/setDataInfo",this.dataInfoOrigin)
        },
        handleSave() {
            this.edit = false
            this.$store.commit("information/setDataInfo",this.dataInfo)
        }
    }

}

</script>
<style lang="scss" scoped>
.information {
    display: flex;
    flex-direction: column;

    &-header {
        border-radius: 4px;
        padding: 8px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-middle {
            font-size: 20px;
            font-weight: 500;
        }

        &-right {
            text-align: right;
            width: 300px;
        }
    }

    &-container {
        display: flex;
        height: 0;
        flex: 1;
        background-color: #F5F5F5;

        &-left {
            padding: 20px;
            flex: 0.7;
            &-top{
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }

        &-right {
            border-top: 1px solid #F5F5F5;
            background-color: #FFFFFF;
            flex: 0.3;
        }


    }

}
</style>
