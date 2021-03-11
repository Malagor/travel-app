import { CurrencyType, State } from 'types';
import { database } from 'services/database';

export const initialState = () => {
  const userInfo = database.getUserInfo('1');
  const countryList = database.getCountriesList();
  const currencyList = database.getCurrenciesList();

  const createCurrencyUserList = (userCur: string[], curList: CurrencyType) => {
    const result: CurrencyType = {};
    userCur.forEach((curName) => {
      result[curName] = curList[curName];
    });
    return result;
  };

  const state: State = {
    countryList,
    country: countryList[0],
    settings: {
      theme: userInfo.theme,
      currencyList: createCurrencyUserList(userInfo.currencies, currencyList),
    },
    userInfo: {
      id: userInfo.id,
      lang: userInfo.lang,
      name: userInfo.name,
      avatar: userInfo.avatar,
    },
    search: '',
    firstCardRef: null,
  };

  return state;
};
