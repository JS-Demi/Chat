import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IVectorFromRight {
    readonly color: string
}

export const VectorFromRight: FC<IVectorFromRight> = ({ color }) => {
    return (
        <Box as='span' position={'absolute'} bottom={'-15%'} right={-1}>
            <svg
                width='15'
                height='30'
                viewBox='0 0 31 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                    // fill-rule='evenodd'
                    clipRule='evenodd'
                    d='M20.5759 12.9398C20.81 11.7269 20.9326 10.4743 20.9326 9.19307V0.401115H1.27997V28.8457C6.039 28.8457 10.4029 27.1541 13.8033 24.3394C17.1957 26.5994 22.6354 28.7477 29.2074 27.5528C27.3973 26.777 20.4154 22.1224 20.674 12.8133C20.6426 12.8565 20.6099 12.8986 20.5759 12.9398Z'
                    fill={color}
                />
            </svg>
        </Box>
    )
}
