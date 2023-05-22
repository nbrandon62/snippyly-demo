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

  const formatFirstName = (user) => {
    if (user) {
      const firstName = user.name.split(' ')[0];
      return firstName;
    }
  };

  return (
    <div className='bg-[#111111] items-center '>
      {user ? (
        <>
          <div className='mx-9 text-white font-bold text-xl'>
            Hello, {formatFirstName(user)}
          </div>
          <div className='mt-0 h-20 flex justify-between items-center mx-9'>
            <div className='project-title'>
              <InlineEdit
                value={currentTitle}
                user={user}
                setValue={setCurrentTitle}
                handleLogout={handleLogout}
              />
            </div>
            <div className='presence-container flex items-center'>
              <Presence />
              <Comment />
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
