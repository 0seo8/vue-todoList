<template>
  <li
    class="handle"
    :name="todo.updatedAt.slice(5,10)">
    <input
      type="checkbox" 
      :checked="todo.done"
      @click="isChecked" />
    <template v-if="!editMode">
      <span
        class="text "
        :class="{completed: todo.done}">{{ todo.title }}</span>
      <button
        class="edit"
        :disabled="todo.done"
        @click.stop="onEditMode">
        Edit
      </button>
      <button 
        class="delete"
        :disabled="todo.done"
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
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
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
                    title:this.title,
                    order: this.todo.order}
      this.$store.dispatch('updateTodo',  data)
    },
    isChecked(evnet) {
      const data = {id:this.todo.id,
                  done: evnet.target.checked,
                  title:this.todo.title,
                  order: this.todo.order }
      this.$store.dispatch('updateTodo',  data)
    },
  }
}
</script>

<style lang="scss" scoped>
  .handle {
    position: relative;
    display: flex;
    align-items: center;
    padding: .5rem;
    border-bottom: 1px solid #ccc;

    &[name]:hover::after {
      content: "updated : " attr(name);
      position: absolute;
      top: 60%;
      left: 10%;
      padding: 5px; 
      font-size:1.2rem; 
      color:rgba(0,0,0,.7);
      text-align:center; 
      z-index:100;
    }

    &:hover {
      background-color: rgba(0,0,0,.1);
      button {
        opacity: 1;
        &:disabled.edit {
          opacity: 0;
        }
      }
    }

    button {
      opacity: 0;
    }

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

    .text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      &.completed {
          color: #ccc;
          text-decoration: line-through;
      }
    }

    .editInput {
      margin-right: 1rem;
      padding: .8rem 1rem;
      border-radius: 1rem;
    }
  }
</style>
