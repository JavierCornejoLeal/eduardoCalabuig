import Home from './pages/Home';
import Contacto from './pages/Contacto';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contacto' element={<Contacto / >}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
