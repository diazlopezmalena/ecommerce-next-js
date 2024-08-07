'use client'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

const Counter = ({ stock }) => {
    const [ quantity, setQuantity ] = useState(1)

  return (
    <div>
        <Button onClick={()=>setQuantity(quantity-1)}>-</Button>
        {quantity}
        <Button onClick={()=>setQuantity(quantity+1)}>+</Button>
    </div>
  )
}

export default Counter