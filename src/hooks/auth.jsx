import React, { useEffect, useState } from 'react'
import FARM from '../services/farmService'
import { Navigate } from 'react-router-dom'

const Auth = (props) => {
  const [handle, setHandle] = useState(false)

  useEffect(() => {
    ;(async () => {
      let result = await FARM.me()
      console.log('result: ', result)
      if (result.data.metadata._id && result.data.metadata.roles.includes('ADMIN')) {
        localStorage.setItem('id', result.data.metadata._id)
        setHandle(true)
      }
    })()
  }, [])

  if (handle === false) {
    return <> </>
  }
  return <>{handle === true ? props.children : <Navigate to={props.path} />}</>
}
export default Auth
