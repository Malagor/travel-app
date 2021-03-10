import React, { FC, useRef, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useStyles } from './styled';

type SearchProps = {};

export const Search: FC<SearchProps> = () => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        inputRef={inputRef}
      />
    </div>
  );
};
