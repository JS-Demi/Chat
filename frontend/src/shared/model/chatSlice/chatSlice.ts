/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IChatState, IUserActionData, channelsActions } from './types'
import { IChannel } from 'shared/types'

const defaultChannel = { name: 'general', id: '1' }
const initialState: IChatState = {
    userActionData: { action: channelsActions.CREATE, name: '', id: '' },
    activeChannel: defaultChannel,
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChannel: (state, action: PayloadAction<IChannel | null>) => {
            if (action.payload === null) {
                state.activeChannel = defaultChannel
                return
            }
            state.activeChannel = action.payload
        },
        setUserActionData: (state, action: PayloadAction<IUserActionData>) => {
            state.userActionData = action.payload
        },
    },
})
// prettier-ignore
export const {
  setActiveChannel, setUserActionData,
} = chatSlice.actions;

export default chatSlice.reducer
