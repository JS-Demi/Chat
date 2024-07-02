import { Chat } from 'pages/chat'
import { LoginPage } from 'pages/login'
import { FC } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { getCredentialsToken } from 'shared/lib/auth'
import { Fallback } from 'shared/ui/fallback'
import { Layout } from '../layout'

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
