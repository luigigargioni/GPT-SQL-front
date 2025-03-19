import { Empty } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import randomColor from 'randomcolor'
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { v4 as uuidv4 } from 'uuid'
import { noDataMessage } from '../utils'

interface DynamicRadialChartProps {
  data: any[]
}

const DynamicRadialChart = ({ data }: DynamicRadialChartProps) => {
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

  const formattedData = data.map((entry, index) => {
    const formattedEntry: any = { index }
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
      <RadialBarChart
        data={formattedData}
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={10}
      >
        {yAxisKeys.map((key) => (
          <RadialBar
            key={uuidv4()}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey={key}
            name={`${key}`}
            fill={randomColor()}
            legendType="circle" // Aggiunge il tipo di legenda
          />
        ))}
        <Tooltip
          formatter={(value, name) => [value, name]}
          labelFormatter={(label) =>
            `${xAxisKey}: ${data[label][xAxisKey as string]}`
          }
        />
        {/*         <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          formatter={(_, entry) =>
            `${entry.payload ? entry.payload[xAxisKey as string] : ''}`
          }
        /> */}
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default DynamicRadialChart
