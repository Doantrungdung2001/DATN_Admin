import React from 'react'
import { useState } from 'react'
import { Row, Col, Input, Button, Popconfirm, notification, List, Tooltip, Typography, Radio, Spin, Select } from 'antd'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { Card } from 'antd'
import PLANT from '../../services/plantService'
import useManagePlant from './useManagePlant'
import { DeleteOutlined, EditOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons'
import AddPlantModal from '../../components/ManagePlant/AddPlant'
import Search from 'antd/es/input/Search'

const { Paragraph } = Typography

const ManagePlant = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedPlantType, setSelectedPlantType] = useState('all')
  const [loading, setLoading] = useState(false)

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const { plantData, isSuccess, isLoading, refetch } = useManagePlant()

  console.log('Toan bo du lieu cay:', plantData)

  const handleAddPlant = async (values) => {
    setLoading(true)
    try {
      const data = {
        plant_name: values.name,
        plant_description: values.description,
        plant_thumb: values.thumb[0].response.metadata.thumb_url,
        plant_type: values.type,
        isActive: false
      }
      const res = await PLANT.addPlant(data)

      if (res.status === 200) {
        refetch()
        setLoading(false)
        openNotificationWithIcon('success', 'Thông báo', 'Thêm thành công')
      } else {
        setLoading(false)
        openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
      }
    } catch (error) {
      setLoading(false)
      console.log('error: ', error)
      openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
    }
    setOpen(false)
  }

  const handleDelete = async (plantId) => {
    setLoading(true)
    try {
      const res = await PLANT.deletePlant(plantId)

      if (res.status === 200) {
        refetch()
        setLoading(false)
        openNotificationWithIcon('success', 'Thông báo', 'Xóa thành công')
      } else {
        setLoading(false)
        openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
    }
  }

  const handleConfirmUpdateActive = async (plantId, isActive) => {
    setLoading(true)
    try {
      const res = await PLANT.updatePlant({
        plantId,
        data: {
          isActive: isActive ? false : true
        }
      })
      if (res.status === 200) {
        refetch()
        setLoading(false)
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        setLoading(false)
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
  }

  const handleUpdatePlant = async (values) => {
    setLoading(true)
    try {
      const data = {
        plant_name: values.name,
        plant_description: values.description,
        plant_thumb: values.thumb[0].url || values.thumb[0].response.metadata.thumb_url,
        plant_type: values.type
      }
      const res = await PLANT.updatePlant({
        plantId: selectedPlant._id,
        data
      })
      if (res.status === 200) {
        refetch()
        setLoading(false)
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        setLoading(false)
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
    setOpenUpdate(false)
  }

  const renderPlantType = (type) => {
    switch (type) {
      case 'herb':
        return 'Rau gia vị'
      case 'leafy':
        return 'Rau ăn lá'
      case 'root':
        return 'Củ'
      case 'fruit':
        return 'Quả'
      default:
        return type
    }
  }

  const filterPlantsByType = (type) => {
    if (type === 'all') {
      return plantData
    } else {
      return plantData.filter((plant) => plant.type === type)
    }
  }

  return (
    <>
      {contextHolder}
      {isLoading && <Loading />}
      {isSuccess && (
        <Spin spinning={loading}>
          <div>
            <h1>Danh sách các cây</h1>
            <Row>
              <Col span={8} style={{ marginRight: '2rem' }}>
                <Search
                  placeholder="Tìm kiếm cây theo tên"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  enterButton
                  style={{ marginBottom: '30px' }}
                />
              </Col>
              <Col span={2} style={{ marginRight: '2rem' }}>
                <Select
                  labelInValue
                  defaultValue={{
                    value: 'all',
                    label: 'Tất cả'
                  }}
                  style={{
                    width: 120
                  }}
                  onChange={(e) => {
                    setSelectedPlantType(e.value)
                  }}
                  options={[
                    {
                      value: 'all',
                      label: 'Tất cả'
                    },
                    {
                      value: 'leafy',
                      label: 'Rau ăn lá'
                    },
                    {
                      value: 'herb',
                      label: 'Rau gia vị'
                    },
                    {
                      value: 'root',
                      label: 'Củ'
                    },
                    {
                      value: 'fruit',
                      label: 'Quả'
                    }
                  ]}
                />
              </Col>
              <Col span={2}>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    Thêm cây mới
                  </Button>
                  <AddPlantModal
                    visible={open}
                    onCreate={handleAddPlant}
                    onCancel={() => {
                      setOpen(false)
                    }}
                    isUpdate={false}
                  />
                  <AddPlantModal
                    visible={openUpdate}
                    onCreate={handleUpdatePlant}
                    onCancel={() => {
                      setOpenUpdate(false)
                    }}
                    isUpdate={true}
                    plant={selectedPlant}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
                dataSource={filterPlantsByType(selectedPlantType).filter((plant) =>
                  plant.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
                )}
                pagination={{
                  onChange: (page) => {
                    console.log(page)
                  },
                  pageSize: 8
                }}
                style={{ width: '100%' }}
                renderItem={(plant) => (
                  <List.Item key={plant._id}>
                    <Card
                      hoverable
                      cover={<img alt={plant.name} src={plant.image} />}
                      actions={[
                        <Tooltip title="Chỉnh sửa" key="edit">
                          <EditOutlined
                            onClick={() => {
                              setSelectedPlant(plant)
                              setOpenUpdate(true)
                            }}
                          />
                        </Tooltip>,
                        <Popconfirm
                          title={`Bạn muốn ${plant.isActive ? 'không công bố' : 'công bố'} cây này`}
                          onConfirm={() => handleConfirmUpdateActive(plant._id, plant.isActive)}
                          okText="Có"
                          cancelText="Không"
                          key="update-isActive"
                        >
                          <span onClick={(e) => e.stopPropagation()}>
                            <Tooltip title={plant.isActive ? 'Cập nhật thành không công bố' : 'Cập nhật thành công bố'}>
                              {plant.isActive ? <FallOutlined /> : <RiseOutlined />}
                            </Tooltip>
                          </span>
                        </Popconfirm>,
                        <Popconfirm
                          title={`Bạn muốn xóa cây ${plant.name}?`}
                          onConfirm={() => handleDelete(plant._id)}
                          okText="Có"
                          cancelText="Không"
                          key="delete"
                        >
                          <span onClick={(e) => e.stopPropagation()}>
                            <DeleteOutlined />
                          </span>
                        </Popconfirm>
                      ]}
                    >
                      <Link to={`/plant/${plant._id}`}>
                        <Card.Meta
                          title={plant.name}
                          description={
                            <Paragraph
                              ellipsis={{
                                rows: 3,
                                expandable: true,
                                symbol: 'đọc thêm',
                                tooltip: true,
                                onExpand: function (event) {
                                  console.log('onExpand', event)
                                  event.stopPropagation()
                                  event.preventDefault()
                                }
                              }}
                            >
                              {plant.description}
                            </Paragraph>
                          }
                        />
                        <p>{renderPlantType(plant.type)}</p>
                        <p>Trạng thái: {plant.isActive ? 'Đã công bố' : 'Chưa công bố'}</p>
                      </Link>
                    </Card>
                  </List.Item>
                )}
              />
            </Row>
          </div>
        </Spin>
      )}
    </>
  )
}

export default ManagePlant
