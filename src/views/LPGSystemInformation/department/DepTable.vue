<template>
  <div>
    <a-form layout="inline">
      <a-form-item
        :wrapperCol="{span: 24 }">
        <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
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
      :rowSelection="rowSelection"
      showPagination="auto"
      class="m-t10"
    >
      <span slot="description" slot-scope="text">
        <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="createTime" slot-scope="text">
        {{ text | dayjs }}
      </span>
    </s-table>
  </div>
</template>

<script>
  import { sysManagerFindList } from '@/api/systemManage'
  import { STable, Ellipsis } from '@/components'
  export default {
    name: 'DepTable',
    components: {
      STable,
      Ellipsis
    },
    props: {
      record: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        // 表头
        columns: [
          {
            title: '员工编号',
            dataIndex: 'empNo'
          },
          {
            title: '系统账号',
            dataIndex: 'account'
          },
          {
            title: '姓名',
            dataIndex: 'realName'
          },
          {
            title: '联系电话',
            dataIndex: 'phone'
          },
          {
            title: '岗位',
            dataIndex: 'roleName'
          },
          {
            title: '所属组织',
            dataIndex: 'orgName',
            scopedSlots: { customRender: 'description' }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
          }
        ],
        // 查询参数
        queryParam: {
          adminType: 0
        },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('提交参数', requestParameters)
          return this.getList(requestParameters)
        },
        // 选中的key
        selectedRowKeys: [],
        // 选中的行
        selectedRows: []
      }
    },
    filters: {
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    created () {
    },
    mounted () {
      // 回填数据
      console.log(this.record)
    },
    methods: {
      // 搜索
      onSearch () {
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset () {
        this.queryParam = {}
        this.onSearch()
      },
      // 查询
      getList (data) {
        return sysManagerFindList(data).then(res => {
          return res
        })
      },
      // 选择
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      // 弹框确认
      onOk () {
        if (this.selectedRowKeys.length) {
          return new Promise(resolve => {
            // 选中的值传回去
            resolve(this.selectedRows)
          })
        } else {
          this.$message.error('请选择员工')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
