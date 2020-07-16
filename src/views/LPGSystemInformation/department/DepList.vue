<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <a-form layout="inline">
        <a-form-item
          label="关键字"
          :labelCol="{span: 8 }"
          :wrapperCol="{span: 16 }">
          <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" />
        </a-form-item>
        <a-form-item
          label="创建日期"
          :labelCol="{span: 6 }"
          :wrapperCol="{span: 18 }">
          <a-date-picker v-model="queryParam.startTime" placeholder="请输入更新日期"/>
          <a-date-picker v-model="queryParam.endTime" placeholder="请输入更新日期"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">查询</a-button>
          <a-button class="m-l10" type="primary" ghost>重置</a-button>
        </a-form-item>
      </a-form>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">配置</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { sysDeptDeleteAll } from '@/api/systemManage'
  import { STable, Ellipsis } from '@/components'
  const columns = [
    {
      title: '#',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '规则编号',
      dataIndex: 'no'
    },
    {
      title: '描述',
      dataIndex: 'description',
      scopedSlots: { customRender: 'description' }
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      needTotal: true,
      customRender: (text) => text + ' 次'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]
  const statusMap = {
    0: {
      status: 'default',
      text: '关闭'
    },
    1: {
      status: 'processing',
      text: '运行中'
    },
    2: {
      status: 'success',
      text: '已上线'
    },
    3: {
      status: 'error',
      text: '异常'
    }
  }
  export default {
    name: 'DepList',
    components: {
      STable,
      Ellipsis
    },
    data () {
      this.columns = columns
      return {
        ids: ['1283608292532232193', '1283608007130816514'],
        // 查询参数
        queryParam: {},
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return this.getSysDeptDeleteAll()
        }
      }
    },
    created () {
    },
    methods: {
      getSysDeptDeleteAll () {
        const obj = {
          ids: this.ids,
          type: 1,
          name: 2
        }
        sysDeptDeleteAll(obj).then(res => {
          console.log(res)
        })
      },
      // 查询
      handleSubmit () {
        console.log('查询')
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
