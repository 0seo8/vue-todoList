<template>
  <div class="todo-count">
    You've got <span class="string">{{ todoTotal }}</span> tasks
  </div>
  <IsLoading v-if="isLoading" />
  <ul>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id" 
      :todo="todo" />
  </ul>
  <Pagination />
</template>

<script>
import IsLoading from '~/components/IsLoading.vue'
import TodoItem from '~/components/TodoItem.vue'
import Pagination from '~/components/Pagination.vue'

export default {
  components : {
    IsLoading,
    TodoItem,
    Pagination
  },
  data() {
    return {
      total: '',
      order: ''
    }
  },
  //store에 있는 데이터는 computed에서 가져올 수 있습니다.
  computed: {
    todos() {
      return this.$store.state.todos
    },
    todoTotal() {
      return this.$store.state.todos.filter(todo => todo.done === false).length
    },
    isLoading() {
      return this.$store.state.isLoaing
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

<style lang="scss" scoped>
    .todo-count {
      letter-spacing: .1px;
      position: relative;
      width: 80vw;
      margin: 0 auto 1.5rem;
      text-align: center;
      .string {
        font-size: 1.8rem;
        padding: .4rem;
        font-weight: bold;
      }
    }
    ul  {
      box-sizing: border-box;
      position: relative;
      width: 80vw;
      margin-right: auto;
      margin-left: auto;
      text-align: center;
      background-color: #fff;
      max-height: 50rem;
      overflow: auto;
      border-radius: 1rem;
      padding: 1.5rem;
    }
</style>
