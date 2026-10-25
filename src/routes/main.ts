import { Router } from "express";
import * as pingController from '../controllers/ping'
import * as authController from '../controllers/auth'
import * as userController from '../controllers/user'
import * as productController from '../controllers/product'
import * as saleController from '../controllers/sale'
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router()

mainRouter.get("/ping", pingController.ping)
mainRouter.get("/private-ping", verifyJWT, pingController.PrivatePing)

mainRouter.post("/auth/signup", authController.signUp)
mainRouter.post("/auth/signin", authController.signIn)
mainRouter.post("/auth/signin", authController.signIn)

mainRouter.get("/users", verifyJWT, userController.getUsers)
mainRouter.get("/user/:id", verifyJWT, userController.getUserById)
mainRouter.get("/user", verifyJWT, userController.addUser)
mainRouter.put("/user/:id", verifyJWT, userController.updateUserData)
mainRouter.delete("/user/:id", verifyJWT, userController.deleteUser)

mainRouter.get("/products", verifyJWT, productController.getProducts)
mainRouter.get("/product/:id", verifyJWT, productController.getProductById)
mainRouter.post("/product", verifyJWT, productController.addProduct)
mainRouter.put("/product/:id", verifyJWT, productController.updateProductData)
mainRouter.delete("/product/:id", verifyJWT, productController.deleteProduct)

mainRouter.get("/sales", verifyJWT, saleController.getSales)
mainRouter.get("/sale/:id", verifyJWT, saleController.getSalebyId)
mainRouter.post("/sale/", verifyJWT, saleController.addSale)
mainRouter.put('/sale/:id', verifyJWT, saleController.updateSaleData)
mainRouter.delete('/sale/:id', verifyJWT, saleController.deleteSale)