import { useMemo } from 'react'

export const useLocalStorage = () => {
	const user = !!localStorage.getItem('access_token')
	return useMemo(() => user, [user])
}
