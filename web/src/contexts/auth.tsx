import React, {useState, createContext, useContext, useEffect} from 'react'
import api from '../services/api'

interface AuthContextData {
    signed: boolean
    id: string | null
    username: string | null
    token: string | null
    login(data: {username: string, password: string}): Promise<unknown>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [id, setId] = useState<string | null>(localStorage.getItem('id'))
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    useEffect(() => {
        api.defaults.headers.common['authorization'] = `Lummos ${token}`
    }, [token])

    function login(data: {username: string, password: string}) {
        return new Promise((resolve, reject) => {
            api.post('/auth/login', data).then(res => {
                setId(res.data.user.id)
                setUsername(res.data.user.username)
                setToken(res.data.token)
                localStorage.setItem('username', res.data.user.username)
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('token', res.data.token)
                resolve()
            }).catch(err => {
                reject(err.response.data)
            })
        })
    }

    return (
        <AuthContext.Provider value={{id, username, signed: !!username && !!token && !!id, login, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}