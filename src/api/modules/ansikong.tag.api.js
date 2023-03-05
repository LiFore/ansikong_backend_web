import Qs from 'qs'

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  CREATE_TAG (data = {}) {
    // 接口请求
    return request({
      url: '/tag/add',
      method: 'post',
      data: data
    })
  },
  MODIFY_TAG (data = {}) {
    // 接口请求
    return request({
      url: '/tag/modify',
      method: 'post',
      data: data
    })
  },

  LIST_TAG (param = {}) {
    // 接口请求
    return request({
      url: '/tag/get',
      method: 'get',
      params: param
    })
  }
})
