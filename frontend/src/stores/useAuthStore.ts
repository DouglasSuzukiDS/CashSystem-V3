import { create } from 'zustand'
import { AuthStoreType, UserType } from '../types/user'
import { api } from '../utils/api'

export const useAuthStore = create<AuthStoreType>((set, get) => ({
   user: null,

   signIn: async (userLogin: string, userPassword: string) => {
      const response = await api.post('/auth/signup', { userLogin, userPassword })

      if (response.status === 200) {
         let data = JSON.parse(response.data.result)
         console.log(data)

         get().deleteToken()
         get().createToken(response.data.token)
         // get().createUserDataToken(response.data.userInfos[0], response.data.userInfos[1], response.data.userInfos[2])

         return true
      } else {
         return false
      }
   },

   logout: async () => {
      get().deleteToken()
      return true
   },

   createToken: (token: string) => {
      localStorage.setItem('AuthToken', token)
   },

   createUserDataToken: (name: string, admin: boolean, id: number) => {
      let userDatas = { userName: name, userAdmin: admin, id }
      localStorage.setItem('UserDatas', JSON.stringify(userDatas))
   },

   deleteToken: () => {
      // localStorage.removeItem('AuthToken')
      localStorage.clear()
   }
}))