import { io } from 'socket.io-client'

const subscribe = (channel = 1) => {
	// const [channelId, setChannel] = useState(1)

	const socket = io()
	socket.on('connect', (socket) => {
		console.log('hello', socket)
	})

	socket.on('newMessage', (message) => {
		console.log(`new message: ${message}`)
	})
}

export default subscribe
