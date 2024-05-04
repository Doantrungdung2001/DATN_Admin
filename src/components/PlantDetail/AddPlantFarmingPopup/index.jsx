import React from 'react'
import { Modal, InputNumber, Input, Space, Form, Button, Select, Divider, Tabs, Spin } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const PesticideItem = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', margin: '8px', borderRadius: '8px', padding: '12px' }}>
      <h2 style={{ marginTop: '0' }}>Danh sách các hoạt động kiểm soát, phòng ngừa</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="vertical" style={{ width: '100%', backgroundColor: '#e9f0ea', borderRadius: '8px' }}>
          <Form.List name="pestAndDiseaseControlActivities">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={`pestAndDiseaseControlActivities_${index}`}>
                    <div style={{ display: 'flex' }}>
                      <Space direction="vertical" style={{ width: '100%', marginTop: '8px', padding: '8px' }}>
                        <CloseOutlined style={{ float: 'right' }} onClick={() => remove(field.name)} />
                        <Form.Item
                          fieldKey={[field.key, 'name']}
                          name={[field.name, 'name']}
                          label={<strong>Tên</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Tên" style={{ width: '50rem', float: 'right' }} />
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'type']}
                          name={[field.name, 'type']}
                          label={<strong>Loại</strong>}
                          style={{ width: '100%' }}
                        >
                          <Select style={{ width: '50rem', float: 'right' }} placeholder="Chọn loại">
                            <Select.Option value="pest">Sâu</Select.Option>
                            <Select.Option value="disease">Bệnh</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'symptoms']}
                          name={[field.name, 'symptoms']}
                          label={<strong>Triệu chứng</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input.TextArea
                            placeholder="Triệu chứng"
                            style={{ width: '50rem', float: 'right' }}
                            autoSize={{ minRows: 5 }}
                          />
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'description']}
                          name={[field.name, 'description']}
                          label={<strong>Mô tả</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input.TextArea
                            placeholder="Mô tả"
                            style={{ width: '50rem', float: 'right' }}
                            autoSize={{ minRows: 5 }}
                          />
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'solution']}
                          name={[field.name, 'solution']}
                          label={<strong>Giải pháp</strong>}
                          style={{ width: '100%' }}
                        >
                          <Form.List name={[field.name, 'solution']}>
                            {(subFields, { add: addSolution, remove: removeSolution }) => (
                              <div style={{ display: 'flex', flexDirection: 'column', float: 'rightss' }}>
                                {subFields.map((subField, index) => (
                                  <div
                                    key={`solution_${index}`}
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      float: 'right',
                                      alignItems: 'flex-end'
                                    }}
                                  >
                                    <CloseOutlined
                                      style={{ float: 'right' }}
                                      onClick={() => removeSolution(subField.name)}
                                    />
                                    <Form.Item fieldKey={[subField.key, 'solution']} name={[subField.name]} noStyle>
                                      <Input.TextArea
                                        placeholder="Giải pháp"
                                        style={{ width: '50rem', float: 'right' }}
                                        autoSize={{ minRows: 5 }}
                                      />
                                    </Form.Item>
                                  </div>
                                ))}
                                <Button
                                  style={{
                                    width: '100%',
                                    float: 'right',
                                    backgroundColor: '#92a697',
                                    color: '#ffffff',
                                    marginTop: '16px'
                                  }}
                                  type="dashed"
                                  onClick={() => addSolution()}
                                  block
                                >
                                  + Thêm giải pháp
                                </Button>
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Space>
                    </div>
                    <Divider />
                  </div>
                ))}
                <Button
                  style={{ backgroundColor: '#92a697', color: '#ffffff' }}
                  type="dashed"
                  onClick={() => add()}
                  block
                >
                  + Thêm thông tin
                </Button>
              </>
            )}
          </Form.List>
        </Space>
      </Space>
    </Space>
  )
}

const CultivationItem = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', margin: '8px', borderRadius: '8px', padding: '12px' }}>
      <h2 style={{ marginTop: '0' }}>Hoạt động làm đất</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="vertical" style={{ width: '100%', backgroundColor: '#e9f0ea', borderRadius: '8px' }}>
          <Form.List name="cultivationActivities">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={`cultivationActivities_${index}`}>
                    <div style={{ margin: '16px' }}>
                      <CloseOutlined style={{ float: 'right' }} onClick={() => remove(field.name)} />
                      <Space direction="vertical" style={{ width: '100%', marginTop: '8px', padding: '8px' }}>
                        <Form.Item
                          fieldKey={[field.key, 'name']}
                          name={[field.name, 'name']}
                          label={<strong>Tên</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Tên" style={{ width: '54rem', float: 'right' }} />
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'description']}
                          name={[field.name, 'description']}
                          label={<strong>Mô tả</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input.TextArea
                            placeholder="Mô tả"
                            style={{ width: '54rem', float: 'right' }}
                            autoSize={{ minRows: 5 }}
                          />
                        </Form.Item>
                      </Space>
                      <Divider />
                    </div>
                  </div>
                ))}
                <Button
                  style={{ backgroundColor: '#92a697', color: '#ffffff' }}
                  type="dashed"
                  onClick={() => add()}
                  block
                >
                  + Thêm thông tin
                </Button>
              </>
            )}
          </Form.List>
        </Space>
      </Space>
    </Space>
  )
}

