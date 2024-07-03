import { useEffect, useState } from 'react'

interface IUseResize {
    width: number
    isMobileScreen: boolean
}

export const useResize = (): IUseResize => {
    const [width, setWidth] = useState(window.innerWidth)
    const isMobileScreen = width <= 768
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return { width, isMobileScreen }
}
