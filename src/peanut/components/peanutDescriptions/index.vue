<template>
    <el-descriptions
        :border="border"
        :column="column"
        :direction="direction"
        :size="size"
        :title="title"
        :extra="extra"
        :colon="colon"
    >
        <div slot="extra" v-if="showExtra">
            <el-button size="mini" v-if="!edit" @click="handleEdit" type="primary">编辑</el-button>
            <template v-else>
                <el-button size="mini" v-if="edit" @click="cancelEdit" plain>取消</el-button>
                <el-button size="mini" v-if="edit" @click="handleSave" type="primary">保存</el-button>
            </template>
        </div>
        <el-descriptions-item
            v-for="item in descriptionConfig"
            :key="item.dataIndex"
            :label="item.label"
        >
            <peanut-descriptions-item
                v-bind="item"
                :description-data.sync="originData"
                :edit="edit"
            >
            </peanut-descriptions-item>
        </el-descriptions-item>

    </el-descriptions>
</template>
<script>
import descriptions from "../../mixins/descriptions"
import PeanutDescriptionsItem from "./components/PeanutDescriptionsItem";

export default {
    name: "peanutDescriptions",
    components: {PeanutDescriptionsItem},
    mixins: [descriptions],
    data() {
        return {
            edit: false
        }
    },
    methods: {
        handleEdit() {
            this.edit = true
        },
        cancelEdit() {
            this.edit = false
        },
        handleSave() {
            this.edit = false
        }
    },
    computed: {
        originData: {
            get() {
                return this.descriptionData
            },
            set(val) {
                this.$emit('update:descriptionData', val)
            }
        }
    }

}

</script>
<style lang="scss" scoped>
/deep/ .el-descriptions-item__container, .el-descriptions-item__label {
    display: flex;
    align-items: center;
}
</style>
