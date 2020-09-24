import React, { useEffect, useState } from 'react'
import { Form } from '@unform/web'
import { Input, Select, NumberInput, Text } from '../../components/Form'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { FiLoader } from 'react-icons/fi'

import './styles.css'

interface Payer {
    id: number
    name: string
}

const NewSpent: React.FC = () => {
    const history = useHistory()

    const [payers, setPayers] = useState<Payer[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get('/payers').then(res => {
            setPayers(res.data)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    function handleSubmit(data: any) {
        setLoading(true)
        if (data.description === '') delete data.description

        api.post('/spents', data).then(res => {
            history.push('/spents')
        }).catch(e => {
            console.log(e)
            alert('Falha ao cadastrar um novo gasto, tente novamente')
            setLoading(false)
        })
    }

    return (
        <main id="newSpentPage">
            <h2>Novo gasto</h2>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Select
                        name="payer_id"
                        defaultLabel="Selecione um pagador..."
                        defaultValue=""
                        label="Pagador"
                        required
                        items={payers.map(payer => ({
                            key: payer.id,
                            label: payer.name,
                            value: payer.id
                        }))}
                    />
                    <Input name="date" type="date" label="Data" required />
                    <NumberInput autoComplete="off" name="amount" label="Valor" required />
                    <button className="btn" type="submit">{loading && 
                        <FiLoader className="spin" />
                    }Cadastrar</button>
                </div>
                <div>
                    <Input label="Beneficiário" name="beneficiary" required />
                    <Input label="Resumo" name="resume" required />
                    <Text autoComplete="off" name="description" cols={35} rows={5} label="Descrição" />
                </div>
            </Form>
        </main>
    )
}

export default NewSpent