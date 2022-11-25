import { Routes, Route } from 'react-router-dom';
import AdminLayout from './componentes/AdminLayout';
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
     </Route>

    </Routes>
  );
}

export default App;
