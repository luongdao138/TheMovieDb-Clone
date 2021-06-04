import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DetailHeader from '../../components/detailHeader';
import { getDetail } from '../../redux/actions/detail';
import { getDetailSeason } from '../../redux/actions/season';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { BiCaretDown } from 'react-icons/bi';
import './style.scss';
import EpisodeDetail from '../../components/episodeDetail';

const SeasonDetailPage = () => {
  const { id, season_number } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.detailReducer);
  const { season } = useSelector((state) => state.seasonReducer);
  const [episodes, setEpisodes] = useState([]);
  const [options, setOptions] = useState([]);
  const [sortBy, setSortBy] = useState('eps.asc');

  useEffect(() => {
    if (!detail) {
      dispatch(getDetail('tv', id));
    }
    dispatch(getDetailSeason(id, season_number));
  }, [id, season_number, dispatch]);

  useEffect(() => {
    setOptions([
      {
        label: 'Episode Desc',
        value: 'eps.desc',
        isActive: sortBy === 'eps.desc',
      },
      {
        label: 'Episode Asc',
        value: 'eps.asc',
        isActive: sortBy === 'eps.asc',
      },
      {
        label: 'Air Date Desc',
        value: 'air_date.desc',
        isActive: sortBy === 'air_date.desc',
      },
      {
        label: 'Air Date Asc',
        value: 'air_date.asc',
        isActive: sortBy === 'air_date.asc',
      },
    ]);
  }, [sortBy]);

  useEffect(() => {
    if (season) {
      if (sortBy === 'eps.asc')
        setEpisodes(
          season?.episodes?.sort((a, b) => {
            return a.episode_number - b.episode_number;
          })
        );
      else if (sortBy === 'eps.desc') {
        setEpisodes(
          season?.episodes?.sort((a, b) => {
            return -a.episode_number + b.episode_number;
          })
        );
      } else if (sortBy === 'air_date.asc') {
        setEpisodes(
          season?.episodes?.sort((a, b) => {
            if (a.air_date > b.air_date) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      } else if (sortBy === 'air_date.desc') {
        setEpisodes(
          season?.episodes?.sort((a, b) => {
            if (a.air_date > b.air_date) {
              return -1;
            } else {
              return 1;
            }
          })
        );
      }
    }
  }, [season, sortBy]);

  const currentIndex = detail?.seasons?.findIndex(
    (x) => season?.name === x.name
  );

  const handleChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className='seasonDetailPage'>
      <DetailHeader
        imgSrc={
          season?.poster_path
            ? `https://www.themoviedb.org/t/p/w116_and_h174_face${season?.poster_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }
        title={season?.name}
        time={season?.air_date}
        link={`/tv/${id}/seasons/${season_number}`}
        secondaryLink={`/tv/${id}/seasons`}
        secondaryLinkText='Back to the season list'
      />
      <div className='seasonDetailPage__main'>
        <div className='seasonDetailPage__main__nav d-flex align-items-center justify-content-between'>
          {currentIndex !== 0 ? (
            <Link
              to={`/tv/${id}/seasons/${
                detail?.seasons[currentIndex - 1]?.season_number
              }`}
            >
              <span>
                <BsArrowLeft />
              </span>
              <span className='value-left'>
                {detail?.seasons[currentIndex - 1]?.name}
              </span>
            </Link>
          ) : (
            <span></span>
          )}
          {currentIndex < detail?.seasons.length - 1 ? (
            <Link
              to={`/tv/${id}/seasons/${
                detail?.seasons[currentIndex + 1]?.season_number
              }`}
            >
              <span className='value-right'>
                {detail?.seasons[currentIndex + 1]?.name}
              </span>
              <span>
                <BsArrowRight />
              </span>
            </Link>
          ) : (
            <span></span>
          )}
        </div>
        <div className='seasonDetailPage__main__list'>
          <div className='d-flex justify-content-between align-items-center seasonDetailPage__main__list__header '>
            <span className='eps-count'>
              <strong>Episodes </strong>
              {season?.episodes?.length}
            </span>
            <div className='sort'>
              <span>Sort</span>
              <span>
                <BiCaretDown />
              </span>
              <ul>
                {options.map((x, index) => {
                  return (
                    <li
                      className={`${x.isActive ? 'active' : ''}`}
                      onClick={() => handleChange(x.value)}
                      key={index}
                    >
                      {x.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {episodes?.map((x, index) => {
            return (
              <EpisodeDetail
                season_number={season?.season_number}
                tv_id={detail?.id}
                key={index}
                episode={x}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeasonDetailPage;
