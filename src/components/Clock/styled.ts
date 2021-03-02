import styled from 'styled-components';

type ClockRoundProps = {
  theme: string;
};

export const ClockRound = styled.div<ClockRoundProps>`

    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background-color: ${({ theme }) =>
      theme === 'light' ? '#ffffff' : '#091921'};
    background-image: url('/assets/images/clock.png');
    background-size: cover;
    border: ${({ theme }) =>
      theme === 'light' ? '6px solid #ffffff' : '4px solid #091321'};
    border-radius: 50%;
    box-shadow: ${({ theme }) =>
      theme === 'light'
        ? 'inset 0 0 20px rgba(0, 0, 0, 0.1),' +
          '0 15px 15px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(255, 255, 255, 1)'
        : '0 -15px 15px rgba(255, 255, 255, 0.05),' +
          'inset 0 -15px 15px rgba(255, 255, 255, 0.05), 0 15px 15px rgba(0, 0, 0, 0.3),' +
          'inset 0 -15px 15px rgba(0, 0, 0, 0.3)'};
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

    .hour,
    .hr {
      width: 80px;
      height: 80px;
    }

    .min,
    .mn {
      width: 95px;
      height: 95px;
    }

    .sec,
    .sc {
      width: 115px;
      height: 115px;
    }

    .hr,
    .mn,
    .sc {
      display: flex;
      justify-content: center;
      //align-items: center;
      position: absolute;
      border-radius: 50%;
    }

    .hr:before {
      content: '';
      position: absolute;
      width: 5px;
      height: 40px;
      background-color: ${({ theme }) =>
        theme === 'light' ? '#848484' : '#ff105e'};
      border-radius: 4px 4px 0 0;
    }

    .mn:before {
      content: '';
      position: absolute;
      width: 3px;
      height: 50px;
      background-color: ${({ theme }) =>
        theme === 'light' ? '#d6d6d6' : '#ffffff'};

      border-radius: 3px 3px 0 0;
      z-index: 1;
    }

    .sc:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 80px;
      background-color: ${({ theme }) =>
        theme === 'light' ? '#ff6767' : '#ffffff'};
      z-index: 2;
    }
`;
