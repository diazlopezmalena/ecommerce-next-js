import { Button } from '@nextui-org/react'

const Counter = ({ addProduct, quitProduct, quantity }) => {
  
  return (
    <div className="flex items-center">
        <Button onClick={quitProduct}>-</Button>
        <span className="mx-2">{quantity}</span>
        <Button onClick={addProduct}>+</Button>
    </div>
  )
}

export default Counter;
