import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScaleFade,
} from '@chakra-ui/react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useSendMessageMutation } from 'entities/messages/model'
import * as filter from 'leo-profanity'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../../../node_modules/react-i18next'
import { CiFaceSmile } from 'react-icons/ci'
import { IoSendSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { useAuth } from 'shared/lib/auth'
import { useResize } from 'shared/lib/resize'
import { VectorFromRight } from 'shared/ui/vector'

interface INewMessage {
    readonly channelId: string
    readonly isOpen: boolean
    readonly onOpen: () => void
}

export const NewMessage: FC<INewMessage> = ({ channelId, isOpen, onOpen }) => {
    const { t } = useTranslation()

    const [sendMessage, { isLoading }] = useSendMessageMutation()
    const { username } = useAuth()
    const inputRef = useRef<HTMLInputElement>(null)

    filter.loadDictionary('ru')
    const { isMobileScreen } = useResize()

    useEffect(() => {
        if (inputRef.current && !isMobileScreen) {
            inputRef.current.focus()
        }
    })

    const [value, setValue] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const filteredMessage = filter.clean(value)
        const dataForBackend = {
            body: filteredMessage,
            channelId,
            username: username!,
        }
        sendMessage(dataForBackend)
            .unwrap()
            .then(() => {
                setValue('')
            })
            .catch((error) => {
                if (error.status === 'FETCH_ERROR') {
                    toast.error(t('toastify.fetchError'))
                }
            })
    }
    return (
        <ScaleFade in={true} initialScale={0.7}>
            <Box w='100%' m='5px 0 20px' px='10px' alignSelf={'center'}>
                <Box
                    display={'flex'}
                    gap={'5px'}
                    alignItems={'center'}
                    as='form'
                    h={{ base: '46px', md: '54px' }}
                    onSubmit={handleSubmit}>
                    <InputGroup
                        bgColor={'#fff'}
                        h='100%'
                        alignItems={'center'}
                        borderRadius={'1em'}>
                        <Popover
                            trigger={isMobileScreen ? 'click' : 'hover'}
                            placement='top-start'
                            closeOnBlur={false}>
                            <PopoverTrigger>
                                <Flex
                                    alignItems={'center'}
                                    onClick={onOpen}
                                    position={'relative'}
                                    textAlign={'center'}
                                    ml={'10px'}
                                    _hover={{
                                        color: 'teal',
                                        cursor: 'default',
                                    }}>
                                    <Icon
                                        borderRadius={'50px'}
                                        bgColor={'#fff'}
                                        aria-label='choose-emoji'
                                        as={CiFaceSmile}
                                        fontSize={'1.5em'}
                                    />
                                </Flex>
                            </PopoverTrigger>
                            {isOpen && (
                                <PopoverContent mb={'10px'}>
                                    <EmojiPicker
                                        onEmojiClick={(
                                            emojies: EmojiClickData
                                        ) => {
                                            setValue(
                                                (draft) =>
                                                    `${draft}${emojies.emoji}`
                                            )
                                        }}
                                        lazyLoadEmojis={true}
                                    />
                                </PopoverContent>
                            )}
                        </Popover>

                        <FormControl display={'flex'} justifyContent={'center'}>
                            <FormLabel hidden>
                                {t('chat.footer.label')}
                            </FormLabel>
                            <Input
                                placeholder={t('chat.footer.placeholder')}
                                px={'10px'}
                                ref={inputRef}
                                value={value}
                                _placeholder={{ transition: '0.6s' }}
                                variant={'unstyled'}
                                onChange={({ target }) => {
                                    setValue(target.value)
                                }}
                            />
                        </FormControl>
                        <VectorFromRight color='#fff' />
                    </InputGroup>
                    <Button
                        fontSize={'1.3em'}
                        width={{ base: '46px', md: '54px' }}
                        colorScheme={'teal'}
                        h='100%'
                        borderRadius={'50px'}
                        isDisabled={value === ''}
                        type='submit'
                        aria-label={t('chat.footer.sendMessage')}
                        isLoading={isLoading}>
                        <Icon as={IoSendSharp} />
                    </Button>
                </Box>
            </Box>
        </ScaleFade>
    )
}
