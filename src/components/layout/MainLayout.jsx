import React, { useEffect, useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Popconfirm, message, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FARM from '../../services/farmService'

const { Header, Content, Footer, Sider } = Layout
function getItem(label, key, icon, link) {
  return {
    key,
    icon,
    link,
    label
  }
}
const items = [
  getItem('Quản lý trang trại', '1', <DesktopOutlined />, '/manage-farms'),
  getItem('Quản lý nhà phân phối', '2', <TeamOutlined />, '/manage-distributers'),
  getItem('Quản lý người tiêu dùng', '3', <TeamOutlined />, '/manage-client'),
  getItem('Quản lý cây', '4', <TeamOutlined />, '/manage-plant'),
  getItem('Quản lý giao dịch', '5', <TeamOutlined />, '/manage-farm-transaction'),
  getItem('Quản lý cấp tiền', '6', <TeamOutlined />, '/manage-farm-transfer')
]
const App = () => {
  useEffect(() => {
    // Lấy path từ URL và chọn key tương ứng
    const path = window.location.pathname
    const selectedItem = items.find((item) => item.link === path)
    if (selectedItem) {
      setSelectedKey(selectedItem.key)
    }
  }, []) // Chạy một lần khi component mount

  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const [selectedKey, setSelectedKey] = useState(
    items.find((item) => item.link === window.location.pathname)
      ? items.find((item) => item.link === window.location.pathname).key
      : '1'
  )

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const handleLogout = async () => {
    try {
      const res = await FARM.logout()
      if (res.status === 200) {
        message.success('Đăng xuất thành công')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        navigate('/login')
      } else {
        message.error('Đăng xuất thất bại')
      }
    } catch (error) {
      message.error('Đăng xuất thất bại')
      console.log('error: ', error)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{ position: 'fixed', height: '100%', left: 0, zIndex: 1 }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" defaultSelectedKeys={[selectedKey]}>
          {items.map((item) => (
            <Menu.Item key={item.key} onClick={() => setSelectedKey(item.key)}>
              {item.icon}
              <span>{item.label}</span>
              <Link to={item.link} />
            </Menu.Item>
          ))}
          <Menu.Item
            style={{
              position: 'absolute',
              bottom: 50,
              zIndex: 1,
              transition: 'all 0.2s'
            }}
            key="8"
          >
            <Popconfirm title="Bạn có chắc chắn muốn đăng xuất?" onConfirm={handleLogout} okText="Yes" cancelText="No">
              <LogoutOutlined />
              <span>Đăng xuất</span>
            </Popconfirm>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content
          style={{
            margin: '0 16px',
            overflow: 'auto' // Thêm thuộc tính overflow: auto để hiển thị thanh cuộn khi nội dung dài hơn kích thước của content
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
