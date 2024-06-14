import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const Notfound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Trang này không tồn tại."
    extra={
      <div>
        <Button type="primary">
          {' '}
          <Link to="/home">Quay về trang chủ</Link>
        </Button>
      </div>
    }
  />
)

export default Notfound
