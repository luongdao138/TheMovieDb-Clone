import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './base.scss';
import Footer from './components/footer';
import Header from './components/header';
import HomePage from './pages/home';
import ListPage from './pages/list';
import DetailPage from './pages/detail';
import SearchPage from './pages/search';
import CastPage from './pages/cast';
import MediaPage from './pages/media';
import KeywordPage from './pages/keyword';
import SeasonsPage from './pages/seasons';
import SeasonDetailPage from './pages/seasonDetail';
import EpisodeMediaPage from './pages/episodeMedia';
import TitlePage from './pages/title';
import ReleasePage from './pages/release';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '62px' }}>{children}</div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact>
          <Layout>
            <HomePage />
          </Layout>
        </Route>
        <Route path='/list/:param1/:param2' exact>
          <Layout>
            <ListPage />
          </Layout>
        </Route>
        <Route path='/search' exact>
          <Layout>
            <SearchPage />
          </Layout>
        </Route>
        <Route path='/detail/:type/:id' exact>
          <Layout>
            <DetailPage />
          </Layout>
        </Route>
        <Route path='/:type/:id/cast' exact>
          <Layout>
            <CastPage />
          </Layout>
        </Route>
        <Route path='/:type/:id/titles' exact>
          <Layout>
            <TitlePage />
          </Layout>
        </Route>
        <Route path='/movie/:id/releases' exact>
          <Layout>
            <ReleasePage />
          </Layout>
        </Route>
        <Route path='/search/keyword/:query/:type' exact>
          <Layout>
            <KeywordPage />
          </Layout>
        </Route>
        <Route path='/:type/:id/images/:media_type' exact>
          <Layout>
            <MediaPage />
          </Layout>
        </Route>
        <Route path='/tv/:id/seasons' exact>
          <Layout>
            <SeasonsPage />
          </Layout>
        </Route>
        <Route path='/tv/:id/seasons/:season_number' exact>
          <Layout>
            <SeasonDetailPage />
          </Layout>
        </Route>
        <Route
          path='/tv/:id/season/:season_number/episode/:episode_number/:type'
          exact
        >
          <Layout>
            <EpisodeMediaPage />
          </Layout>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
