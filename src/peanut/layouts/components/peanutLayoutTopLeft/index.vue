<template>
    <div class="peanut-layoutTo-left" @click="handleClick">
        <img src="../../../assets/peanut.svg" style="width: 30px;height: 30px;margin-right: 8px"></img>
        <span class="font-bolder text-bold">花生</span>
    </div>
</template>
<script>
export default {
    name: "peanutLayoutTopLeft",
    methods: {
        handleClick() {
            this.$baseEventBus.$emit("handleClickTopMenu", [])
        }
    }
}

</script>
<style lang="scss" scoped>
.peanut-layoutTo-left {
    display: flex;
    align-items: center;
    cursor: pointer;
}

</style>
