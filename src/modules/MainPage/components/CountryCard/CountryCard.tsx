import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { LanguagesType, CountryType } from 'types';

type CountryCardProps = {
  country: CountryType;
  lang: string;
};

export const CountryCard: FC<CountryCardProps> = ({
  country: { id, name, description, photos, capital },
  lang,
}) => (
  <Card key={id}>
    <CardActionArea>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="200"
        image={photos ? photos[0] : ''}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {name[lang as keyof LanguagesType]}
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          {capital[lang as keyof LanguagesType]}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description && description[lang as keyof LanguagesType]}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
