import httpMethod from './method'
import md5 from 'js-md5'   //加密

let { getService, postService, postJsonService, postFormDataService } = httpMethod

let request = {
    /**
     * 获取验证码
     * @return {[type]} [description]
     */
    getCaptcha: () => {
        return '/auth/captcha?r=' + Math.random()
    },

    /**
     * 登录
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    Login: (data) => postService('/auth/login.do?merchant_name=' + data.merchant_name + '&merchant_pwd=' + md5(data.merchant_pwd) + '&captcha=' + data.captcha, undefined, true),

    /**
     * 获取header信息
     * @return {[type]} [description]
     */
    getHeader: () => getService('/auth/header', true),

    /**
     * 退出登录
     * @return {[type]} [description]
     */
    getLogout: () => getService('/auth/logout', true),

    /**
     * 获取接口列表
     */
    getInterfaceList: () => getService('/doc/list'),

    /**
     * 获取接口详情
     */
    getInterfaceDetail: (id) => getService(`/doc/detail/${id}`),
  
    /**
     * get方法
     */
    getURL: (URL) => getService(`${URL}`),

    /**
     * post方法
     */
    postURL: (URL,data) => postService(`${URL}`,data),

    /**
     * application/json 方式
     */
    postJson: (URL,data) => postJsonService(`${URL}`, data),

    /**
     * multipart/form-data 方式
     */
    postForm: (URL,data) => postFormDataService(`${URL}`, data)



}

export default request