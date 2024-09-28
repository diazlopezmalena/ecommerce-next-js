'use client'
import { useCartContext } from '@/components/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Cart = () => {
  const { cart, setCart } = useCartContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cart]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.item.id !== itemId);
    setCart(updatedCart);
  };

  const displayInterface = () => {
    if (cart.length === 0) {
      return (
        <div>
          <h1 className='mb-[20px]'>Tu carrito está vacío</h1>
          <Link href="/catalog" className="border text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Volver al Catálogo
          </Link>
        </div>
      );
    } else {
      return cart.map((item) => {
        return (
          <div key={item.item.id} className='bg-white border text-black p-4 rounded-lg flex justify-between items-center'>
            <div>
              <h2 className='font-bold'>{item.item.name}</h2>
              <p>{`Cantidad: ${item.quantity}`}</p>
              <p>{`$${item.item.price} c/u`}</p>
              <Image src={item.item.img} width={100} height={100} alt={item.item.name} />
            </div>
            <button
              onClick={() => handleRemoveItem(item.item.id)}
              className='bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200'
            >
              Eliminar
            </button>
          </div>
        );
      });
    }
  };

  return (
    <div className='max-w-[1360px] m-auto p-[90px]'>
      {displayInterface()}
      {cart.length > 0 && ( 
        <>
          <h2 className='font-bold text-lg mt-4'>{`TOTAL: $${total.toFixed(2)}`}</h2>
          <Link href={'/checkout'} className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 mt-4 block text-center">
              Pagar
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
