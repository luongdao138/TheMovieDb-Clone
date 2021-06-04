import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { BsPlayFill } from 'react-icons/bs';
import { Dialog } from '@material-ui/core';
import VideoIframe from '../videoIframe';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const initOptions = [
  {
    label: 'Videos',
    isActive: true,
    fullLink: '/',
  },
  {
    label: 'Posters',
    isActive: false,
    fullLink: '/',
  },
  {
    label: 'Backdrops',
    isActive: false,
    fullLink: '/',
  },
];

const ImageItem = ({ item }) => {
  return (
    <img
      className='poster__item'
      src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item?.file_path}`}
      alt=''
    />
  );
};

const VideoItem = ({ video }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='video__item'>
      <img src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`} alt='' />
      <span className='video__play' onClick={() => setOpen(true)}>
        <span>
          <BsPlayFill />
        </span>
      </span>
      <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)}>
        <VideoIframe
          key={video.key}
          src={video.key}
          handleClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
};

const Media = ({ type, id }) => {
  const [options, setOptions] = useState(initOptions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { images, videos } = useSelector((state) => state.detailReducer);

  const handleChange = (index) => {
    if (!options[index].isActive) {
      setOptions((old) =>
        old.map((x, _index) =>
          index === _index
            ? { ...x, isActive: true }
            : { ...x, isActive: false }
        )
      );
      setCurrentIndex(index);
    }
  };

  const renderItems = () => {
    if (options[currentIndex].label === 'Videos') {
      return (
        <>
          {videos.slice(0, 6).map((x, index) => (
            <VideoItem video={x} key={index} />
          ))}
        </>
      );
    } else if (options[currentIndex].label === 'Backdrops') {
      return (
        <>
          {images.backdrops.slice(0, 6).map((x, index) => (
            <ImageItem item={x} key={index} />
          ))}
          {images.backdrops.length > 6 && (
            <div className='d-flex justify-content-center align-items-center viewmore '>
              <Link to={`/${type}/${id}/images/backdrops`}>
                <span>View more</span>
                <FaArrowAltCircleRight />
              </Link>
            </div>
          )}
        </>
      );
    } else if (options[currentIndex].label === 'Posters') {
      return (
        <>
          {images.posters.slice(0, 6).map((x, index) => (
            <ImageItem item={x} key={index} />
          ))}
          {images.posters.length > 6 && (
            <div className='d-flex justify-content-center align-items-center viewmore '>
              <Link to={`/${type}/${id}/images/posters`}>
                <span>View more</span>
                <FaArrowAltCircleRight />
              </Link>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className='medias'>
      <div className='medias__header d-flex align-items-center'>
        <h3 className='medias__header__title'>Media</h3>
        <div className='d-flex align-items-center nav'>
          {options.map((x, index) => (
            <p
              key={index}
              onClick={() => handleChange(index)}
              className={x.isActive ? 'active' : ' '}
            >
              {x.label}{' '}
              <span>
                {x.label === 'Videos'
                  ? videos?.length
                  : x.label === 'Posters'
                  ? images.posters?.length
                  : images.backdrops?.length}
              </span>
            </p>
          ))}
        </div>
      </div>
      <div className='medias__main'>{renderItems()}</div>
    </div>
  );
};

export default Media;
