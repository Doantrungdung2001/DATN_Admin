import React, { useState } from 'react'
import { Table, Spin } from 'antd'
import useManageEvents from './useManageFarmTransaction'
import Search from 'antd/es/input/Search'
import { formatDateTime, formatTextTable, formatTransactionHashTable } from '../../utils/helpers'

const ManageFarmTransaction = () => {
  const [searchText, setSearchText] = useState('')

  const { allEvents, isSuccess, isLoading } = useManageEvents()

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      render: (text) => formatDateTime(text)
    },
    {
      title: 'Địa chỉ ví',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      render: (text) =>
        formatTextTable({
          str: text,
          a: 8,
          b: 5
        })
    },
    {
      title: 'Tên trang trại',
      dataIndex: 'farm',
      key: 'farm'
    },
    {
      title: 'Transaction hash',
      dataIndex: 'tx',
      key: 'tx',
      render: (text) =>
        formatTransactionHashTable({
          str: text,
          a: 8,
          b: 5
        })
    },
    {
      title: 'Phí giao dịch (EVMOS)',
      dataIndex: 'fee',
      key: 'fee',
      sorter: (a, b) => a.fee - b.fee
    },
    {
      title: 'Tên Event',
      dataIndex: 'event',
      key: 'event',
      filters: [
        { text: 'Other', value: 'other' },
        { text: 'None', value: 'none' }
      ],
      onFilter: (value, record) => record.event.includes(value)
    }
  ]

  const handleSearch = (value) => {
    setSearchText(value)
    // Gọi API hoặc xử lý tìm kiếm ở đây
    console.log('Searching for:', value)
  }

  return (
    <div>
      <h1>Danh sách các giao dịch của các trang trại</h1>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm farm, Địa chỉ ví"
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ width: 400 }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {isSuccess && (
        <Table
          columns={columns}
          dataSource={allEvents?.filter(
            (event) =>
              event.farm?.toLowerCase().includes(searchText.toLowerCase()) ||
              event.walletAddress?.toLowerCase().includes(searchText.toLowerCase())
          )}
        />
      )}
      {isLoading && <Spin />}
    </div>
  )
}

export default ManageFarmTransaction
