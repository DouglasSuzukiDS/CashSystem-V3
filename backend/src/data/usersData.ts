export interface UserSeed {
   name: string
   login: string
   password: string
   isAdmin: boolean
}

export const usersData: UserSeed[] = [
   {
      name: 'root',
      login: 'root',
      password: 'root',
      isAdmin: true
   },

   {
      name: 'Nick',
      login: 'nick',
      password: 'nick',
      isAdmin: true
   }
]