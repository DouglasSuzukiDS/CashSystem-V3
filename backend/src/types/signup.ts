import { SigninData } from "./signin";

export type SignupData = SigninData & {
   name: string
   isAdmin: boolean
}