import React, {FC, useState, useEffect, useCallback} from 'react';
import { ClockRound, HourHand, MinuteHand, SecondHand } from './styled';

const DEGREASE = 6;

type TClockProps = {
  theme: string;
};

export const Clock: FC<TClockProps> = (theme) => {

  const date = new Date();
  
  console.log(1)
  
  const [hour, setHour] = useState(date.getHours() * 30)
  const [min, setMin] = useState(date.getMinutes() * DEGREASE)
  const [sec, setSec] = useState(date.getSeconds() * DEGREASE)

  const tick = () => {
    const dateNow = new Date();
    setHour(dateNow.getHours() * 30)
    setMin(dateNow.getMinutes() * DEGREASE)
    setSec(dateNow.getSeconds() * DEGREASE)
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer) 
  }, [])

  return (
    <ClockRound theme={theme}>
      <div className="hour">
        <HourHand theme={theme} angle={hour + min / 12} />
      </div>
      <div className="min">
        <MinuteHand theme={theme} angle={min} />
      </div>
      <div className="sec">
        <SecondHand theme={theme} angle={sec} />
      </div>
    </ClockRound>
  );
}


/* 
export class Clock extends React.Component<TClockProps, TClockState> {
  private timer: NodeJS.Timeout | undefined;

  constructor(props: TClockProps, state: TClockState) {
    super(props, state);

    this.state = {
      hour: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount(): void {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  tick = () => {
    const date = new Date();
    this.setState({
      hour: date.getHours() * 30,
      min: date.getMinutes() * DEGREASE,
      sec: date.getSeconds() * DEGREASE,
    });
  };

  render() {
    const { hour, min, sec } = this.state;
    const { theme } = this.props;
    return (
      <ClockRound theme={theme}>
        <div className="hour">
          <HourHand theme={theme} angle={hour + min / 12} />
        </div>
        <div className="min">
          <MinuteHand theme={theme} angle={min} />
        </div>
        <div className="sec">
          <SecondHand theme={theme} angle={sec} />
        </div>
      </ClockRound>
    );
  }
}
 */