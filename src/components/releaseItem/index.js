import moment from 'moment';
import React from 'react';
import './style.scss';

const typeOptions = [
  {
    label: 'Premiere',
    value: 1,
  },
  {
    label: 'Theatrical (limited)',
    value: 2,
  },
  {
    label: 'Theatrical',
    value: 3,
  },
  {
    label: 'Digital',
    value: 4,
  },
  {
    label: 'Physical',
    value: 5,
  },
  {
    label: 'TV',
    value: 6,
  },
];

const ReleaseItem = ({ code, name, releases }) => {
  return (
    <div className='releaseItem'>
      <div className='releaseItem__header'>
        {code && (
          <img src={`https://www.countryflags.io/${code}/flat/24.png`} alt='' />
        )}
        <span>{name}</span>
      </div>
      <div className='releaseItem__main'>
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Certification</td>
              <td>Type</td>
              <td>Note</td>
            </tr>
          </thead>
          <tbody>
            {releases?.map((x, index) => {
              return (
                <tr key={index}>
                  <td>{moment(x.release_date).format('MM/DD/YYYY')}</td>
                  <td>{x.certification}</td>
                  <td>
                    {typeOptions.find((_x) => _x.value === x.type)?.label}
                  </td>
                  <td>{x.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReleaseItem;
