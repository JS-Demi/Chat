export interface IAuthResponse {
	token: string
	username: string
}

export interface IAuthRequest {
	username: string
	password: string
}

export interface IUseAuth {
	setCredentials: (data: IAuthResponse) => void
	removeCredentials: () => void
	username: string | null
	token: string | null
}

export type ILoginRequest = IAuthRequest & Pick<IUseAuth, 'setCredentials'>
