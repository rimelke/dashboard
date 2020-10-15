import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Form } from '@unform/web'
import { Input } from '../../components/Form'
import swal from 'sweetalert2'

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

    function handleDelete(payer_id: number) {
        swal.fire({
            title: 'Tens certeza disso?',
            text: "Não tem como voltar atrás, hein!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusCancel: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero excluir!'
        }).then(result => {
            if (result.isConfirmed) {
                api.delete(`/payers/${payer_id}`)
                .then(getPayers)
                .catch(err => {
                    swal.fire({
                        icon: 'error',
                        title: 'Opaa...',
                        text: 'Algo deu errado, recarregue a página e tente novamente!',
                    })
                })
            }
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
                            <td><button type="button" className="del" onClick={() => handleDelete(payer.id)}>Excluir pagador</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default Payers