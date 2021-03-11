import React, { FC, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSearch } from 'store/actions';
import { State } from 'types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { StringMap } from 'i18next';
import { useStyles } from './styled';

type SearchProps = {};

export const Search: FC<SearchProps> = () => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const search = useSelector((state: State) => state.search);
  const firstCardRef = useSelector((state: State) => state.firstCardRef);
  const lang = useSelector((state: State) => state.userInfo.lang);
  const dispatch = useDispatch();
  const [inputIsWrong, setInputIsWrong] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  useEffect(() => {
    const searchString = search.trim();
    switch (lang) {
      case 'en':
        if (/[^a-z\- ]/i.test(searchString)) setInputIsWrong(true);
        else setInputIsWrong(false);
        break;
      case 'ru':
        if (/[^а-я\- ]/i.test(searchString)) setInputIsWrong(true);
        else setInputIsWrong(false);
        break;
      case 'be':
        if (/([^а-яiў\- ]|[щъи])/i.test(searchString)) setInputIsWrong(true);
        else setInputIsWrong(false);
        break;
      default:
        setInputIsWrong(false);
    }
  }, [search, lang, setInputIsWrong]);

  useEffect(() => {
    dispatch(setSearch(currentInput));
  }, [currentInput, dispatch]);

  const onSearch = () => {
    if (firstCardRef && firstCardRef.current) {
      inputRef.current!.blur();
      firstCardRef.current.scrollIntoView(false);
    }
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Tooltip
          title={inputIsWrong ? (t('Wrong Search Input') as StringMap) : ''}
          open={inputIsWrong}
          placement="bottom-start"
          classes={{ tooltip: classes.tooltip }}
        >
          <InputBase
            placeholder={t('Search Placeholder')}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            inputRef={inputRef}
            value={currentInput}
            onChange={(evt) => setCurrentInput(evt.target.value)}
            onKeyDown={(evt) => (evt.key === 'Enter' ? onSearch() : null)}
          />
        </Tooltip>
        <IconButton color="inherit" onClick={() => setCurrentInput('')}>
          <ClearIcon />
        </IconButton>
      </div>
      <Button variant="contained" onClick={onSearch}>
        {t('Search Button')}
      </Button>
    </div>
  );
};
