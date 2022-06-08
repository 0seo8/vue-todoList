<template>
  <h2>You must do it!</h2>
  <div class="inputbox">
    <input
      placeholder="Please write an actionable plan..👀"
      :value="title"
      @input="title=$event.target.value"
      @keyup.enter="createTodo" />
    <button @click="createTodo">
      plus
    </button>
  </div>
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
      const data = {
        title: this.title,
        order: this.$store.state.order +1 
      }
      this.$store.dispatch('createTodo', data)
      this.title =''
    }
  }
}
</script>

<style lang="scss" scoped>
    h2 {
      text-align: center;
      color: rgba(0,0,0,.8);
      padding: 1rem;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .inputbox {
      position: relative;
      padding-bottom: 2.5rem;
      input {
        border-radius: 1.2rem;
        padding: .8rem 1rem;
        width: calc(100% - 2.5rem);
      }
      button {
        position: absolute;
        background-color: inherit;
        right: 0;
        top: .6rem;
        color: rgb(177, 173, 173);
        cursor: pointer;
      }
    }
</style>
