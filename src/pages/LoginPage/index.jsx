import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import FARM from '../../services/farmService'
import { Link, useNavigate } from 'react-router-dom'
import token from '../../utils/token'
const { setAccessToken, setRefreshToken } = token

const LoginPage = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values)
    console.log(values.email, values.password)
    handle_login(values.email, values.password)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handle_login = async (email, password) => {
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
      navigate('/home')
    } catch (error) {
      console.error(error?.response?.data?.message)
    }
  }

  const formWrapperStyle = {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  }

  return (
    <div style={formWrapperStyle}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log In
          </Button>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginPage
