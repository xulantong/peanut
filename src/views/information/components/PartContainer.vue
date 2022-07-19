<template>
    <div class="part-container">
        <div
            v-if="header"
            class="part-container-header">
            <span class="part-container-header-text">{{ header }}</span>
            <div class="part-container-header-deliver"></div>

        </div>
        <slot/>

    </div>

</template>
<script>
export default {
    name: "PartContainer",
    props: {
        header: {
            type: String,
        }
    }
}

</script>
<style lang="scss" scoped>
.part-container {
    &-header {
        position: relative;
        height: 48px;
        display: flex;
        align-items: center;
        &-text{
            padding: 4px 8px;
            white-space: nowrap;
            color: #FFFFFF;
            background-color: #525252;
        }
        &-deliver{
            height: 2px;
            position: relative;
            background-color: #5EADFF;
            width: 100%;
        }
    }

}

</style>
