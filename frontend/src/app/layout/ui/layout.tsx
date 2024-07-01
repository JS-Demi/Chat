import { Outlet } from 'react-router-dom'

import { Footer } from 'widgets/footer/ui'
import { Header } from 'widgets/header/ui'

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
