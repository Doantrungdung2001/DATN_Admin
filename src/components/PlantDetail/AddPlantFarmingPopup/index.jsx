import React from 'react'
import { Modal, InputNumber, Input, Space, Form, Button, Row, Col, Select, Divider } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const AddPlantFarmingPopup = ({ open, onCreate, onCancel, recommendPlantFarming, isUpdate }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      title={isUpdate ? 'Cập nhật quy trình trồng' : 'Thêm quy trình trồng'}
      okText={isUpdate ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      width={1500}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((error) => {
            console.log('Validation failed:', error)
          })
      }}
    >
      <Form form={form} name="dynamic_form_complex" initialValues={recommendPlantFarming}>
        <Row gutter={[16, 16]}>
          <Col span={12} style={{ backgroundColor: '#f0f0f0', padding: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h1>Thông tin cơ bản</h1>
              <Form.Item name="timeCultivates">
                <h2>Thời gian cấy trồng</h2>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space
                    direction="vertical"
                    style={{ width: '100%', backgroundColor: '#dcdcdc', paddingLeft: '8px', borderRadius: '8px' }}
                  >
                    <Form.List name="timeCultivates">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <div key={'timeCultivates' + index}>
                              <div style={{ display: 'flex' }}>
                                <Space
                                  direction="vertical"
                                  style={{ width: '100%', marginRight: '16px', marginTop: '8px' }}
                                >
                                  <Form.Item {...field} name={[field.name, 'start']} label="Bắt đầu">
                                    <InputNumber min={0} placeholder="Bắt đầu" style={{ width: '100%' }} />
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'end']} label="Kết thúc">
                                    <InputNumber min={0} placeholder="Kết thúc" style={{ width: '100%' }} />
                                  </Form.Item>
                                </Space>
                                <CloseOutlined onClick={() => remove(field.name)} />
                              </div>
                              <Divider />
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>
                            + Thêm thông tin
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Space>
                </Space>
              </Form.Item>

              <Form.Item>
                <h2>Thời gian tốt nhất để trồng</h2>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Form.Item name={['bestTimeCultivate', 'start']} label="Bắt đầu">
                    <InputNumber min={0} placeholder="Bắt đầu" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name={['bestTimeCultivate', 'end']} label="Kết thúc">
                    <InputNumber min={0} placeholder="Kết thúc" style={{ width: '100%' }} />
                  </Form.Item>
                </Space>
              </Form.Item>

              <h2>Thời gian trồng và thu hoạch</h2>
              <Form.Item label="Thời gian trồng" name="farmingTime">
                <InputNumber min={0} placeholder="Thời gian trồng" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Thời gian thu hoạch" name="harvestTime">
                <InputNumber min={0} placeholder="Thời gian thu hoạch" style={{ width: '100%' }} />
              </Form.Item>
            </Space>
          </Col>

          <Col span={12} style={{ backgroundColor: '#dcdcdc', padding: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h1>Hoạt động làm đất và gieo trồng</h1>
              <Form.Item name="cultivationActivities">
                <h2>Hoạt động làm đất</h2>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space
                    direction="vertical"
                    style={{ width: '100%', backgroundColor: '#f0f0f0', paddingLeft: '8px', borderRadius: '8px' }}
                  >
                    <Form.List name="cultivationActivities">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <div key={'cultivationActivities' + index}>
                              <div style={{ display: 'flex' }}>
                                <Space
                                  direction="vertical"
                                  style={{ width: '100%', marginRight: '16px', marginTop: '8px' }}
                                >
                                  <Form.Item {...field} name={[field.name, 'name']} label="Tên">
                                    <Input placeholder="Tên" style={{ width: '100%' }} />
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'description']} label="Mô tả">
                                    <Input.TextArea
                                      placeholder="Mô tả"
                                      style={{ width: '100%' }}
                                      autoSize={{ minRows: 5 }}
                                    />
                                  </Form.Item>
                                </Space>
                                <CloseOutlined onClick={() => remove(field.name)} />
                              </div>
                              <Divider />
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>
                            + Thêm thông tin
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Space>
                </Space>
              </Form.Item>

              <Form.Item name="plantingActivity">
                <h2>Hoạt động gieo trồng</h2>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Form.Item name={['plantingActivity', 'density']} label="Mật độ">
                    <Input placeholder="Mật độ" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name={['plantingActivity', 'description']} label="Mô tả">
                    <Input.TextArea placeholder="Mô tả" style={{ width: '100%' }} autoSize={{ minRows: 5 }} />
                  </Form.Item>
                </Space>
              </Form.Item>
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12} style={{ backgroundColor: '#dcdcdc', padding: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h1>Hoạt động bón phân</h1>
              <Form.Item name="fertilizationActivities">
                <h2>Danh sách các hoạt động bón phân</h2>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space
                    direction="vertical"
                    style={{ width: '100%', backgroundColor: '#f0f0f0', paddingLeft: '8px', borderRadius: '8px' }}
                  >
                    <Form.List name="fertilizationActivities">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <div key={'fertilizationActivities' + index}>
                              <div style={{ display: 'flex' }}>
                                <Space
                                  direction="vertical"
                                  style={{ width: '100%', marginRight: '16px', marginTop: '8px' }}
                                >
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'fertilizationTime']}
                                    label="Thời gian phân bón"
                                  >
                                    <Input placeholder="Thời gian phân bón" style={{ width: '100%' }} />
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'type']} label="Loại">
                                    <Select style={{ width: '100%' }} placeholder="Chọn loại">
                                      <Select.Option value="baseFertilizer">Bón lót</Select.Option>
                                      <Select.Option value="topFertilizer">Bón thúc</Select.Option>
                                    </Select>
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'description']} label="Mô tả">
                                    <Input.TextArea
                                      placeholder="Mô tả"
                                      style={{ width: '100%' }}
                                      autoSize={{ minRows: 5 }}
                                    />
                                  </Form.Item>
                                </Space>
                                <CloseOutlined onClick={() => remove(field.name)} />
                              </div>
                              <Divider />
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>
                            + Thêm thông tin
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Space>
                </Space>
              </Form.Item>
            </Space>
          </Col>

          <Col span={12} style={{ backgroundColor: '#f0f0f0', padding: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h1>Hoạt động kiểm soát sâu bệnh</h1>
              <Form.Item name="pestAndDiseaseControlActivities">
                <h2>Danh sách các hoạt động kiểm soát, phòng ngừa</h2>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space
                    direction="vertical"
                    style={{ width: '100%', backgroundColor: '#dcdcdc', paddingLeft: '8px', borderRadius: '8px' }}
                  >
                    <Form.List name="pestAndDiseaseControlActivities">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <div key={'pestAndDiseaseControlActivities' + index}>
                              <div style={{ display: 'flex' }}>
                                <Space
                                  direction="vertical"
                                  style={{ width: '100%', marginRight: '16px', marginTop: '8px' }}
                                >
                                  <Form.Item {...field} name={[field.name, 'name']} label="Tên">
                                    <Input placeholder="Tên" style={{ width: '100%' }} />
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'type']} label="Loại">
                                    <Select style={{ width: '100%' }} placeholder="Chọn loại">
                                      <Select.Option value="pest">Sâu</Select.Option>
                                      <Select.Option value="disease">Bệnh</Select.Option>
                                    </Select>
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'symptoms']} label="Triệu chứng">
                                    <Input placeholder="Triệu chứng" style={{ width: '100%' }} />
                                  </Form.Item>
                                  <Form.Item {...field} name={[field.name, 'description']} label="Mô tả">
                                    <Input.TextArea
                                      placeholder="Mô tả"
                                      style={{ width: '100%' }}
                                      autoSize={{ minRows: 5 }}
                                    />
                                  </Form.Item>
                                  <Form.Item label="Giải pháp">
                                    <Form.List name={[field.name, 'solution']}>
                                      {(subFields, { add: addSolution, remove: removeSolution }) => (
                                        <>
                                          {subFields.map((subField, index) => (
                                            <div key={'solution' + index} style={{ display: 'flex' }}>
                                              <Form.Item {...subField} name={[subField.name]} noStyle>
                                                <Input.TextArea
                                                  placeholder="Giải pháp"
                                                  style={{ width: '100%' }}
                                                  autoSize={{ minRows: 5 }}
                                                />
                                              </Form.Item>
                                              <CloseOutlined onClick={() => removeSolution(subField.name)} />
                                            </div>
                                          ))}
                                          <Button type="dashed" onClick={() => addSolution()} block>
                                            + Thêm giải pháp
                                          </Button>
                                        </>
                                      )}
                                    </Form.List>
                                  </Form.Item>
                                </Space>
                                <CloseOutlined onClick={() => remove(field.name)} />
                              </div>
                              <Divider />
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>
                            + Thêm thông tin
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Space>
                </Space>
              </Form.Item>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddPlantFarmingPopup
