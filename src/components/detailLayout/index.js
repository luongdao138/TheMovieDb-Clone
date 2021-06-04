import { Grid } from '@material-ui/core';
import React from 'react';
import { movieOptions, tvOptions } from '../../utils/navOptions';
import DetailHeader from '../detailHeader';
import DetailNav from '../detailNav';

const DetailLayout = ({
  id,
  type,
  name,
  poster_path,
  detail_link,
  time,
  left,
  right,
}) => {
  return (
    <div className='detailLayout'>
      <DetailNav
        options={type === 'movie' ? movieOptions(id) : tvOptions(id)}
      />
      <DetailHeader
        title={name}
        imgSrc={poster_path}
        link={detail_link}
        time={time}
        secondaryLinkText='Back to main'
        secondaryLink={detail_link}
        type={type}
      />
      <div className='detailLayout__main'>
        <Grid container className='mediaPage__main'>
          <Grid item xs={12} md={4} lg={3}>
            {left}
          </Grid>

          <Grid container item xs={12} md={8} lg={9}>
            {right}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DetailLayout;
