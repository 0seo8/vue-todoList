<template>
  <div class="todo-count">
    <TodoSelect
      :show-mode="showMode"
      @update-selected="udtateSelected($event)" />
    <p>You've got <span class="string">{{ todoTotal }}</span> tasks</p>
    <TodoButtonList v-if="showMode==='done'" />
  </div>
  <IsLoading v-if="isLoading" />
  <ul ref="todoList">
    <p v-if="!todoTotal">
      아직 등록된 일정이 없습니다.
    </p>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo" />
  </ul>
</template>

<script>
import Sortable from 'sortablejs'
import TodoSelect from '~/components/TodoSelect.vue'
import IsLoading from '~/components/IsLoading.vue'
import TodoItem from '~/components/TodoItem.vue'
import TodoButtonList from '~/components/TodoButtonList.vue'

export default {
  components : {
    TodoSelect,
    IsLoading,
    TodoItem,
    TodoButtonList,
  },
  data() {
    return {
      total: '',
      showMode: 'all',
    }
  },
  computed: {
    todos() {
      if(this.showMode === 'all') {
        return this.$store.state.todos
      } else if(this.showMode === 'active') {
        return this.$store.state.todos.filter(todo=>todo.done === false)
      } else {
        return this.$store.state.todos.filter(todo=>todo.done === true)
      }
    },
    todoTotal() {
      return this.$store.state.todos.filter(todo => todo.done === false).length
    },
    isLoading() {
      return this.$store.state.isLoaing
    },  
  },
  mounted() {
    this.initSortable()
  },
  created() {
    this.readTodos()
  },
  methods: {
    async readTodos() {
      this.$store.dispatch('readTodos')
    },
    udtateSelected(event) {
      this.showMode=event
    },
    reorderTodos(event) {
      this.$store.dispatch('reorderTodo', event)
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: '.handle',
        delay: 50,
        animation: 0, 
        forceFallback: true,
        onEnd: event => {
          this.reorderTodos(event)
          console.log(event)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>

    .todo-count {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      letter-spacing: .1px;
      margin: 0 auto 2rem;

      p {
        position: absolute;
        display: block;
        left:50%; 
        transform: translate(-50%);
        .string {
          font-size: 1.8rem;
          padding: .4rem;
          font-weight: bold;
        }
      }
    }
    
    ul  {
      box-sizing: border-box;
      position: relative;
      width: 80vw;
      height: 60vh;
      margin-right: auto;
      margin-left: auto;
      text-align: center;
      background-color: #fff;
      max-height: 50rem;
      overflow: auto;
      border-radius: 1rem;
      padding: 1.5rem;
    }

    @media screen and (max-width: 450px) {
      p {
        opacity: 0;
      }
    }
</style>
