'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react";
import { Arrow } from '@/assets/Arrow';
import { products } from '@/data/products';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Counter from '@/components/Counter';

const Product = ({ params }) => {
    const router = useRouter()

    const item = products.find(product => product.id === params.product)
    console.log(item);

    return (
        <>
            {
                item === undefined ? router.replace('/not-found')
                    :
                    <>
                        <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo" onClick={() => router.replace('/catalog')}>
                            <Arrow />
                        </Button>
                        <Card className="py-4 bg-white w-fit mx-auto">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{item.category}</p>
                                <small className="text-default-500">{item.price}</small>
                                <h4 className="font-bold text-large">{item.title}</h4>
                                <Counter />
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={item.img}
                                    width={270}
                                    height={200}
                                />
                            </CardBody>
                        </Card>
                    </>
            }
        </>
    )
}

export default Product