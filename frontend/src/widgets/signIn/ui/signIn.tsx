import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useLoginMutation } from 'features/auth/model'
import { Field, FieldProps, Form, Formik } from 'formik'
import { HttpError } from 'http-errors'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../../../node_modules/react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ROUTES } from 'shared/constants'
import { setCredentials } from 'shared/lib/auth'
import { IAuthResponse, LoginState } from 'shared/types'

interface IFormValues {
    username: string
    password: string
}

interface ISignIn {
    active: LoginState
}

export const SignIn: FC<ISignIn> = ({ active }) => {
    const [login, { isLoading }] = useLoginMutation()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (inputRef.current && active === LoginState.signIn) {
            inputRef.current.focus()
        }
    }, [active])
    const handleLogin = async (values: IFormValues) => {
        login(values)
            .unwrap()
            .then((response: IAuthResponse) => {
                const { CHAT } = ROUTES
                setCredentials(response)
                navigate(CHAT)
            })
            .catch((err: HttpError | FetchBaseQueryError) => {
                setIsError(true)
                if (err.status === 401) {
                    toast.error(t('toastify.invalidCredentials'))
                }
                if (err.status === 'FETCH_ERROR') {
                    toast.error(t('toastify.fetchError'))
                }
            })
    }

    return (
        <Box className='form-container sign-in'>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}>
                {() => (
                    <Form>
                        <Heading as={'h1'} mb='20px' className='title'>
                            {t('login.header')}
                        </Heading>
                        <Field
                            required
                            name='username'
                            id='username'
                            autoComplete='off'>
                            {({ field }: FieldProps) => (
                                <FormControl isRequired isInvalid={isError}>
                                    <Input
                                        {...field}
                                        ref={inputRef}
                                        placeholder={t('login.login')}
                                        borderColor={'teal'}
                                        autoComplete='off'
                                        onClick={() => setIsError(false)}
                                    />
                                    <FormLabel>
                                        {isError
                                            ? t('login.errors.wrongData')
                                            : t('login.login')}
                                    </FormLabel>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='password' id='password'>
                            {({ field }: FieldProps) => (
                                <FormControl isRequired isInvalid={isError}>
                                    <Input
                                        {...field}
                                        type='password'
                                        placeholder={t('login.password')}
                                        autoComplete='off'
                                        borderColor={'teal'}
                                        onClick={() => setIsError(false)}
                                    />
                                    <FormLabel>
                                        {isError
                                            ? t('login.errors.wrongData')
                                            : t('login.password')}
                                    </FormLabel>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={'20px'}
                            type='submit'
                            isLoading={isLoading}
                            colorScheme='teal'>
                            {t('login.submit')}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
