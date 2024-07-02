import { Box } from '@chakra-ui/react'
import { FC } from 'react'

interface IVectorFromLeft {
    readonly color: string
}

export const VectorFromLeft: FC<IVectorFromLeft> = ({ color }) => {
    return (
        <Box as='span' position={'absolute'} bottom={0} left={-2}>
            <svg
                width='31'
                height='30'
                viewBox='0 0 31 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M10.6315 12.9398C10.3974 11.7269 10.2748 10.4743 10.2748 9.1931V0.401146H29.9274V28.8457C25.1684 28.8457 20.8045 27.1542 17.4041 24.3395C14.0117 26.5995 8.57203 28.7477 2 27.5528C3.81011 26.777 10.792 22.1225 10.5334 12.8133C10.5648 12.8565 10.5975 12.8986 10.6315 12.9398Z'
                    fill={color}
                />
            </svg>
        </Box>
    )
}
