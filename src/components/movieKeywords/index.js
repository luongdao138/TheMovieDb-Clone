import React, { useEffect } from 'react';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
import { getAllLanguages } from '../../redux/actions/genre';
const MovieKeyword = ({ type }) => {
  const {
    externals: { facebook_id, twitter_id, instagram_id },
    detail,
    keywords,
  } = useSelector((state) => state.detailReducer);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.languages);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getAllLanguages());
    }
  }, [dispatch]);

  return (
    <div className='movieKeyword'>
      <div className='movieKeyword__social'>
        {facebook_id && (
          <a href={`https://www.facebook.com/${facebook_id}`} target='_blank'>
            <FaFacebookSquare />
          </a>
        )}
        {twitter_id && (
          <a href={`https://twitter.com/${twitter_id}`} target='_blank'>
            <FaTwitter />
          </a>
        )}
        {instagram_id && (
          <a href={`https://instagram.com/${instagram_id}`} target='_blank'>
            <FaInstagram />
          </a>
        )}
      </div>
      <div className='movieKeyword__facts'>
        <ul>
          {type === 'movie' ? (
            <>
              <li>
                <span className='title'>Status</span>
                <span className='value'>{detail?.status}</span>
              </li>
              <li>
                <span className='title'>Original Language</span>
                <span className='value'>
                  {
                    list.find((x) => x.iso_639_1 === detail?.original_language)
                      ?.english_name
                  }
                </span>
              </li>
              <li>
                <span className='title'>Bugdet</span>
                <span className='value'>{detail?.budget}</span>
              </li>
              <li>
                <span className='title'>Revenue</span>
                <span className='value'>${detail?.revenue}</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <span className='title'>Original Name</span>
                <span className='value'>{detail?.original_name}</span>
              </li>
              <li>
                <span className='title'>Status</span>
                <span className='value'>{detail?.status}</span>
              </li>
              <li>
                <span className='title'>Type</span>
                <span className='value'>{detail?.type}</span>
              </li>
              <li>
                <span className='title'>Original Language</span>
                <span className='value'>
                  {
                    list.find((x) => x.iso_639_1 === detail?.original_language)
                      ?.english_name
                  }
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='movieKeyword__keywords'>
        <h4>Keywords</h4>
        <div>
          {keywords?.map((x, index) => {
            return (
              <Link to={`/search/keyword/${x.id}-${x.name}/${type}`} key={x.id}>
                {x.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieKeyword;
