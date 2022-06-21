<template>
    <div class="peanut-remote-table-container">
        <div class="tool-bar">
            <div class="left">
                <slot name="toolLeft"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"PeanutRemoteTable",
}
</script>
<style scoped lang="scss">
.peanut-remote-table-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tool-bar {
        min-height: 48px;
        padding: 8px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        .left {
            flex: 1;
            width: 0;
        }
    }
}

</style>

