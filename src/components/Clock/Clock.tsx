import React from 'react';
import classes from './Clock.module.scss';

const DEGREASE = 6;

type TClockState = {
  hour: number;
  min: number;
  sec: number;
};

type TClockProps = {
  theme: string;
};

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
    const cls = [classes.Clock];
    if (theme === 'light') {
      cls.push(classes.light);
    }
    return (
      <div className={cls.join(' ')}>
        <div className={classes.hour}>
          <div
            className={classes.hr}
            style={{
              transform: `rotateZ(${hour + min / 12}deg)`,
            }}
          />
        </div>
        <div className={classes.min}>
          <div
            className={classes.mn}
            style={{
              transform: `rotateZ(${min}deg)`,
            }}
          />
        </div>
        <div className={classes.sec}>
          <div
            className={classes.sc}
            style={{
              transform: `rotateZ(${sec}deg)`,
            }}
          />
        </div>
      </div>
    );
  }
}
