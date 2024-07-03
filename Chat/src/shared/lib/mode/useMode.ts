import { useState } from 'react'

type TMode = 'channels' | 'messages'

interface IUseMode {
    isChannelsOpen: boolean
    isMessagesOpen: boolean
    setModePersist: (mode: TMode) => void
}

export const useMode = (): IUseMode => {
    const currentMode = localStorage.getItem('mode') ?? 'channels'
    const [mode, setMode] = useState(currentMode)
    const isChannelsOpen = mode === 'channels'
    const isMessagesOpen = mode === 'messages'
    const setModePersist = (mode: TMode) => {
        setMode(mode)
        localStorage.setItem('mode', mode)
    }

    return { isChannelsOpen, isMessagesOpen, setModePersist }
}
