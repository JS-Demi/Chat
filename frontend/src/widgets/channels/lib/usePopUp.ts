import { CreateChannel, EditChannel, RemoveChannel } from 'features/channels/ui'
import { FC } from 'react'
import { channelsActions } from 'shared/model/chatSlice'
import { IPopUpProps } from 'shared/types'

export const usePopUp = (action: channelsActions) => {
    const popUps = {
        [channelsActions.CREATE]: CreateChannel,
        [channelsActions.EDIT]: EditChannel,
        [channelsActions.REMOVE]: RemoveChannel,
    }
    return popUps[action]
}
