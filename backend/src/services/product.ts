import { db } from "../prisma/db"

export const getProductsList = async () => {
   const products = await db.orm.public.Product.select('id', 'name', 'price').all()

   return products
}

export const findProductById = async (id: number) => {
   const product = await db.orm.public.Product
      .select('id', 'name', 'price')
      .whereUnique({ id })

   return product
}

export const createProduct = async (data: Parameters<typeof db.orm.public.Product.create>[0]) => {
   const product = await db.orm.public.Product.create(data)

   return product
}

export const updateProduct = async (id: number, data: Parameters<typeof db.orm.public.Product.update>[0]) => {
   const product = await db.orm.public.Product
      .whereUnique({ id })
      .update(data)

   return product
}

export const removeProduct = async (id: number) => {
   await db.orm.public.Product
      .whereUnique({ id })
      .delete()

   return {}
}