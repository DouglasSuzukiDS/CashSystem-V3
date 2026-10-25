import { Temporal } from '@js-temporal/polyfill'
import { usersData, UserSeed } from '../data/usersData'
import { productsData, ProductSeed } from '../data/productsData'
import { createProduct } from '../services/product'
import { createSale } from '../services/sale'
import { salesData, SalesSeed } from '../data/salesData'
import { createUser } from '../services/user'

// Usado para poder gerar o seed com o DateTime
const globalWithTemporal = globalThis as typeof globalThis & {
   Temporal?: typeof Temporal
}

if (!globalWithTemporal.Temporal) {
   globalWithTemporal.Temporal = Temporal
}

// Criação de dados SEED
export const createUsers = async (data: UserSeed[]) => {
   for (const user of data) {
      await createUser(user)
   }
}

export const createProducts = async (data: ProductSeed[]) => {
   for (const product of data) {
      await createProduct(product as Parameters<typeof createProduct>[0])
   }
}

export const creareSales = async (data: SalesSeed[]) => {
   for (const sale of data) {
      await createSale({
         priceOrder: sale.priceOrder,
         userId: sale.userId
      })
   }
}

export const seed = async () => {
   // Criação dos Usuarios base
   console.log(`🌱 Seeding Users 👤`)
   await createUsers(usersData)
   console.log(`🌱 Seeded Users 👤 finished ✅ \n`)

   // Criação dos Produtos base
   console.log(`🌱 Seeding Products 📦`)
   await createProducts(productsData)
   console.log(`🌱 Seeded Products 📦 finished ✅ \n`)

   // Criação das Vendas base
   console.log(`🌱 Seeding Sales 🛍️`)
   await creareSales(salesData)
   console.log(`🌱 Seeded Sales 🛍️ finished ✅ \n`)

   console.log(`🌱 Seeded 🌱`)

   process.exit(0)
}

seed()