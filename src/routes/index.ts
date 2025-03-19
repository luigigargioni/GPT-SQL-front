import { useRoutes } from 'react-router-dom'
import { MainRoutes } from './MainRoutes'

export const Routes = () => {
  const routes = [MainRoutes]

  return useRoutes(routes)
}
