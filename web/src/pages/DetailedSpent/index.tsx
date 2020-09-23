import React from 'react'
import { useParams } from 'react-router-dom'
import { FiLoader } from 'react-icons/fi'

import './styles.css'

interface Params {
    id: string
}

const DetailedSpent: React.FC = (props) => {
    const { id } = useParams<Params>()

    return (
        <main>
        </main>
    )
}

export default DetailedSpent