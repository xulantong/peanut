<template>
    <div id="app">
        <todo-list></todo-list>
    </div>
</template>

<script>
import todoList from "./views/todoList"

export default {
    name: 'App',
    components: {todoList}
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
    line-height: calc(1em + 8px);
}
body{
    position: relative;
    height: 100vh;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", 微软雅黑, SimHei, sans-serif;
    font-size: 14px;
    overflow: hidden;
}
#app{
    height: 97%;
}
</style>
