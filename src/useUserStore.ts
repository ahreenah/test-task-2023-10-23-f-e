import {useContext} from 'react';
import {UserStoreContext} from './UserStore';

const useUserStore = () => {
  const userStore = useContext(UserStoreContext);
  if (!userStore) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }
  return userStore;
};

export default useUserStore;
