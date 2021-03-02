import styled from 'styled-components';
import clockFace from 'assets/images/clock.png';

type ClockHandsProp = {
  theme: string;
  angle: number;
};

type ClockProps = {
  theme: string;
};

export const ClockRound = styled.div<ClockProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    background-image: url(${clockFace});
    background-color: ${({ theme }) =>
      theme === 'light' ? '#ffffff' : '#091921'};
    background-size: cover;
    border: ${({ theme }) =>
      theme === 'light' ? '6px solid #ffffff' : '4px solid #091321'};
    border-radius: 50%;
    box-shadow: ${({ theme }) =>
      theme === 'light'
        ? `inset 0 0 20px rgba(0, 0, 0, 0.1),
      0 15px 15px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(255, 255, 255, 1)`
        : `0 -15px 15px rgba(255, 255, 255, 0.05),
                inset 0 -15px 15px rgba(255, 255, 255, 0.05), 0 15px 15px rgba(0, 0, 0, 0.3),
                inset 0 -15px 15px rgba(0, 0, 0, 0.3)`};
    cursor: pointer;
    }

    &:before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: ${({ theme }) =>
        theme === 'light' ? '#848484' : '#ffffff'};
      border-radius: 50%;
      border: ${({ theme }) =>
        theme === 'light' ? '1px solid #ffffff' : 'none'};
      z-index: 3;
    }

    .hour,
    .min,
    .sec {
      position: absolute;
    }

    .hour{
      width: 80px;
      height: 80px;
    }

    .min{
      width: 95px;
      height: 95px;
    }

    .sec {
      width: 115px;
      height: 115px;
    }
`;

const ClockHand = styled.div<ClockHandsProp>`
  position: absolute;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  transform: rotateZ(${({ angle }) => `${angle}deg` || 'none'});
  height: 100%;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    border-radius: 3px 3px 0 0;
  }
`;

export const HourHand = styled(ClockHand)`
  &:before {
    width: 5px;
    height: 40px;
    background-color: ${({ theme }) =>
      theme === 'light' ? '#848484' : '#ff105e'};
    border-radius: 4px 4px 0 0;
  }
`;

export const MinuteHand = styled(ClockHand)`
  &:before {
    width: 3px;
    height: 50px;
    background-color: ${({ theme }) =>
      theme === 'light' ? '#d6d6d6' : '#ffffff'};
    z-index: 1;
  }
`;

export const SecondHand = styled(ClockHand)`
  &:before {
    width: 1px;
    height: 80px;
    background-color: ${({ theme }) =>
      theme === 'light' ? '#ff6767' : '#ffffff'};
    z-index: 2;
  }
`;
