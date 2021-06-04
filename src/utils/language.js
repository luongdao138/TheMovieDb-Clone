export const convertLanguageMedia = (data, languages) => {
  const result = {};
  if (!data) return;
  for (let x of data) {
    const language = languages.find((l) => l.iso_639_1 === x.iso_639_1);
    let name;
    if (language) {
      name = language.english_name;
    } else {
      name = 'No Language';
    }
    if (result[name]) {
      result[name].push(x);
    } else {
      result[name] = [x];
    }
  }
  const newResult = [];
  Object.keys(result).forEach((key) => {
    newResult.push({
      key,
      value: result[key],
    });
  });

  const originalResult = {};
  newResult
    .sort((a, b) => -a.value.length + b.value.length)
    .forEach((x) => {
      originalResult[x.key] = x.value;
    });
  console.log(originalResult);

  return originalResult;
};
