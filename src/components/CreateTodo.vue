<template>
  <h1>To Do List</h1>
  <input
    :value="title"
    @input="title=$event.target.value"
    @keyup.enter="createTodo" />
  <button @click="createTodo">
    Create
  </button>
</template>


<script>
export default {
  // 사용할 데이터 정의
  data() {
    return {
      title: '',
    }
  },
  methods: {
    async createTodo() {
      if(!this.title.trim()) return  
      const value = {
        title: this.title,
      }
      // plugin? store? 
      //기능이긴 하지만 결국 이 기능을 통해 todolist를 관리하는 것이기 때문에 기능만 취급하는 plugin보다는 store가 더 적합
      this.$store.dispatch('createTodo', value)
      this.title =''
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    font-size: 20px;
    padding: 12px 14px;
    background-color: #f6f6f6;
    border-radius: 8px;
  }
</style>
