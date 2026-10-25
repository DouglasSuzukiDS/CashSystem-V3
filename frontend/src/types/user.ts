import { Dispatch, SetStateAction } from "react"

export type UserType = {
   id: string
   userName: string
   userLogin: string
   userPassword?: string
   userAdmin: boolean
}

export type AuthStoreType = {
   user: UserType | null

   createToken: (token: string) => void
   validadeToken?: (token: string) => Promise<boolean>
   deleteToken: () => void

   loginSystem?: (userLogin: string, userPassword: string) => Promise<boolean>
   signIn: (userLogin: string, userPassword: string) => Promise<boolean>
   logout: () => Promise<boolean>
}
