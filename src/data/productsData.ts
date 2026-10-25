export interface ProductSeed {
   name: string
   price: number
   quantity: number
   category: string
}

export const productsData: ProductSeed[] = [
   {
      name: 'Pão de Queijo',
      price: 3.00,
      quantity: 20,
      category: "Comida"
   },

   {
      name: 'Skol 269',
      price: 4.00,
      quantity: 36,
      category: "Bebidas"
   },

   {
      name: 'Isqueiro Bic Pequeno',
      price: 4.00,
      quantity: 12,
      category: "Outros"
   },

   {
      name: 'Isqueiro Bic Grande',
      price: 6.00,
      quantity: 12,
      category: "Outros"
   },

   {
      name: 'Coca Cola 200',
      price: 3.00,
      quantity: 56,
      category: "Bebidas"
   },

   {
      name: 'Doritos 54G',
      price: 3,
      quantity: 16,
      category: "Comida"
   }
]