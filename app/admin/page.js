'use client'

import { useState, useEffect } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const Admin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/admin/addproduct')
            }
        })

        return () => unsubscribe()
    }, [router])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/admin/addproduct') 
        } catch (err) {
            console.log('error');
            setError('Credenciales incorrectas, por favor intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-[400px] m-auto p-4'>
            <h1 className='text-xl font-bold text-center mb-4'>Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className='space-y-4'>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded bg-white"
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className='mt-4 w-full' disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
            </form>
            <div className="mt-4 text-center">
                <h2 className="font-bold">Hola profe:</h2>
                <p>Usuario: test@test.com</p>
                <p>Contraseña: {`test</>2024`}</p>
            </div>
        </div>
    )
}

export default Admin
