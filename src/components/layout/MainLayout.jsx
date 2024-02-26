import React, { useEffect, useState } from 'react'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
  getItem('Manage Plant', '2', <TeamOutlined />, '/manage-plant'),
  getItem('Log out', '3', <FileOutlined />)
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
  const [selectedKey, setSelectedKey] = useState('1')

  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} onClick={() => setSelectedKey(item.key)}>
              {item.icon}
              <span>{item.label}</span>
              <Link to={item.link} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 16px'
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
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
