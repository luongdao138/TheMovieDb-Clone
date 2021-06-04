import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { AiFillLike, AiFillCaretDown, AiFillDislike } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { MediaContext } from '../../pages/media';

const MediaDetailItem = ({ data }) => {
  const { current } = useContext(MediaContext);
  return (
    <div className='mediaItem'>
      <div className='mediaItem__thumbnail'>
        <a
          target='_blank'
          href={`https://www.themoviedb.org/t/p/original${data.file_path}`}
        >
          <img
            src={
              data?.file_path
                ? `https://www.themoviedb.org/t/p/w1000_and_h563_face${data.file_path}`
                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
            }
            alt=''
          />
        </a>
        <div className='mediaItem__thumbnail__actions d-flex justify-content-between align-items-center'>
          <span>
            <AiFillLike />
          </span>
          <span>
            <AiFillDislike />
          </span>
        </div>
      </div>
      <div className='mediaItem__main'>
        <div className='mediaItem__main__item'>
          <span className='title'>Added By</span>
          <Link to='/' className='value'>
            Ian Grimm
          </Link>
        </div>
        <div className='mediaItem__main__item'>
          <span className='title'>Size</span>
          <Link to='/' className='value'>
            <span>
              {data.width}x{data.height}
            </span>
            <span>
              <TiTick />
            </span>
          </Link>
        </div>
        <div className='mediaItem__main__item'>
          <span className='title'>Language</span>
          <span className='language'>
            <span> {current === '_' ? 'No language' : current} </span>
            <AiFillCaretDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailItem;
