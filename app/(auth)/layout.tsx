import React from 'react'

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='h-full justify-center flex items-center'>{children}</div>
  )
}

export default AuthLayout