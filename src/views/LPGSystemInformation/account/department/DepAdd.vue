<template>
  <a-form :form="form">
    <a-form-item
      label="名称"
      :labelCol="{lg: {span: 1}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 5}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入名称',whitespace: true },
                   { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
        ]"
        name="name"
        placeholder="请输入名称"/>
    </a-form-item>
    <a-form-item
      label="描述"
      :labelCol="{lg: {span: 1}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 5}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'descs',
          {rules: [{ min:1, max:30, message: '请输入长度1到30位'}]}
        ]"
        name="descs"
        placeholder="请输入描述"/>
    </a-form-item>
    <a-form-item
      label="部门员工"
      :labelCol="{lg: {span: 1}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 5}, sm: {span: 6}}">
      <a-button type="primary" ghost @click="onChoose">选择</a-button>
    </a-form-item>
    <a-form-item
      label="已选员工"
      :labelCol="{lg: {span: 1}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 15}, sm: {span: 16}}">
      <a-textarea readonly v-model="managerNames"></a-textarea>
    </a-form-item>
    <a-form-item
      :wrapperCol="{lg: {span: 6}, sm: {span: 9}}"
      class="ta-c">
      <a-button type="primary" ghost @click="onCancel">取消</a-button>
      <a-button
        class="m-l10"
        type="primary"
        @click="onSave"
        :loading="lodingBtn"
        :disabled="lodingBtn">保存
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { sysDeptSaveDept, sysDeptFindById } from '@/api/systemManage'
  import DepTable from './DepTable'
  export default {
    name: 'DepAdd',
    components: {
      DepTable
    },
    props: {
      editID: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        form: this.$form.createForm(this),
        lodingBtn: false,
        managerArr: [],
        managerIds: [],
        managerNames: ''
      }
    },
    mounted() {
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        this.handleReset()
        if (this.editID) {
          // 编辑
          this.loadInfo(this.editID)
        }
      })
    },
    methods: {
      // 重置表单
      handleReset() {
        this.form.resetFields()
      },
      // 取消
      onCancel() {
        this.$emit('editClose')
      },
      // 保存
      onSave(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.lodingBtn = true
            console.log('提交的数据', values)
            const params = { ...values }
            params.id = this.editID
            params.managerIds = this.managerIds
            sysDeptSaveDept(params)
                .then((res) => {
                  if (res.returnValue) {
                    if (this.editID) {
                      this.$message.info('编辑成功')
                    } else {
                      this.$message.info('保存成功')
                    }
                    this.onCancel()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
                .finally(() => {
                  this.lodingBtn = false
                })
          }
        })
      },
      // 获取详情
      async loadInfo(id) {
        const { form } = this
        const { returnValue: res } = await sysDeptFindById({ id })
        console.log(res)
        this.managerNames = res.managersName
        this.managerIds = res.managerIds.split(',')
        form.setFieldsValue({
          name: res.name,
          descs: res.descs
        })
      },
      // 选择员工
      onChoose() {
        const that = this
        this.$dialog(DepTable,
            {
              record: that.managerIds,
              on: {
                ok (data) {
                  if (data.length > 0) {
                    that.managerArr = data
                    const managerIds = []
                    const managerNames = []
                    that.managerArr.forEach((v, i) => {
                      managerIds.push(v.id)
                      managerNames.push(v.realName)
                    })
                    that.managerIds = managerIds
                    that.managerNames = managerNames.join(',')
                  }
                },
                cancel () {
                  console.log('取消回调')
                },
                close () {
                  console.log('关闭回调')
                }
              }
            },
            {
              title: '选择员工',
              width: 950,
              centered: true,
              maskClosable: false
            })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
