<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'App',
}
</script>
<style>
/*去掉默认样式*/
* {
    margin: 0;
    padding: 0;
    line-height: calc(1em + 8px);
}

body {
    position: relative;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", 微软雅黑, SimHei, sans-serif;
    font-size: 14px;
    overflow: hidden;
}

#app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
