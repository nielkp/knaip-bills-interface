import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Página não encontrada!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
