/* 
管理登陆用户数据的vuex子模块
*/

import { reqUserLogin, reqUserRegister,reqUserInfo, reqUserLogout } from '@/api'
import {getUserTempId,getToken,setToken,removeToken} from '@/utils/userabout'


//***********页面刷新或者项目重新启动，之前state当中所有的数据全部销毁重新初始化**********


const state = {
  //getUserTempId()  获取临时标识id
  userTempId:getUserTempId(),
  token:getToken(),  //先从localStorage当中获取token
  userInfo:{}
}
const mutations = {
  RECEIVE_TOKEN(state,token){
    state.token = token
  },
  RECEIVE_USERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  RESET_USERINFO(state){
    //这个里面包含用户信息和token
    state.userInfo = {}
    state.token = ''
  }

}
const actions = {
  async userRegister({commit},userInfo){
    const result = await reqUserRegister(userInfo)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  
  async userLogin({commit},userInfo){
    const result = await reqUserLogin(userInfo)
    if(result.code === 200){
      commit('RECEIVE_TOKEN',result.data.token)
      setToken(result.data.token)
      // 这里要写返回值，之前我们存数据没有写return  是因为后续没有其它的不同操作
      //这个需要写，是因为登录不但要存储token数据，而且要根据登录成功还是失败决定下一步往哪跳
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 200){
      commit('RECEIVE_USERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  async resetUserInfo({commit}){
    removeToken() //先调用函数清空localStorage当中的token信息
    commit('RESET_USERINFO')
  },

  async userLogout({commit}){
    const result = await reqUserLogout()
    if(result.code === 200){
      removeToken() //先调用函数清空localStorage当中的token信息
      commit('RESET_USERINFO')
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  }
    
}
const getters = {}



export default {
  state,
  mutations,
  actions,
  getters
}