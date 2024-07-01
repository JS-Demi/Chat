import { AbsoluteCenter, Spinner } from '@chakra-ui/react'
import React, { FC, useState } from 'react'

interface IMySpinner {}

export const MySpinner: FC<IMySpinner> = () => {
    const [state, setState] = useState(false)
    setTimeout(() => {
        setState(true)
    }, 1000)
    return (
        state && (
            <AbsoluteCenter>
                <Spinner
                    size={'xl'}
                    color='teal.300'
                    speed='0.65s'
                    thickness='4px'
                />
            </AbsoluteCenter>
        )
    )
}
