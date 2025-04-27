import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Country = lazy(() => import('./pages/Country'));
const SearchCountry = lazy(() => import('./pages/SearchCountry'));

export const App = () => {
  return (
    <div>
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<SearchCountry />} />
          <Route path="/country/:countryId" element={<Country />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};
