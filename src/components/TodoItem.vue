<template>
  <div class="wrap">
    <input
      type="checkbox" 
      :checked="todo.done===true"
      @click="isChecked" />
    <template v-if="!editMode">
      <div class="text">
        <span>{{ todo.title }}</span>
        <span>{{ updaedDate }}</span>
      </div>
      <button
        class="edit"
        @click.stop="onEditMode">
        Edit
      </button>
      <button 
        class="delete"
        @click="deleteTodo(todo.id)">
        Delete
      </button>
    </template>
    <template v-else>
      <div @click.stop>
        <input
          ref="titleInput"
          class="editInput"
          :value="title"
          @input="title=$event.target.value" 
          @keyup.enter="offEditMode(); updateTodo()" 
          @keydown.esc="offEditMode" />
      </div>
      <button
        class="button_confirm"
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
      date: this.todo.updatedAt
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
    position: relative;
    display: flex;
    align-items: center;
    padding: .5rem;
    border-bottom: 1px solid #ccc;
    input[type="checkbox"] {
      transform: scale(1.3);
      margin-right: 1rem;
      cursor: pointer;
    }
    .text,
    .editInput {
      padding: 1rem;
      flex-grow: 1;
      text-align: start;
      color: rgb(84, 82, 82);
    }
    .editInput {
      margin-right: 1rem;
      padding: .8rem 1rem;
      border-radius: 1rem;
    }
    button {
      padding: .5rem;
      cursor: pointer;
      letter-spacing: .1rem;
      font-size: 1.3rem;
      color: rgb(166, 166, 166);
      background-color: aliceblue;
      border-radius: 1rem;
      margin-right: 1rem;
    }
  }
</style>
