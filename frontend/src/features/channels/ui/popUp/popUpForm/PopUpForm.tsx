import { FormControl, FormLabel, Input, ModalBody } from '@chakra-ui/react'
import { useSchema } from 'features/channels/lib/useSchema'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { FC, useEffect, useRef } from 'react'
import { useTranslation } from '../../../../../../node_modules/react-i18next'
import { IChannelResponse } from 'shared/types'
import './PopUpForm.scss'

interface IPopUpForm {
    readonly onSubmit: (values: IFormikValues) => void
    readonly children: React.ReactNode
    readonly channels: IChannelResponse[]
    readonly name?: string
}
export interface IFormikValues {
    name: string
}
export const PopUpForm: FC<IPopUpForm> = ({
    onSubmit,
    channels,
    children,
    name = '',
}) => {
    const { t } = useTranslation()
    const initialRef = useRef<HTMLInputElement>(null)
    const schema = useSchema(channels)
    useEffect(() => {
        if (initialRef.current) {
            initialRef.current.focus()
            initialRef.current.select()
        }
    }, [initialRef])
    const initialValues: IFormikValues = {
        name: name,
    }
    return (
        <ModalBody className='pop-up'>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={schema}>
                {({ errors, touched }) => (
                    <Form>
                        <Field name='name'>
                            {({ field }: FieldProps) => (
                                <FormControl
                                    isRequired
                                    isInvalid={touched.name && !!errors.name}>
                                    <Input
                                        {...field}
                                        _focus={{
                                            boxShadow: '0 0 3px 2px teal',
                                        }}
                                        type='text'
                                        ref={initialRef}
                                        placeholder={t('popUp.label')}
                                    />
                                    <FormLabel>
                                        {errors.name
                                            ? errors.name
                                            : t('popUp.label')}
                                    </FormLabel>
                                </FormControl>
                            )}
                        </Field>
                        {children}
                    </Form>
                )}
            </Formik>
        </ModalBody>
    )
}
