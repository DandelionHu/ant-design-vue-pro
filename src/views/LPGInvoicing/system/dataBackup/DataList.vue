<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <div>
        <a-form layout="inline">
          <a-form-item
            class="width250"
            label="关键字"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.creator" @change="onSearch"/>
          </a-form-item>
          <a-form-item
            label="操作日期"
            :labelCol="{span: 6 }"
            :wrapperCol="{span: 18 }">
            <a-range-picker
              :placeholder="['开始日期', '结束日期']"
              v-model="searchData"
              v-decorator="['range-picker', rangeConfig]"
              @change="onDateChange"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSearch">查询</a-button>
            <a-button class="m-l10" @click="onReset" type="primary" ghost>重置</a-button>
            <a-button class="m-l10" @click="downLoad" type="warm">导出</a-button>
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
          <span slot="createTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { dataBackupFindAll } from '@/api/entersSellsSaves'
  import { STable, Ellipsis } from '@/components'

  export default {
    name: 'GasList',
    components: {
      STable,
      Ellipsis
    },
    data() {
      return {
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '备份说明',
            dataIndex: 'empNo'
          },
          {
            title: '备份文件名',
            dataIndex: 'creator'
          },
          {
            title: '操作时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '操作员',
            dataIndex: 'ipAddr'
          },
          {
            title: '操作',
            dataIndex: 'details'
          }
        ],
        // 验证
        rangeConfig: {
          rules: [{ type: 'array', required: true, message: '请选择操作日期!' }]
        },
        // 查询参数
        queryParam: {},
        // 日期
        searchData: [],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('提交参数', requestParameters)
          return this.getList(requestParameters)
        }
      }
    },
    filters: {},
    computed: {},
    created() {
    },
    methods: {
      // 搜索
      onSearch() {
        // 刷新到第一页
        this.$refs.table.refresh(true)
      },
      // 日期
      onDateChange(date, dateString) {
        this.queryParam.startTime = dateString[0] + ' 00:00:01'
        this.queryParam.endTime = dateString[1] + ' 23:59:59'
        this.onSearch()
      },
      // 重置
      onReset() {
        this.searchData = []
        this.queryParam = {}
        this.onSearch()
      },
      // 查询
      getList(data) {
        return dataBackupFindAll(data).then(res => {
          return res
        })
      },
      // 导出
      downLoad() {}
    }
  }
</script>

<style lang="less" scoped>
</style>
