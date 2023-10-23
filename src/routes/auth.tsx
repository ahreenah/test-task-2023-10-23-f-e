import {NavLink, Outlet} from "react-router-dom"

const Auth = () => {
  return (
    <>
      <div className='auth-form'>
        <div className='links'>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </div>
        <Outlet />
      </div>
    </>
  )
}
export default Auth

