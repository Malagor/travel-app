import React from 'react';
import classes from './PageTitle.module.scss';

type PageTitleProps = {};
type PageTitleState = {};

export class PageTitle extends React.Component<PageTitleProps, PageTitleState> {
  constructor(props: PageTitleProps, state: PageTitleState) {
    super(props, state);

    this.state = {}
  }

  render() {
    return <div className={classes.PageTitle}>PageTitle</div>;
  }
}
