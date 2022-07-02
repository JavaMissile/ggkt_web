import request from '@/utils/request'

const api_name = '/admin/vod/teacher'

export default {
    //讲师列表
    pageList(current, limit, searchObj) {
        return request({
            url: `${api_name}/findQueryPage/${current}/${limit}`,
            method: `post`,
            data: searchObj
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: `delete`
        })
    },
    addTeacher(teacher){
        return request({
            url: `${api_name}/addTeacher`,
            method: `post`,
            data:teacher
        })
    },
    findTeacherById(id) {
        return request({
            url: `${api_name}/findTeacher/${id}`,
            method: `get`
        })
    },
    updateTeacher(teacher){
        return request({
            url: `${api_name}/update`,
            method:`post`,
            data:teacher
        })
    }, 
    batchRemove(idList) {
        return request({
            url: `${api_name}/removeBatch`,
            method: `delete`,
            data: idList
        })
    },
    //所有讲师
    list() {
        return request({
            url: `${api_name}/findAll`,
            method: `get`
        })
    },


}