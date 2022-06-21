<template>
  <div id="app">
    <todoList></todoList>
  </div>
</template>

<script>
import todoList from "./components/todoList"

export default {
  name: 'App',
  components: {todoList}
}
</script>
