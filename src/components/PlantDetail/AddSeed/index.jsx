import { Modal, Form, Input, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import token from '../../../utils/token'
import { baseUrl } from '../../../services/http/baseUrl'
const { getAccessToken, getRefreshToken } = token

const AddSeedModal = ({ visible, onCreate, onCancel, isUpdate, seed }) => {
  const [form] = Form.useForm()
  isUpdate
    ? form.setFieldsValue({
        _id: seed?._id,
        name: seed?.name,
        description: seed?.description,
        thumb: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: seed?.image
          }
        ]
      })
    : form.setFieldsValue({})
  const onFinish = (values) => {
    // Gửi giá trị của form (values) đến hàm onCreate để thêm hạt giống
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
      title={isUpdate ? 'Cập nhật hạt giống' : 'Thêm hạt giống'}
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
            onCancel()
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={
          isUpdate
            ? {
                _id: seed?._id,
                name: seed?.name,
                description: seed?.description,
                thumb: [
                  {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: seed?.image
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
          extra="Chọn ảnh hạt giống"
        >
          <Upload {...uploadProps} maxCount={1} onChange={handleUploadChange}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên hạt giống"
          rules={[{ required: true, message: 'Vui lòng nhập tên hạt giống!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
          <Input.TextArea placeholder="Mô tả" style={{ width: '100%' }} autoSize={{ minRows: 5 }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddSeedModal
