import React, { useState } from 'react'
import {
  Button,
  Space,
  Table,
  Input,
  Modal,
  Form,
  Popconfirm,
  Spin,
  notification,
  Tooltip,
  Select,
  InputNumber
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useManageTransfer from './useManageTransfer'
import { formatDateTime } from '../../utils/helpers'
import TRANSFER from '../../services/transferService'

const { Search } = Input

const AddTransferModal = ({ visible, onCancel, onAdd, selectedOutput, isUpdate, allFarms }) => {
  const [form] = Form.useForm()
  form.setFieldsValue({
    farm: selectedOutput?.farm._id || '',
    tx: selectedOutput?.tx || '',
    address: selectedOutput?.address || '',
    amount: selectedOutput?.amount || ''
  })

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      open={visible}
      title="Thêm transfer mới"
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
                transferId: selectedOutput._id,
                farm: values?.farm,
                tx: values?.tx,
                amount: values?.amount
              }
            } else {
              data = {
                farm: values?.farm,
                tx: values?.tx,
                amount: values?.amount
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
        <Form.Item name="farm" label="Farm" rules={[{ required: true, message: 'Vui lòng chọn Farm' }]}>
          <Select placeholder="Chọn Farm" showSearch filterOption={filterOption}>
            {allFarms.map((farm) => (
              <Select.Option key={farm._id} value={farm._id}>
                {farm.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tx"
          label="Tx"
          rules={[
            { required: true, message: 'Vui lòng nhập Tx' },
            {
              type: 'tx',
              message: 'Please enter a valid tx address!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Vui lòng nhập Amount' }]}>
          <InputNumber min={0} placeholder="Nhập Amount" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ManageTransferPage = () => {
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const { allTransfers, isSuccess, isLoading, refetch, allFarms, isSuccessFarm, isLoadingFarm } = useManageTransfer()

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleAddTransfer = async (values) => {
    setLoading(true)
    console.log('Add transfer:', values)
    try {
      const res = await TRANSFER.addTransfer({
        data: {
          farm: values.farm,
          tx: values.tx,
          amount: values.amount
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

  const handleDeleteTransfer = async ({ transferId }) => {
    // Xử lý xóa transfer ở đây
    setLoading(true)
    try {
      const res = await TRANSFER.deleteTransfer({
        transferId
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

  const handleUpdateTransfer = async (values) => {
    // Xử lý cập nhật transfer ở đây
    setLoading(true)
    const { transferId, farm, tx, amount } = values
    console.log('Update transfer:', transferId, farm, tx, amount)
    try {
      const res = await TRANSFER.updateTransfer({
        transferId,
        data: {
          farm,
          tx,
          amount
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
      key: '_id'
    },
    {
      title: 'Farm',
      dataIndex: 'farm',
      key: 'farm',
      render: (text, record) => record.farm?.name
    },
    {
      title: 'Tx',
      dataIndex: 'tx',
      key: 'tx'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (text, record) => formatDateTime(record.createdAt)
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDeleteTransfer({ transferId: record._id })}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>
          <Tooltip
            title="Edit"
            onClick={() => {
              setSelectedTransfer(record)
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
      {isSuccess && isSuccessFarm && (
        <div>
          <h1>Danh sách các </h1>
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="Tìm kiếm theo ID, Tên farm, Tx"
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
            dataSource={allTransfers.filter((transfer) => {
              return (
                transfer.farm?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                transfer.tx?.toLowerCase().includes(searchText.toLowerCase()) ||
                transfer._id?.toLowerCase().includes(searchText.toLowerCase())
              )
            })}
            rowKey="id"
            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
            loading={loading}
          />
          <AddTransferModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onAdd={handleAddTransfer}
            selectedOutput={null}
            isUpdate={false}
            allFarms={allFarms}
          />
          <AddTransferModal
            visible={modalUpdateVisible}
            onCancel={() => setModalUpdateVisible(false)}
            onAdd={handleUpdateTransfer}
            selectedOutput={selectedTransfer}
            isUpdate={true}
            allFarms={allFarms}
          />
        </div>
      )}
      {(isLoading || isLoadingFarm) && <Spin size="large" />}
    </>
  )
}

export default ManageTransferPage
