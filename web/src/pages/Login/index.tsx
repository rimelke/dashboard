import React from 'react'
import { Form } from '@unform/web'
import { Input } from '../../components/Form'
import { useAuth } from '../../contexts/auth'

import './styles.css'

const Login: React.FC = () => {
    const { login } = useAuth()

    return (
        <main id="loginPage">
            <h2>Faça login na sua conta!</h2>
            <Form onSubmit={data => login(data).catch(err => alert('Falha ao logar-se, tente novamente'))}>
                <Input name="username" autoComplete="off" placeholder="Username" className="input" required />
                <Input name="password" placeholder="Senha" className="input" type="password" required />
                <button className="btn" type="submit">Login</button>
            </Form>
        </main>
    )
}

export default Login