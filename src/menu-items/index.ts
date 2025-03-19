import { generale } from './generale'
import { MenuItem } from './types'

export const getMenuItems = (): MenuItem[] => {
  const defaultItems = [generale]

  return defaultItems
}
