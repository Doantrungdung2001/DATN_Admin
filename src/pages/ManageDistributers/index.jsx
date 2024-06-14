import React, { useState } from 'react'
import { Button, Space, Table, Input, Modal, Form, Popconfirm, Spin, notification, Tooltip } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons'
import useManageDistributers from './useManageDistributers'
import { formatDateTime, formatTextTable } from '../../utils/helpers'
import DISTRIBUTER from '../../services/distributerService'
import Loading from '../Loading'

const { Search } = Input

const AddDistributerModal = ({ visible, onCancel, onAdd, selectedOutput, isUpdate }) => {
  const [form] = Form.useForm()
  form.setFieldsValue({
    name: selectedOutput?.name || '',
    email: selectedOutput?.email || '',
    address: selectedOutput?.address || '',
    description: selectedOutput?.description || ''
  })

  return (
    <Modal
      open={visible}
      title="Thêm distributer mới"
      okText="Thêm"
      cancelText="Hủy"
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.setFieldsValue(values)
            let data = {}
            if (isUpdate) {
              data = {
                distributerId: selectedOutput._id,
                name: values?.name,
                email: values?.email,
                address: values?.address,
                description: values?.description
              }
            } else {
              data = {
                name: values?.name,
                email: values?.email,
                address: values?.address,
                description: values?.description
              }
            }
            onAdd(data)
            onCancel()
            form.resetFields()
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập Email' },
            {
              type: 'email',
              message: 'Please enter a valid email address!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ManageDistributerPage = () => {
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
  const [selectedDistributer, setSelectedDistributer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const { allDistributers, isSuccess, isLoading, refetch } = useManageDistributers()

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleAddDistributer = async (values) => {
    setLoading(true)
    console.log('Add distributer:', values)
    try {
      const res = await DISTRIBUTER.addDistributer({
        data: {
          name: values.name,
          email: values.email,
          address: values.address,
          description: values.description
        }
      })

      setLoading(false)
      if (res.status === 200) {
        openNotificationWithIcon('success', 'Thông báo', 'Thêm thành công')
        refetch()
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
    }
  }

  const handleUpdateStatus = async ({ distributerId, currentStatus }) => {
    // Xử lý cập nhật trạng thái ở đây
    setLoading(true)
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    try {
      const res = await DISTRIBUTER.updateDistributer({
        distributerId,
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

  const handleDeleteDistributer = async ({ distributerId }) => {
    // Xử lý xóa distributer ở đây
    setLoading(true)
    try {
      const res = await DISTRIBUTER.deleteDistributer({
        distributerId
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

  const handleUpdateDistributer = async (values) => {
    // Xử lý cập nhật distributer ở đây
    setLoading(true)
    const { distributerId, name, email, address, description } = values
    console.log('Update distributer:', distributerId, name, email, address, description)
    try {
      const res = await DISTRIBUTER.updateDistributer({
        distributerId,
        data: {
          name,
          email,
          address,
          description
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

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) =>
        formatTextTable({
          str: text,
          a: 8,
          b: 5
        })
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
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
            onConfirm={() => handleUpdateStatus({ distributerId: record._id, currentStatus: record.status })}
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
            onConfirm={() => handleDeleteDistributer({ distributerId: record._id })}
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
          <Tooltip
            title="Chỉnh sửa thông tin"
            onClick={() => {
              setSelectedDistributer(record)
              setModalUpdateVisible(true)
            }}
          >
            <EditOutlined />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      {contextHolder}
      {isSuccess && (
        <Spin spinning={loading} size="large">
          <div>
            <h1>Danh sách các nhà phân phối</h1>
            <div style={{ marginBottom: 16 }}>
              <Search
                placeholder="Tìm kiếm theo ID, Tên, Email, Địa chỉ"
                allowClear
                enterButton
                onSearch={handleSearch}
                style={{ width: 400 }}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                Thêm mới
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={allDistributers.filter((distributer) => {
                return (
                  distributer.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                  distributer.email?.toLowerCase().includes(searchText.toLowerCase()) ||
                  distributer.address?.toLowerCase().includes(searchText.toLowerCase()) ||
                  distributer._id?.toLowerCase().includes(searchText.toLowerCase())
                )
              })}
              rowKey="id"
              pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
            />
            <AddDistributerModal
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              onAdd={handleAddDistributer}
              selectedOutput={null}
              isUpdate={false}
            />
            <AddDistributerModal
              visible={modalUpdateVisible}
              onCancel={() => setModalUpdateVisible(false)}
              onAdd={handleUpdateDistributer}
              selectedOutput={selectedDistributer}
              isUpdate={true}
            />
          </div>
        </Spin>
      )}
      {isLoading && <Loading />}
    </>
  )
}

export default ManageDistributerPage
