'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { useCartContext } from './context/CartContext';
import Counter from './Counter';

const ProductCard = ({ itemProduct }) => {
    const router = useRouter();
    const { cart, setCart } = useCartContext();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false); 

    const addProduct = (stock) => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const quitProduct = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = (item) => {
        setCart([...cart, { item, quantity }]);
        setIsAdded(true); 
    };

    return (
        <>
            {
                itemProduct === undefined ? router.replace('/not-found')
                    :
                    itemProduct.map(item => {
                        return (
                            <article key={item.id}>
                                <Card className="bg-white w-fit mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <p className="text-tiny uppercase font-bold text-gray-600">{item.category}</p>
                                        <small className="text-green-600 font-semibold">${item.price.toFixed(2)}</small>
                                        <h4 className="font-bold text-lg text-gray-800">{item.title}</h4>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <Image
                                            alt="Product image"
                                            className="object-cover rounded-lg"
                                            src={item.img}
                                            width={270}
                                            height={200}
                                        />
                                        <Counter 
                                            addProduct={() => addProduct(item.stock)} 
                                            quitProduct={quitProduct} 
                                            quantity={quantity} 
                                        />
                                    </CardBody>
                                    <CardFooter className="flex justify-between items-center">
                                        {!isAdded ? (
                                            <Button onClick={() => handleAddToCart(item)} color="success">Agregar al carrito</Button>
                                        ) : (
                                            <Button onClick={() => router.push('/checkout')} color="primary">Finalizar compra</Button>
                                        )}
                                        <Button 
                                            onClick={() => router.push(`/catalog/${item.category}/${item.id}`)} 
                                            color="secondary"
                                        >
                                            Ver detalle
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </article>
                        )
                    })
            }
        </>
    )
}

export default ProductCard;
