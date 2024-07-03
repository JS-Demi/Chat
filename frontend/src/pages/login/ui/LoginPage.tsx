import { FC, useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from 'shared/lib/auth'
import { SignIn, SwitcherToSignUp } from 'widgets/signIn'
import { CreateAccount, SwitcherToSignIn } from 'widgets/signUp'
import './LoginPage.scss'
import { LoginState } from 'shared/types'

interface ILoginPage {}

export const LoginPage: FC<ILoginPage> = () => {
    const { token: isLoggedIn } = useAuth()
    const [active, setActive] = useState<LoginState>(LoginState.signIn)

    if (isLoggedIn) {
        return <Navigate to='/chat' />
    }
    return (
        <div className={'container'}>
            <section
                className={`login ${
                    active === LoginState.singUp ? 'signUpActive' : ''
                }`}>
                <CreateAccount active={active} />
                <SignIn active={active} />
                <div className='overlay-container'>
                    <div className='overlay'>
                        <SwitcherToSignIn setActive={setActive} />
                        <SwitcherToSignUp setActive={setActive} />
                    </div>
                </div>
            </section>
        </div>
    )
}
