import React from 'react';
import './style.scss';
import { AiOutlineClose } from 'react-icons/ai';
const index = ({ src, handleClose }) => {
  return (
    <div className='video-iframe'>
      <span
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: '#fff',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: '30',
        }}
      >
        <AiOutlineClose />
      </span>
      <iframe
        width='100%'
        height='400'
        src={`https://www.youtube.com/embed/${src}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default index;
