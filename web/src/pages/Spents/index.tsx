import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

interface Spent {
    id: number,
    date: string,
    beneficiary: string,
    resume: string,
    amount: number,
    payer_name: string
}

const Spents: React.FC = () => {
    const [spents, setSpents] = useState<Spent[]>([])
    const history = useHistory()

    useEffect(getSpents, [])

    function getSpents() {
        api.get('/spents')
        .then(res => setSpents(res.data))
        .catch(console.log)
    }

    function handleRowClick(spent_id: number) {
        history.push(`/spents/detail/${spent_id}`)
    }

    return (
        <main id="spentsPage">
            <div>
                <h2>Gastos</h2>
                <Link className="btn" to="/spents/new">Novo</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Pagador</th>
                        <th>Beneficiário</th>
                        <th>Resumo</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {spents.map(spent => (
                        <tr onClick={() => handleRowClick(spent.id)} key={spent.id}>
                            <td>{new Date(spent.date.split('T')[0] + ' ').toLocaleString([], {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}</td>
                            <td>{spent.payer_name}</td>
                            <td>{spent.beneficiary}</td>
                            <td>{spent.resume}</td>
                            <td>{Number(spent.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default Spents