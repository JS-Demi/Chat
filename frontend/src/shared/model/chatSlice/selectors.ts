import { createSelector } from '@reduxjs/toolkit'
import { IChatState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.chat
)

export const selectActiveChannel = createSelector(
    selectBase,
    (state: IChatState) => state.activeChannel
)
export const selectUserActionData = createSelector(
    selectBase,
    (state: IChatState) => state.userActionData
)
