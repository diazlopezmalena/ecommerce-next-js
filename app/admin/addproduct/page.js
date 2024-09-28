'use client';

import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'; 
import { auth } from '../../firebase/config'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AddProductForm = () => {
    const [id, setId] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('https://dcdn.mitiendanube.com/stores/004/072/631/products/red-hot-chili-peppers-one-hot-minute-13fd2cae8cd54b4b7b17083576422710-1024-1024.jpg');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null); 
    const router = useRouter(); 

    // Verificar si el usuario está autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/admin'); 
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            id,
            category,
            description,
            img,
            name,
            price: Number(price),
            stock: Number(stock),
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();
            setMessage(data.message || 'Producto agregado con éxito');
        } catch (error) {
            console.error('Error al agregar producto:', error);
            setMessage('Error al agregar producto');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); 
            router.push('/admin'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

  
    if (!user) return <p>Cargando...</p>;

    return (
        <div className='max-w-[600px] m-auto p-4'>
            <h1 className="text-xl font-bold text-center mb-4">Agregar Nuevo Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="ID"
                    placeholder="ID del producto"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                <Input
                    label="Categoría"
                    placeholder="Categoría del producto"
                    value={category}
                    onChange={(e) => setCategory((e.target.value).toLowerCase())}
                    required
                    className="rounded bg-white"
                />
                <Input
                    label="Descripción"
                    placeholder="Descripción del producto"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                <Input
                    label="Nombre"
                    placeholder="Nombre del producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                <Input
                    label="Precio"
                    placeholder="Precio del producto"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                <Input
                    label="Stock"
                    placeholder="Stock disponible"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                <Button type="submit" className="mt-4 w-full">
                    Agregar Producto
                </Button>
            </form>
            {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
            <Button onClick={handleLogout} className="mt-4 w-full" color="error">
                Cerrar Sesión
            </Button>
        </div>
    );
};

export default AddProductForm;
