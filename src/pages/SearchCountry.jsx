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

  // серчпарамс дозволяє зберігати пошукові параметри з урл.
  // та отримати ключ(через гет)
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get('region');
  console.log('region', region);

  useEffect(() => {
    // це для того, щоб юзЕфект не виконувався при першому рендері
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
    // потрібно зберігати в об'єкті регіон ( це ключ), а значення(value)
    // із значенням, яке отримали з форми. Тепер значення треба отримати з урл (вище серчпарамс.гет)
    setSearchParams({ region: value });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {error && <Heading title="Ooops! Something went wrong!" bottom />}
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
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
