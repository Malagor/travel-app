import React, { FC } from 'react';
import { ClockRound, HourHand, MinuteHand, SecondHand } from './styled';

const DEGREASE = 6;

type TClockProps = {
  time: {
    hour: number;
    min: number;
    sec: number;
  };
  theme: string;
};

export const Clock: FC<TClockProps> = ({ time, theme }) => {
  const { hour, min, sec } = time;

  const hourClock = hour * 30;
  const minClock = min * DEGREASE;
  const secClock = sec * DEGREASE;

  return (
    <ClockRound theme={theme}>
      <div className="hour">
        <HourHand theme={theme} angle={hourClock + minClock / 12} />
      </div>
      <div className="min">
        <MinuteHand theme={theme} angle={minClock} />
      </div>
      <div className="sec">
        <SecondHand theme={theme} angle={secClock} />
      </div>
    </ClockRound>
  );
};
