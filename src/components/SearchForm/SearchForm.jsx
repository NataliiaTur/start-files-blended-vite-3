import { FiSearch } from 'react-icons/fi';
import css from './SearchForm.module.css';
import { useState } from 'react';

const regions = [
  { id: 'africa', value: 'africa', name: 'Africa' },
  { id: 'america', value: 'america', name: 'America' },
  { id: 'asia', value: 'asia', name: 'Asia' },
  { id: 'europe', value: 'europe', name: 'Europe' },
  { id: 'oceania', value: 'oceania', name: 'Oceania' },
];

const SearchForm = ({ onSubmit }) => {
  const [region, setRegion] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (region === 'default' || !region) return;
    onSubmit(region);
  };

  const handleChange = e => {
    setRegion(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <button className={css.button} type="submit">
        <FiSearch />
      </button>
      <select
        aria-label="select"
        className={css.select}
        name="region"
        required
        defaultValue="default"
        onChange={handleChange}
      >
        <option disabled value="default">
          Select a region
        </option>
        {regions.map(({ id, value, name }) => (
          <option key={id} value={value}>
            {name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchForm;
