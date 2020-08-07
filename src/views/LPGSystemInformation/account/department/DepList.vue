<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <div v-if="showList">
        <a-form layout="inline">
          <a-form-item
            class="width250"
            label="关键字"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
          </a-form-item>
          <a-form-item
            label="创建日期"
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
            <a-button class="m-l10" @click="onAdd" type="normal">添加</a-button>
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
          <span slot="description" slot-scope="text">
            <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="createTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
          <span slot="operationTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a class="table-look" @click="handleLook(record)">查看</a>
              <a-divider type="vertical"/>
              <a class="table-edit" @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical"/>
              <a class="table-delete" @click="handleDelete(record)">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 添加编辑页面 -->
      <dep-add v-if="showAdd" @editClose="editClose" :editID="editID"></dep-add>
      <!-- 详情页面 -->
      <dep-info v-if="showInfo" @editClose="editClose" :editID="editID"></dep-info>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { sysDeptDeleteAll, sysDeptFindList } from '@/api/systemManage'
  import { STable, Ellipsis } from '@/components'
  import DepAdd from './DepAdd'
  import DepInfo from './DepInfo'

  export default {
    name: 'DepList',
    components: {
      STable,
      Ellipsis,
      DepAdd,
      DepInfo
    },
    data() {
      return {
        showList: true,
        showAdd: false,
        showInfo: false,
        editID: '', // 编辑id
        rangeConfig: {
          rules: [{ type: 'array', required: true, message: '请选择创建日期!' }]
        },
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '部门名称',
            dataIndex: 'name'
          },
          {
            title: '部门描述',
            dataIndex: 'descs',
            scopedSlots: { customRender: 'description' }
          },
          {
            title: '操作人',
            dataIndex: 'operation'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '操作时间',
            dataIndex: 'operationTime',
            scopedSlots: { customRender: 'operationTime' }
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
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset() {
        this.searchData = []
        this.queryParam = {}
        this.onSearch()
      },
      // 添加
      onAdd() {
        this.editID = ''
        this.showList = false
        this.showInfo = false
        this.showAdd = true
      },
      // 日期
      onDateChange(date, dateString) {
        this.queryParam.startTime = dateString[0]
        this.queryParam.endTime = dateString[1]
        this.onSearch()
      },
      // 查询
      getList(data) {
        return sysDeptFindList(data).then(res => {
          return res
        })
      },
      // 查看
      handleLook(data) {
        this.editID = data.id
        this.showList = false
        this.showAdd = false
        this.showInfo = true
      },
      // 编辑
      handleEdit(data) {
        this.editID = data.id
        this.showList = false
        this.showInfo = false
        this.showAdd = true
      },
      // 编辑关闭
      editClose() {
        this.showList = true
        this.showAdd = false
        this.showInfo = false
        this.onRefresh()
      },
      // 删除
      handleDelete(data) {
        const that = this
        this.$confirm({
          title: '删除提示',
          content: `真的要删除 ${data.name} 吗?`,
          okText: '删除',
          okType: 'primary',
          cancelText: '取消',
          async onOk() {
            const obj = {
              ids: []
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await sysDeptDeleteAll(obj)
            if (res) {
              that.$message.info('删除成功')
              that.onRefresh()
            }
          }
        })
      },
      // 刷新当前页
      onRefresh() {
        this.$refs.table.refresh()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
