import React, {FormEvent, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Navigate} from 'react-router-dom'
import useUserStore from '../useUserStore';


const UserInfoComponent: React.FC = observer(() => {
  const userStore = useUserStore();
  const [userInfo, setUserInfo] = useState<any>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setUserInfo(await userStore.user)
      setIsLoading(false)
    })()
  }, [])
  const logout = () => {
    userStore.logout()
  }

  return (
    <div className="page-wrapper">
      {userStore.user ? (

        isLoading ? <>

          <div className='user-page'>
            Loading...
          </div>

        </> :
          <div className='user-page'>
            <div className='header'>
              <span>Welcome, {userInfo?.login}</span>
              <button onClick={logout}>Logout</button>
            </div>
            <p>
              Info updated on:
              <span className="timestamp">
                {new Date(userInfo?.update_timestamp).toLocaleString()}
              </span>
            </p>
            <p>
              Account created on:
              <span className='timestamp'>
                {new Date(userInfo?.create_timestamp).toLocaleString()}
              </span>
            </p>
          </div>

      ) : (
        <>
          <Navigate to='/login' />
        </>
      )}
    </div >
  );
});

export default UserInfoComponent;
