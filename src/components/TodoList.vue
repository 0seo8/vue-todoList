<template>
  <ul>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id" 
      :todo="todo" />
  </ul>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'

export default {
  components : {
    TodoItem
  },
  //store에 있는 데이터는 computed에서 가져올 수 있습니다.
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  created() {
    this.readTodos()
  },
  updated() {
    // this.readTodos()
  },
  methods: {
    async readTodos() {
      // action은 dispatch라는 메소드로 실행할 수 있습니다.
      this.$store.dispatch('readTodos')
      console.log('this.todos', this.todos)
    }
  }
}
</script>
