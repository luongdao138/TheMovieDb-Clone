import React from 'react';
import './style.scss';

const CompanySearch = ({ network, data }) => {
  return (
    <div className='d-flex companySearch align-items-center py-2'>
      <span className='companySearch__name'>{data.name}</span>
      {!network && (
        <span className='companySearch__country'>
          <span>{data.origin_country}</span>
        </span>
      )}
    </div>
  );
};

export default CompanySearch;
