import Qs from 'qs'

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // 接口请求
    return request({
      url: '/authentication/token/login/admin',
      method: 'post',
      data: Qs.stringify(data)
    })
  }
})

