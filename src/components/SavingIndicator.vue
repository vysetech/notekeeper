<template>
  <div>{{ saveStatus }}</div>
</template>
<script>
export default {
  computed: {
    saveStatus: function () {
      return this.$store.state.saveStatus
    }
  }
}
</script>
<style>
</style>