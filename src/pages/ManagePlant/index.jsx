import React from 'react'
import { useState } from 'react'
import { Row, Col, Input, Button, Popconfirm, notification, List, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { Card } from 'antd'
import PLANT from '../../services/plantService'
import useManagePlant from './useManagePlant'
import SEED from '../../services/seedService'
import PLANT_FARMING from '../../services/plantFarmingService'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AddPlantModal from '../../components/ManagePlant/AddPlant'

const { Meta } = Card
const ManagePlant = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [selectedSeed, setSelectedSeed] = useState(null)
  const [openSeed, setOpenSeed] = useState(false)
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openPlantFarming, setOpenPlantFarming] = useState(false)

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const { plantData, isSuccess, isLoading, refetch } = useManagePlant()
  const onCreate = async (values) => {
    try {
      const res = await PLANT.addPlantByRecommendPlantId(selectedPlant.id)
      if (res.response && res.response?.data?.message === 'Plant already exists') {
        openNotificationWithIcon('error', 'Thông báo', 'Cây đã tồn tại')
      } else {
        const resSeed = await SEED.addSeedByRecommendSeedId({
          recommendSeedId: selectedSeed.id
        })
        if (resSeed.response && resSeed.response?.data?.message === 'Seed already exists') {
          openNotificationWithIcon('error', 'Thông báo', 'Hạt giống đã tồn tại')
        } else {
          const res = await PLANT_FARMING.addPlantFarmingWithRecommendPlantIdAndSeedId({
            plantId: selectedPlant.id,
            seedId: selectedSeed.id,
            data: {
              isPlantFarmingDefault: true,
              ...values
            }
          })
          if (res.status === 200) {
            refetch()
            openNotificationWithIcon('success', 'Thông báo', 'Thêm thành công')
          } else {
            openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
          }
          setOpen(false)
          setOpenSeed(false)
          setOpenPlantFarming(false)
        }
      }
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
    }
  }

  const handleAddPlant = async (values) => {
    console.log('values', values)
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
        openNotificationWithIcon('success', 'Thông báo', 'Thêm thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
      }
    } catch (error) {
      console.log('error: ', error)
      openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
    }
    setOpen(false)
  }

  const handleDelete = async (plantId) => {
    try {
      const res = await PLANT.deletePlant(plantId)
      if (res.status === 200) {
        refetch()
        openNotificationWithIcon('success', 'Thông báo', 'Xóa thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
      }
    } catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
    }
  }

  const handleConfirmUpdateActive = async (plantId, isActive) => {
    console.log('plantId', plantId)
    console.log('isActive', isActive)
    try {
      const res = await PLANT.updatePlant({
        plantId,
        data: {
          isActive: isActive ? false : true
        }
      })
      if (res.status === 200) {
        refetch()
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
    } catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
  }

  const handleUpdatePlant = async (values) => {
    console.log('values', values)
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
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
    } catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
    setOpenUpdate(false)
  }

  return (
    <>
      {contextHolder}
      {isLoading && <Loading />}
      {isSuccess && (
        <div>
          <h1>Danh sách các cây</h1>
          <Row>
            <Col span={8}>
              <Input
                placeholder="Tìm kiếm cây"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '30px' }}
              />
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
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
          <Row className="plant-grid">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={plantData}
              pagination={{
                onChange: (page) => {
                  console.log(page)
                },
                pageSize: 8
              }}
              renderItem={(plant) => (
                <List.Item key={plant._id}>
                  <Card
                    hoverable
                    cover={<img alt="plant" src={plant.image} />}
                    actions={[
                      <Tooltip title="Edit" key="edit">
                        <EditOutlined
                          onClick={() => {
                            setSelectedPlant(plant)
                            setOpenUpdate(true)
                          }}
                        />
                      </Tooltip>,
                      <Popconfirm
                        title={`Are you sure to ${plant.isActive ? 'deactivate' : 'activate'} this plant?`}
                        onConfirm={() => handleConfirmUpdateActive(plant._id, plant.isActive)}
                        okText="Yes"
                        cancelText="No"
                        key="update-isActive"
                      >
                        <span onClick={(e) => e.stopPropagation()}>
                          <Tooltip title={plant.isActive ? 'Deactivate' : 'Activate'}>
                            <EditOutlined />
                          </Tooltip>
                        </span>
                      </Popconfirm>,
                      <Popconfirm
                        title={`Are you sure to delete this plant?`}
                        onConfirm={() => handleDelete(plant._id)}
                        okText="Yes"
                        cancelText="No"
                        key="delete"
                      >
                        <span onClick={(e) => e.stopPropagation()}>
                          <DeleteOutlined />
                        </span>
                      </Popconfirm>
                    ]}
                  >
                    <Link to={`/plant/${plant._id}`}>
                      <Card.Meta title={plant.name} description={`Description: ${plant.description}`} />
                      <p>Type: {plant.type}</p>
                      <p>Status: {plant.isActive ? 'Active' : 'Inactive'}</p>
                    </Link>
                  </Card>
                </List.Item>
              )}
            />
          </Row>
        </div>
      )}
    </>
  )
}

export default ManagePlant
