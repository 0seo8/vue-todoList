<template>
  <CreateTodo />
  <TodoList />
</template>

<script>
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'
export default {
  components : {
    CreateTodo,
    TodoList,
  }
}
</script>

<style lang="scss">
  button {
      outline: 0;
      border: none;
      border-radius: 5px;
      padding: 5px;
      margin-left: 10px;
      cursor: pointer;
  }
</style>
