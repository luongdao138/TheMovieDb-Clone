import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../api';
import DetailHeader from '../../components/detailHeader';
import './style.scss';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { BsPlayFill } from 'react-icons/bs';
import { Dialog } from '@material-ui/core';
import VideoIframe from '../../components/videoIframe';
import { AiFillLike, AiFillDislike, AiFillCaretDown } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLanguages } from '../../redux/actions/genre';
import { convertDetailCast } from '../../utils/person';

const EpisodeMediaPage = () => {
  const { id, season_number, episode_number, type } = useParams();
  const [episode, setEpisode] = useState({});
  const [season, setSeason] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `tv/${id}/season/${season_number}/episode/${episode_number}`
      );
      const res2 = await axios.get(
        `/tv/${id}/season/${season_number}/episode/${episode_number}/${type}`
      );
      console.log('res2', res2);
      setData(res2.data.results || res2.data.stills || res2.data);
      setEpisode(res.data);
    };

    getData();
  }, [id, season_number, episode_number, type]);

  useEffect(() => {
    const getSeason = async () => {
      const res = await axios.get(`/tv/${id}/season/${season_number}`);
      setSeason(res.data);
    };

    getSeason();
  }, [id, season_number]);

  const { list: languages } = useSelector((state) => state.languages);

  if (data && data.crew) {
    console.log('crew', convertDetailCast(data?.crew));
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (!languages || languages.length === 0) {
      dispatch(getAllLanguages());
    }
  }, [dispatch]);

  const currentIndex =
    season?.episodes?.findIndex(
      (x) => x.episode_number === Number(episode_number)
    ) || 0;
  console.log(season, currentIndex, episode_number);

  const renderEpisodeMedia = () => {
    if (type === 'videos') {
      if (data?.length === 0) {
        return (
          <p style={{ margin: '20px 0' }}>
            There are no trailers added to {episode?.name}
          </p>
        );
      }

      return (
        <div className='episodeMedia__main__videosList'>
          {data?.map((x, index) => {
            return <VideoItem key={index} video={x} />;
          })}
        </div>
      );
    } else if (type === 'images') {
      if (data?.length === 0) {
        return (
          <p style={{ margin: '20px 0' }}>
            There are images added to {episode?.name}
          </p>
        );
      }
      return (
        <div className='episodeMedia__main__imagesList'>
          {data?.map((x, index) => {
            return <ImageItem languages={languages} key={index} data={x} />;
          })}
        </div>
      );
    } else {
      return (
        <div className='episodeMedia__main__castList'>
          <div className='episodeMedia__main__castList__left'>
            <h4>
              Season Regular <span>{data?.cast?.length}</span>
            </h4>
            <div className='creditList'>
              {data?.cast?.map((x, index) => {
                return <CreditItem data={x} key={index} type='cast' />;
              })}
            </div>
          </div>
          <div className='episodeMedia__main__castList__right'>
            <h4>
              Guest Stars<span> {data?.guest_stars?.length}</span>
            </h4>
            <div className='creditList'>
              {data?.guest_stars?.map((x, index) => {
                return <CreditItem data={x} key={index} type='guestStar' />;
              })}
            </div>
            <h4>
              Crews<span> {data?.crew?.length}</span>
              {data &&
                data.crew &&
                Object.keys(convertDetailCast(data.crew)).map((key, index) => {
                  return (
                    <div key={index}>
                      <h6>
                        {key}
                        <span> {convertDetailCast(data.crew)[key].length}</span>
                      </h6>
                      <div className='creditList'>
                        {convertDetailCast(data.crew)[key].map((x, _index) => {
                          return (
                            <CreditItem data={x} key={_index} type='crew' />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </h4>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='episodeMedia'>
      <DetailHeader
        imgSrc={
          episode?.still_path
            ? `https://www.themoviedb.org/t/p/w320_and_h180_bestv2${episode?.still_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }
        title={episode?.name}
        time={new Date(episode?.air_date).getFullYear()}
        link={`/tv/${id}/seasons/${season_number}`}
        secondaryLink={`/tv/${id}/seasons/${season_number}`}
        secondaryLinkText='Back to episode'
      />
      <div className='episodeMedia__nav d-flex align-items-center justify-content-between'>
        {currentIndex !== 0 ? (
          <Link
            to={`/tv/${id}/season/${season_number}/episode/${
              season?.episodes[currentIndex - 1]?.episode_number
            }/${type}`}
          >
            <span>
              <BsArrowLeft />
            </span>
            <span className='value-left'>
              {season?.episodes[currentIndex - 1]?.name}
            </span>
          </Link>
        ) : (
          <span></span>
        )}
        {currentIndex < season?.episodes?.length - 1 ? (
          <Link
            to={`/tv/${id}/season/${season_number}/episode/${
              season?.episodes[currentIndex + 1]?.episode_number
            }/${type}`}
          >
            <span className='value-right'>
              {season?.episodes[currentIndex + 1]?.name}
            </span>
            <span>
              <BsArrowRight />
            </span>
          </Link>
        ) : (
          <span></span>
        )}
      </div>
      <div className='episodeMedia__main'>{renderEpisodeMedia()}</div>
    </div>
  );
};

const VideoItem = ({ video }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='episodeMedia__main__videosList__item'>
      <img src={`https://i.ytimg.com/vi/${video?.key}/hqdefault.jpg`} alt='' />
      <div className='play' onClick={() => setOpen(true)}>
        <span>
          <BsPlayFill />
        </span>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth='lg'>
        <VideoIframe src={video?.key} handleClose={() => setOpen(false)} />
      </Dialog>
    </div>
  );
};

const ImageItem = ({ data, languages }) => {
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
            <span>
              {languages?.find((x) => x.iso_639_1 === data?.iso_639_1)?.name ||
                'No Language'}
            </span>
            <AiFillCaretDown />
          </span>
        </div>
      </div>
    </div>
  );
};

const CreditItem = ({ data: x, type }) => {
  return (
    <Link to={`/detail/person/${x.id}`} key={x?.id} className='item d-flex'>
      <img
        src={
          x?.profile_path
            ? `https://www.themoviedb.org/t/p/w132_and_h132_face${x?.profile_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
        }
        alt=''
      />
      <div>
        <p>{x.name}</p>
        <span>{type !== 'crew' ? x.character : 'kacmsdkmfs'}</span>
      </div>
    </Link>
  );
};

export default EpisodeMediaPage;
