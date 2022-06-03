<template>
  <TheHeader />
  <CreateTodo />
  <TodoList />
  <TheFooter />
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components : {
    TheHeader,
    CreateTodo,
    TodoList,
    TheFooter
  }
}
</script>

<style lang="scss">
  @import url('./assets/style/reset.scss')
</style>
