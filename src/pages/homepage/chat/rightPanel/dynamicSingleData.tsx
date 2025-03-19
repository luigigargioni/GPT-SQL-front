import React from 'react'
import { Alert } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { Empty } from 'antd'
import dayjs from 'dayjs'
import { noDataMessage } from '../utils'

interface DynamicAlertProps {
  data: any
}

const DynamicSingleData = ({ data }: DynamicAlertProps) => {
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return <Empty description={noDataMessage()} />
  }
  return (
    <Alert severity="success" sx={{ marginBottom: '1rem', fontSize: '2rem' }}>
      {typeof data === 'object' && (
        <ul>
          {Object.keys(data).map((key) => {
            if (Array.isArray(data)) {
              return <li key={uuidv4()}>{data[key]}</li>
            }
            return (
              <li key={uuidv4()}>
                {key}: {data[key]}
              </li>
            )
          })}
        </ul>
      )}
      {typeof data !== 'object' &&
        (dayjs(data).isValid() && isNaN(data)
          ? dayjs(data).format('DD/MM/YYYY HH:mm:ss')
          : data)}
    </Alert>
  )
}

export default DynamicSingleData
