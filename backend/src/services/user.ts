import { hash } from 'bcrypt-ts'
import { db } from '../prisma/db'

export const getUsersList = async () => {
   const users = await db.orm.public.User.select('id', 'login', 'name', 'login').all()

   return users
}

export const findUserById = async (id: number) => {
   const user = await db.orm.public.User
      .select('id', 'login', 'name', 'login')
      .where({ id }).first()

   if (user) return user

   return null
}

// Usado no Signup
export const findUser = async (login: string) => {
   const user = await db.orm.public.User
      .select('id', 'login', 'name', 'login', 'password', 'isAdmin')
      .where({ login }).first()

   if (user) return user

   return null
}

export const findUserByLogin = async (login: string) => {
   const user = await db.orm.public.User
      .select('id', 'login', 'name', 'login')
      .where({ login }).first()

   if (user) return user

   return null
}

export const createUser = async (data: Parameters<typeof db.orm.public.User.create>[0]) => {
   // Verifica se o login já existe
   const userExists = await db.orm.public.User
      .select('id')
      .where({ login: data.login })
      .first()

   if (userExists) throw new Error('Login indisponível')

   // Cria o hash da senha
   const hashedPassword = await hash(data.password, 10)

   // Cria o usuário
   const newUser = await db.orm.public.User.create({
      ...data,
      password: hashedPassword,
   })

   return newUser
}

export const updateUser = async (id: number, data: Parameters<typeof db.orm.public.User.update>[0]) => {
   // Verifica se existe um usuario com o login
   const userExists = await db.orm.public.User
      .select('id')
      .where({ id })
      .first()

   if (!userExists) throw new Error('Usuário não encontrado')

   const updatedUser = await db.orm.public.User
      .where({ id })
      .update(data)

   return updatedUser
}

export const removeUser = async (id: number) => {
   const userExists = await db.orm.public.User
      .where({ id })
      .select('id')
      .first()

   if (!userExists) throw new Error('Usuário não encontrado')

   await db.orm.public.User
      .where({ id })
      .delete()

   return 'Usuário excluído com sucesso'
}
