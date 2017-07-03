// 配置API接口地址
var root = 'http://api.pay.oasgames.com/'
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
//参数过滤函数
function filterNull (o) {
  // for (var key in o) {
  //   if (o[key] === null) {
  //     delete o[key]
  //   }
  //   if (toType(o) === 'string') {
  //     o[key] = o[key].trim()
  //   } else if (toType(o) === 'object') {
  //       var str = "";
  //       for(var prop in o){
  //           str += o[key] + "=" + o[prop] + "&"
  //       }
  //       return o;
  //   } else if (toType(o[key]) === 'array') {
  //     o[key] = filterNull(o[key])
  //   }
  // }
  if (toType(o) === 'object'){
      var params = ''
      for(var prop in o){
          params +=  '&' + prop + "=" + o[prop]
      }
      o = params.substring(1)
  }
  return o
}


function apiAxios (method, url, params, success, failure) {
  if (method === 'POST') {
    params = filterNull(params)
}
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false,
    dataType:'json'
  })
  .then(function (res) {
    if (res.status === 200) {
      if (success) {
        success(res.data)
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        window.alert('error: ' + JSON.stringify(res))
      }
    }
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
      window.alert('api error, HTTP CODE: ' + err.message)
      return
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
