import React, { useState } from 'react';
import InlineEdit from './InlineEdit';
import Presence from './Presence';

const TopBar = ({ handleLogin, handleLogout, user }) => {
  const [currentTitle, setCurrentTitle] = useState('Untitled');

  return (
    <div className='bg-[#111111] items-center '>
      <div className='h-16 flex justify-between items-center mx-9'>
        <div className='project-title'>
          {user ? (
            <InlineEdit value={currentTitle} setValue={setCurrentTitle} handleLogout={handleLogout}/>
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
          <Presence />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
