import { RejectData } from '@/shared/types'
import { Box, Button, Container, Flex, Heading, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link, useRouteError } from 'react-router-dom'

export const Fallback = () => {
    const { t } = useTranslation()
    const error = useRouteError()
    const knownError = error as RejectData
    console.log(error)

    return (
        <Container
            w={'100vw'}
            h={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Stack
                as='section'
                bgColor={'white'}
                justifyContent={'center'}
                spacing={4}
                alignItems={'center'}
                h='400px'
                w='100%'
                borderRadius={'50px'}>
                <Heading as={'h1'}>
                    {knownError?.statusText} {knownError?.status}
                </Heading>
                <Heading as='h2'>{t('errorPage.title')}</Heading>
                <Heading as='h3' size={'md'}>
                    {t('errorPage.subtitle')}
                </Heading>
                <Heading as='h4' size={'sm'}>
                    {t('errorPage.text')}
                </Heading>
                <Button mt='20px' colorScheme='teal'>
                    <Link to='/'>{t('errorPage.link')}</Link>
                </Button>
            </Stack>
        </Container>
    )
}
