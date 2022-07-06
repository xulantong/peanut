<template>
    <div class="peanut-layout-main">
        <keep-alive >
            <router-view class="router-container" />
        </keep-alive>

    </div>
</template>
<script>
export default {
    name: "peanutLayoutMain"
}

</script>
<style lang="scss" scoped>
.peanut-layout-main {
    margin-top: 8px;
    margin-left: 8px;
    height: 98%;
    background-color: rgba(47, 208, 152, 0.5);
    .router-container{
        min-height: 100%;
    }
}

</style>
