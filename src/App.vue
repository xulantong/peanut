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
