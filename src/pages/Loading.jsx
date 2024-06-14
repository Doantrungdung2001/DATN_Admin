import React from 'react'
import { Spin } from 'antd'
const Loading = () => (
  <Spin spinning={true} tip="Đang tải dữ liệu" size="large" style={{ marginTop: '100px' }}>
    <div></div>
  </Spin>
)
export default Loading
