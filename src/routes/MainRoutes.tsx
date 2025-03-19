import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { Loadable } from 'components/Loadable'
import { MainLayout } from 'layout/MainLayout'
import { defaultPath } from 'utils/constants'

const Homepage = Loadable(lazy(() => import('pages/homepage/index')))

export const MainRoutes: RouteObject = {
  path: defaultPath,
  element: <MainLayout />,
  children: [
    {
      path: defaultPath,
      element: <Homepage />,
    },
    {
      path: 'homepage',
      element: <Homepage />,
    },
  ],
}
