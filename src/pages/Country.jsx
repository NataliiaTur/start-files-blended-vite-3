import { useEffect, useRef, useState } from 'react';
import Container from '../components/Container/Container';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from '../service/countryApi';
import { Hourglass } from 'react-loader-spinner';
import Loader from '../components/Loader/Loader';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // поверне об'єкт з динамічними параметрами. Якщо в Апп прописати в path декілька праметрів, то видасть все
  const { countryId } = useParams();

  const location = useLocation();
  console.log('country location', location);
  // перевір локейшн, якщо є записаний стейт із фромом, то адреса буде така локейшн-стейт-фром
  // якщо ні, то відправ додому '/'
  const backLink = useRef(location?.state?.from || '/');

  useEffect(() => {
    const fetchCountryOne = async () => {
      try {
        setIsLoading(true);
        const dataCountry = await fetchCountry(countryId);
        setCountry(dataCountry);
        setError(false);
      } catch (error) {
        setError(true);
        console.log('Sorry!', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryOne(countryId);
  }, [countryId]);

  return (
    <Section>
      <Container>
        {isLoading && (
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        )}
        {error && <p>Sorry! Problem with server</p>}
        {isLoading && <Loader />}
        {!error && country && <CountryInfo dataCountry={country} />}

        {/* передамо змінну поточну  змінну беклінк */}
        <GoBackBtn to={backLink.current} />
      </Container>
    </Section>
  );
};

export default Country;
