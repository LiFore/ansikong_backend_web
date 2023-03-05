<template>
  <d2-container>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 14px;font-weight: 800">筛选查询</span>
      </div>
      <el-form :inline="true" :ref="searchForm" class="search-form-customized">
        <el-form-item>
          <el-input v-model="searchForm[0].queryValue" placeholder="身份证号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm[2].queryValue" placeholder="手机号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm[1].queryValue"   placeholder="长者标签">
            <el-option v-for="(item,k) in tagOptionList" v-bind:key="k" :label="item.tagName" :value="'%'+item.tagId+'%'" clearable></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="isCreateFormVisible = true" size="mini">新增客户</el-button>
        <el-button type="primary" @click="doCreate" size="mini">导出信息</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="clientName"
          label="姓名"
          width="240">
        </el-table-column>
        <el-table-column
          prop="tags"
          label="长者标签"
          width="240">
        </el-table-column>
        <el-table-column
          prop="clientStatus"
          label="用户状态"
          width="240">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="联系方式"
          width="240">
        </el-table-column>
        <el-table-column
          prop="birthDay"
          label="出生日期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="addressReadable"
          label="居住地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
            >详情</el-button>
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
        :total="tablePages.totalDataCount">
      </el-pagination>
      </div>
    </el-card>
    <el-dialog title="新增" :visible.sync="isCreateFormVisible">
      <el-form :model="createForm" :rules="createFormRules" ref="createForm">
        <el-form-item label="长者姓名" label-width="100px" prop="clientName">
          <el-input v-model="createForm.clientName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="100px" prop="ids">
          <el-input v-model="createForm.ids" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="长者标签" label-width="100px" prop="tags">
          <el-select v-model="createForm.tags" placeholder="请选择长者标签" style="width: 100%"  multiple clearable>
            <el-option v-for="(item) in tagOptionList" :key="item.tagId" :label="item.tagName" :value="item.tagId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" label-width="100px" prop="birthDay">
          <el-date-picker
            v-model="createForm.birthDay"
            type="date"
            placeholder="请选择出生日期"
            value-format="yyyy-MM-DD"
          />
        </el-form-item>
        <el-form-item label="性别" label-width="100px" prop="gender">
          <el-select v-model="createForm.gender" placeholder="请选择性别">
            <el-option label="男" value="MALE"></el-option>
            <el-option label="女" value="FEMALE"></el-option>
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
        <el-form-item label="长者姓名" label-width="100px" prop="clientName">
          <el-input v-model="modifyForm.clientName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="100px" prop="ids">
          <el-input v-model="modifyForm.ids" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="长者标签" label-width="100px" prop="tags">
          <el-select v-model="modifyForm.tags" placeholder="请选择长者标签" style="width: 100%" multiple clearable>
            <el-option v-for="(item) in tagOptionList" :label="item.tagName" :value="item.tagId" :key="item.tagId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" label-width="100px" prop="birthDay">
          <el-date-picker
            v-model="modifyForm.birthDay"
            type="date"
            placeholder="请选择出生日期"
            value-format="yyyy-MM-DD"
          />
        </el-form-item>
        <el-form-item label="性别" label-width="100px" prop="gender">
          <el-select v-model="modifyForm.gender" placeholder="请选择性别">
            <el-option label="男" value="MALE"></el-option>
            <el-option label="女" value="FEMALE"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="endModify()">取 消</el-button>
        <el-button type="primary" @click="doModify()">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import api from '@/api'
import { Notification } from 'element-ui'
import { CastTime } from '@/libs/util'

export default {
  name: 'clients-list',
  data () {
    return {
      createForm: {
        clientName: '',
        ids: '',
        birthDay: '',
        gender: '',
        tags: []
      },
      modifyForm: {
        clientName: '',
        ids: '',
        birthDay: '',
        gender: '',
        tags: []
      },
      createFormRules: {
        tagName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        ids: [
          { required: true, message: '请输入客户身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度在 18 个字符', trigger: 'blur' }
        ],
        birthDay: [
          { required: true, message: '请选择一个标签类型', trigger: 'change' }
        ],
        tags: [
          { required: false, message: '请选择一个标签类型', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      modifyFormRules: {
        tagName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        ids: [
          { required: true, message: '请输入客户身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度在 18 个字符', trigger: 'blur' }
        ],
        birthDay: [
          { required: true, message: '请选择一个标签类型', trigger: 'change' }
        ],
        tags: [
          { required: true, message: '请选择一个标签类型', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      searchForm: [
        {
          queryType: 'or',
          queryParamName: 'Ids',
          queryMethod: 'EqualTo',
          queryValue: null
        },
        {
          queryType: 'or',
          queryParamName: 'Tags',
          queryMethod: 'Like',
          queryValue: ''
        },
        {
          queryType: 'or',
          queryParamName: 'PhoneNumber',
          queryMethod: 'EqualTo',
          queryValue: null
        }
      ],
      isModifyFormVisible: false,
      isCreateFormVisible: false,
      tablePages: {
        size: 10,
        page: 1,
        totalDataCount: 0
      },
      tableData: [],
      tagOptionList: []
    }
  },

  methods: {
    async getTagOptions () {
      const loading = this.$loading({})
      // eslint-disable-next-line no-unused-vars
      const res = await api.LIST_TAG({ page: 1, size: 100 })
      this.tagOptionList = res.list
      loading.close()
    },
    async handleSizeChange (val) {
      this.tablePages.size = val
      await this.doSearch()
    },
    async handleCurrentChange (val) {
      this.tablePages.page = val
      await this.doSearch()
    },
    doCreate () {
      this.$refs.createForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
          })
          this.createForm.tags = this.createForm.tags.toString()
          // eslint-disable-next-line no-unused-vars
          const res = await api.CREATE_CLIENT(this.createForm)
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
    endModify () {
      this.isModifyFormVisible = false
    },
    doModify () {
      this.$refs.modifyForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
          })
          this.modifyForm.tags = this.modifyForm.tags.toString()
          // eslint-disable-next-line no-unused-vars
          const res = await api.MODIFY_CLIENT(this.modifyForm)
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
    async doSearch () {
      const loading = this.$loading({})
      var queryDtoList = []
      this.searchForm.forEach((element) => {
        if (element.queryValue != null && element.queryValue !== '') queryDtoList.push(element)
      })
      // eslint-disable-next-line no-unused-vars
      const res = await api.LIST_CLIENT({ page: this.tablePages.page, size: this.tablePages.size }, { queryDtoList: queryDtoList })
      res.list.forEach((element, k) => {
        if (element.tags !== '') {
          res.list[k].tags = element.tags.split(',')
          res.list[k].tags.forEach((e2, k2) => {
            res.list[k].tags[k2] = parseInt(e2)
          })
        }
        console.log(element.birthDay)
        res.list[k].birthDay = CastTime('YYYY-mm-dd',element.birthDay )
      })
      this.tableData = res.list
      this.tablePages.page = res.page
      this.tablePages.size = res.size
      this.tablePages.totalDataCount = res.total
      loading.close()
    }
  },
  mounted () {
    this.getTagOptions()
    this.doSearch()
  }
}
</script>
