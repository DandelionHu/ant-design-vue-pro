<template>
  <div v-if="Object.keys(info).length>0">
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        燃气用户详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="客户卡编号">{{ info.guestNo }}</a-descriptions-item>
      <a-descriptions-item label="客户类型">{{ info.guestType | guestType }}</a-descriptions-item>
      <a-descriptions-item label="姓名/单位名">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="身份证号">{{ info.idNumber }}</a-descriptions-item>
      <a-descriptions-item label="联系人">{{ info.contacts }}</a-descriptions-item>
      <a-descriptions-item label="业务归属">{{ info.orgName }}</a-descriptions-item>
      <a-descriptions-item label="联系电话1">{{ info.phone1 }}</a-descriptions-item>
      <a-descriptions-item label="联系电话2">{{ info.phone2 }}</a-descriptions-item>
      <a-descriptions-item label="身份证照片">{{ info.guestImg }}</a-descriptions-item>
      <a-descriptions-item label="联系地址">{{ info.province + info.city + info.area + info.address }}</a-descriptions-item>
      <a-descriptions-item label="客户来源">{{ info.guestSource | guestSource }}</a-descriptions-item>
      <a-descriptions-item label="账号状态">{{ info.state | state }}</a-descriptions-item>
    </a-descriptions>
    <a-card size="small" class="width400 m-t20 m-auto-l m-auto-r">
      <template slot="title">
        <div class="ta-c">燃气客户供气卡</div>
      </template>
      <a-card-meta>
        <a-avatar
          class="ant-avatar-width100"
          shape="square"
          slot="avatar"
          alt="二维码"
          :src="'data:image/jpeg;base64,'+info.qrCode"
        />
        <template slot="description">
          <p>客户编号：{{info.guestNo}}</p>
          <p>客户名称：{{info.name}}</p>
          <p>客户地址：{{ info.province + info.city + info.area + info.address }}</p>
        </template>
      </a-card-meta>
      <template slot="actions">
        <a-card-meta description="发证单位：广东海发兴能源有限公司"></a-card-meta>
      </template>
    </a-card>
  </div>
</template>

<script>
  import { sysGuestFindById } from '@/api/systemManage'

  export default {
    name: 'GasInfo',
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
    filters: {
      guestType(value) {
        const guestTypeObj = {
          10: '居民客户',
          20: '商业客户',
          31: '企业客户(气站)',
          32: '企业客户(门市)'
        }
        return guestTypeObj[value] || ''
      },
      state(value) {
        const stateObj = {
          0: '正常',
          1: '冻结'
        }
        return stateObj[value] || ''
      },
      guestSource(value) {
        const guestSourceObj = {
          1: '钢瓶溯源',
          2: '进销存',
          3: '商城',
          4: '呼叫中心',
          5: '安全检查',
          6: '分布地图'
        }
        return guestSourceObj[value] || ''
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
        const { returnValue: res } = await sysGuestFindById({ id })
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
