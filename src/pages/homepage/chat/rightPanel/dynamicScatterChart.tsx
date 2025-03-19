import { Empty } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Palette } from 'themes/palette'
import { checkFormatDateTime, noDataMessage, snakeToTitle } from '../utils'

interface DynamicScatterChartProps {
  data: any[]
}

const DynamicScatterChart = ({ data }: DynamicScatterChartProps) => {
  if (!data || data.length === 0 || !Array.isArray(data)) {
    return <Empty description={noDataMessage()} />
  }

  const firstEntry = data[0]
  const xAxisKey = Object.keys(firstEntry)[0]
  const yAxisKey = Object.keys(firstEntry)[1]

  const formattedData = data.map((entry) => {
    const formattedEntry: any = {}
    Object.keys(entry).forEach((key) => {
      if (typeof entry[key] === 'object') {
        formattedEntry[key] = JSON.stringify(entry[key])
        return
      }
      if (dayjs(entry[key]).isValid() && isNaN(entry[key])) {
        formattedEntry[key] = checkFormatDateTime(entry[key])
        return
      }
      formattedEntry[key] = !isNaN(parseFloat(entry[key]))
        ? parseFloat(entry[key])
        : entry[key]
    })
    return formattedEntry
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type={
            typeof firstEntry[xAxisKey] === 'number' ? 'number' : 'category'
          }
          dataKey={xAxisKey}
          name={xAxisKey}
          label={{ value: snakeToTitle(xAxisKey), position: 'bottom' }}
        />
        <YAxis
          type={
            typeof firstEntry[yAxisKey] === 'number' ? 'number' : 'category'
          }
          dataKey={yAxisKey}
          name={yAxisKey}
          label={{
            value: snakeToTitle(yAxisKey),
            angle: -90,
            position: 'left',
          }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter
          name=""
          data={formattedData}
          fill={Palette('light').palette.primary.main}
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default DynamicScatterChart
