export const sortOptions = (type) => [
  {
    label: 'Popular descending',
    value: 'popularity.desc',
  },
  {
    label: 'Popular ascending',
    value: 'popularity.asc',
  },
  {
    label: 'Rate descending',
    value: 'vote_average.desc',
  },
  {
    label: 'Rate ascending',
    value: 'vote_average.asc',
  },
  {
    label:
      type === 'movie'
        ? 'Release date descending'
        : 'First air date descending',
    value:
      type === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc',
  },
  {
    label:
      type === 'movie' ? 'Release date ascending' : 'First air date ascending',
    value: type === 'movie' ? 'primary_release_date.asc' : 'first_air_date.asc',
  },

  {
    label: 'Title (A-Z)',
    value: type === 'movie' ? 'original_title.asc' : 'title.asc',
  },
  {
    label: 'Title (Z-A)',
    value: type === 'movie' ? 'original_title.desc' : 'title.desc',
  },
];
