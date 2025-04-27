import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { fetchByRegion } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';
import { Hourglass } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get('region');

  useEffect(() => {
    if (!region) return;
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setError(false);
        const countries = await fetchByRegion(region);
        setCountries(countries);
      } catch (error) {
        setError(true);
        console.log('sorry, error', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [region]);

  const handleSubmit = value => {
    setSearchParams({ region: value });
  };

  return (
    <Section>
      <Container>
        <Heading title="SearchCountry" bottom />
        <SearchForm onSubmit={handleSubmit} />
        {error && <p>Ooops! Something went wrong!</p>}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0',
            }}
          >
            <Hourglass />
          </div>
        )}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};

export default SearchCountry;
