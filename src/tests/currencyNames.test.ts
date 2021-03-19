import { CURRENCY_NAMES } from 'appConstants/currencyNames';

const RU_LANG = 'ru';
const BE_LANG = 'be';
const EN_LANG = 'en';
const AMERICAN_CODE = 'USD';
const TANZANIAN_CODE = 'TZS';
const KOREAN_CODE = 'KRW';

it('gives a proper currency name', () => {
  expect(CURRENCY_NAMES[AMERICAN_CODE][RU_LANG]).toBe('Доллар США');
  expect(CURRENCY_NAMES[TANZANIAN_CODE][EN_LANG]).toBe('Tanzanian Shilling');
  expect(CURRENCY_NAMES[KOREAN_CODE][BE_LANG]).toBe('Паўднёвакарэйская вона');
});
