<template>
  <div class="app-conotainer">
    <!--查询表单-->
    <el-card class="operate-container" shadow="never">
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="名称">
        <el-input v-model="searchObj.name" placeholder="讲师名" /> 
    </el-form-item>

    <el-form-item label="头衔">
        <el-select v-model="searchObj.level" clearable placeholder="头衔">
        <el-option value="1" label="高级讲师"/>
        <el-option value="0" label="首席讲师"/>
        </el-select>
    </el-form-item>

    <el-form-item label="入驻时间">
        <el-date-picker
        v-model="searchObj.joinDateBegin"
        placeholder="开始时间"
        value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item label="-">
        <el-date-picker
        v-model="searchObj.joinDateEnd"
        placeholder="结束时间"
        value-format="yyyy-MM-dd" />
    </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    </el-card>


    <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets" style="margin-top: 5px"></i>
    <span style="margin-top: 5px">数据列表</span>
    <el-button class="btn-add" @click="add()" style="margin-left: 10px;">添加</el-button>
    <el-button class="btn-add" @click="batchRemove()" >批量删除</el-button>
    </el-card>

    <!-- 表格主体 -->
    <el-table
    :data="list"
    border
    stripe
    @selection-change="handleSelectionChange">
    <el-table-column type="selection"/>
    <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
        {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" width="80" />
    <el-table-column label="头衔" width="90">
        <template slot-scope="scope">
        <el-tag v-if="scope.row.level === 1" type="success" size="mini">高级讲师</el-tag>
        <el-tag v-if="scope.row.level === 0" size="mini">首席讲师</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="intro" label="简介" />
    <el-table-column prop="sort" label="排序" width="60" />
    <el-table-column prop="joinDate" label="入驻时间" width="160" />
    <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
        <el-button type="text" size="mini" @click="removeById(scope.row.id)">删除</el-button>
        <router-link :to="'/vod/teacher/edit/'+scope.row.id">
            <el-button type="text" size="mini">修改</el-button>
        </router-link>
        </template>
    </el-table-column>
    </el-table>
    <!-- 分页器 -->
  <el-pagination
    :current-page="page"
    :total="total"
    :page-size="limit"
    :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
    style="padding: 30px 0; text-align: center;"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="changePageSize"
    @current-change="changeCurrentPage"
  />
  </div>
</template>

<script>

import teacherApi from "@/api/vod/teacher.js"

export default {
    data() {
        return {
            list: [], // 讲师列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询条件
            multipleSelection: []// 批量删除选中的记录列表
            ,selection:[]
        };
    },
    created(){//页面渲染前调用
        this.fetchData()
    },
    methods:{//具体方法发送ajax请求
        fetchData(){
             // 调用api
            teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
                this.list = response.data.records
                this.total = response.data.total
            })
        },
        changePageSize(size){
            this.limit=size
            this.fetchData()
        },
        changeCurrentPage(size){
            this.page=size
            this.fetchData()
        },
        resetData(){
            this.searchObj={}
            this.fetchData()
        },
        removeById(id){
            this.$confirm('此操作将删除该讲师信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                teacherApi.removeById(id).then(response=>{
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    this.fetchData()
                })
            })
        },
        handleSelectionChange(selection){
            this.selection=selection
        },
        batchRemove(){
            if(this.selection.length===0){
                this.$message.warning('请选择要删除的记录！')
                return
            }else{
                this.$confirm('此操作将删除选中讲师信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    var idList=[]
                    this.selection.forEach(element => {
                        idList.push(element.id)
                    });
                    teacherApi.batchRemove(idList).then(()=>{
                        this.$message({
                        type: 'success',
                        message: '批量删除成功!'
                        });
                        this.fetchData()
                    })
                })
            }

        },
        add(){
            this.$router.push('/vod/teacher/create');
        }
    }
}
</script>

<style>

</style>
