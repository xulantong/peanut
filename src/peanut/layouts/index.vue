<template>
    <div class="peanut-layouts">
        <peanut-layout-top>
            <peanut-layout-top-left slot="left"></peanut-layout-top-left>
            <peanut-layout-top-right slot="right"></peanut-layout-top-right>
        </peanut-layout-top>
        <div class="peanut-layouts-content">
            <peanut-layout-side/>
            <div class="peanut-layouts-content-main">
<!--                <peanut-layout-tabs></peanut-layout-tabs>-->
                <peanut-layout-main></peanut-layout-main>
            </div>


        </div>
    </div>


</template>
<script>

export default {
    name: "layouts",
}

</script>
<style lang="scss" scoped>
.peanut-layouts {
    display: flex;
    height: 100%;
    width: 100%;
    min-width: 500px;
    flex-direction: column;

    &-content {
        margin-right: 8px;
        height: 0;
        flex: 1;
        display: flex;

        &-main {
            flex: 1;
            width: 0;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
