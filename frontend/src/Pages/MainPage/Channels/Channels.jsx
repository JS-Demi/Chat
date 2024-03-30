import cn from 'classnames'
import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import { useGetChannelsQuery } from '../../../services/channelsApi'

const Channels = ({ handleUserAction, activeChannel, setActiveChannel }) => {
	// get channels from store
	const { data: channels, refetch, error } = useGetChannelsQuery()

	// get activeChannel ID from store
	const { id: activeChannelId } = activeChannel

	// change active channel
	const handleSetActiveChannel = ({ currentTarget }) => {
		const { id, name } = currentTarget
		setActiveChannel({ id, name })
	}

	return channels?.map(({ name, id, removable }) => (
		<li className='nav-item w-100' key={id}>
			{!removable ? (
				<button
					onClick={handleSetActiveChannel}
					id={id}
					name={name}
					type='button'
					className={cn('w-100 rounded-0 text-start btn', {
						'btn-secondary': activeChannelId === id,
					})}
				>
					<span className='me-1'># {name}</span>
				</button>
			) : (
				<>
					<Dropdown as={ButtonGroup} className='d-flex'>
						<Button
							onClick={handleSetActiveChannel}
							id={id}
							name={name}
							className='w-100 rounded-0 text-start text-truncate'
							variant={activeChannelId === id ? 'secondary' : ''}
						>
							<span className='me-1'>#</span> {name}
						</Button>
						<Dropdown.Toggle split variant={activeChannelId === id ? 'secondary' : ''} id='dropdown-split-basic' />
						<Dropdown.Menu>
							<Dropdown.Item onClick={handleUserAction('renameChannel')} data-id={id}>
								Переименовать
							</Dropdown.Item>
							<Dropdown.Item data-id={id} onClick={handleUserAction('removeChannel')}>
								Удалить
							</Dropdown.Item>
						</Dropdown.Menu>
						<span className='visually-hidden'>Управление каналом</span>
					</Dropdown>
				</>
			)}
		</li>
	))
}

export default Channels
