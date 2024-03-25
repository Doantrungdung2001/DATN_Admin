import React, { useState } from 'react'
import { Button, Space, Table, Input, Modal, Form, Popconfirm, Spin, Tooltip, notification } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons'
import useManageFarms from './useManageFarms'
import { formatDateTime, formatTextTable, titleCase } from '../../utils/helpers'
import FARM from '../../services/farmService'

const { Search } = Input

const AddFarmModal = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm()
  form.setFieldsValue({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  return (
    <Modal
      open={visible}
      title="Thêm farm mới"
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
            onAdd(values)
            form.resetFields()
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập Email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng nhập lại Mật khẩu' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Mật khẩu không khớp')
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const UpdateWalletAddressModal = ({ visible, onCancel, onUpdate, farm }) => {
  const [form] = Form.useForm()
  form.setFieldsValue({
    walletAddress: farm?.walletAddress
  })
  return (
    <Modal
      open={visible}
      title="Cập nhật Địa chỉ ví"
      okText="Cập nhật"
      cancelText="Hủy"
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onUpdate(values)
            form.resetFields()
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          walletAddress: farm?.walletAddress
        }}
      >
        <Form.Item name="walletAddress" label="Địa chỉ ví">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ManageFarmPage = () => {
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const { allFarms, allDistricts, isSuccess, isLoading, refetch } = useManageFarms()
  console.log('All districts:', allDistricts)

  const handleSearch = (value) => {
    setSearchText(value)
    // Gọi API hoặc xử lý tìm kiếm ở đây
    console.log('Searching for:', value)
  }

  const handleAddFarm = async (values) => {
    setLoading(true)
    try {
      const res = await FARM.register({
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          role: 'FARM'
        }
      })

      setLoading(false)
      if (res.status === 201) {
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

  const handleUpdateStatus = async ({ farmId, currentStatus }) => {
    setLoading(true)
    try {
      const res = await FARM.updateStatusFarm({
        farmId,
        data: {
          status: currentStatus === 'active' ? 'inactive' : 'active'
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
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      setLoading(false)
      console.log(error)
    }
  }

  const handleUpdateWalletAddress = async ({ farmId, walletAddress }) => {
    setLoading(true)
    try {
      const res = await FARM.updateWalletAddress({
        farmId,
        data: {
          walletAddress
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
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      setLoading(false)
      console.log(error)
    }
  }

  const handleDeleteFarm = async ({ farmId }) => {
    console.log('Farm ID:', farmId)
    // Gọi API hoặc xử lý xóa ở đây
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id - b._id,
      render: (text) =>
        formatTextTable({
          str: text,
          a: 8,
          b: 5
        })
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
      title: 'Tỉnh',
      dataIndex: 'district',
      key: 'district',
      filters: allDistricts,
      onFilter: (value, record) => record.district === value,
      render: (text, record) => titleCase(record.district)
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
            onConfirm={() => handleUpdateStatus({ farmId: record._id, currentStatus: record.status })}
            okText="Có"
            cancelText="Không"
            key="update-status"
          >
            <span onClick={(e) => e.stopPropagation()}>
              <Tooltip title="Cập nhật trạng thái">
                {record.status === 'active' ? <FallOutlined /> : <RiseOutlined />}
              </Tooltip>
            </span>
          </Popconfirm>

          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDeleteFarm({ farmId: record._id })}
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
            title="Chỉnh sửa Địa chỉ ví"
            onClick={() => {
              setSelectedFarm(record)
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
        <div>
          <h1>Danh sách các trang trại</h1>
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="Tìm kiếm theo ID, Địa chỉ ví, Tên, Email, Địa chỉ"
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
            dataSource={allFarms?.filter(
              (farm) =>
                farm.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
                farm.email?.toLowerCase().includes(searchText?.toLowerCase()) ||
                farm._id?.toLowerCase().includes(searchText?.toLowerCase()) ||
                farm.address?.toLowerCase().includes(searchText?.toLowerCase()) ||
                farm.walletAddress?.toLowerCase().includes(searchText?.toLowerCase())
            )} // Added closing parenthesis here
            rowKey="id"
            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
            loading={loading}
          />

          <AddFarmModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onAdd={(values) => {
              console.log('Added farm:', values)
              handleAddFarm(values)
              setModalVisible(false)
            }}
          />
          <UpdateWalletAddressModal
            visible={modalUpdateVisible}
            onCancel={() => setModalUpdateVisible(false)}
            onUpdate={(values) => {
              console.log('Updated Địa chỉ ví:', values)
              handleUpdateWalletAddress({ farmId: selectedFarm._id, walletAddress: values.walletAddress || '' })
              setModalUpdateVisible(false)
            }}
            farm={selectedFarm}
          />
        </div>
      )}
      {isLoading && <Spin size="large" />}
    </>
  )
}

export default ManageFarmPage
