<template>
  <select
    :v-model="showMode"
    @change="showMode">
    <option value="all">
      All
    </option>
    <option value="active">
      Active
    </option>
    <option value="done">
      Completed
    </option>
  </select>
</template>

<script>
export default {
  porps: {
    showMode: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    showMode(event) {
      this.$emit('update-selected', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  select {
    padding: .5rem;
    border-radius: .5rem;
  }
</style>
