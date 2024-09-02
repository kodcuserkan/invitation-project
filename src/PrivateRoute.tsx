import { FC, PropsWithChildren } from 'react';
import {Outlet } from 'react-router-dom';
import useLoginStore from './store/login';
import ThankYou from './ThankYou';
const AppLayout: FC<PropsWithChildren> = () => {
    const { isLogin, isValidate } = useLoginStore(({ isLogin, isValidate }) => ({
		  isLogin,
      isValidate,
	}));

  if(isLogin() && isValidate()) { 
    return (
      <ThankYou />
    )
  }
  return (
    < Outlet />
  )
};

export default AppLayout;
