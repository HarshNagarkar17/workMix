import { Suspense } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Register from './Register'
import Container from '@/components/Container'
import Login from './Login'
import Index from './Index'
import Explore from './Explore'
import AuthContainer from '@/components/AuthContainer'

const Router = () => {
    return useRoutes([
        {
            path: "/", element: (
                <Container>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Container>
            ), children: [
                {
                    path: `/`, element: (
                        <AuthContainer>
                            <Index />
                        </AuthContainer>
                    ), index: true
                },
                { path: "/register", element: <Register /> },
                { path: "/login", element: <Login /> },
                { path: "/explore", element: <Explore /> },

            ]
        }
    ])
}

export default Router