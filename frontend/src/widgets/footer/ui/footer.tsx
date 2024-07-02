import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface IFooter {}

export const Footer: FC<IFooter> = () => {
    return (
        <Box
            as='footer'
            boxShadow={'2px 0 4px 0 teal'}
            bgColor={'#f8f8f8'}
            fontWeight={'bold'}
            fontSize={'20px'}>
            <Flex m='20px' justifyContent={'center'} gap={'5px'}>
                <Text>Created by</Text>
                <Link
                    href='https://github.com/JS-Demi'
                    color={'teal'}
                    target='_blank'
                    colorScheme='teal'>
                    Dmitry Ivanov
                </Link>
            </Flex>
        </Box>
    )
}
