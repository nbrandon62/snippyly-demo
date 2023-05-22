import { useRef, useState } from 'react';
import editIcon from '../assets/editIcon.svg';

const InlineEdit = ({ value, setValue, handleLogout }) => {
  const [editingValue, setEditingValue] = useState(value);
  const inputElement = useRef();

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === '') {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };
  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <div className='flex'>
      <input
        type='text'
        ref={inputElement}
        className='bg-white text-black rounded text-lg ps-2 font-bold overflow-hidden'
        aria-label='Field name'
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <button className='mt-2' onClick={focusInput}>
        <img src={editIcon} alt='edit title icon' className='h-6 mx-4' />
      </button>
      <button className='text-white' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InlineEdit;
