import { LoginPage } from 'pages/login'
import { ROUTES } from 'shared/constants'
import { Fallback } from 'shared/ui/fallback'
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
    redirect,
} from 'react-router-dom'
import { Layout } from '../layout'
import { getCredentialsToken, useAuth } from 'shared/lib/auth'
import { FC } from 'react'
import { Chat } from 'pages/chat'

interface IPrivateRoute {
    readonly children: JSX.Element
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
    const token = getCredentialsToken()
    return token ? children : <Navigate to='/login' />
}

export const AppRouter = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <Chat />
                    </PrivateRoute>
                ),
                errorElement: <Fallback />,
            },

            {
                path: 'login',
                element: <Layout />,
                errorElement: <Fallback />,
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                ],
            },
        ],
        { basename: '/Chat/' }
    )
    return <RouterProvider router={router} />
}
