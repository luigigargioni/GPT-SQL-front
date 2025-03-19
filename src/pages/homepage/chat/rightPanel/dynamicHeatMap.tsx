import { Empty } from 'antd'
import React from 'react'
import HeatMap from 'react-heatmap-grid'
import { noDataMessage } from '../utils'
import './chartsStyle.css'

interface DynamicHeatMapProps {
  data: any[]
}

const cellRender = (value: number) => value && <div>{value}</div>

const DynamicHeatMap = ({ data }: DynamicHeatMapProps) => {
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

  // Extract all unique labels for X and Y
  const yLabels = Array.from(new Set(data.map((item) => item[yKey])))
  const xLabels = Array.from(new Set(data.map((item) => item[xKey]))).sort(
    (a, b) => a - b,
  )

  // Create the heatmap matrix
  const heatmapData = yLabels.map((yLabel) =>
    xLabels.map((xLabel) => {
      const foundItem = data.find(
        (item) => item[xKey] === xLabel && item[yKey] === yLabel,
      )
      return foundItem && valueKey ? foundItem[valueKey] : 0 // Default value if missing
    }),
  )

  return (
    <HeatMap
      xLabels={xLabels.map(String)} // Convert to string for compatibility
      xLabelsLocation="top"
      xLabelsVisibility={xLabels}
      xLabelWidth={60}
      yLabels={yLabels}
      yLabelTextAlign="right"
      data={heatmapData}
      squares
      height={80}
      cellStyle={(_background, _value, _min, _max) => ({
        background: `rgb(0, 151, 230, ${_max !== _min ? 1 - (_max - _value) / (_max - _min) : 1})`,
        fontSize: '16px',
        color: '#444',
      })}
      cellRender={cellRender}
    />
  )
}

export default DynamicHeatMap
