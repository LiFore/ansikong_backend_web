import Qs from 'qs'

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  CREATE_CLIENT (data = {}) {
    // 接口请求
    return request({
      url: '/client/add',
      method: 'post',
      data: data
    })
  },

  MODIFY_CLIENT (data = {}) {
    // 接口请求
    return request({
      url: '/client/modify',
      method: 'post',
      data: data
    })
  },

  LIST_CLIENT (param = {}, data = {}) {
    // 接口请求
    return request({
      url: '/client/list',
      method: 'post',
      params: param,
      data: data
    })
  }
})
