import React, { useState, useEffect } from 'react';
import { useSnippylyClient } from '@snippyly/react';
import { auth } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import InlineEdit from './InlineEdit';
import Comment from './Comment';
import Presence from './Presence';


const TopBar = ({ handleLogin, handleSetUser, user }) => {
  const [currentTitle, setCurrentTitle] = useState('Untitled');
  const { client } = useSnippylyClient();

  useEffect(() => {
    if (!user) {
      return;
    } else if (client && user) {
      client.setDocumentId(location.href);
      client.identify(user);
    }
  }, [client, user]);

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
      <div className='h-16 flex justify-between items-center mx-9'>
        <div className='project-title'>
          {user ? (
            <InlineEdit
              value={currentTitle}
              setValue={setCurrentTitle}
              handleLogout={handleLogout}
            />
          ) : (
            <button
              onClick={handleLogin}
              className='bg-white p-3 rounded font-bold'
            >
              Login With Google
            </button>
          )}
        </div>
        {user ? (
          <div className='presence-container flex align-center'>
            <Presence />
            <Comment />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TopBar;
