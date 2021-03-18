import { getTimeForClock } from 'components/ClockWidget/ClockWidget';
import moment from 'moment-timezone';

const TORONTO_TIME = moment.tz('2021-03-18 11:55:01', 'America/Toronto');
const TAIPEI_TIME = moment.tz('2021-03-18 18:32:12', 'Asia/Taipei');
const LOS_ANGELES_TIME = moment.tz(
  '2021-03-18 14:18:29',
  'America/Los_Angeles'
);

it('return formated time', () => {
  expect(getTimeForClock(TORONTO_TIME)).toEqual({ hour: 11, min: 55, sec: 1 });
  expect(getTimeForClock(TAIPEI_TIME)).toEqual({ hour: 6, min: 32, sec: 12 });
  expect(getTimeForClock(LOS_ANGELES_TIME)).toEqual({
    hour: 2,
    min: 18,
    sec: 29,
  });
});
