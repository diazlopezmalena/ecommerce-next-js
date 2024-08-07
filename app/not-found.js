'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const router = useRouter()
  return (
    <div>not-foundddd

    <Button onClick={()=>router.back()} color="primary" variant="shadow">
      Volver
    </Button>
    </div>
  )
}

export default NotFound