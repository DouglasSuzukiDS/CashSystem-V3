import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL 

export const useApi = () => ({

   validateToken: async (token: string) => {
      const response = await axios.post('/validate', { token })

      return response.data
   },

   loginSystem: async (userLogin: string, userPassword: string) => {
      const response = await axios.post(`${server}/login`, { userLogin, userPassword })
         .then((response) => {
            if (response.status === 200) {
               console.log(`Dados no UserAPI ${userLogin} ${userPassword}`)
               console.log(`Response no UseAPI ${JSON.stringify(response.data)}`)
               console.log(`Tipo do Response no UserAPI ${typeof response}`)
               console.log(`Status ${response.status}`)

               console.log(response.data.msg, response.data.token, JSON.parse(response.data.user))

               console.log('Response no UserAPI', response)
               console.log('Nome no UserAPI', JSON.parse(response.data.user))
               console.log(response.data.user)
               // setUserData(response.data.user)
               return response
            }
         })
         .catch(err => {
            // alert('userAPI ' + err.response.data.msg)
            //return err.response.data.msg
            console.log('erro no userAPI ', err)
            return err
         })

      return response
   },

   signIn: async (userLogin: string, userPassword: string) => {
      const login = await axios.post(`${server}/auth/signup`, { userLogin, userPassword })
         .then(res => {
            if (res.status === 200) {
               console.log(res.data)
               return res
            }
         })
         .catch(err => {
            console.log(`Erro no UserApi, ${err}`)
            return err
         })
      return login
   },

   logout: async () => {
      const response = await axios.post('/auth/logout')

      return response.data
   }
})