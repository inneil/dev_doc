import axios from 'axios'
import router from '../router'

import qs from 'qs'

import iView from 'iview'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.response_code == '200005') {  //参数window.location.href，专业后指代当前页面地址，并做为参数传给接口，获得当前浏览器的请求路径
      location.assign('https://sso-test.icekredit.com/login?redirect_url=' + encodeURIComponent(window.location.href))
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          location.assign('https://sso-test.icekredit.com/login?redirect_url=' + encodeURIComponent(window.location.href))
      }
    }
    return Promise.reject(error.response.data)
  }
)

let httpMethod = {

  getService: (url, no_loading) => {

    if (no_loading) {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((response) => {
            if (response.data) {
              resolve(response.data)
            }
          })
          .catch((error) => {
            resolve(error)
          })
      })
    }

    return new Promise((resolve, reject) => {
      iView.LoadingBar.start()
      axios
        .get(url)
        .then((response) => {
            if (response.data) {
              resolve(response.data)
            }
          })
        .catch((error) => {
          resolve(error)
          iView.LoadingBar.error()
        })
    })

  },
  postService: (url, data, no_loading) => {

    if (no_loading) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            if (response.data) {
              resolve(response.data)
            }
          })
          .catch((error) => {
            resolve(error)
          })
      })
    }

    return new Promise((resolve, reject) => {
      iView.LoadingBar.start()
      axios
        .post(url, data)
        .then((response) => {
            if (response.data) {
              resolve(response.data)
            }
          })
        .catch((error) => {
          resolve(error)
          iView.LoadingBar.error()
        })
    })
  },
   postJsonService: (url, data) => {

    return new Promise((resolve, reject) => {
      axios({          
        method: 'post',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
        .then((response) => {
            if (response.data) {
              resolve(response.data)
            }
          })
        .catch((error) => {
          resolve(error)
        })
    })

  },
  postFormDataService: (url, data) => {

    return new Promise((resolve, reject) => {
      axios({          
        method: 'post',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((response) => {
            if (response.data) {
              resolve(response.data)
            }
          })
        .catch((error) => {
          resolve(error)
        })
    })

  }
}

export default httpMethod
