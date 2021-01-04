/* 
管理登陆用户数据的vuex子模块
*/

import { reqUserLogin, reqUserRegister } from '@/api'
import {getUserTempId,getToken,setToken,removeToken} from '@/utils/userabout'


const state = {
  //getUserTempId()  获取临时标识id
  userTempId:getUserTempId(),
  token:getToken(),  //先从localStorage当中获取token
}
const mutations = {
  RECEIVE_TOKEN(state,token){
    state.token = token
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
  }
    
}
const getters = {}



export default {
  state,
  mutations,
  actions,
  getters
}