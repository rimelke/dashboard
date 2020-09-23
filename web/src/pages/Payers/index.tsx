import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Form } from '@unform/web'
import { Input } from '../../components/Form'

import './styles.css'

interface Payer {
    id: number
    name: string
    balance: number
}

const Payers: React.FC = () => {
    const [payers, setPayers] = useState<Payer[]>([])

    useEffect(getPayers, [])

    function getPayers() {
        api.get('/payers')
        .then(res => setPayers(res.data))
        .catch(console.log)
    }

    function handleSubmit(data: any) {
        api.post('/payers', data)
        .then(getPayers)
        .catch(e => {
            console.log(e)
            alert('Falha ao cadastrar um pagador, tente novamente')
        })
    }

    return (
        <main id="payersPage">
            <h2>Pagadores</h2>
            <Form onSubmit={handleSubmit}>
                <Input name="name" autoComplete="off" placeholder="Nome do pagador" required/>
                <button className="btn" type="submit">Cadastrar</button>
            </Form>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {payers.map(payer => (
                        <tr key={payer.id}>
                            <td>{payer.name}</td>
                            <td>{Number(payer.balance).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default Payers