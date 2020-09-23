import React, { useState } from 'react'
import { Form } from '@unform/web'
import { Input } from '../../components/Form'
import { useAuth } from '../../contexts/auth'

import './styles.css'
import { FiLoader } from 'react-icons/fi'

const Login: React.FC = () => {
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)

    return (
        <main id="loginPage">
            <h2>Faça login na sua conta!</h2>
            <Form onSubmit={data => {
                setLoading(true)
                login(data).catch(err => {
                    setLoading(false)
                    alert('Falha ao logar-se, tente novamente')
                })
            }}>
                <Input name="username" autoComplete="off" placeholder="Username" className="input" required />
                <Input name="password" placeholder="Senha" className="input" type="password" required />
                <button className="btn" type="submit">Login {loading && 
                    <FiLoader className="spin" />
                }</button>
            </Form>
        </main>
    )
}

export default Login