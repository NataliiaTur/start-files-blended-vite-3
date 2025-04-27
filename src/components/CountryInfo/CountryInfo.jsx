// {
// flag,
// capital,
// countryName,
// languages = [],
// population,
// }
import css from './CountryInfo.module.css';

const CountryInfo = ({ dataCountry }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.flag}>
        <img
          className={css.img}
          src={dataCountry.flag}
          alt={dataCountry.altSpellings}
        />
      </div>
      <div className={css.box}>
        <h3 className={css.capital}>
          Capital: <span className={css.accent}>{dataCountry.capital}</span>
        </h3>

        <h1 className={css.title}>
          {dataCountry.name === 'Russian Federation'
            ? 'MORDOR'
            : dataCountry.name}
        </h1>

        <p className={css.details}>
          Population:{' '}
          <span className={css.accent}>{dataCountry.population}</span>
        </p>

        <p className={css.details}>
          Languages:{' '}
          <span className={css.accent}>{dataCountry.languages.join(', ')}</span>
        </p>
      </div>
    </div>
  );
};

export default CountryInfo;
