export const convertCastAndCrew = (cast, crew) => {
  const result = {};
  result.Acting = cast;
  for (let x of crew) {
    const department = x.department;

    if (result[department]) {
      result[department].push(x);
    } else {
      result[department] = [x];
    }
  }

  Object.keys(result).forEach((key) => {
    const data = result[key];
    const newData = {};
    for (let x of data) {
      const date = x.release_date || x.first_air_date;
      const release_date = date ? new Date(date).getFullYear() : '-';
      if (newData[release_date]) {
        newData[release_date].push(x);
      } else {
        newData[release_date] = [x];
      }
    }
    result[key] = newData;
  });
  return result;
};

export const convertDetailCast = (cast) => {
  const result = {};
  for (let x of cast) {
    if (result[x.department]) {
      result[x.department].push(x);
    } else {
      result[x.department] = [x];
    }
  }

  return result;
};
