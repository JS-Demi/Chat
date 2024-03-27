import { useMemo } from 'react'

export const useAuth = () => {
	const user = !!localStorage.getItem('access_token')
	return useMemo(() => user, [user])
}
