import { db } from "../prisma/db"

export const getSalesList = async () => {
   const sales = await db.orm.public.Sales.select('id', 'userId', 'priceOrder').all()

   return sales
}

export const findSaleById = async (id: number) => {
   const sale = await db.orm.public.Sales
      .whereUnique({ id })
      .select('id', 'userId', 'priceOrder')
      .first()

   return sale
}

export const indentifySale = async (idSale: number, userId: number, priceOrder: number) => {
   const sale = await db.orm.public.Sales
      .select('id', 'userId', 'priceOrder')
      .where({ id: idSale, userId, priceOrder })
      .firstOrThrow()

   return sale
}

export const createSale = async (data: Parameters<typeof db.orm.public.Sales.create>[0]) => {
   const sale = await db.orm.public.Sales.create(data)

   return sale
}

export const updateSale = async (id: number, data: Parameters<typeof db.orm.public.Sales.update>[0]) => {
   const sale = await db.orm.public.Sales
      .where({ id })
      .update(data)

   return sale
}

export const removeSale = async (id: number) => {
   await db.orm.public.Sales
      .where({ id })
      .delete()

   return {}
}