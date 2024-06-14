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
  InputNumber,
  DatePicker
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useManageTransfer from './useManageTransfer'
import { formatDateTime, formatTextTable, formatTransactionHashTable } from '../../utils/helpers'
import TRANSFER from '../../services/transferService'
import dayjs from 'dayjs'
import Loading from '../Loading'

const { Search } = Input

const AddTransferModal = ({ visible, onCancel, onAdd, selectedOutput, isUpdate, allFarms }) => {
  const [form] = Form.useForm()
  form.setFieldsValue({
    farm: selectedOutput?.farm._id || '',
    time: selectedOutput?.time ? dayjs(selectedOutput.time) : dayjs(new Date()),
    tx: selectedOutput?.tx || '',
    address: selectedOutput?.address || '',
    amount: selectedOutput?.amount || ''
  })

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      open={visible}
      title={isUpdate ? 'Cập nhật thông tin chuyển tiền' : 'Thêm mới thông tin chuyển tiền'}
      okText={isUpdate ? 'Cập nhật' : 'Thêm mới'}
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
                amount: values?.amount,
                time: values?.time
              }
            } else {
              data = {
                farm: values?.farm,
                tx: values?.tx,
                amount: values?.amount,
                time: values?.time
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
        <Form.Item
          name="time"
          label="Thời gian"
          rules={[
            {
              required: true,
              message: 'Thời gian không được để trống'
            }
          ]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="farm" label="Trang trại" rules={[{ required: true, message: 'Vui lòng chọn trang trại' }]}>
          <Select
            placeholder="Chọn trang trại"
            showSearch
            filterOption={filterOption}
            options={allFarms.map((farm) => ({ value: farm._id, label: farm.name }))}
          />
        </Form.Item>
        <Form.Item
          name="tx"
          label="Transaction hash"
          rules={[
            { required: true, message: 'Vui lòng nhập Transaction hash' },
            {
              type: 'tx',
              message: 'Please enter a valid Transaction hash!'
            }
          ]}
        >
          <Input placeholder="Nhập transaction hash" />
        </Form.Item>
        <Form.Item name="amount" label="Lượng" rules={[{ required: true, message: 'Vui lòng nhập Lượng' }]}>
          <InputNumber min={0} placeholder="Nhập Lượng" style={{ width: '100%' }} addonAfter="EVMOS" />
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
          amount: values.amount,
          time: values.time
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
    const { transferId, farm, tx, amount, time } = values
    console.log('Update transfer:', transferId, farm, tx, amount)
    try {
      const res = await TRANSFER.updateTransfer({
        transferId,
        data: {
          farm,
          tx,
          amount,
          time
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
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => new Date(a.time) - new Date(b.time),
      render: (text, record) => formatDateTime(record?.time)
    },
    {
      title: 'Tên trang trại',
      dataIndex: 'farm',
      key: 'farm',
      render: (text, record) => record.farm?.name
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
      title: 'Lượng (EVMOS)',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount
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
            title="Chỉnh sửa thông tin"
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
          <h1>Danh sách các lần cấp tiền </h1>
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="Tìm kiếm theo ID, Tên trang trại, transaction hash"
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
      {(isLoading || isLoadingFarm) && <Loading />}
    </>
  )
}

export default ManageTransferPage
