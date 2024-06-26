import React, { useState } from 'react'
import { Collapse, Button, Divider, Popconfirm, Tooltip, notification, Select, List, Table, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import Loading from '../Loading'
import usePlantDetail from './usePlantDetail'
import PLANT_FARMING from '../../services/plantFarmingService'
import SEED from '../../services/seedService'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AddSeedModal from '../../components/PlantDetail/AddSeed'
import AddPlantFarmingPopup from '../../components/PlantDetail/AddPlantFarmingPopup'
const { Option } = Select

const { Panel } = Collapse
const { Paragraph } = Typography
const PlantDetail = () => {
  const plantId = useParams().id

  const [openUpdatePlantFarming, setOpenUpdatePlantFarming] = useState(false)
  const [selectedPlantFarmming, setSelectedPlantFarmming] = useState(null)
  const [selectedSeed, setSelectedSeed] = useState(null)
  const [openUpdateSeed, setOpenUpdateSeed] = useState(false)
  const [openSeed, setOpenSeed] = useState(false)
  const [openPlantFarming, setOpenPlantFarming] = useState(false)
  const [isDefaultPlantFarming, setIsDefaultPlantFarming] = useState(false)
  const [loading, setLoading] = useState(false)

  const { plans, isSuccessPlans, refetchPlans, currentPlant, isSuccessCurrentPlant } = usePlantDetail({
    plantId,
    seedId: selectedSeed?.id,
    isDefaultPlantFarming
  })

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const onCreate = async (values) => {
    setLoading(true)
    try {
      const data = {
        plantId: plantId,
        seed_name: selectedSeed.seed_name,
        seed_description: selectedSeed.seed_description,
        seed_thumb: selectedSeed.seed_thumb
      }
      const resSeed = await SEED.addSeed(data)
      if (resSeed.response && resSeed.response?.data?.message === 'Seed already exists') {
        openNotificationWithIcon('error', 'Thông báo', 'Hạt giống đã tồn tại')
        setIsDefaultPlantFarming(false)
        setOpenSeed(false)
        setOpenPlantFarming(false)
        return
      }
      if (resSeed.status !== 200) {
        openNotificationWithIcon('error', 'Thông báo', 'Thêm Seed thất bại')
        setIsDefaultPlantFarming(false)
        setOpenSeed(false)
        setOpenPlantFarming(false)
        return
      }
      const res = await PLANT_FARMING.addPlantFarmingWithPlantIdAndSeedName({
        plantId,
        seedName: selectedSeed.seed_name,
        data: {
          isPlantFarmingDefault: true,
          ...values
        }
      })
      if (res.status === 200) {
        refetchPlans()
        openNotificationWithIcon('success', 'Thông báo', 'Thêm thành công')
      } else {
        refetchPlans()
        openNotificationWithIcon('error', 'Thông báo', 'Thêm plant farming thất bại')
      }
      setIsDefaultPlantFarming(false)
      setOpenSeed(false)
      setOpenPlantFarming(false)
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Thông báo', 'Thêm thất bại')
      setIsDefaultPlantFarming(false)
      setOpenSeed(false)
      setOpenPlantFarming(false)
    }
    setLoading(false)
  }

  const handleAddSeed = (values) => {
    setSelectedSeed({
      seed_name: values.name,
      seed_description: values.description,
      seed_thumb: values.thumb[0].url || values.thumb[0].response.metadata.thumb_url
    })
    setOpenSeed(false)
    setOpenPlantFarming(true)
  }

  const handleUpdatePlantFarming = async (values) => {
    setLoading(true)
    try {
      const res = await PLANT_FARMING.updatePlantFarming({
        plantFarmingId: selectedPlantFarmming._id,
        data: values
      })
      if (res.status === 200) {
        refetchPlans()
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
      setOpenUpdatePlantFarming(false)
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
    setLoading(false)
  }

  const handleDeleteConfirm = async (item) => {
    setLoading(true)
    try {
      const res = await PLANT_FARMING.deletePlantFarming(item._id)
      if (res.status === 200) {
        const resSeed = await SEED.deleteSeed(item.seedId)
        if (resSeed.status === 200) {
          refetchPlans()
          openNotificationWithIcon('success', 'Thông báo', 'Xóa thành công')
        } else {
          openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
        }
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
      }
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Thông báo', 'Xóa thất bại')
    }
    setLoading(false)
  }

  const handleUpdateDefaultSeed = async (seedId) => {
    setLoading(true)
    try {
      const res = await SEED.updateSeedDefault(seedId)
      if (res.status === 200) {
        refetchPlans()
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
    setLoading(false)
  }

  const handleUpdateSeed = async (values) => {
    setLoading(true)
    try {
      const res = await SEED.updateSeed({
        seedId: selectedSeed.seedId,
        data: {
          seed_name: values.name,
          seed_description: values.description,
          seed_thumb: values.thumb[0].url || values.thumb[0].response.metadata.thumb_url
        }
      })
      if (res.status === 200) {
        refetchPlans()
        openNotificationWithIcon('success', 'Thông báo', 'Cập nhật thành công')
      } else {
        openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
      }
      setOpenUpdateSeed(false)
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Thông báo', 'Cập nhật thất bại')
    }
    setLoading(false)
  }

  const cultivationActivitiesColumns = [
    {
      title: 'Tên hoạt động',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  const cultivationActivitiesDataSource = (cultivationActivities) =>
    cultivationActivities.map((cultivationActivity, index) => ({
      ...cultivationActivity,
      key: index
    }))

  const fertilizationActivitiesColumns = [
    {
      title: 'Thời gian',
      dataIndex: 'fertilizationTime',
      key: 'fertilizationTime',
      width: '35%'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: '8%',
      render: (type) => (type === 'baseFertilizer' ? 'Bón lót' : type === 'topFertilizer' ? 'Bón thúc' : type)
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  const fertilizationActivitiesDataSource = (fertilizationActivities) =>
    fertilizationActivities.map((fertilizationActivity, index) => ({
      ...fertilizationActivity,
      key: index
    }))

  const pestAndDiseaseControlActivitiesColumns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (type === 'pest' ? 'Sâu' : type === 'disease' ? 'Bệnh' : type)
    },
    {
      title: 'Triệu chứng',
      dataIndex: 'symptoms',
      key: 'symptoms'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Giải pháp',
      dataIndex: 'solution',
      key: 'solution',
      render: (solution) => (
        <ul>
          {solution.map((sol, index) => (
            <li key={index}>{sol}</li>
          ))}
        </ul>
      )
    }
  ]

  const pestAndDiseaseControlActivitiesDataSource = (pestAndDiseaseControlActivities) =>
    pestAndDiseaseControlActivities.map((activity, index) => ({
      ...activity,
      key: index
    }))

  return (
    <div>
      {contextHolder}
      {isSuccessPlans && isSuccessCurrentPlant ? (
        <>
          <h1>Thông tin cây trồng {currentPlant.name}</h1>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setOpenSeed(true)
              }}
            >
              Thêm hạt giống mới
            </Button>
          </div>

          <AddSeedModal
            visible={openSeed}
            onCreate={handleAddSeed}
            onCancel={() => {
              setOpenSeed(false)
            }}
            isUpdate={false}
          />
          <AddPlantFarmingPopup
            open={openPlantFarming}
            onCancel={() => setOpenPlantFarming(false)}
            onCreate={onCreate}
            recommendPlantFarming={null}
            isUpdate={false}
          />
          <AddSeedModal
            visible={openUpdateSeed}
            onCreate={handleUpdateSeed}
            onCancel={() => {
              setOpenUpdateSeed(false)
            }}
            isUpdate={true}
            seed={selectedSeed}
          />

          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page)
              },
              pageSize: 3
            }}
            dataSource={plans}
            renderItem={(item) => (
              <List.Item
                key={item.name}
                actions={[
                  <Popconfirm
                    title={
                      item.isSeedDefault
                        ? 'Bạn không thể xóa hạt giống mặc định, hãy đổi hạt giống mặc định trước'
                        : 'Xóa hạt giống kèm quy trình canh tác'
                    }
                    onConfirm={() => handleDeleteConfirm(item)}
                    okText="Có"
                    cancelText="Không"
                    disabled={item.isSeedDefault}
                  >
                    <Tooltip
                      title={
                        item.isSeedDefault
                          ? 'Bạn không thể xóa hạt giống mặc định, hãy đổi hạt giống mặc định trước'
                          : 'Xóa hạt giống kèm quy trình canh tác'
                      }
                    >
                      <span>
                        <DeleteOutlined style={{ fontSize: '18px', color: item.isSeedDefault ? 'gray' : 'red' }} />
                      </span>
                    </Tooltip>
                  </Popconfirm>,
                  <Tooltip title="Chỉnh sửa hạt giống">
                    <EditOutlined
                      onClick={() => {
                        setSelectedSeed(item)
                        setOpenUpdateSeed(true)
                      }}
                    />
                  </Tooltip>
                ]}
                extra={<img width={150} alt="logo" src={item.image} />}
                style={{ backgroundColor: '#f0f0f0', marginTop: '1rem', borderRadius: '15px' }}
              >
                <List.Item.Meta
                  title={
                    <span>
                      {item.name}
                      {item.isSeedDefault ? (
                        ' (Hạt giống mặc định)'
                      ) : (
                        <Popconfirm
                          title="Bạn có chắc chắn muốn đặt hạt giống này làm mặc định không?"
                          onConfirm={() => handleUpdateDefaultSeed(item.seedId)}
                        >
                          <span style={{ cursor: 'pointer' }}> | Đặt làm hạt giống mặc định </span>
                        </Popconfirm>
                      )}
                    </span>
                  }
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
                      {item.description}
                    </Paragraph>
                  }
                />
                <Collapse>
                  <Panel header="Quy trình chi tiết">
                    <Button
                      type="primary"
                      onClick={() => {
                        setSelectedPlantFarmming(item)
                        setOpenUpdatePlantFarming(true)
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    <AddPlantFarmingPopup
                      open={openUpdatePlantFarming}
                      onCreate={handleUpdatePlantFarming}
                      onCancel={() => {
                        setOpenUpdatePlantFarming(false)
                      }}
                      isUpdate={true}
                      recommendPlantFarming={selectedPlantFarmming}
                    />
                    <Divider />
                    <div>
                      {/* cultivationActivities: [{name, description}] */}
                      <h2> Hoạt động với đất </h2>
                      <Table
                        columns={cultivationActivitiesColumns}
                        dataSource={cultivationActivitiesDataSource(item.cultivationActivities)}
                        pagination={false}
                      />
                    </div>
                    <Divider />
                    <div>
                      {/*  plantingActivity: {density, description} */}
                      <h2> Hoạt động trong gieo trồng </h2>
                      <p>
                        <strong>Mật độ:</strong> {item.plantingActivity?.density}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {item.plantingActivity?.description}
                      </p>
                    </div>
                    <Divider />
                    <div>
                      {/* fertilizationActivities: [{ fertilizationTime, type, description }] */}
                      <h2> Hoạt động phân bón </h2>
                      <Table
                        columns={fertilizationActivitiesColumns}
                        dataSource={fertilizationActivitiesDataSource(item.fertilizationActivities)}
                      />
                    </div>
                    <Divider />
                    <div>
                      {/* pestAndDiseaseControlActivities: [{name, type, symptoms, description, solution: [string], note}] */}
                      <h2> Hoạt động phòng ngừa sâu, bệnh </h2>
                      <Table
                        columns={pestAndDiseaseControlActivitiesColumns}
                        dataSource={pestAndDiseaseControlActivitiesDataSource(item.pestAndDiseaseControlActivities)}
                      />
                    </div>
                    <Divider />
                  </Panel>
                </Collapse>
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  )
}

export default PlantDetail
