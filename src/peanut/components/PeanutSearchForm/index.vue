<template>
    <div class="peanut-search-form">
        <el-collapse-transition>
            <div class="peanut-search-form-container" v-if="isExpand">
                <div class="peanut-search-form-container-left">
                    <slot></slot>
                </div>
                <div class="peanut-search-form-container-right" v-if="showButton">
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button plain @click="handleReset">重置</el-button>
                </div>
            </div>
        </el-collapse-transition>
        <div class="peanut-search-form-footer" v-if="showCollapse">
            <div class="peanut-search-form-footer-collapse" @click="isExpand = !isExpand">
                <peanut-icon :icon-name="isExpand?'collapse-up':'collapse-down'" size="15"></peanut-icon>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PeanutSearchForm",
    props: {
        showButton: {
            type: Boolean,
            default: true
        },
        showCollapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isExpand: true
        }
    },
    methods: {
        handleSearch() {
            this.$emit("handleSearch")
        },
        handleReset() {
            this.$emit("handleReset")
        }
    }
}

</script>
<style lang="scss" scoped>
.peanut-search-form {
    display: flex;
    flex-direction: column;

    &-container {
        display: flex;
        background-color: #FFFFFF;
        border-radius: 4px;
        padding: 8px;
        justify-content: space-between;

        &-left {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        &-right {
            white-space: nowrap;
        }
    }

    &-footer {
        display: flex;
        justify-content: center;
        align-items: center;

        &-collapse {
            cursor: pointer;
            height: 15px;
            width: 50%;
            border-radius: 10px;
            margin-top: 4px;
            background-color: #FFFFFF;
            display: flex;
            justify-content: center;
        }
    }

}
</style>
