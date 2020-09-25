import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

interface Spent {
    id: number

    payer_name: string
    date: string
    receipt: string

    beneficiary: string
    amount: number
    resume: string
    description: string


    created_at: string
    updated_at: string
    user_name: string
}

interface Params {
    id: string
}

const DetailedSpent: React.FC = (props) => {
    const { id } = useParams<Params>()
    const [spent, setSpent] = useState<Spent | null>(null)

    useEffect(() => {
        api.get(`/spents/${id}`).then(res => {
            setSpent(res.data)
        }).catch(e => {
            console.log(e)
            alert('Algo deu errado, recarregue a pagina e tente novamente')
        })
    }, [id])

    return (
        <main id="detailedSpentPage">
            <div className="col">
                <div className="block">
                    <table>
                        <tr className="info">
                            <td>Pagador</td>
                            <td>{spent?.payer_name}</td>
                        </tr>
                        <tr className="info">
                            <td>Data</td>
                            <td>{new Date(spent?.date + ' UTC').toLocaleString([], {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}</td>
                        </tr>
                        <tr className="info">
                            <td>Valor</td>
                            <td>{spent?.amount}</td>
                        </tr>
                    </table>
                </div>
                <div className="block">
                    <table>
                        <tr className="info">
                            <td>Criado por</td>
                            <td>{spent?.user_name}</td>
                        </tr>
                        <tr className="info">
                            <td>Criado em</td>
                            <td>{new Date(spent?.created_at + ' UTC').toLocaleString([], {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="col">
                <div className="block">
                    <table>
                        <tr className="info">
                            <td>Beneficiário</td>
                            <td>{spent?.beneficiary}</td>
                        </tr>
                        <tr className="info">
                            <td>Resumo</td>
                            <td>{spent?.resume}</td>
                        </tr>
                        <tr className="info">
                            <td>Descrição</td>
                            <td>{spent?.description}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default DetailedSpent