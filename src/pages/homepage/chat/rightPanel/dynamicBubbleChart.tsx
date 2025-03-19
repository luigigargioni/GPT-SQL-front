import { Empty } from 'antd'
import React from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Palette } from 'themes/palette'
import { noDataMessage, snakeToTitle } from '../utils'

interface DynamicBubbleChartProps {
  data: any[]
}

const DynamicBubbleChart = ({ data }: DynamicBubbleChartProps) => {
  if (!data || data.length === 0 || !Array.isArray(data)) {
    return <Empty description={noDataMessage()} />
  }

  // Dynamically determine the property keys
  const firstItem = data[0]
  const keys = Object.keys(firstItem)

  // Identify the key that holds numeric values, including numbers in string format
  const valueKey = keys.find((key) => {
    const isNumeric = (value: any) =>
      !isNaN(parseFloat(value)) && isFinite(value)
    return (
      isNumeric(firstItem[key]) && data.every((item) => isNumeric(item[key]))
    )
  })
  if (!valueKey) {
    return <Empty description={noDataMessage()} />
  }

  // Identify possible keys for X and Y axes
  const axisKeys = keys.filter((key) => key !== valueKey)

  let xKey = axisKeys[0]
  let yKey = axisKeys[1]

  if (axisKeys.length === 2) {
    const [key1, key2] = axisKeys
    const isKey1Numeric = data.every((item) => typeof item[key1] === 'number')
    const isKey2Numeric = data.every((item) => typeof item[key2] === 'number')

    if (isKey1Numeric && !isKey2Numeric) {
      xKey = key1
      yKey = key2
    } else if (!isKey1Numeric && isKey2Numeric) {
      xKey = key2
      yKey = key1
    } else if (isKey1Numeric && isKey2Numeric) {
      xKey = key1
      yKey = key2
    }
  }

  const zAxisRange = [
    // Math.min(...data.map((item) => item[valueKey!])),
    0,
    Math.max(...data.map((item) => item[valueKey!])),
  ]

  // If the xKey is not numeric, aggregate the data
  let aggregatedData = data
  if (typeof firstItem[xKey] !== 'number') {
    const aggregatedDataMap = new Map<string, any[]>()
    data.forEach((item) => {
      const key = item[xKey]
      if (!aggregatedDataMap.has(key)) {
        aggregatedDataMap.set(key, [])
      }
      aggregatedDataMap.get(key)?.push(item)
    })

    aggregatedData = Array.from(aggregatedDataMap).map(([key, items]) => {
      const aggregatedItem = { ...items[0] }
      aggregatedItem[xKey] = key
      aggregatedItem[valueKey] = items.reduce(
        (acc, item) => acc + item[valueKey],
        0,
      )
      return aggregatedItem
    })
  }
  // If the yKey is not numeric, aggregate the data
  if (typeof firstItem[yKey] !== 'number') {
    const aggregatedDataMap = new Map<string, any[]>()
    aggregatedData.forEach((item) => {
      const key = item[yKey]
      if (!aggregatedDataMap.has(key)) {
        aggregatedDataMap.set(key, [])
      }
      aggregatedDataMap.get(key)?.push(item)
    })

    aggregatedData = Array.from(aggregatedDataMap).map(([key, items]) => {
      const aggregatedItem = { ...items[0] }
      aggregatedItem[yKey] = key
      aggregatedItem[valueKey] = items.reduce(
        (acc, item) => acc + item[valueKey],
        0,
      )
      return aggregatedItem
    })
  }

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
          type={typeof firstItem[xKey] === 'number' ? 'number' : 'category'}
          dataKey={xKey}
          name={xKey}
          label={{ value: snakeToTitle(xKey), position: 'bottom' }}
        />
        <YAxis
          type={typeof firstItem[yKey] === 'number' ? 'number' : 'category'}
          dataKey={yKey}
          name={yKey}
          label={{
            value: snakeToTitle(yKey),
            angle: -90,
            position: 'left',
          }}
        />
        <ZAxis
          type={typeof firstItem[valueKey] === 'number' ? 'number' : 'category'}
          dataKey={valueKey}
          name={valueKey}
          range={zAxisRange}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter
          name=""
          data={aggregatedData}
          fill={Palette('light').palette.primary.main}
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default DynamicBubbleChart
