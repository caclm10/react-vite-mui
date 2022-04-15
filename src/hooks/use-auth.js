import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { atom, useAtom } from 'jotai'
import axios from 'axios'
import { throwError } from '../api'

const navigateTo = '/'

const urlPath = {
    login: '',
    register: '',
}

const userAtom = atom()

const authenticate = (resp, setUser, navigate) => {
    const token = resp.data.token

    const payload = JSON.parse(window.atob(token.split('.')[1]))
    setUser(payload.user)
    localStorage.setItem('token', token)
    navigate(navigateTo, { replace: true })
}

const useAuth = params => {
    const navigate = useNavigate()
    const [user, setUser] = useAtom(userAtom)

    const register = useCallback(async data => {
        try {
            const resp = await axios.post(urlPath.register, data)
            authenticate(resp, setUser, navigate)
        } catch (error) {
            throwError(error)
        }
    }, [])

    const login = useCallback(async data => {
        try {
            const resp = await axios.post(urlPath.login, data)
            authenticate(resp, setUser, navigate)
        } catch (error) {
            throwError(error)
        }
    }, [])

    return {
        user,
        register,
        login
    }
}

export default useAuth