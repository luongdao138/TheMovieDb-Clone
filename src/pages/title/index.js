import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailLayout from '../../components/detailLayout';
import DetailStats from '../../components/detailStats';
import TitleItem from '../../components/titleItem';
import { getAllCountries } from '../../redux/actions/country';
import { getAlternativeTitles, getDetail } from '../../redux/actions/detail';
import './style.scss';

const TitlePage = () => {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const { detail, titles } = useSelector((state) => state.detailReducer);
  const { results: countries } = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(getDetail(type, id));
    dispatch(getAlternativeTitles(type, id));
    if (!countries || countries.length === 0) {
      dispatch(getAllCountries());
    }
  }, [id, type, dispatch]);

  if (!detail) return null;
  const data = titles?.reduce((acc, current) => {
    const country = countries?.find(
      (x) => x?.iso_3166_1 === current?.iso_3166_1
    );

    const x = acc.find((x) => x?.iso_3166_1 === country?.iso_3166_1);
    if (x) {
      x.value = x.value + 1;
    } else {
      acc.push({
        iso_3166_1: country?.iso_3166_1,
        label: country?.english_name,
        value: 1,
      });
    }
    return acc;
  }, []);

  const newTitles = titles?.reduce((acc, current) => {
    const country = countries?.find(
      (x) => x?.iso_3166_1 === current?.iso_3166_1
    );
    const x = acc.find((x) => x?.country?.iso_3166_1 === country?.iso_3166_1);
    if (x) {
      x.titles.push(current);
    } else {
      acc.push({
        titles: [current],
        country,
      });
    }
    return acc;
  }, []);
  console.log(newTitles);

  const Left = () => {
    return (
      <DetailStats
        title='Alternative Titles'
        number={titles?.length}
        data={data}
      />
    );
  };

  const Right = () => {
    return (
      <>
        {newTitles.map((x, index) => {
          return (
            <TitleItem
              key={index}
              code={x.country?.iso_3166_1}
              name={x.country?.english_name}
              titles={x?.titles}
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
      detail_link={`/detail/${type}/${id}`}
      poster_path={
        detail.poster_path
          ? `https://www.themoviedb.org/t/p/w116_and_h174_face${detail.poster_path}`
          : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
      }
      type={type}
      left={<Left />}
      right={<Right />}
    />
  );
};

export default TitlePage;
