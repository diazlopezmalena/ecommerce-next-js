'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react";
import { Arrow } from '@/assets/Arrow';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import Counter from '@/components/Counter';
import { useCartContext } from './context/CartContext';

const ProductCard = ({itemProduct}) => {
    const router = useRouter()
    const { cart, setCart } = useCartContext()
    
    return (
        <>
            {
                itemProduct === undefined ? router.replace('/not-found') 
                    :
                    itemProduct.map(item =>
                    <>
                        <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo" onClick={() => router.replace('/catalog')}>
                            <Arrow />
                        </Button>
                        <Card className="py-4 bg-white w-fit mx-auto">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{item.category}</p>
                                <small className="text-default-500">{item.price}</small>
                                <h4 className="font-bold text-large">{item.title}</h4>
                                {/* <Counter /> */}
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={item.img}
                                    width={270}
                                    height={200}
                                />
                                <Button onClick={()=>setCart([...cart, item])}>Agregar al carrito</Button>
                            </CardBody>
                        </Card>
                    </>
                    )
            }
        </>
    )
}

export default ProductCard