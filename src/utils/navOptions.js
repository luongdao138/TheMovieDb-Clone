export const movieOptions = (id) => [
  {
    label: 'Overview',
    isActive: true,
    options: [
      {
        link: `/detail/movie/${id}`,
        title: 'Main',
      },
      {
        link: `/movie/${id}/titles`,
        title: 'Alternative Titles',
      },
      {
        link: `/movie/${id}/cast`,
        title: 'Cast & Crew',
      },
      {
        link: `/movie/${id}/releases`,
        title: 'Release Dates',
      },
      {
        link: '/',
        title: 'Translations',
      },
    ],
  },
  {
    label: 'Media',
    isActive: false,
    options: [
      {
        link: `/movie/${id}/images/backdrops`,
        title: 'Backdrops',
      },
      {
        link: `/movie/${id}/images/posters`,
        title: 'Posters',
      },
      {
        link: '/',
        title: 'Videos',
      },
    ],
  },
  {
    label: 'Fandom',
    isActive: false,
    options: [
      {
        link: '/',
        title: 'Discussions',
      },
      {
        link: '/',
        title: 'Reviews',
      },
    ],
  },
  {
    label: 'Fandom',
    isActive: false,
    options: [
      {
        link: '/',
        title: 'Discussions',
      },
      {
        link: '/',
        title: 'Reviews',
      },
    ],
  },
  {
    label: 'Fandom',
    isActive: false,
    options: [
      {
        link: '/',
        title: 'Discussions',
      },
      {
        link: '/',
        title: 'Reviews',
      },
    ],
  },
];

export const tvOptions = (id) => [
  {
    label: 'Overview',
    isActive: true,
    options: [
      {
        link: `/detail/tv/${id}`,
        title: 'Main',
      },
      {
        link: `/tv/${id}/titles`,
        title: 'Alternative Titles',
      },
      {
        link: `/tv/${id}/cast`,
        title: 'Cast & Crew',
      },
      {
        link: `/tv/${id}/seasons`,
        title: 'Seasons',
      },
      {
        link: '/',
        title: 'Translations',
      },
    ],
  },
  {
    label: 'Media',
    isActive: false,
    options: [
      {
        link: `/tv/${id}/images/backdrops`,
        title: 'Backdrops',
      },
      {
        link: `/tv/${id}/images/posters`,
        title: 'Posters',
      },
      {
        link: '/',
        title: 'Videos',
      },
    ],
  },
  {
    label: 'Fandom',
    isActive: false,
    options: [
      {
        link: '/',
        title: 'Discussions',
      },
      {
        link: '/',
        title: 'Reviews',
      },
    ],
  },
];
