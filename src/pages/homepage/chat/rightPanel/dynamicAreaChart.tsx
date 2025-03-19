import { Empty } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import randomColor from 'randomcolor'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { v4 as uuidv4 } from 'uuid'
import { noDataMessage } from '../utils'

interface DynamicAreaChartProps {
  data: any[]
}

const DynamicAreaChart = ({ data }: DynamicAreaChartProps) => {
  if (!data || data.length === 0 || !Array.isArray(data))
    return <Empty description={noDataMessage()} />

  const firstEntry = data[0]
  const xAxisKey = Object.keys(firstEntry).find(
    (key) => typeof firstEntry[key] === 'string',
  )
  const yAxisKeys = Object.keys(firstEntry).filter(
    (key) =>
      key !== xAxisKey &&
      (typeof firstEntry[key] === 'number' || !isNaN(firstEntry[key])),
  )

  const formattedData = data.map((entry) => {
    const formattedEntry: any = {}
    Object.keys(entry).forEach((key) => {
      if (yAxisKeys.includes(key)) {
        if (typeof entry[key] === 'object') {
          formattedEntry[key] = JSON.stringify(entry[key])
          return
        }
        if (dayjs(entry[key]).isValid() && isNaN(entry[key])) {
          formattedEntry[key] = dayjs(entry[key]).format('DD/MM/YYYY HH:mm:ss')
          return
        }
        formattedEntry[key] = !isNaN(parseFloat(entry[key]))
          ? parseFloat(entry[key])
          : entry[key]
      } else {
        formattedEntry[key] = entry[key]
      }
    })
    return formattedEntry
  })

  return (
    <ResponsiveContainer width="90%" height="100%">
      <AreaChart data={formattedData}>
        <XAxis dataKey={xAxisKey} />
        {yAxisKeys.map((key) => (
          <YAxis key={uuidv4()} dataKey={key} />
        ))}
        {yAxisKeys.map((key) => (
          <Area
            key={uuidv4()}
            type="monotone"
            dataKey={key}
            stroke={randomColor()}
          />
        ))}
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default DynamicAreaChart
