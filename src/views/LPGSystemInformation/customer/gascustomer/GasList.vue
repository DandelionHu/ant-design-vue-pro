<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <div v-show="showList">
        <a-form layout="inline">
          <a-form-item
            class="width250"
            label="关键字"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
          </a-form-item>
          <a-form-item
            class="width250"
            label="账号状态"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-select v-model="queryParam.state" placeholder="请选择" default-value="" @change="onSearch">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="0">正常</a-select-option>
              <a-select-option value="1">冻结</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            class="width250"
            label="客户类型"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-select v-model="queryParam.guestType" placeholder="请选择" default-value="" @change="onSearch">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="10">居民客户</a-select-option>
              <a-select-option value="11">商业客户</a-select-option>
              <a-select-option value="31">企业客户(气站)</a-select-option>
              <a-select-option value="32">企业客户(门市)</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            class="width250"
            label="客户来源"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-select v-model="queryParam.guestSource" placeholder="请选择" default-value="" @change="onSearch">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">钢瓶溯源</a-select-option>
              <a-select-option value="2">进销存</a-select-option>
              <a-select-option value="3">商城</a-select-option>
              <a-select-option value="4">呼叫中心</a-select-option>
              <a-select-option value="5">安全检查</a-select-option>
              <a-select-option value="6">分布地图</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSearch">查询</a-button>
            <a-button class="m-l10" @click="onReset" type="primary" ghost>重置</a-button>
          </a-form-item>
        </a-form>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
          class="m-t10"
        >
          <span slot="guestType" slot-scope="text">
            {{ text | guestType }}
          </span>
          <span slot="orgName" slot-scope="text">
            <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="state" slot-scope="text">
            {{ text | state}}
          </span>
          <span slot="guestSource" slot-scope="text">
            {{ text | guestSource}}
          </span>
          <span slot="createTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a class="table-look" @click="handleLook(record)">查看</a>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 详情页面 -->
      <gas-info v-if="!showList" @editClose="editClose" :editID="editID"></gas-info>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { sysGuestFindGuests } from '@/api/systemManage'
  import { STable, Ellipsis } from '@/components'
  import GasInfo from './GasInfo'
  export default {
    name: 'GasList',
    components: {
      STable,
      Ellipsis,
      GasInfo
    },
    data () {
      return {
        showList: true,
        editID: '', // 编辑id
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '用户卡编号',
            dataIndex: 'guestNo'
          },
          {
            title: '姓名/单位名',
            dataIndex: 'name'
          },
          {
            title: '用户类型',
            dataIndex: 'guestType',
            scopedSlots: { customRender: 'guestType' }
          },
          {
            title: '用户归属',
            dataIndex: 'orgName',
            scopedSlots: { customRender: 'orgName' }
          },
          {
            title: '身份证号',
            dataIndex: 'idNumber'
          },
          {
            title: '联系电话',
            dataIndex: 'phone1'
          },
          {
            title: '用户状态',
            dataIndex: 'state',
            scopedSlots: { customRender: 'state' }
          },
          {
            title: '客户来源',
            dataIndex: 'guestSource',
            scopedSlots: { customRender: 'guestSource' }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('提交参数', requestParameters)
          return this.getList(requestParameters)
        }
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
    computed: {
    },
    created () {
    },
    methods: {
      // 搜索
      onSearch () {
        // 刷新到第一页
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset () {
        this.queryParam = {}
        this.onSearch()
      },
      // 查询
      getList (data) {
        return sysGuestFindGuests(data).then(res => {
          return res
        })
      },
      // 查看
      handleLook (data) {
        this.editID = data.id
        this.showList = !this.showList
      },
      // 编辑关闭
      editClose () {
        this.showList = !this.showList
        // 刷新当前页
        this.$refs.table.refresh()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
