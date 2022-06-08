<template>
  <button
    class="clear"
    @click="clearAllTodo">
    Clear
  </button>
</template>

<script>
export default {
  methods: {
    clearAllTodo() {
      this.$store.commit('changeLoaingStatus')
      const completedTodo = this.$store.state.todos.filter(todo=>todo.done===true)
      const data= completedTodo.map(todo => todo.id)
      try {
        data.forEach(id => this.$store.dispatch('deleteTodo', id))
      } catch(err) {
        console.error(err)
      } finally {
      this.$store.commit('changeLoaingStatus', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  button {
    cursor: pointer;
    font-weight: bold;
    color: rgb(233, 65, 65);
    border: 1px solid;
    background-color: inherit;
  }

</style>