const PlantingActivity = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', margin: '8px', borderRadius: '8px', padding: '12px' }}>
      <h2 style={{ marginTop: '10px' }}>Hoạt động gieo trồng</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="vertical" style={{ width: '100%', backgroundColor: '#e9f0ea', borderRadius: '8px' }}>
          <Form.Item name="plantingActivity" style={{ marginRight: '16px',  padding: '8px' }}>
            <Form.Item name={['plantingActivity', 'density']} label={<strong>Mật độ</strong>} style={{ width: '100%' }}>
              <Input placeholder="Mật độ" style={{ width: '54rem', float: 'right' }} />
            </Form.Item>
            <Form.Item
              name={['plantingActivity', 'description']}
              label={<strong>Mô tả</strong>}
              style={{ width: '100%' }}
            >
              <Input.TextArea
                placeholder="Mô tả"
                style={{ width: '54rem', float: 'right' }}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
          </Form.Item>
        </Space>
      </Space>
    </Space>
  )
}

const FertilizeItem = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', margin: '8px', borderRadius: '8px', padding: '12px' }}>
      <h2 style={{ marginTop: '0' }}>Danh sách các hoạt động bón phân</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="vertical" style={{ width: '100%', backgroundColor: '#e9f0ea', borderRadius: '8px' }}>
          <Form.List name="fertilizationActivities">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={`fertilizationActivities_${index}`}>
                    <div style={{ display: 'flex' }}>
                      <Space direction="vertical" style={{ width: '100%', marginTop: '8px', padding: '8px' }}>
                        <CloseOutlined style={{ float: 'right' }} onClick={() => remove(field.name)} />
                        <Form.Item
                          fieldKey={[field.key, 'fertilizationTime']}
                          name={[field.name, 'fertilizationTime']}
                          label={<strong>Thời gian phân bón</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder="Thời gian phân bón" style={{ width: '48rem', float: 'right' }} />
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'type']}
                          name={[field.name, 'type']}
                          label={<strong>Loại</strong>}
                          style={{ width: '100%' }}
                        >
                          <Select style={{ width: '48rem', float: 'right' }} placeholder="Chọn loại">
                            <Select.Option value="baseFertilizer">Bón lót</Select.Option>
                            <Select.Option value="topFertilizer">Bón thúc</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, 'description']}
                          name={[field.name, 'description']}
                          label={<strong>Mô tả</strong>}
                          style={{ width: '100%' }}
                        >
                          <Input.TextArea
                            placeholder="Mô tả"
                            style={{ width: '48rem', float: 'right' }}
                            autoSize={{ minRows: 5 }}
                          />
                        </Form.Item>
                      </Space>
                    </div>
                    <Divider />
                  </div>
                ))}
                <Button
                  style={{ backgroundColor: '#92a697', color: '#ffffff' }}
                  type="dashed"
                  onClick={() => add()}
                  block
                >
                  + Thêm thông tin
                </Button>
              </>
            )}
          </Form.List>
        </Space>
      </Space>
    </Space>
  )
}

const AddPlantFarmingPopup = ({ open, onCreate, onCancel, recommendPlantFarming, isUpdate }) => {
  const [form] = Form.useForm()
  isUpdate ? form.setFieldsValue(recommendPlantFarming) : form.setFieldsValue({})
  console.log('recommendPlantFarming', recommendPlantFarming, isUpdate)

  const [loading, setLoading] = React.useState(false)

  const items = [
    {
      key: '1',
      label: 'Hoạt động làm đất',
      children: <CultivationItem />,
      forceRender: true
    },
    {
      key: '2',
      label: 'Hoạt động gieo trồng',
      children: <PlantingActivity />,
      forceRender: true
    },
    {
      key: '3',
      label: 'Bón phân',
      children: <FertilizeItem />,
      forceRender: true
    },
    {
      key: '4',
      label: 'Kiểm soát sâu bệnh',
      children: <PesticideItem />,
      forceRender: true
    }
  ]

  return (
    <Modal
      open={open}
      title={isUpdate ? 'Cập nhật quy trình trồng' : 'Thêm quy trình trồng'}
      okText={isUpdate ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      width={1000}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log('values', values)
            form.setFieldsValue(values)
            setLoading(true)
            onCreate(values)
            setLoading(false)
          })
          .catch((error) => {
            console.log('Validation failed:', error)
          })
      }}
    >
      <Spin spinning={loading}>
        <Form form={form} name="dynamic_form_complex" initialValues={recommendPlantFarming}>
          <Tabs defaultActiveKey="1" items={items} />
        </Form>
      </Spin>
    </Modal>
  )
}

export default AddPlantFarmingPopup
