import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import { Link, useLocation } from 'react-router-dom';

const CountryList = ({ countries = [] }) => {
  const location = useLocation();

  return (
    <Grid>
      {countries.map(country => (
        <GridItem key={country.id}>
          <Link to={`/country/${country.id}`} state={{ from: location }}>
            <img src={country.flag} alt={`Flag of ${country.id}`} />
            {country.country}
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
export default CountryList;
