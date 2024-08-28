'use client'
import { createContext, useContext } from "react"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

//acá empieza el context