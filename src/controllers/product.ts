import { Request, Response } from "express"
import { productSchema } from "../schemas/productSchema"
import { createProduct, findProductById, getProductsList, removeProduct, updateProduct } from "../services/product"

export const getProducts = async (req: Request, res: Response) => {
   const productsList = await getProductsList()

   res.json({ products: productsList })
}

export const getProductById = async (req: Request, res: Response) => {
   const { id } = req.params

   const product = await findProductById(parseInt(id))

   res.json({ product: product })
}

export const addProduct = async (req: Request, res: Response) => {
   const safeData = productSchema.safeParse(req.body)

   if (!safeData.success) {
      res.status(400).json({ errors: safeData.error.flatten().fieldErrors })
   } else {
      const product = await createProduct(safeData.data)

      res.json({ product })
   }

}

export const updateProductData = async (req: Request, res: Response) => {
   const { id } = req.params
   const safeData = productSchema.safeParse(req.body)

   if (!safeData.success) {
      res.status(400).json({ errors: safeData.error.flatten().fieldErrors })
   } else {
      const product = await updateProduct(parseInt(id), safeData.data)

      res.json({ product })
   }
}

export const deleteProduct = async (req: Request, res: Response) => {
   const { id } = req.params

   const product = await removeProduct(parseInt(id))

   res.json({ product })
}