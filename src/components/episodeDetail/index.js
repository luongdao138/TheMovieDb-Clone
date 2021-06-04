import React, { useEffect, useState } from 'react';
import './style.scss';
import { AiFillStar, AiOutlineDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from '../../api';

const EpisodeDetail = ({ episode, season_number, tv_id }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setOpen(false);
  }, [season_number]);

  const handleOpenDetail = async () => {
    setOpen(true);
    const res = await axios.get(
      `/tv/${tv_id}/season/${season_number}/episode/${episode.episode_number}/images`
    );
    setImages(res.data.stills);
  };

  return (
    <div className='episodeDetail'>
      <div className='episodeDetail__overview'>
        <div className='episodeDetail__overview__thumbnail'>
          <img
            src={
              episode?.still_path
                ? `https://www.themoviedb.org/t/p/w454_and_h254_bestv2${episode?.still_path}`
                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
            }
            alt=''
          />
        </div>
        <div className='episodeDetail__overview__info'>
          <div>
            <div className='episodeDetail__overview__info__top'>
              <span className='left'>
                <span className='order'>{episode.episode_number}</span>
                <span className='rate'>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>{episode?.vote_average}</span>
                </span>
                <span className='title'>{episode.name}</span>
              </span>
              <span className='right'>
                {moment(episode.air_date).format('LL')}
              </span>
            </div>
            <div className='episodeDetail__overview__info__bottom'>
              {episode.overview}
            </div>
          </div>
        </div>
      </div>

      {!open ? (
        <div className='episodeDetail__expand'>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleOpenDetail()}
          >
            <span>
              <AiOutlineDown />
            </span>
            <span>Expand</span>
          </span>
        </div>
      ) : (
        <>
          <div className='episodeDetail__media d-flex align-items-center justify-content-between'>
            <Link
              to={`/tv/${tv_id}/season/${season_number}/episode/${episode?.episode_number}/videos`}
            >
              Videos
            </Link>
            <Link
              to={`/tv/${tv_id}/season/${season_number}/episode/${episode?.episode_number}/images`}
            >
              Images
            </Link>
          </div>
          <div className='episodeDetail__detail'>
            <div className='episodeDetail__detail__left'>
              <p>
                <strong>Crew</strong> <span>{episode.crew.length}</span>
              </p>
              <p>
                <strong>Directed by: </strong>{' '}
                <span>
                  {episode.crew.find((x) => x.job === 'Director')?.name}
                </span>
              </p>
              <p>
                <strong>Written by: </strong>{' '}
                <span>
                  {episode?.crew
                    ?.filter((x) => x.job === 'Writer')
                    ?.map((x) => x.name)
                    ?.join(', ') || 'No writter has been added'}
                </span>
              </p>
            </div>
            <div className='episodeDetail__detail__right'>
              <div className='episodeDetail__detail__right__header d-flex justify-content-between align-items-center'>
                <span>
                  <strong>Guest star</strong>
                  <span>26</span>
                </span>
                <Link
                  to={`/tv/${tv_id}/season/${season_number}/episode/${episode?.episode_number}/credits`}
                >
                  Full Cast & Crew
                </Link>
              </div>
              <div className='episodeDetail__detail__right__main'>
                {episode.guest_stars?.map((x, index) => {
                  return (
                    <Link
                      to={`/detail/person/${x.id}`}
                      key={index}
                      className='episodeDetail__detail__right__main__item d-flex align-items-center'
                    >
                      <div className='thumbnail'>
                        <img
                          src={
                            x.profile_path
                              ? `https://www.themoviedb.org/t/p/w132_and_h132_face${x.profile_path}`
                              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                          }
                          alt=''
                        />
                      </div>
                      <div className='info'>
                        <p className='name'>{x.name}</p>
                        <p className='character'>{x.character}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='episodeDetail__image'>
            <div className='episodeDetail__image__header d-flex align-items-center justify-content-between'>
              <span className='eps-count'>
                <strong>Episode Images</strong>
                <span>{images.length}</span>
              </span>
              <Link to='/'>View All Episode Images</Link>
            </div>
            <div className='episodeDetail__image__main'>
              {images.map((x, index) => {
                return (
                  <Link to='/' key={index}>
                    <img
                      src={
                        x.file_path
                          ? `https://www.themoviedb.org/t/p/w320_and_h180_bestv2${x.file_path}`
                          : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                      }
                      alt=''
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EpisodeDetail;
