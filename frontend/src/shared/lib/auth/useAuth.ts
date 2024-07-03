import { IAuthResponse } from '../../types'

interface IUseAuth {
    readonly removeCredentials: () => void
    readonly username: string | null
    readonly token: string | null
}

export const setCredentials = (data: IAuthResponse): void => {
    localStorage.setItem('username', data.username)
    localStorage.setItem('access_token', data.token)
}

export const getCredentialsToken = (): string | null =>
    localStorage.getItem('access_token')

export const useAuth = (): IUseAuth => {
    const username = localStorage.getItem('username')
    const token = getCredentialsToken()

    const removeCredentials = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
    }
    return { removeCredentials, username, token }
}
