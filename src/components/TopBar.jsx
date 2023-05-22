import React, { useState, useEffect } from 'react';
import { useSnippylyClient } from '@snippyly/react';
import InlineEdit from './InlineEdit';
import Comment from './Comment'; 

const TopBar = ({ handleLogin, handleLogout, user }) => {
  const [currentTitle, setCurrentTitle] = useState('Untitled');
  const { client } = useSnippylyClient();

  useEffect(() => {
    if (!user) {
      return;
    } else if (client && user) {
      client.identify(user);
      client.setDocumentId(location.href);
      return
    }
  }, [client]);


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
        <div className='presence-container'>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
