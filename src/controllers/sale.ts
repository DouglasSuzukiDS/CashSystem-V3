import { Request, Response } from "express";
import { saleSchema } from "../schemas/salesSchema";
import * as saleServices from "../services/sale";

export const getSales = async (req: Request, res: Response) => {
   const sales = await saleServices.getSalesList()

   res.json({ sales })
}

export const getSalebyId = async (req: Request, res: Response) => {
   const { id } = req.params
   const sale = await saleServices.findSaleById(parseInt(id))

   res.json({ sale })
}

export const addSale = async (req: Request, res: Response) => {
   const safeData = saleSchema.safeParse(req.body)

   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors });
   } else {
      try {
         const sale = await saleServices.createSale({
            ...safeData.data,
            date: new Date(),
            user: {
               connect: { id: safeData.data.user }
            }
         })

         res.json({ sale })
      } catch (err) {
         console.log(err)

         res.status(500).json({ error: 'Ocorreu um erro ao tentar adicionar a venda.' })
      }
   }

}

export const updateSaleData = async (req: Request, res: Response) => {
   const { id } = req.params

   const safeData = saleSchema.safeParse(req.body)

   if (!safeData.success) {
      res.status(400).json({ errors: safeData.error.flatten().fieldErrors })
   } else {
      try {
         // Verifica se o ID da Venda e o valor da venda é o mesmo do ID do usuário que realizou a venda.
         const sale = await saleServices.indentifySale(parseInt(id), safeData.data.user, safeData.data.priceOrder)

         // res.status(200).json({ sale, safeData })

         if (!sale) {
            res.status(400).json({ error: 'Não foi possível indentificar a venda.' })
         } else {
            // Ca
            try {
               const updatedSale = await saleServices.updateSale(parseInt(id), {
                  priceOrder: safeData.data.priceOrder,
                  user: { connect: { id: safeData.data.user } }
               })

               res.json({ updatedSale })
            } catch (err) {
               console.log(err)
               res.status(500).json({ error: 'Ocorreu um erro ao tentar atualizar a venda.' })
               return

            }
         }
      } catch (err) {
         console.log(err)
         res.status(500).json({ error: 'Ocorreu um erro ao tentar encontrar a venda pelo ID e userID.' })
      }

      /*try {
         const updatedSale = await updateSale(parseInt(id), {
            priceOrder: safeData.data.priceOrder,
            user: { connect: { id: safeData.data.user } }
         })

         res.json({ updatedSale })
      } catch (err) {
         console.log(err)
         res.status(500).json({ error: 'Ocorreu um erro ao tentar atualizar a venda.' })
         return

      }*/
   }
}

export const deleteSale = async (req: Request, res: Response) => {
   const { id } = req.params
   const sale = await saleServices.removeSale(parseInt(id))

   res.json({ sale })
}