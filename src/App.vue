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
* {
    margin: 0;
    padding: 0;
    line-height: calc(1em + 8px);
}

body {
    position: relative;
    height: 100vh;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", 微软雅黑, SimHei, sans-serif;
    font-size: 14px;
    overflow: hidden;
}

#app {
    height: 100%;
    width: 100%;
}
</style>
