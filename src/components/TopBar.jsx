import React, { useEffect } from 'react';
import { auth } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useSnippylyClient } from '@snippyly/react';
import Comment from './Comment';
import Presence from './Presence';

const TopBar = ({ handleLogin, handleSetUser, user }) => {
  const { client } = useSnippylyClient();

  useEffect(() => {
    if (!user) {
      return;
    } else if (client && user) {
      client.setDocumentId(location.href);
      client.identify(user);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      client.signOutUser();
      handleSetUser(null);
      alert('You have been logged out');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-[#111111] items-center '>
      {user ? (
        <>
          <div className='mt-0 h-20 flex justify-between items-center mx-9'>
            <button
              className='bg-white p-3 rounded font-bold'
              onClick={handleLogout}
            >
              Logout
            </button>

            <div className='presence-container flex items-center'>
              <Comment />
              <Presence />
            </div>
          </div>
        </>
      ) : (
        <div className='h-20 flex justify-between items-center mx-9'>
          <button
            onClick={handleLogin}
            className='bg-white p-3 rounded font-bold'
          >
            Login With Google
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
