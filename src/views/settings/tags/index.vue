<template>
  <d2-container>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="isCreateFormVisible = true" size="mini">新增标签</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="tagName"
          label="标签名称"
          width="240">
        </el-table-column>
        <el-table-column
          prop="tagType"
          label="标签类型"
          width="240">
          <template slot-scope="scope">
            <span v-if="scope.row.tagType == 'CLIENT_TYPE'">分类标签</span>
            <span v-if="scope.row.tagType == 'CLIENT_SERVICE'">服务标签</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="startModify(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px auto;text-align: center">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
          :total="totalDataCount">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="新增" :visible.sync="isCreateFormVisible">
      <el-form :model="createForm" :rules="createFormRules" ref="createForm">
        <el-form-item label="标签名称" label-width="100px" prop="tagName">
          <el-input v-model="createForm.tagName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签类型" label-width="100px" prop="tagType">
          <el-select v-model="createForm.tagType" placeholder="请选择标签类型">
            <el-option label="分类标签" value="CLIENT_TYPE"></el-option>
            <el-option label="服务标签" value="CLIENT_SERVICE"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doCreate()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="isModifyFormVisible">
      <el-form :model="modifyForm" :rules="modifyFormRules" ref="modifyForm">
        <el-form-item label="标签名称" label-width="100px" prop="tagName">
          <el-input v-model="modifyForm.tagName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签类型" label-width="100px" prop="tagType">
          <el-select v-model="modifyForm.tagType" placeholder="请选择标签类型">
            <el-option label="分类标签" value="CLIENT_TYPE"></el-option>
            <el-option label="服务标签" value="CLIENT_SERVICE"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isModifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doModify()">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import api from '@/api'
import { Notification } from 'element-ui'
export default {
  name: 'clients-list',
  data () {
    return {
      createForm: {
        tagName: '',
        tagType: '',
        status: 'ENABLE'
      },
      modifyForm: {
        tagName: '',
        tagType: '',
        status: 'ENABLE'
      },
      createFormRules: {
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        tagType: [
          { required: true, message: '请选择一个标签类型', trigger: 'change' }
        ]
      },
      modifyFormRules: {
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        tagType: [
          { required: true, message: '请选择一个标签类型', trigger: 'change' }
        ]
      },
      isCreateFormVisible: false,
      isModifyFormVisible: false,
      searchForm: {
        page: 1,
        size: 10
      },
      totalDataCount: 0,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    doCreate () {
      this.$refs.createForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
          })
          // eslint-disable-next-line no-unused-vars
          const res = await api.CREATE_TAG(this.createForm)
          Notification({ title: '新增成功' })
          this.$refs.createForm.resetFields()
          await this.doSearch()
          this.isCreateFormVisible = false
          loading.close()
        } else {
          return false
        }
      })
    },
    startModify (data) {
      console.log(data)
      this.modifyForm = data
      this.isModifyFormVisible = true
    },
    doModify () {
      this.$refs.modifyForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
          })
          // eslint-disable-next-line no-unused-vars
          const res = await api.MODIFY_TAG(this.modifyForm)
          Notification({ title: '修改成功' })
          this.$refs.modifyForm.resetFields()
          await this.doSearch()
          this.isModifyFormVisible = false
          loading.close()
        } else {
          return false
        }
      })
    },
    async handleSizeChange (val) {
      this.searchForm.size = val
      await this.doSearch()
    },
    async handleCurrentChange (val) {
      this.searchForm.page = val
      await this.doSearch()
    },
    async doSearch () {
      const loading = this.$loading({
      })
      // eslint-disable-next-line no-unused-vars
      const res = await api.LIST_TAG(this.searchForm)
      this.tableData = res.list
      this.searchForm.page = res.page
      this.searchForm.size = res.size
      this.totalDataCount = res.total
      loading.close()
    }
  },
  mounted () {
    this.doSearch()
  }
}
</script>
