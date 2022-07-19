<template>
    <div class="area-container">
        <div class="area-container-item" :class="{'edit':edit}" v-for="(item,index) in dataInfo[dataIndex]">
            <div class="area-container-item-content" v-for="area in areas">
                <area-item
                    v-bind="area"
                    :item="item"
                    :index="index"
                    :dataIndex="dataIndex"
                    :edit="edit"
                ></area-item>
            </div>
            <div class="area-container-item-footer" v-if="edit">
                <el-button type="text" size="mini" @click="appendArea(item,index)">
                    <peanut-icon icon-name="appendRow"></peanut-icon>
                </el-button>
                <el-button type="text" size="mini" @click="deleteArea(item,index)">
                    <peanut-icon icon-name="deleteRow"></peanut-icon>
                </el-button>
                <el-button type="text" size="mini" @click="editRow(item,index)">
                    <peanut-icon icon-name="editRow"></peanut-icon>
                </el-button>
            </div>
        </div>
        <el-dialog
            title="详细信息"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form label-width="100px" @submit.prevent.native :model="editObj" hide-required-asterisk>
                <template v-for="item in areas">
                    <el-form-item :label="item.label">
                        <el-input :type="item.type||'text'" autosize v-model="editObj[item.queryIndex]"></el-input>
                    </el-form-item>
                </template>
                <el-form-item class="text-right">
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button plain @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {mapState} from "vuex";
import AreaItem from "./AreaItem";

export default {
    name: "AreaContainer",
    components: {AreaItem},
    props: {
        areas: {
            type: Array,
            default: []
        },
        dataIndex: {
            type: String,
            default: ""
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editObj: {},
            editIndex: 0,
            dialogVisible: false
        }
    },
    computed: {
        ...mapState('information', ['dataInfo']),
    },
    methods: {
        appendArea(item, index) {
            this.dataInfo[this.dataIndex]?.splice(index + 1, 0, {})
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
        deleteArea(item, index) {
            this.dataInfo[this.dataIndex]?.splice(index, 1)
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
        editRow(item, index) {
            this.dialogVisible = true
            this.editIndex = index
            this.editObj = JSON.parse(JSON.stringify(item))
        },
        save() {
            this.dialogVisible = false
            this.dataInfo[this.dataIndex][this.editIndex] = this.editObj
            this.$store.dispatch("information/setDataInfo", this.dataInfo)
        },
    }
}

</script>
<style lang="scss" scoped>
.area-container {
    margin-top: 24px;

    &-item {
        border-radius: 4px;
        padding: 8px;
        border: 1px #BFBFBF solid;

        & + .area-container-item {
            margin-top: 12px;
        }

        &-content {
            display: flex;
            flex-wrap: wrap;
        }

        &-footer {
            text-align: right;
        }

    }

    .edit {
        border: 1px #2FD098 solid;


        &:hover {
            box-shadow: #B8DAF8 0 0 10px 4px !important;
        }
    }

}

//.detail-container {
//    .item {
//        display: flex;
//
//        .left {
//            width: 100px;
//        }
//
//        .right {
//            width: 0;
//            flex: 1;
//        }
//
//        & + .item {
//            margin-top: 12px;
//        }
//    }
//}

</style>
