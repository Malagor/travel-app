import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LanguagesType, StateCountry } from 'types';

type CountryCardProps = {
  country: StateCountry;
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
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>
);
