import { Routes, Route } from 'react-router-dom';
import AdminLayout from './componentes/AdminLayout';
import FormNewDish from './paginas/admin/dish/FormNewDish';
import AdminRestaurants from './paginas/admin/restaurants/AdminRestaurants';
import FormNewRestaurant from './paginas/admin/restaurants/FormNewRestaurant';

import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes/>} />
     
     
     <Route path="/admin" element={<AdminLayout/>}>
      <Route path="/admin/restaurants" element={<AdminRestaurants/>} />
      <Route path="/admin/restaurants/new" element={<FormNewRestaurant/>} />
      <Route path="/admin/restaurants/:id" element={<FormNewRestaurant/>} />
      <Route path="/admin/dish/:id" element={<FormNewDish/>} />
      <Route path="/admin/dish/novo" element={<FormNewDish/>} />
     </Route>

    </Routes>
  );
}

export default App;
