import { useCartContext } from "./context/CartContext"

const Cart = () => {
    const { cart } = useCartContext()

  return (
    <div>Cart: {cart}</div>
  )
}

export default Cart