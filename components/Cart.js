'use client'
import { useEffect, useState } from "react"
import { useCartContext } from "./context/CartContext"

const Cart = () => {
    const { cart } = useCartContext()
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
      const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0)
      setQuantity(totalQuantity)
    }, [cart])
    
    return (
        <div>Cart: {quantity}</div>
    )
}

export default Cart
