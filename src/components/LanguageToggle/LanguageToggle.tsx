import React, { FC } from 'react';
import {
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';
import i18n from 'i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from 'store/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    languageSelect: {
      color: '#ffffff',
    },
    icon: {
      fill: '#ffffff',
    }
  })
);

export const LanguageToggle: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const updateLang = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const lang = event.target.value as string;
    i18n.changeLanguage(lang);
    updateLang(lang);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={i18n.language}
          onChange={handleChange}
          displayEmpty
          className={classes.languageSelect}
          variant="outlined"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ru">Русский</MenuItem>
          <MenuItem value="be">Беларускі</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
