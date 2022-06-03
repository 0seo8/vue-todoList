<template>
  <div class="wrap">
    <button
      class="clear"
      @click="clearTodo">
      Clear All
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$store.commit('changeLoaingStatus')
      const data= this.$store.state.todos.map(todo => todo.id)
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
  .wrap {
    margin-top: 2rem;
    position: relative;
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    button {
      position: absolute;
      right: 0;
      padding: .5rem;
      cursor: pointer;
      letter-spacing: .1rem;
      font-size: 1.3rem;
      color: rgb(166, 166, 166);
      background-color: rgb(227, 233, 238);
      border-radius: 1rem;
      margin-right: 1rem;
    }
  }
</style>
