'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import { useCartContext } from './context/CartContext';
import Counter from './Counter';
import Image from 'next/image'; 

const ProductDetail = ({ product }) => {
    const router = useRouter();
    const { cart, setCart } = useCartContext();
    const [quantity, setQuantity] = useState(1);

    const currentProduct = Array.isArray(product) ? product[0] : product;

    const addProductToCart = () => {
        setCart([...cart, { item: currentProduct, quantity }]);
        router.push('/cart');
    };

   
    if (!currentProduct) {
        return <div>No se encontró el producto.</div>;
    }

    return (
        <div className="container mx-auto p-4 flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <Image
                    src={currentProduct.img}
                    alt={currentProduct.name}
                    width={200}
                    height={200} 
                    className="object-cover rounded-lg w-full h-auto"
                />
            </div>
            <div className="md:w-1/2 md:pl-6 flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800">{currentProduct.name}</h1>
                <p className="text-white text-sm uppercase">{currentProduct.category}</p>
                {typeof currentProduct.price === 'number' ? (
                    <p className="text-green-600 font-semibold text-lg">${currentProduct.price.toFixed(2)}</p>
                ) : (
                    <p className="text-red-600">Precio no disponible</p>
                )}
                <p className="text-white mt-4">{currentProduct.description}</p>
                <div className="mt-4 flex items-center">
                    <Counter 
                        addProduct={() => {
                            if (quantity < currentProduct.stock) {
                                setQuantity(quantity + 1);
                            }
                        }} 
                        quitProduct={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                            }
                        }} 
                        quantity={quantity} 
                    />
                    <span className="ml-4 text-white">Stock disponible: {currentProduct.stock}</span>
                </div>
                <Button onClick={addProductToCart} color="success" className="mt-4">Agregar al carrito</Button>
            </div>
        </div>
    );
};

export default ProductDetail;
