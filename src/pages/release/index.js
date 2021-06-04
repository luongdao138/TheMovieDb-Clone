import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailLayout from '../../components/detailLayout';
import DetailStats from '../../components/detailStats';
import ReleaseItem from '../../components/releaseItem';
import { getAllCountries } from '../../redux/actions/country';
import { getReleasesDate, getDetail } from '../../redux/actions/detail';
import './style.scss';

const ReleasePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, releases_date } = useSelector((state) => state.detailReducer);
  const { results: countries } = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(getDetail('movie', id));
    dispatch(getReleasesDate(id));
    if (!countries || countries.length === 0) {
      dispatch(getAllCountries());
    }
  }, [id, dispatch]);

  if (!detail) return null;
  const data = releases_date?.map((item) => {
    const country = countries?.find((x) => x?.iso_3166_1 === item?.iso_3166_1);
    return {
      label: country?.english_name,
      value: item.release_dates?.length,
    };
  });

  const newReleases = releases_date?.map((item) => {
    const country = countries?.find((x) => x?.iso_3166_1 === item?.iso_3166_1);
    return {
      country,
      releases: item.release_dates,
    };
  });
  // const newTitles = titles?.reduce((acc, current) => {
  //   const country = countries?.find(
  //     (x) => x?.iso_3166_1 === current?.iso_3166_1
  //   );
  //   const x = acc.find((x) => x?.country?.iso_3166_1 === country?.iso_3166_1);
  //   if (x) {
  //     x.titles.push(current);
  //   } else {
  //     acc.push({
  //       titles: [current],
  //       country,
  //     });
  //   }
  //   return acc;
  // }, []);
  // console.log(newTitles);

  const Left = () => {
    return (
      <DetailStats
        title='Release Dates'
        number={releases_date?.reduce(
          (acc, x) => acc + x.release_dates.length,
          0
        )}
        data={data}
      />
    );
  };

  const Right = () => {
    return (
      <>
        {newReleases.map((x, index) => {
          return (
            <ReleaseItem
              key={index}
              code={x.country?.iso_3166_1}
              name={x.country?.english_name}
              releases={x.releases}
            />
          );
        })}
      </>
    );
  };
  return (
    <DetailLayout
      id={detail.id}
      name={detail.name || detail.title}
      time={detail.release_date || detail.first_air_date}
      detail_link={`/detail/movie/${id}`}
      poster_path={
        detail.poster_path
          ? `https://www.themoviedb.org/t/p/w116_and_h174_face${detail.poster_path}`
          : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
      }
      type='movie'
      left={<Left />}
      right={<Right />}
    />
  );
};

export default ReleasePage;
