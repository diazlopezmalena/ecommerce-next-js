'use client';

import { useCartContext } from '@/components/context/CartContext';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { myDB } from '@/app/firebase/config'; 

const Checkout = () => {
    const router = useRouter(); 
    const { cart, setCart } = useCartContext();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(true); 

    const validateForm = () => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Por favor ingresa un email válido.');
            return false;
        }
        if (!email || !name || !surname || !address || !city || !phone) {
            setMessage('Por favor completa todos los campos.');
            return false;
        }
        return true;
    };

    const handlePurchase = async (e) => {
        e.preventDefault(); 

        if (!validateForm()) return;

        setLoading(true);
        setMessage('');
        setShowForm(false); 
        try {
            const promises = cart.map(async (item) => {
                const res = await fetch(`/api/product/${item.item.id}`);
                const productData = await res.json();
                const availableStock = productData[0]?.stock || 0;

                if (availableStock < item.quantity) {
                    setMessage(`No hay suficiente stock para ${item.item.name}`);
                    throw new Error('Stock insuficiente');
                }

                const newStock = availableStock - item.quantity;
                await fetch(`/api/product/${item.item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ stock: newStock }),
                });
            });

            await Promise.all(promises);

                    const orderData = {
                customer: {
                    email,
                    name,
                    surname,
                    address,
                    city,
                    phone,
                },
                products: cart.map((item) => ({
                    id: item.item.id,
                    name: item.item.name,
                    price: item.item.price,
                    quantity: item.quantity,
                })),
                createdAt: new Date().toISOString(),
                total: cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0), 
            };

            const ordersRef = collection(myDB, 'orders');
            await addDoc(ordersRef, orderData);

            setMessage('¡Compra realizada con éxito!');
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            setMessage('Ocurrió un error al procesar tu compra.');
        } finally {
            setLoading(false);
            setCart([]); 
        }
    };

    return (
        <div className='max-w-[1360px] m-auto p-[90px]'>
            <h1>Checkout</h1>
            {cart.length === 0 ? ( 
                <div>
                    <p>Tu carrito está vacío.</p>
                    <Button onClick={() => router.push('/catalog')} className='mt-4'>
                        Ir al Catálogo
                    </Button>
                </div>
            ) : (
                <>
                    {message && !showForm ? ( 
                        <div>
                            <p>{message}</p>
                            <Button onClick={() => router.push('/catalog')} className='mt-4'>
                                Ir al Catálogo
                            </Button>
                        </div>
                    ) : (
                        showForm && ( 
                            <form onSubmit={handlePurchase}>
                                <Input
                                    isClearable
                                    type="email"
                                    label="Email"
                                    variant="bordered"
                                    placeholder="Ingresa tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="max-w-xs border-gray-50 flex-col gap-10"
                                />

                                <Input
                                    label="Nombre"
                                    variant="bordered"
                                    placeholder="Nombre"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="max-w-xs border-gray-50 flex-col gap-10"
                                />

                                <Input
                                    label="Apellido"
                                    variant="bordered"
                                    placeholder="Apellido"
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    className="max-w-xs border-gray-50 flex-col gap-10"
                                />

                                <Input
                                    label="Dirección"
                                    variant="bordered"
                                    placeholder="Dirección"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="max-w-xs border-gray-50 flex-col gap-10"
                                />

                                <Input
                                    label="Ciudad"
                                    variant="bordered"
                                    placeholder="Ciudad"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="max-w-xs border-gray-50 flex-col gap-10"
                                />

                                <Input
                                    label="Teléfono"
                                    variant="bordered"
                                    placeholder="Teléfono"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="max-w-xs border-gray-50 flex-col gap-10"
                                />

                                <Button type="submit">
                                    Comprar
                                </Button>
                                {message && showForm && ( 
                                    <p className="text-red-500 mt-2">{message}</p>
                                )}
                            </form>
                        )
                    )}

                    {loading && <p>Cargando... Por favor espera...</p>} 
                </>
            )}
        </div>
    );
};

export default Checkout;
