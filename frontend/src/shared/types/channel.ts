export interface IChannel {
	id: string
	name: string
}
export interface IChannelResponse extends IChannel {
	removable: boolean
}
