import { Empty } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import randomColor from 'randomcolor'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { v4 as uuidv4 } from 'uuid'
import { noDataMessage } from '../utils'

interface DynamicPieChartProps {
  data: any[]
}

const DynamicPieChart = ({ data }: DynamicPieChartProps) => {
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
      <PieChart>
        {yAxisKeys.map((key) => {
          return (
            <Pie
              data={formattedData}
              key={uuidv4()}
              dataKey={key}
              nameKey={xAxisKey}
              label
              isAnimationActive={false}
            >
              {formattedData.map(() => {
                const color = randomColor()
                return <Cell key={uuidv4()} fill={color} />
              })}
            </Pie>
          )
        })}
        <Tooltip cursor={{ fill: '#0080DD20' }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default DynamicPieChart
