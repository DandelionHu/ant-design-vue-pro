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
            placeholder="请输入名称" />
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
            placeholder="请输入描述" />
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
            :disabled="lodingBtn">保存</a-button>
        </a-form-item>
      </a-form>
</template>

<script>
  import { sysDeptSaveDept, sysDeptFindById } from '@/api/systemManage'
  export default {
    name: 'DepAdd',
    props: {
      editID: {
        type: [Number, String],
        default: ''
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        lodingBtn: false
      }
    },
    mounted () {
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
      handleReset () {
        this.form.resetFields()
      },
      // 取消
      onCancel () {
        this.$emit('editClose')
      },
      // 保存
      onSave (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.lodingBtn = true
            console.log('提交的数据', values)
            const params = { ...values }
            params.id = this.editID
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
      async loadInfo (id) {
        const { form } = this
        const { returnValue: res } = await sysDeptFindById({ id })
        console.log(res)
        form.setFieldsValue(res)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
