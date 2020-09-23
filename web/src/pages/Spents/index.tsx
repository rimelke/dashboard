import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

    useEffect(getSpents, [])

    function getSpents() {
        api.get('/spents')
        .then(res => setSpents(res.data))
        .catch(console.log)
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
                        <tr key={spent.id}>
                            <td>{new Date(spent.date + ' UTC').toLocaleString([], {
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