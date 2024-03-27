import cn from 'classnames'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '../../services/channelsApi'
import { setActiveChannel } from '../../store/slices/commonSlice'

const Channels = () => {
	const [activeDropDown, setActiveDropDown] = useState(null)
	const dispatch = useDispatch()

	// get user's token
	// const userAccessToken = localStorage.getItem('access_token')

	// get channels from store
	const { data: channels, refetch, error } = useGetChannelsQuery()

	// get activeChannel ID from store
	const { id: activeChannelId } = useSelector((state) => state.common.activeChannel)

	// change active channel
	const handleSetActiveChannel = ({ target }) => {
		const { id, name } = target
		dispatch(setActiveChannel({ name, id }))
	}

	const toggleDropDownMenu = (id) => {
		setActiveDropDown(id)
	}

	const handleRemoveChannel = () => {
		console.log('remove channel')
	}

	const handleEditChannel = (id) => {
		console.log(id)
	}

	return channels?.map(({ name, id, removable }) => (
		<li
			className='nav-item w-100'
			key={id}
		>
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
					<span className='me-1'>#</span>
					{name}
				</button>
			) : (
				<div
					role='group'
					className='d-flex dropdown btn-group'
				>
					<button
						onClick={handleSetActiveChannel}
						id={id}
						type='button'
						className={cn('w-100 rounded-0 text-start text-truncate btn', {
							'btn-secondary': activeChannelId === id,
						})}
					>
						<span className='me-1'>#</span>
						{name}
					</button>
					<button
						onClick={() => toggleDropDownMenu(id)}
						id='react-aria211918939-:r0:'
						type='button'
						className={cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {
							show: activeDropDown === id,
						})}
						aria-expanded='false'
					>
						<span className='visually-hidden'>Управление каналом</span>
					</button>
					<div
						className='drop-down-menu'
						x-placement='bottom-end'
						style={{
							position: 'absolute',
							inset: '0px 0px auto auto',
							transform: 'translate3d(0px, 40px, 0px)',
						}}
					>
						<button
							onClick={handleRemoveChannel}
							className={cn('dropdown-menu', { show: activeDropDown === id })}
							type='button'
						>
							Удалить
						</button>
						<button
							onClick={handleEditChannel}
							type='button'
							className={cn('dropdown-menu', { show: activeDropDown === id })}
						>
							Переименовать
						</button>
					</div>
				</div>
			)}
		</li>
	))
}

export default Channels
