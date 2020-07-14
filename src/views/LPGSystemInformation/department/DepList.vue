<template>
  <div></div>
</template>

<script>
  import { sysDeptDeleteAll } from '@/api/systemManage'
  export default {
    name: 'DepList',
    data () {
      return {
      }
    },
    created () {
      const id = [1, 2, 3]
      sysDeptDeleteAll(id).then(res => {
        console.log(res)
      })
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
</style>
