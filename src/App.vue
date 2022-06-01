<template>
  <TheHeader />
  <CreateTodo />
  <TodoList />
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'

export default {
  components : {
    TheHeader,
    CreateTodo,
    TodoList,
  }
}
</script>

<style lang="scss">
  @import url('./assets/style/reset.scss')
</style>
