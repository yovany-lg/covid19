import React, { createContext, useReducer, useContext, useCallback, useEffect } from 'react';
import cache from './cache';
import {
  getCountryTimeline,
  getCountryLatest,
  getGeoInfo,
  getCountriesTotals,
} from './api';

const initialState = {
  country: {
    loading: true,
    data: null,
    error: null
  },
  global: {
    loading: true,
    data: null,
    error: null,
  }
};  

const DataContext = createContext();

const LOAD_COUNTRY_DATA = {
  REQUEST: 'LOAD_COUNTRY_DATA.REQUEST',
  SUCCESS: 'LOAD_COUNTRY_DATA.SUCCESS',
  FAILURE: 'LOAD_COUNTRY_DATA.FAILURE',
};
const LOAD_GLOBAL_DATA = {
  REQUEST: 'LOAD_GLOBAL_DATA.REQUEST',
  SUCCESS: 'LOAD_GLOBAL_DATA.SUCCESS',
  FAILURE: 'LOAD_GLOBAL_DATA.FAILURE',
};

const reducer = (state, action) => {
  switch(action.type) {
    case LOAD_COUNTRY_DATA.REQUEST:
      return { ...state, country: { loading: true, data: null, error: null } };
    case LOAD_COUNTRY_DATA.SUCCESS:
      return { ...state, country: { loading: false, data : action.payload, error: null } };
    case LOAD_COUNTRY_DATA.FAILURE:
      return { ...state, country: { loading: false, data : null, error: action.payload.error } };

    case LOAD_GLOBAL_DATA.REQUEST:
      return { ...state, global: { loading: true, data: null, error: null } };
    case LOAD_GLOBAL_DATA.SUCCESS:
      return { ...state, global: { loading: false, data : action.payload, error: null } };
    case LOAD_GLOBAL_DATA.FAILURE:
      return { ...state, global: { loading: false, data : null, error: action.payload.error } };

    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

const loadCountry = (dispatch) =>
  async (code) => {
    dispatch({ type: LOAD_COUNTRY_DATA.REQUEST });
    const key = `country-${code}`;
    let countryData;
    let error;
    if (!cache.has(key)) {
      try {
        const timeline = await getCountryTimeline(code);
        const latest = await getCountryLatest(code);
        countryData = { ...timeline, latest, code };
        cache.set(key, countryData);
      } catch (err) {
        error = err.message;
      }
    } else {
      countryData = cache.get(key);
    }
    if (error) {
      dispatch({ type: LOAD_COUNTRY_DATA.FAILURE, payload: { error } });
    } else if (countryData !== undefined) {
      dispatch({ type: LOAD_COUNTRY_DATA.SUCCESS, payload: countryData });
    }
  };

const loadGlobal = (dispatch) =>
  async (code) => {
    dispatch({ type: LOAD_GLOBAL_DATA.REQUEST });
    let globalData;
    let error;
    try {
      globalData = await getCountriesTotals(code);
    } catch (err) {
      error = err.message;
    }
    if (error) {
      dispatch({ type: LOAD_GLOBAL_DATA.FAILURE, payload: { error } });
    } else if (globalData !== undefined) {
      dispatch({ type: LOAD_GLOBAL_DATA.SUCCESS, payload: globalData });
    }
  };

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const loadCountryAction = useCallback(loadCountry(dispatch), [dispatch]);
  const loadGlobalAction = useCallback(loadGlobal(dispatch), [dispatch]);

  useEffect(() => {
    const loadGeoInfo = async () => {
      let geoInfo;
      try {
        geoInfo = await getGeoInfo();
        loadCountryAction(geoInfo.countryCode);
      } catch (err) {
        // do nothing for now
      }      
    };
    loadGeoInfo();
    loadGlobalAction();
  }, []);
  return <DataContext.Provider value={{ state, loadCountry: loadCountryAction }}>{children}</DataContext.Provider>
}

export const useDataProvider = () => useContext(DataContext);

export default DataProvider;