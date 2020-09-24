import React from 'react'
import { Form } from '@unform/web'
import { Input, Select, NumberInput, Text } from '../../components/Form'

import './styles.css'

const NewSpent: React.FC = () => {

    function handleSubmit(data: any) {
        console.log(data)
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
                        items={[{key: 1, label: 'Test', value: 1}]}
                    />
                    <Input name="date" type="date" label="Data" required />
                    <NumberInput name="amount" label="Valor" required />
                    <button className="btn" type="submit">Cadastrar</button>
                </div>
                <div>
                    <Input label="Beneficiário" name="beneficiary" required />
                    <Input label="Resumo" name="resume" required />
                    <Text name="description" cols={35} rows={5} label="Descrição" />
                </div>
            </Form>
        </main>
    )
}

export default NewSpent