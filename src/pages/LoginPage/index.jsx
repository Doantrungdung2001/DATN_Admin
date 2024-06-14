import React from 'react'
import { Button, Form, Input, Spin, notification } from 'antd'
import FARM from '../../services/farmService'
import { Link, useNavigate } from 'react-router-dom'
import token from '../../utils/token'
import './style.css'
import farmerImage from '../../assets/images/farmer.jpg'
const { setAccessToken, setRefreshToken } = token

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 3.5
    })
  }

  const onFinish = (values) => {
    console.log('Success:', values)
    console.log(values.email, values.password)
    handle_login(values.email, values.password)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setLoading(false)
  }

  const handle_login = async (email, password) => {
    setLoading(true)
    try {
      const res = await FARM.login({
        email: email,
        password: password
      })
      console.log('res: ', res)
      const accessToken = res?.data?.metadata?.metadata?.tokens?.accessToken
      const refreshToken = res?.data?.metadata?.metadata?.tokens?.refreshToken
      if (accessToken) {
        setAccessToken(accessToken)
      }
      if (refreshToken) {
        setRefreshToken(refreshToken)
      }
      const id = res?.data?.metadata?.metadata?.farm?._id
      if (id) {
        localStorage.setItem('id', id)
      }
      console.log('Login success')
      setLoading(false)
      navigate('/manage-farms')
    } catch (error) {
      console.error(error?.response?.data?.message)
      const errorText = error?.response?.data?.message
      console.log('errorText: ', errorText)
      if (errorText == 'Farm not registered') {
        openNotificationWithIcon('error', 'Thông báo', 'Tài khoản chưa được đăng ký')
      }
      if (errorText == 'Authentication error') {
        openNotificationWithIcon('error', 'Thông báo', 'Sai mật khẩu')
      }
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div className="login-page">
        <Spin spinning={loading} size="large">
          <div className="login-box">
            <div className="illustration-wrapper">
              <img src={farmerImage} alt="Login" />
            </div>
            <div id="login-form">
              <Form name="login-form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <p className="form-title">Chào mừng quản trị viên đã trở lại</p>
                <p>Đăng nhập vào hệ thống</p>
                <Form.Item name="email" rules={[{ required: true, message: 'Hãy nhập email!' }]}>
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Spin>
      </div>
    </>
  )
}

export default LoginPage
