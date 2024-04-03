import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import { useTranslation } from 'react-i18next'
import { useGetChannelsQuery } from '../store/services/channelsApi'

const Channels = ({ handleUserAction, activeChannel, setActiveChannel }) => {
	// use hooks for i18n and channels data
	const { t } = useTranslation()
	const { data: channels } = useGetChannelsQuery()
	// get if of active channel from state
	const { id: activeChannelId } = activeChannel

	// create handle for change active channel
	const handleSetActiveChannel = ({ currentTarget }) => {
		const { id, name } = currentTarget
		setActiveChannel({ id, name })
	}
	return channels?.map(({ name, id, removable }) => (
		<li className='nav-item w-100' key={id}>
			{!removable ? (
				<Button
					onClick={handleSetActiveChannel}
					id={id}
					className='channel w-100 rounded-0 text-start'
					variant={activeChannelId === id ? 'secondary' : ''}
				>
					<span className='me-1'># </span>
					{name}
				</Button>
			) : (
				<Dropdown as={ButtonGroup} className='d-flex'>
					<Button
						onClick={handleSetActiveChannel}
						id={id}
						className='channel w-100 rounded-0 text-start text-truncate over-text'
						variant={activeChannelId === id ? 'secondary' : ''}
					>
						<span className='me-1'>#</span>
						{name}
					</Button>
					<Dropdown.Toggle
						split
						className='flex-grow-0'
						variant={activeChannelId === id ? 'secondary' : ''}
						id='dropdown-split-basic'
					>
						<span className='visually-hidden'>{t('chat.channels.manageChannel')}</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={handleUserAction('renameChannel')} data-id={id}>
							{t('chat.channels.actionRename')}
						</Dropdown.Item>
						<Dropdown.Item data-id={id} onClick={handleUserAction('removeChannel')}>
							{t('chat.channels.actionRemove')}
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</li>
	))
}

export default Channels
