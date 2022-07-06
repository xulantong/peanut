<template>
    <div class="peanut-layout-top">
        <div class="left-content">
            <slot name="left"/>
        </div>
        <div class="right-content">
            <slot name="right"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "peanutLayoutTop"
}

</script>
<style lang="scss" scoped>
.peanut-layout-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2FD098;
    height: 48px;
    padding: 0 8px;
    .left-content{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .right-content{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}

</style>
