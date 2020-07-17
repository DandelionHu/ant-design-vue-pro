<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <a-form>
        <a-form-item
          label="名称"
          :labelCol="{lg: {span: 1}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 6}}">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入名称' }]}
            ]"
            maxlength="10"
            name="name"
            placeholder="请输入名称" />
        </a-form-item>
        <a-form-item
          label="描述"
          :labelCol="{lg: {span: 1}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 5}, sm: {span: 6}}">
          <a-input
            maxlength="20"
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
            :disabled="loginBtn">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { sysDeptSaveDept } from '@/api/systemManage'
  export default {
    name: 'DepAdd',
    data () {
      return {
        form: this.$form.createForm(this),
        lodingBtn: false
      }
    },
    methods: {
      // 取消
      onCancel () {
        this.$router.push({ path: '/LPGSystemInformation/department/dep-list' })
      },
      // 保存
      onSave (e) {
        e.preventDefault()
        this.lodingBtn = true
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('提交的数据', values)
            const params = { ...values }
            sysDeptSaveDept(params)
                .then((res) => {
                  if (res.returnValue) {
                    this.$message.info('保存成功')
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
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
