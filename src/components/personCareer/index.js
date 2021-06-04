import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
import ShowMoreText from 'react-show-more-text';
import { convertCastAndCrew } from '../../utils/person';

const PersonCareer = () => {
  const {
    credits: { cast, crew, id },
    detail,
  } = useSelector((state) => state.detailReducer);
  const achievements = convertCastAndCrew(cast, crew);
  console.log('cast', cast);
  return (
    <div className='personCareer'>
      <div className='personCareer__bio'>
        <h1>{detail?.name}</h1>
        {detail?.biography && (
          <>
            <strong>Biography</strong>
            <ShowMoreText lines={10} expanded={false}>
              <p>{detail?.biography}</p>
            </ShowMoreText>
          </>
        )}
      </div>

      <div className='personCareer__knownFor'>
        {cast
          ?.sort((a, b) => {
            return -a.vote_count + b.vote_count;
          })
          ?.slice(0, 8)
          .map((x, index) => {
            return (
              <Link
                key={index}
                to={`/detail/${x.media_type}/${x.id}`}
                className='personCareer__knownFor__item'
              >
                <img
                  src={
                    x.poster_path
                      ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${x.poster_path}`
                      : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                  }
                  alt=''
                />
                <p>{x.title || x.name}</p>
              </Link>
            );
          })}
      </div>
      <div className='personCareer__achievements'>
        {Object.keys(achievements).map((key) => {
          console.log(key);
          return (
            <div key={key} className='personCareer__achievements__item'>
              <h4 className='personCareer__achievements__item__title'>{key}</h4>
              <div className='personCareer__achievements__item__main'>
                {Object.keys(achievements[key]).map((_key) => {
                  return (
                    <div key={_key} className='ac-wrapper'>
                      {achievements[key][_key].map((data, index) => {
                        return (
                          <AchievementItem
                            key={index}
                            type={key}
                            label={_key}
                            data={data}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AchievementItem = ({ data, label, type }) => {
  return (
    <Link
      to={`/detail/${data.media_type}/${data.id}`}
      className='achievementItem d-flex align-items-center'
    >
      <span className='achievementItem__label'>{label}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <span className='achievementItem__name'>
          {data?.name || data?.title}
        </span>
        {data.media_type === 'movie' ? (
          type === 'Acting' ? (
            <>
              <span style={{ opacity: 0.5, marginRight: '4px' }}>as</span>
              <span className='achievementItem__character'>
                {data.character}
              </span>
            </>
          ) : (
            <span className='achievementItem__espisode'>{data.job}</span>
          )
        ) : type == 'Acting' ? (
          <span className='achievementItem__espisode'>
            (
            {data.episode_count > 1
              ? data.episode_count + ' espisodes'
              : data.episode_count + ' espisode'}
            )
          </span>
        ) : (
          <span className='achievementItem__espisode'>{data.job}</span>
        )}
      </div>
    </Link>
  );
};

const MovieModal = (data) => {
  return <div className='movie__modal'></div>;
};

export default PersonCareer;
