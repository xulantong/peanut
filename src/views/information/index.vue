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
            <div class="information-container-right">
                <div class="information-container-right-csdn">
                    <div class="text-bold font-normal mark-title">CSDN</div>
                    <pie-component/>
                </div>
                <div class="information-container-right-carousel">
                    <div class="text-bold font-normal mb-8 mark-title">其他信息</div>
                    <el-carousel autoplay :interval="2000" height="250px">
                        <el-carousel-item v-for="item in imgList" :key="item">
                            <el-image :src="item" fit="cover"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import ContentResolver from "./components/ContentResolver";
import {mapState} from "vuex";
import PieComponent from "./components/PieComponent";
import animal1 from "./images/animal1.png"
import animal2 from "./images/animal2.png"
import animal3 from "./images/animal3.png"
import animal4 from "./images/animal4.png"
import animal5 from "./images/animal5.png"
import {getTree} from "../../api/information";

export default {
    name: "information",
    components: {PieComponent, ContentResolver},
    data() {
        return {
            dataInfoOrigin: {},
            edit: false,
            mode: 0,
            saveLoading: false,
            imgList: [
                animal1,
                animal2,
                animal3,
                animal4,
                animal5
            ]
        }
    },
    computed: {
        ...mapState('information', ['dataInfo']),
    },
    mounted() {
        getTree({}).then(res => {
            this.addToDict("division", res?.result)
        })
    },
    methods: {
        addToDict(key, value) {
            let dicts = {}
            this.$set(dicts, key, value)
            this.$store.commit("information/setDict", dicts)
        },
        getData() {
            //todo axios
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
            //todo axios
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
            overflow-x: hidden;
            overflow-y: scroll;

            &-carousel {
                border-radius: 4px;
            }

        }


    }

}
</style>
