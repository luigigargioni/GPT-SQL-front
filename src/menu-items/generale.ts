import { CommentOutlined } from '@ant-design/icons'
import { MenuItem } from 'menu-items/types'

export const generale: MenuItem = {
  id: 'generale',
  title: 'Generale',
  type: 'group',
  children: [
    {
      id: 'homepage',
      title: 'Homepage',
      type: 'item',
      url: '/homepage',
      icon: CommentOutlined,
    },
  ],
}
