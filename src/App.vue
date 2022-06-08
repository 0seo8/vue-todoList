<template>
  <TheHeader />
  <div class="inner">
    <CreateTodo />
    <TodoList />
    <TheFooter />
  </div>
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
  @import url('./assets/style/reset.scss');
  
  $width: 80vw;

    .inner {
      width: $width;
      position: relative;
      margin-left: auto;
      margin-right: auto;
    }

    button {
      padding: .5rem;
      cursor: pointer;
      letter-spacing: .1rem;
      font-size: 1.3rem;
      color: rgb(166, 166, 166);
      background-color: #FFEDED;
      border-radius: .5rem;
      margin-right: 1rem;
      &:hover {
        background-color: rgb(201, 217, 232);
      }
    }
</style>
