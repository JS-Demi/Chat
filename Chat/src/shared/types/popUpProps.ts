import { IChannelResponse } from 'shared/types'

export interface IPopUpProps {
    readonly onClose: () => void
    readonly name: string
    readonly id: string
    readonly channels: IChannelResponse[]
}
