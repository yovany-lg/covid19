const convertTimeLine = (data) => Object.entries(data).map(pair => ({ x: pair[0], y: pair[1] }));

export const transformCountryData = (response) => {
  const { data } = response;
  const { country, timeline: { cases, deaths, recovered } } = data;
  return {
    country,
    timeline: {
      cases: convertTimeLine(cases),
      deaths: convertTimeLine(deaths),
      recovered: convertTimeLine(recovered),
    }
  };
};

export const transformCountryLatest = (response) => {
  const { data } = response;
  const { cases, deaths, recovered } = data;
  return { cases, deaths, recovered };
};
