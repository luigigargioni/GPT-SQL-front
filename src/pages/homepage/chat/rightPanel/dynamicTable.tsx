import React from 'react'
import { Empty, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Palette } from 'themes/palette'
import { checkFormatDateTime, noDataMessage, snakeToTitle } from '../utils'

interface DynamicTableProps {
  data: any[]
}

const DynamicTable = ({ data }: DynamicTableProps) => {
  const themePalette = Palette('light')

  if (!data || data.length === 0 || !Array.isArray(data))
    return <Empty description={noDataMessage()} />

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key, index) => ({
          title: snakeToTitle(key),
          dataIndex: key,
          key: `column_${index}`,
          sorter: (a, b) => a[key] - b[key],
          render: (text) => {
            if (typeof text === 'object') {
              return JSON.stringify(text)
            }
            if (typeof text === 'boolean') {
              return text ? (
                <CheckCircleOutlined
                  style={{ color: themePalette.palette.success.main }}
                />
              ) : (
                <CloseCircleOutlined
                  style={{ color: themePalette.palette.error.main }}
                />
              )
            }
            return checkFormatDateTime(text)
          },
        }))
      : []

  return (
    <Table
      dataSource={data}
      rowKey={(record) => JSON.stringify(record)}
      columns={columns}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
      }}
    />
  )
}

export default DynamicTable
