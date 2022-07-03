import request from '@/utils/request'

const api_name = '/admin/vod/course'

export default {
    //课程列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/getCourse/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    saveCourseInfo(courseInfo) {
        return request({
            url: `${api_name}/saveCourse`,
            method: 'post',
            data: courseInfo
        })
    },
    getCourseInfoById(id) {
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get'
        })
    },
    //修改课程信息
    updateCourseInfoById(courseInfo) {
        return request({
            url: `${api_name}/update`,
            method: 'post',
            data: courseInfo
        })
    },
}