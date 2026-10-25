import { RequestHandler } from "express";
import { userSchema } from "../schemas/userSchema";
import { createUser, findUserById, findUserByLogin, getUsersList, removeUser, updateUser } from "../services/user";
import { signupSchema } from "../schemas/signupSchema";
import { createJWT } from "../utils/jwt";

export const getUsers: RequestHandler = async (req, res) => {
   const userList = await getUsersList()

   res.json({ users: userList })
}

export const getUser: RequestHandler = async (req, res) => {
   const { login } = req.body

   const user = await findUserByLogin(login)

   res.json({ user })
}

export const getUserById: RequestHandler = async (req, res) => {
   const { id } = req.params

   const user = await findUserById(parseInt(id))

   res.json({ user })
}

export const addUser: RequestHandler = async (req, res) => {
   const safeData = signupSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta criar o user
      const user = await createUser(safeData.data)

      // Verifica se o user foi criado
      if (!user) res.status(400).json({ error: 'Não foi possível criar o usuário, tente mais tarde' })

      // Retorna os dados do usuário e o token de acesso
      res.status(201).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Login indisponível' })
      return
   }
}

export const updateUserData: RequestHandler = async (req, res) => {
   const { id } = req.params

   const safeData = userSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta fazer a edição do user
      const user = await updateUser(parseInt(id), safeData.data)

      // Verifica se o user foi editado
      if (!user) res.status(400).json({ error: 'Não foi possível fazer a edição do usuário, tente mais tarde.' })

      // Retorna os dados do usuário e o token de acesso
      res.status(200).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Não foi possível fazer a edição do usuário, tente mais tarde.' })
      return
   }
}

export const deleteUser: RequestHandler = async (req, res) => {
   const { id } = req.params

   try {
      const user = await removeUser(parseInt(id))

      res.status(200).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Usuário não encontrado' })
   }
}