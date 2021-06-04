import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { BsArrowLeft } from 'react-icons/bs';
const DetailHeader = ({
  type,
  imgSrc,
  title,
  time,
  link,
  secondaryLink,
  secondaryLinkText,
  ...rest
}) => {
  //www.themoviedb.org/t/p/w58_and_h87_face/s0YlYSyLizIQ84qiUBa86mi2fGE.jpg
  return (
    <div className='detailHeader'>
      <Link to={link} className='detailHeader__thumbnail'>
        <img
          src={
            imgSrc
              ? imgSrc
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
          }
          alt=''
        />
      </Link>
      <div className='detailHeader__info'>
        <Link to={link}>
          <h1>
            {title}
            {type !== 'person' && time && (
              <span>({new Date(time).getFullYear()})</span>
            )}
          </h1>
        </Link>
        <Link to={secondaryLink}>
          <BsArrowLeft />
          <span>{secondaryLinkText}</span>
        </Link>
      </div>
    </div>
  );
};

export default DetailHeader;
