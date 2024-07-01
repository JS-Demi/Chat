import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import React, { FC } from 'react'

interface IModal {
    readonly title: string
    readonly isOpen: boolean
    readonly onClose: () => void
    readonly children: React.ReactNode
}

export const PopUp: FC<IModal> = ({ title, isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} isCentered onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton
                    colorScheme='teal'
                    color={'teal'}
                    _hover={{ bgColor: 'teal.50' }}
                />
                {children}
            </ModalContent>
        </Modal>
    )
}
