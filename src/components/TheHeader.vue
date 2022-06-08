<template>
  <header>
    <h1>My TodoList</h1>
    <div class="date">
      {{ today }}
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      today: ''
    }
  },
  created() {
    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const weekList = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
    const week = weekList[now.getDay()]
    this.today = `${month}/${date} ${week}`
  }
}
</script>

<style lang="scss" scoped>
  header {
    font-family: 'Expletus Sans', cursive;
    display: flex;
    align-self: center;
    justify-content: space-between;
    padding: 2.2rem;
    color:#040404;    
    h1 {
      font-size: 2.2rem;
    }
    .date {
      font-size: 1.8rem;
    }
  }
</style>
