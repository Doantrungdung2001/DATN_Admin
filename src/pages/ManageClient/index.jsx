import React, { useState } from 'react'
import { Space, Table, Input, Popconfirm, Spin, notification, Tooltip } from 'antd'
import { DeleteOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons'
import { formatDateTime } from '../../utils/helpers'
import useManageClient from './useManageClient'
import CLIENT from '../../services/clientService'

const { Search } = Input

const ManageClient = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const { allClient, isSuccess, isLoading, refetch } = useManageClient()

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleUpdateStatus = async ({ clientId, currentStatus }) => {
    // Xử lý cập nhật trạng thái ở đây
    setLoading(true)
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    try {
      const res = await CLIENT.updateClient({
        clientId,
        data: {
          status: newStatus
        }
      })

      setLoading(false)
      if (res.status === 200) {
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
        refetch()
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
  }

  const handleDeleteClient = async ({ clientId }) => {
    // Xử lý xóa client ở đây
    setLoading(true)
    try {
      const res = await CLIENT.deleteClient({
        clientId
      })

      setLoading(false)
      if (res.status === 200) {
        openNotificationWithIcon('success', 'Thông báo', 'Xóa thành công')
        refetch()
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (text, record) => formatDateTime(record.createdAt)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Không hoạt động', value: 'inactive' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (text, record) => (record.status === 'active' ? 'Hoạt động' : 'Không hoạt động')
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title={`Bạn muốn ${record.status === 'active' ? 'Cập nhật thành không hoạt động' : 'Cập nhật thành hoạt động'}`}
            onConfirm={() => handleUpdateStatus({ clientId: record._id, currentStatus: record.status })}
            okText="Có"
            cancelText="Không"
            key="update-statuss"
          >
            <span onClick={(e) => e.stopPropagation()}>
              <Tooltip title="Cập nhật trạng thái">
                {record.status === 'active' ? <FallOutlined /> : <RiseOutlined />}
              </Tooltip>
            </span>
          </Popconfirm>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDeleteClient({ clientId: record._id })}
            okText="Yes"
            cancelText="No"
            disabled={record.status === 'active'}
          >
            <Tooltip
              title={
                record.status === 'active'
                  ? 'Bạn không thể xóa trang trại đang hoạt động, hãy cập nhật trạng thái trước!'
                  : 'Xóa'
              }
            >
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      {contextHolder}
      {isSuccess && (
        <div>
          <h1>Danh sách các khách hàng</h1>
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="Tìm kiếm theo ID, Tên, SDT, Địa chỉ"
              allowClear
              enterButton
              onSearch={handleSearch}
              style={{ width: 400 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Table
            columns={columns}
            dataSource={allClient.filter((client) => {
              return (
                client.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                client.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
                client.address?.toLowerCase().includes(searchText.toLowerCase()) ||
                client._id?.toLowerCase().includes(searchText.toLowerCase())
              )
            })}
            rowKey="id"
            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
            loading={loading}
          />
        </div>
      )}
      {isLoading && <Spin size="large" />}
    </>
  )
}

export default ManageClient
