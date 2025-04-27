import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { getCountries } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setError(false);
        const countries = await getCountries();
        setCountries(countries);
      } catch (error) {
        setError(true);
        console.log('sorry, error', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        <Heading title="Home" bottom />
        {error && <p>Oops! Something went wrong!</p>}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
export default Home;
