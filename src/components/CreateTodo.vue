<template>
  <div class="wrap">
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
  .wrap {
    position: relative;
    width: 80vw;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    h2 {
      padding: 1rem;
      font-size: 2rem;
    }
    .inputbox {
      position: relative;
      padding-bottom: 2.5rem;
      input {
        border-radius: 1.2rem;
        padding: .8rem 1rem;
        width: calc(100% - 2.5rem);
        max-width: 80w;
      }
      button {
        position: absolute;
        right: 2.5rem;
        top: .8rem;
        color: rgb(177, 173, 173);
        cursor: pointer;
      }
    }
  }
</style>
