// prettier-ignore
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input
} from '@chakra-ui/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useCreateUserMutation } from 'features/auth/model'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { HttpError } from 'http-errors'
import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ROUTES } from 'shared/constants'
import { setCredentials } from 'shared/lib/auth'
import { IAuthResponse, LoginState } from 'shared/types'
import * as Yup from 'yup'

interface IFormValues {
    username: string
    password: string
    confirmPassword: string
}

interface ICreateAccount {
    active: LoginState
}

export const CreateAccount: FC<ICreateAccount> = ({ active }) => {
    // use hook for navigate user
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (inputRef.current && active === LoginState.singUp) {
            inputRef.current.focus()
        }
    }, [active])

    // use hook for i18n and create user
    const [createUser, { isLoading }] = useCreateUserMutation()
    const { t } = useTranslation()
    const initialValues: IFormValues = {
        username: '',
        password: '',
        confirmPassword: '',
    }

    // create schema for signup
    const signupSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, t('signup.errors.nickname.short'))
            .max(20, t('signup.errors.nickname.long')),
        password: Yup.string().min(6, t('signup.errors.password.short')),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            t('signup.errors.password.match')
        ),
    })

    // create handle for submit signup
    const handleSubmit = (
        values: IFormValues,
        { setFieldError }: FormikHelpers<IFormValues>
    ) => {
        createUser(values)
            .unwrap()
            .then((response: IAuthResponse) => {
                const { CHAT } = ROUTES
                setCredentials(response)
                navigate(CHAT)
            })
            .catch((error: HttpError | FetchBaseQueryError) => {
                if (error.status === 409) {
                    setFieldError('username', t('signup.errors.alreadyExist'))
                    toast.error(t('toastify.alreadyExist'))
                }
                if (error.status === 'FETCH_ERROR') {
                    toast.error(t('toastify.fetchError'))
                }
            })
    }

    return (
        <Box className='form-container sign-up'>
            <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={handleSubmit}>
                {({ errors, setFieldError }) => (
                    <Form>
                        <Heading as={'h1'} mb='20px' size={['lg', null, 'xl']}>
                            {t('signup.header')}
                        </Heading>
                        <Field
                            type='text'
                            id='username'
                            name='username'
                            autoComplete='username'>
                            {({ field }: FieldProps) => (
                                <FormControl
                                    isRequired
                                    isInvalid={!!errors.username}>
                                    <Input
                                        {...field}
                                        ref={inputRef}
                                        onClick={() => {
                                            if (
                                                errors.username ===
                                                t('signup.errors.alreadyExist')
                                            ) {
                                                setFieldError(
                                                    'username',
                                                    undefined
                                                )
                                            }
                                        }}
                                        placeholder={t('signup.login')}
                                    />
                                    <FormLabel>
                                        {errors.username
                                            ? errors.username
                                            : t('signup.login')}
                                    </FormLabel>
                                </FormControl>
                            )}
                        </Field>
                        <Field id='password' name='password' autoComplete='off'>
                            {({ field }: FieldProps) => (
                                <FormControl
                                    isRequired
                                    isInvalid={!!errors.password}>
                                    <Input
                                        {...field}
                                        type='password'
                                        placeholder={t('signup.password')}
                                    />
                                    <FormLabel>
                                        {errors.password
                                            ? errors.password
                                            : t('signup.password')}
                                    </FormLabel>
                                </FormControl>
                            )}
                        </Field>
                        <Field
                            id='confirmPassword'
                            name='confirmPassword'
                            autoComplete='off'>
                            {({ field }: FieldProps) => (
                                <FormControl
                                    isRequired
                                    isInvalid={!!errors.confirmPassword}>
                                    <Input
                                        {...field}
                                        type='password'
                                        placeholder={t(
                                            'signup.confirmPassword'
                                        )}
                                    />
                                    <FormLabel
                                        color={
                                            errors.confirmPassword
                                                ? 'crimson'
                                                : 'gray'
                                        }>
                                        {errors.confirmPassword
                                            ? errors.confirmPassword
                                            : t('signup.confirmPassword')}
                                    </FormLabel>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            type='submit'
                            mt='20px'
                            size={['sm', null, 'md']}
                            isLoading={isLoading}
                            colorScheme='teal'>
                            {t('signup.submit')}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
