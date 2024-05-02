import React, { Suspense, useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import Register from './Register'
import Container from '@/components/Container'
import Login from './Login'
import Index from './Index'

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
                { path:`/`, element: <Index />,index:true },
                { path: "/register", element: <Register /> },
                { path: "/login", element: <Login /> },

            ]
        }
    ])
}

export default Router