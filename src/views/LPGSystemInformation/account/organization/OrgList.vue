<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <div v-if="showList">
        <a-row>
          <a-col :span="5">
            <a-tree
              v-if="treeData.length > 0"
              :show-line="true"
              :tree-data="treeData"
              show-icon
              default-expand-all
              @select="onSelect"
              class="tree"
            >
              <template slot="name" slot-scope="text, record, index">
                {{text}}{{record}}{{index}}
                <ellipsis :length="1" tooltip>000000{{name}}</ellipsis>
              </template>
            </a-tree>
          </a-col>
          <a-col :span="19">
            <a-form layout="inline">
              <a-form-item
                label="关键字"
                :labelCol="{span: 8 }"
                :wrapperCol="{span: 16 }">
                <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
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
                  <a-divider type="vertical" />
                  <a class="table-edit" @click="handleEdit(record)">编辑</a>
                  <a-divider type="vertical" />
                  <a class="table-delete" @click="handleDelete(record)">删除</a>
                </template>
              </span>
            </s-table>
          </a-col>
        </a-row>
      </div>
      <!-- 添加编辑页面 -->
      <org-add v-if="showAdd" @editClose="editClose" :editID="editID"></org-add>
      <!-- 详情页面 -->
      <org-info v-if="showInfo" @editClose="editClose" :editID="editID"></org-info>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { sysOrgDeleteByIds, sysOrgFindOrgs } from '@/api/systemManage'
  import { STable, Ellipsis } from '@/components'
  import OrgAdd from './OrgAdd'
  import OrgInfo from './OrgInfo'
  export default {
    name: 'DepList',
    components: {
      STable,
      Ellipsis,
      OrgAdd,
      OrgInfo
    },
    data () {
      return {
        treeData: [],
        showList: true,
        showAdd: false,
        showInfo: false,
        editID: '', // 编辑id
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
    },
    computed: {
    },
    mounted () {
      this.getOrg()
    },
    methods: {
      // 查询
      async getOrg() {
        const { returnValue: res } = await sysOrgFindOrgs()
        let treeData = []
        res.forEach((v, i) => {
          if (v.supId === '0') {
            // 最高级
            const obj = {
              title: v.name,
              key: v.id,
              slots: {
                title: 'name'
              },
              children: []
            }
            treeData.push(obj)
          } else {
            treeData = this.onRecursion(treeData, v)
          }
        })
        this.treeData = treeData
      },
      // 递归遍历
      onRecursion(treeData, v) {
        treeData.forEach((m, n) => {
          if (m.key === v.supId) {
            const obj = {
              title: v.name,
              key: v.id,
              slots: {
                title: 'name'
              },
              children: []
            }
            m.children.push(obj)
          } else {
            this.onRecursion(m.children, v)
          }
        })
        return treeData
      },
      // 选中的树
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info)
      },
      // 搜索
      onSearch () {
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset () {
        this.searchData = []
        this.queryParam = {}
        this.onSearch()
      },
      // 添加
      onAdd () {
        this.editID = ''
        this.showList = false
        this.showInfo = false
        this.showAdd = true
      },
      // 查询
      getList (data) {
        return sysOrgFindOrgs(data).then(res => {
          return res
        })
      },
      // 查看
      handleLook (data) {
        this.editID = data.id
        this.showList = false
        this.showAdd = false
        this.showInfo = true
      },
      // 编辑
      handleEdit (data) {
        this.editID = data.id
        this.showList = false
        this.showInfo = false
        this.showAdd = true
      },
      // 编辑关闭
      editClose () {
        this.showList = true
        this.showAdd = false
        this.showInfo = false
      },
      // 删除
      handleDelete (data) {
        const that = this
        this.$confirm({
          title: '删除提示',
          content: `真的要删除 ${data.name} 吗?`,
          okText: '删除',
          okType: 'primary',
          cancelText: '取消',
          async onOk () {
            const obj = {
              ids: []
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await sysOrgDeleteByIds(obj)
            if (res) {
              that.$message.info('删除成功')
              that.onSearch()
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .tree{
    border: 1px solid #00b38b;
    height: 70vh;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
