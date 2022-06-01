<template>
  <div class="wrap">
    <input
      type="checkbox" 
      :checked="todo.done===true"
      @click="isChecked" />
    <template v-if="!editMode">
      <span>{{ todo.title }}</span>
      <button
        class="edit"
        @click.stop="onEditMode">
        수정
      </button>
      <button 
        class="delete"
        @click="deleteTodo(todo.id)">
        삭제
      </button>
    </template>
    <template v-else>
      <div @click.stop>
        <input
          ref="titleInput"
          :value="title"
          @input="title=$event.target.value" 
          @keyup.enter="offEditMode(); updateTodo()" 
          @keydown.esc="offEditMode" />
      </div>
      <button
        @click="offEditMode(); updateTodo()">
        확인
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editMode: false,
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  methods: {
    async deleteTodo(id) {
    this.$store.dispatch('deleteTodo', id)
    },
    async onEditMode() {
      this.editMode = true
      this.title=this.todo.title
      window.addEventListener('click', this.offEditMode)
      await this.$nextTick()
      this.$refs.titleInput.focus()
    },
    offEditMode() {
      this.editMode = false
      window.removeEventListener('click', this.offEditMode)
    },
    updateTodo() {
      const data = {id:this.todo.id,
                    done: this.todo.done,
                    title:this.title}
      this.$store.dispatch('updateTodo',  data)
    },
    isChecked() {
      const isChecked = !this.todo.done
      const data = {id:this.todo.id,
                    done: isChecked,
                    title:this.todo.title}
      this.$store.dispatch('updateTodo',  data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    display: flex;
    align-items: center;
    button {
      margin-left: 10px;
    }
  }
</style>
