import axios from "axios";

export const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      'Content-Type': 'application/json',
   },
})

if (typeof window !== 'undefined') {
   const token = localStorage.getItem('AuthToken')

   if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
   }
}  