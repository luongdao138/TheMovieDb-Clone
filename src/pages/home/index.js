import React, { useEffect } from 'react';
import Banner from '../../components/banner';
import ListPopular from '../../components/listPopular';
import ListTrending from '../../components/listTrending';
import LeaderBoard from '../../components/leaderBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getHomePopular, getHomeTrending } from '../../redux/actions/home';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePopular('tv'));
    dispatch(getHomeTrending('movie', 'day'));
  }, [dispatch]);

  const { popular, trending } = useSelector((state) => state.home);

  return (
    <>
      <Banner />
      <ListPopular list={popular} />
      <ListTrending list={trending} />
      <LeaderBoard />
    </>
  );
};

export default HomePage;
