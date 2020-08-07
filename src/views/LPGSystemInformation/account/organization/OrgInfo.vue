<template>
  <a-descriptions bordered :column="2" size="middle">
    <template slot="title">
      部门详情
      <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
    </template>
    <a-descriptions-item label="名称">{{ info.name }}</a-descriptions-item>
    <a-descriptions-item label="描述">{{ info.descs }}</a-descriptions-item>
    <a-descriptions-item label="创建时间">{{ info.createTime | dayjs }}</a-descriptions-item>
    <a-descriptions-item label="操作人">{{ info.operation }}</a-descriptions-item>
    <a-descriptions-item label="操作时间">{{ info.operationTime | dayjs }}</a-descriptions-item>
    <a-descriptions-item label="部门员工">{{ info.managersName }}</a-descriptions-item>
  </a-descriptions>
</template>

<script>
  import { sysDeptFindById } from '@/api/systemManage'

  export default {
    name: 'OrgInfo',
    props: {
      editID: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        info: {}
      }
    },
    mounted() {
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        if (this.editID) {
          // 编辑
          this.loadInfo(this.editID)
        }
      })
    },
    methods: {
      // 获取详情
      async loadInfo(id) {
        const { returnValue: res } = await sysDeptFindById({ id })
        console.log(res)
        this.info = res
      },
      // 返回
      onGoback() {
        this.$emit('editClose')
      }
    }

  }
</script>

<style lang="less" scoped>
</style>
