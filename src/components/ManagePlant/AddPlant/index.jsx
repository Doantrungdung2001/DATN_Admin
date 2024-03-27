import { Modal, Form, Input, Upload, Button, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import token from '../../../utils/token'
import { baseUrl } from '../../../services/http/baseUrl'
const { getAccessToken, getRefreshToken } = token
const { Option } = Select

const AddPlantModal = ({ visible, onCreate, onCancel, isUpdate, plant }) => {
  const [form] = Form.useForm()
  isUpdate
    ? form.setFieldsValue({
        _id: plant?._id,
        name: plant?.name,
        description: plant?.description,
        type: plant?.type,
        thumb: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: plant?.image
          }
        ]
      })
    : form.setFieldsValue({})

  const onFinish = (values) => {
    // Gửi giá trị của form (values) đến hàm onCreate để thêm cây
    onCreate(values)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleUploadChange = (info) => {
    console.log('info', info)
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const uploadProps = {
    action: `${baseUrl}/upload/single`,
    method: 'post',
    accept: 'image/*',
    name: 'file',
    headers: {
      authorization: getAccessToken(),
      'x-rtoken-id': getRefreshToken()
    },
    listType: 'picture'
  }

  return (
    <Modal
      open={visible}
      title={isUpdate ? 'Cập nhật cây' : 'Thêm cây'}
      okText={isUpdate ? 'Cập nhật' : 'Thêm'}
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
            onFinish(values)
            form.resetFields()
            onCancel()
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={
          isUpdate
            ? {
                _id: plant?._id,
                name: plant?.name,
                description: plant?.description,
                type: plant?.type,
                thumb: [
                  {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: plant?.image
                  }
                ]
              }
            : {}
        }
      >
        <Form.Item
          name="thumb"
          label="Ảnh minh họa"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Chọn ảnh cây"
        >
          <Upload {...uploadProps} maxCount={1} onChange={handleUploadChange}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="Tên cây" rules={[{ required: true, message: 'Vui lòng nhập tên cây!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
          <Input.TextArea placeholder="Mô tả" style={{ width: '100%' }} autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item name="type" label="Loại cây" rules={[{ required: true, message: 'Vui lòng chọn loại cây!' }]}>
          <Select>
            <Option value="herb">Cây gia vị</Option>
            <Option value="leafy">Cây ăn lá</Option>
            <Option value="root">Củ</Option>
            <Option value="fruit">Quả</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddPlantModal
