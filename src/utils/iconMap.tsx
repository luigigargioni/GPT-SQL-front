import React from 'react'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { Palette } from 'themes/palette'

const themePalette = Palette('light')

export const iconMap = {
  deleteCircle: (
    <CloseCircleOutlined style={{ color: themePalette.palette.error.main }} />
  ),
  successData: (
    <CheckCircleOutlined style={{ color: themePalette.palette.success.main }} />
  ),
  deleteTrash: (
    <DeleteOutlined style={{ color: themePalette.palette.error.main }} />
  ),
  editData: (
    <EditOutlined style={{ color: themePalette.palette.primary.main }} />
  ),
  saveData: (
    <SaveOutlined style={{ color: themePalette.palette.primary.main }} />
  ),
}
