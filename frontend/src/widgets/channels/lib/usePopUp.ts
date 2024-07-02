import { CreateChannel, EditChannel, RemoveChannel } from 'features/channels/ui'
import { channelsActions } from 'shared/model/chatSlice'

export const usePopUp = (action: channelsActions) => {
    const popUps = {
        [channelsActions.CREATE]: CreateChannel,
        [channelsActions.EDIT]: EditChannel,
        [channelsActions.REMOVE]: RemoveChannel,
    }
    return popUps[action]
}
